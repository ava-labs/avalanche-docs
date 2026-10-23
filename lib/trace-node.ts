import "server-only";
import { randomUUID } from "node:crypto";
import { callTracer, muxTrace } from "@/lib/debug-trace";
import { enterGate, type Lane, type Outcome, type Refusal } from "@/lib/trace-gate";
import { keep, lock, locked, readKept, unlock } from "@/lib/trace-cache";
import type { PrestateAccount, TraceFrame, TraceResponse } from "@/lib/trace";

/* One transaction's execution trace, from the debug node the public RPC
   does not offer: the call tree with logs (callTracer) and the account and
   storage diff (prestateTracer), from ONE replay of the tx (muxTracer), with
   a node-side timeout (lib/debug-trace.ts). The struct logger is never run:
   it keeps every opcode step in node memory and OOM-killed the shared node,
   so the opcode profile and the struct log's gas split are null.

   The tx page reads this through /api/trace, and the chat calls it in
   process. A tx is traced once: the answer is kept (lib/trace-cache.ts),
   one caller per instance and one instance at a time asks the node, and
   that one passes the node budget (lib/trace-gate.ts) first. The node URL
   carries a token: it never leaves this module, and no error from the fetch
   or the node is passed on as text. */

const DEBUG_RPC: Record<string, string | undefined> = {
  "43114": process.env.CCHAIN_DEBUG_RPC_URL,
  "43113": process.env.FUJI_DEBUG_RPC_URL,
};

/** why there is no trace: the chain has no node here, the node does not
 *  know the tx, the trace is too large to send, the node failed or ran out
 *  of time, or the gate refused */
export type TraceMiss = "no_node" | "not_found" | "too_large" | "timeout" | "node_error" | Refusal;
export type TraceResult = { trace: TraceResponse } | { miss: TraceMiss };

/** our wait for the node; the node stops the traced tx itself after its
 *  own timeout, and this covers the queue and the block replay before it */
const FETCH_MS = 15_000;
/** the most this route reads from the node for one trace */
export const MAX_NODE_BYTES = 16 * 1024 * 1024;
/** the most it sends: Vercel refuses a function response over 4.5 MB */
export const MAX_TRACE_BYTES = 4 * 1024 * 1024;
/** how long a caller waits for another instance that traces the same tx */
const WAIT_MS = 20_000;
const POLL_MS = 300;

const REFUSALS = new Set<TraceMiss>(["busy", "rate", "breaker", "unavailable"]);

/** a node failure as a fixed kind, never as the fetch's or the node's text.
 *  rpc marks an error the node answered in JSON-RPC: the node is up */
class NodeFailure extends Error {
  constructor(
    readonly kind: "not_found" | "too_large" | "timeout" | "node_error" | "abandoned",
    readonly rpc = false,
  ) {
    super(kind);
  }
}

/** the body as text, or too_large once it passes max bytes */
async function readCapped(res: Response, max: number): Promise<string> {
  if (!res.body) return "";
  const reader = res.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > max) {
      await reader.cancel().catch(() => {});
      throw new NodeFailure("too_large");
    }
    chunks.push(value);
  }
  return Buffer.concat(chunks).toString("utf8");
}

async function rpc<T>(url: string, method: string, params: unknown[]): Promise<T> {
  let text: string;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ jsonrpc: "2.0", id: 1, method, params }),
      signal: AbortSignal.timeout(FETCH_MS),
    });
    if (!res.ok) throw new NodeFailure("node_error");
    text = await readCapped(res, MAX_NODE_BYTES);
  } catch (e) {
    if (e instanceof NodeFailure) throw e;
    throw new NodeFailure(e instanceof Error && e.name === "TimeoutError" ? "abandoned" : "node_error");
  }
  let body: { result?: T; error?: { message?: string } };
  try {
    body = JSON.parse(text);
  } catch {
    throw new NodeFailure("node_error");
  }
  if (body.error) {
    const msg = body.error.message ?? "";
    throw new NodeFailure(/not found/i.test(msg) ? "not_found" : /timeout|deadline/i.test(msg) ? "timeout" : "node_error", true);
  }
  return body.result as T;
}

/** the state diff without what the page never reads: contract code (up to
 *  48 KB each, the bulk of a diff) and nonces */
function slim(prestate: { pre: Record<string, PrestateAccount>; post: Record<string, PrestateAccount> } | null) {
  if (!prestate) return null;
  const strip = (side: Record<string, PrestateAccount>) =>
    Object.fromEntries(Object.entries(side ?? {}).map(([a, { balance, storage }]) => [a, { balance, storage }]));
  return { pre: strip(prestate.pre), post: strip(prestate.post) };
}

