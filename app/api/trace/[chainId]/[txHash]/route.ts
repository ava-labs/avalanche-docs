import { NextRequest, NextResponse } from "next/server";
import { softStatus } from "@/lib/explorer-soft-status";
import { getClientIP } from "@/lib/net/clientIp";
import { isCrawler } from "@/lib/net/crawler";
import { getTrace, type TraceMiss } from "@/lib/trace-node";

// One transaction's execution trace for the tx page (lib/trace-node.ts).
// Crawlers get none: a crawler that renders a tx page would trace it on the
// shared debug node, and robots.txt asks them to stay off this path. A page
// load sends x-trace-lane: gesture once the user has tapped, clicked or
// typed, which gives it the larger share of the node budget
// (lib/trace-gate.ts). A trace is final once its block is, so a success is
// cached hard, and a trace without its state diff for a few minutes; every
// miss is no-store and carries a fixed code, never the node's or the fetch's
// text.

const FINAL = { "Cache-Control": "public, max-age=3600, s-maxage=31536000, immutable" };
/** a trace without its state diff: a later ask can get the whole trace */
const PARTIAL = { "Cache-Control": "public, max-age=60, s-maxage=300" };
const NO_STORE = { "cache-control": "private, no-store" };

const STATUS: Record<TraceMiss, number> = {
  no_node: 404,
  not_found: 404,
  // the page keeps its receipt view, as for a tx with no trace
  too_large: 404,
  rate: 429,
  busy: 503,
  breaker: 503,
  unavailable: 503,
  timeout: 504,
  node_error: 502,
};

export async function GET(req: NextRequest, { params }: { params: Promise<{ chainId: string; txHash: string }> }) {
  const { chainId, txHash } = await params;
  const hash = txHash.toLowerCase();
  if (!/^0x[0-9a-f]{64}$/.test(hash)) return NextResponse.json({ error: "invalid transaction hash" }, { status: 400 });
  if (isCrawler(req.headers.get("user-agent"))) return NextResponse.json({ error: "crawler" }, { status: 403, headers: NO_STORE });

  const lane = req.headers.get("x-trace-lane") === "gesture" ? "gesture" : "open";
  const out = await getTrace(chainId, hash, { lane, ip: getClientIP(req) });
  if ("trace" in out) return NextResponse.json(out.trace, { headers: out.trace.prestate ? FINAL : PARTIAL });
  return NextResponse.json({ error: out.miss }, softStatus(req, STATUS[out.miss], NO_STORE));
}
