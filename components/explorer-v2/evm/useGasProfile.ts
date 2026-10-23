"use client";

import { useEffect, useMemo, useState } from "react";
import { SOFT_READ, isOk, statusOf } from "@/lib/explorer-soft-status";
import type { GasProfile, TraceResponse } from "@/lib/trace";

/* One transaction's gas profile (gas by opcode, the opcodes executed, and
   gas used split into intrinsic gas and execution), for the tx page. The
   trace route answers these as null: the debug node gives them from a
   second replay with a JS tracer (lib/debug-trace.ts), so the page asks for
   them only once the trace is in, and only when a person may read them:

   - the Gas tab opens;
   - the person has already tapped, clicked or typed on the page when the
     trace comes in, so the tab is ready before they open it;
   - the tx was charged half its gas limit (ACP-194's floor), so the Gas
     Charged box shows the gas execution used.

   The first two ask in the "gesture" lane of the node budget
   (lib/trace-gate.ts), the third in the "open" lane. When the budget is
   spent the page shows no profile, and asks once more, in the gesture
   lane, on the user's next tap, click or key, as useTrace does. The
   profile joins the trace object, in the fields the trace has for it. */

export type GasState = "idle" | "loading" | "ready" | "none";

const GESTURES = ["pointerdown", "keydown", "touchend"] as const;

export function useGasProfile(
  chainId: string,
  hash: string,
  trace: TraceResponse | null,
  want: { tab: boolean; floor: boolean },
): { trace: TraceResponse | null; state: GasState } {
  const key = `${chainId}:${hash}`;
  // the tx asked for and the lane; retry marks the one ask after a spent budget
  const [ask, setAsk] = useState<{ key: string; gesture: boolean; retry: boolean } | null>(null);
  const [got, setGot] = useState<{ key: string; profile: GasProfile | null; state: GasState } | null>(null);
  const asked = ask?.key === key ? ask : null;
  const ready = trace !== null;

  useEffect(() => {
    if (!ready || asked) return;
    const gesture = want.tab || navigator.userActivation?.hasBeenActive === true;
    if (gesture || want.floor) setAsk({ key, gesture, retry: false });
  }, [ready, asked, key, want.tab, want.floor]);

  useEffect(() => {
    if (!asked) return;
    const settle = (profile: GasProfile | null, state: GasState) => setGot({ key: asked.key, profile, state });
    settle(null, "loading");
    const controller = new AbortController();
    const again = () => setAsk({ key: asked.key, gesture: true, retry: true });
    let waiting = false;
    fetch(`/api/trace/${chainId}/${hash}/gas`, {
      headers: { ...SOFT_READ.headers, ...(asked.gesture ? { "x-trace-lane": "gesture" } : {}) },
      signal: controller.signal,
    })
      .then(async (r) => {
        const status = statusOf(r);
        if (status === 429 || status === 503) {
          // a spent budget is no failure: the tab shows no opcode table
          settle(null, "none");
          if (asked.retry) return;
          waiting = true;
          for (const g of GESTURES) window.addEventListener(g, again, { once: true, passive: true });
          return;
        }
        if (!isOk(r)) return settle(null, "none");
        settle((await r.json()) as GasProfile, "ready");
      })
      .catch(() => !controller.signal.aborted && settle(null, "none"));
    return () => {
      controller.abort();
      if (waiting) for (const g of GESTURES) window.removeEventListener(g, again);
    };
  }, [asked, chainId, hash]);

  const mine = got?.key === key ? got : null;
  const profile = mine?.profile ?? null;
  const merged = useMemo(() => (trace && profile ? { ...trace, ...profile } : trace), [trace, profile]);
  return { trace: merged, state: mine?.state ?? "idle" };
}
