import "server-only";
import { callTracer, prestateDiff } from "@/lib/debug-trace";
import { enterGate, type Lane, type Outcome, type Refusal } from "@/lib/trace-gate";
import type { TraceFrame, TraceResponse } from "@/lib/trace";

/* One transaction's execution trace, from the debug node the public RPC
   does not offer: the call tree with logs (callTracer) and the account and
   storage diff (prestateTracer). Both are native tracers with a node-side
   timeout (lib/debug-trace.ts). The struct logger is never run: it keeps
   every opcode step in node memory and OOM-killed the shared node, so the
   opcode profile and the struct log's gas split are null.

   The tx page reads this through /api/trace, and the chat calls it in
   process. Each miss passes the node budget (lib/trace-gate.ts) first. A
   trace is immutable once its block is final, so an instance keeps the
   ones it got. The node URL carries a token: it never leaves this module,
   and no error from the fetch or the node is passed on as text. */

const DEBUG_RPC: Record<string, string | undefined> = {
  "43114": process.env.CCHAIN_DEBUG_RPC_URL,
  "43113": process.env.FUJI_DEBUG_RPC_URL,
};

/** why there is no trace: the chain has no node here, the node does not
 *  know the tx, the node failed or ran out of time, or the gate refused */
export type TraceMiss = "no_node" | "not_found" | "timeout" | "node_error" | Refusal;
export type TraceResult = { trace: TraceResponse } | { miss: TraceMiss };

const cache = new Map<string, TraceResponse>();
const CACHE_MAX = 400;

/** our wait for the node; the node stops the traced tx itself after its
 *  own timeout, and this covers the queue and the block replay before it */
const FETCH_MS = 15_000;

/** a node failure as a fixed kind, never as the fetch's or the node's text */
class NodeFailure extends Error {
  constructor(readonly kind: "not_found" | "timeout" | "node_error" | "abandoned") {
    super(kind);
  }
}

async function rpc<T>(url: string, method: string, params: unknown[]): Promise<T> {
  let res: Response;
  try {
    res = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ jsonrpc: "2.0", id: 1, method, params }),
      signal: AbortSignal.timeout(FETCH_MS),
    });
  } catch (e) {
    throw new NodeFailure(e instanceof Error && e.name === "TimeoutError" ? "abandoned" : "node_error");
  }
  if (!res.ok) throw new NodeFailure("node_error");
  const body = (await res.json().catch(() => null)) as { result?: T; error?: { message?: string } } | null;
  if (!body) throw new NodeFailure("node_error");
  if (body.error) {
    const msg = body.error.message ?? "";
    throw new NodeFailure(/not found/i.test(msg) ? "not_found" : /timeout|deadline/i.test(msg) ? "timeout" : "node_error");
  }
  return body.result as T;
}

/** what a failure means for the gate: a tx the node does not know is an
 *  answer, not a node error */
function outcomeOf(kind: NodeFailure["kind"]): Outcome {
  if (kind === "abandoned") return "abandoned";
  return kind === "not_found" ? "answered" : "node_error";
}

export async function getTrace(chainId: string, txHash: string, from: { lane: Lane; ip: string }): Promise<TraceResult> {
  const url = DEBUG_RPC[chainId];
  if (!url) return { miss: "no_node" };
  const hash = txHash.toLowerCase();
  if (!/^0x[0-9a-f]{64}$/.test(hash)) return { miss: "not_found" };
  const key = `${chainId}:${hash}`;
  const hit = cache.get(key);
  if (hit) return { trace: hit };

  const gate = await enterGate(from.lane, from.ip);
  if ("refused" in gate) return { miss: gate.refused };
  try {
    const [call, prestate] = await Promise.all([
      rpc<TraceFrame>(url, "debug_traceTransaction", [hash, callTracer({ withLog: true })]),
      rpc<TraceResponse["prestate"]>(url, "debug_traceTransaction", [hash, prestateDiff()]).catch(() => null),
    ]);
    await gate.pass.done("answered");
    const out: TraceResponse = { call, prestate, opcodes: null, steps: null, gas: null };
    if (cache.size >= CACHE_MAX) cache.delete(cache.keys().next().value!);
    cache.set(key, out);
    return { trace: out };
  } catch (e) {
    const kind = e instanceof NodeFailure ? e.kind : "node_error";
    await gate.pass.done(outcomeOf(kind));
    return { miss: kind === "abandoned" ? "timeout" : kind };
  }
}
