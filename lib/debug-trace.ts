/* The trace configs this site sends to a debug node. The C-Chain and Fuji
   debug nodes are shared and token-authenticated. With no tracer named, a
   node runs the struct logger, which keeps every opcode step in memory (up
   to ~450 MB for one large tx) and has OOM-killed the node. So every
   debug_trace* call names a native tracer, or the one JS tracer below,
   whose memory does not grow with the steps, and a node-side timeout. */

import type { GasProfile } from "@/lib/trace";

/** the node stops a trace after this long. It is coreth's default too; it is
 *  set so a change on the node side cannot make it longer */
export const TRACE_TIMEOUT = "5s";

export interface CallTracerConfig {
  tracer: "callTracer";
  tracerConfig: { withLog: boolean; onlyTopCall: boolean };
  timeout: string;
}

/** the call tree, with each frame's logs when withLog is set */
export function callTracer(opts: { withLog?: boolean; onlyTopCall?: boolean } = {}): CallTracerConfig {
  return {
    tracer: "callTracer",
    tracerConfig: { withLog: opts.withLog === true, onlyTopCall: opts.onlyTopCall === true },
    timeout: TRACE_TIMEOUT,
  };
}

/** the call tree with logs and the state diff from ONE replay of the tx:
 *  the answer is { callTracer, prestateTracer }. If either tracer fails,
 *  the whole call fails */
export function muxTrace() {
  return {
    tracer: "muxTracer",
    tracerConfig: { callTracer: { withLog: true, onlyTopCall: false }, prestateTracer: { diffMode: true } },
    timeout: TRACE_TIMEOUT,
  };
}

/** a client's trace config as a callTracer config, or null when it asks for
 *  another tracer. Only the two callTracer options pass, so a client cannot
 *  set the struct logger, a JS tracer, a timeout or a reexec depth */
export function clientCallTracer(cfg: unknown): CallTracerConfig | null {
  if (!cfg || typeof cfg !== "object") return null;
  const c = cfg as { tracer?: unknown; tracerConfig?: { withLog?: unknown; onlyTopCall?: unknown } };
  if (c.tracer !== "callTracer") return null;
  return callTracer({ withLog: c.tracerConfig?.withLog === true, onlyTopCall: c.tracerConfig?.onlyTopCall === true });
}

/* The gas tracer: what the struct logger gave the Gas tab, with none of its
   memory. It runs in the node's JS engine (goja) at every opcode step and
   keeps a fixed set of numbers: per opcode (at most 256 of them) its step
   count, the gas its steps cost, and its name, read once; the step count;
   and the gas of the first and the last top-level (depth 1) step, with the
   last one's cost. A step adds to these numbers and keeps nothing else.
   `seen` lists the opcodes in the order they first ran, the order the
   struct log had. result() adds the tx gas limit and the EVM's gas used
   from ctx. The names are libevm's JS tracer API (eth/tracers/js/goja.go). */
export const GAS_TRACER = `{
  count: [], cost: [], name: [], seen: [],
  steps: 0, first: -1, last: 0, lastCost: 0,
  step: function (log) {
    var op = log.op.toNumber();
    var cost = log.getCost();
    if (this.count[op] === undefined) {
      this.count[op] = 0;
      this.cost[op] = 0;
      this.name[op] = log.op.toString();
      this.seen.push(op);
    }
    this.count[op]++;
    this.cost[op] += cost;
    this.steps++;
    if (log.getDepth() === 1) {
      var gas = log.getGas();
      if (this.first < 0) this.first = gas;
      this.last = gas;
      this.lastCost = cost;
    }
  },
  fault: function () {},
  result: function (ctx) {
    var ops = [];
    for (var i = 0; i < this.seen.length; i++) {
      var op = this.seen[i];
      ops.push({ op: this.name[op], count: this.count[op], gas: this.cost[op] });
    }
    var top = this.first < 0 ? null : { first: this.first, last: this.last, cost: this.lastCost };
    return { limit: ctx.gas, used: ctx.gasUsed, steps: this.steps, ops: ops, top: top };
  }
}`;

/** what GAS_TRACER answers */
export interface GasTracerResult {
  /** the tx gas limit */
  limit: number;
  /** the EVM's gas used: the limit less the gas left at the end */
  used: number;
  steps: number;
  /** per opcode, in the order each first ran */
  ops: { op: string; count: number; gas: number }[];
  /** the first top-level step's gas, and the last one's gas and cost; null
   *  when the tx ran no code */
  top: { first: number; last: number; cost: number } | null;
}

/** the gas profile from one replay of the tx (GAS_TRACER) */
export function gasTracer() {
  return { tracer: GAS_TRACER, timeout: TRACE_TIMEOUT };
}

/** the gas tracer's answer as the tx page reads it, by the struct log's
 *  rules: the first top-level step starts with the limit less intrinsic
 *  gas, and the last one ends with what is left. Gas used is the EVM's own
 *  figure, so the refund is what separates the two (none since Apricot
 *  Phase 1). Where the EVM reports more than the two add up to (gas
 *  charged, under ACP-194), their sum stands */
export function gasProfile(r: GasTracerResult): GasProfile {
  const opcodes = [...r.ops].sort((a, b) => b.gas - a.gas);
  if (!r.top || !r.limit) return { opcodes, steps: r.steps, gas: null };
  const intrinsic = r.limit - r.top.first;
  const execution = r.top.first - (r.top.last - r.top.cost);
  const before = intrinsic + execution;
  const used = r.used > 0 && r.used <= before ? r.used : before;
  return { opcodes, steps: r.steps, gas: { limit: r.limit, intrinsic, execution, refund: before - used, used } };
}