/** one replay for both tracers. When the node rejects the pair or stops it
 *  at its timeout, one more replay for the call tree alone, which is
 *  lighter (no state diff); never after a transport failure, which a second
 *  replay would only repeat */
async function trace(url: string, hash: string): Promise<TraceResponse> {
  try {
    const both = await rpc<{ callTracer: TraceFrame; prestateTracer: TraceResponse["prestate"] }>(url, "debug_traceTransaction", [hash, muxTrace()]);
    return { call: both.callTracer, prestate: slim(both.prestateTracer), opcodes: null, steps: null, gas: null };
  } catch (e) {
    if (!(e instanceof NodeFailure && e.rpc && (e.kind === "node_error" || e.kind === "timeout"))) throw e;
    const call = await rpc<TraceFrame>(url, "debug_traceTransaction", [hash, callTracer({ withLog: true })]);
    return { call, prestate: null, opcodes: null, steps: null, gas: null };
  }
}

/** what a failure means for the gate: any answer from the node, an error
 *  answer included, frees the slot and is no node failure */
function outcomeOf(failure: unknown): Outcome {
  if (!(failure instanceof NodeFailure)) return "node_error";
  if (failure.kind === "abandoned") return "abandoned";
  return failure.rpc || failure.kind === "too_large" ? "answered" : "node_error";
}

/** the callers in this instance that wait for the same tx */
const flights = new Map<string, Promise<TraceResult>>();

export async function getTrace(chainId: string, txHash: string, from: { lane: Lane; ip: string }): Promise<TraceResult> {
  const url = DEBUG_RPC[chainId];
  if (!url) return { miss: "no_node" };
  const hash = txHash.toLowerCase();
  if (!/^0x[0-9a-f]{64}$/.test(hash)) return { miss: "not_found" };
  const key = `${chainId}:${hash}`;
  const flight = flights.get(key);
  if (flight) {
    // a refusal was for that caller's lane and IP, not for this one
    const out = await flight;
    if (!("miss" in out && REFUSALS.has(out.miss))) return out;
  }
  const p = resolve(url, chainId, key, hash, from, true).finally(() => flights.delete(key));
  flights.set(key, p);
  return p;
}

async function resolve(url: string, chainId: string, key: string, hash: string, from: { lane: Lane; ip: string }, mayWait: boolean): Promise<TraceResult> {
  const kept = await readKept(key);
  if (kept) return kept;

  const id = randomUUID();
  const held = await lock(key, id);
  if (held === "taken") {
    if (!mayWait) return { miss: "busy" };
    const answer = await waitFor(key);
    // the other instance gave up and kept nothing: try once more here
    return answer ?? resolve(url, chainId, key, hash, from, false);
  }

  const gate = await enterGate(chainId, from.lane, from.ip);
  if ("refused" in gate) {
    if (held) await unlock(key, id);
    return { miss: gate.refused };
  }
  try {
    const out = await trace(url, hash);
    const json = JSON.stringify(out);
    await gate.pass.done("answered");
    if (json.length > MAX_TRACE_BYTES) {
      await keep(key, { miss: "too_large" }, '{"miss":"too_large"}');
      return { miss: "too_large" };
    }
    await keep(key, { trace: out }, `{"trace":${json}}`);
    return { trace: out };
  } catch (e) {
    const kind = e instanceof NodeFailure ? e.kind : "node_error";
    await gate.pass.done(outcomeOf(e));
    if (kind === "not_found" || kind === "too_large" || (kind === "timeout" && e instanceof NodeFailure && e.rpc)) {
      await keep(key, { miss: kind }, JSON.stringify({ miss: kind }));
    }
    return { miss: kind === "abandoned" ? "timeout" : kind };
  } finally {
    if (held) await unlock(key, id);
  }
}

/** another instance traces this tx now: its answer lands in Redis. Null
 *  when its lock is gone and it kept nothing, or the wait ran out */
async function waitFor(key: string): Promise<TraceResult | null> {
  for (let waited = 0; waited < WAIT_MS; waited += POLL_MS) {
    await new Promise((r) => setTimeout(r, POLL_MS));
    const kept = await readKept(key);
    if (kept) return kept;
    if ((await locked(key)) === false) return (await readKept(key)) ?? null;
  }
  return null;
}
