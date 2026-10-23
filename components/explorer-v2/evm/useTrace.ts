"use client";

import { useEffect, useState } from "react";
import { SOFT_READ, isOk, statusOf } from "@/lib/explorer-soft-status";
import type { TraceResponse } from "@/lib/trace";

/* One transaction's trace, for the tx page. A chain with no trace node
   here, or a tx the node does not know, has none: the route answers that
   miss soft, so the console logs no error for it.

   The debug node is shared and has a budget (lib/trace-gate.ts). A page
   that the user has tapped, clicked or typed on asks in the "gesture" lane,
   which gets the larger share. When the budget is spent the page keeps its
   receipt view, and asks once more, in the gesture lane, on the user's
   next tap, click or key. */

export type TraceState = "loading" | "ready" | "none" | "error";

const GESTURES = ["pointerdown", "keydown", "touchend"] as const;

export function useTrace(chainId: string, hash: string, enabled: boolean): { trace: TraceResponse | null; state: TraceState } {
  const [trace, setTrace] = useState<TraceResponse | null>(null);
  const [state, setState] = useState<TraceState>(enabled ? "loading" : "none");
  // the retry after a spent budget, for this tx only
  const [retried, setRetried] = useState<string | null>(null);
  const key = `${chainId}:${hash}`;
  const retry = retried === key;
  useEffect(() => {
    setTrace(null);
    if (!enabled) {
      setState("none");
      return;
    }
    setState("loading");
    const controller = new AbortController();
    const again = () => setRetried(key);
    let waiting = false;
    const gesture = retry || navigator.userActivation?.hasBeenActive === true;
    fetch(`/api/trace/${chainId}/${hash}`, {
      headers: { ...SOFT_READ.headers, ...(gesture ? { "x-trace-lane": "gesture" } : {}) },
      signal: controller.signal,
    })
      .then(async (r) => {
        const status = statusOf(r);
        if (status === 404) return setState("none");
        if (status === 429 || status === 503) {
          // a spent budget is no failure: the receipt view stays
          setState("none");
          if (retry) return;
          waiting = true;
          for (const g of GESTURES) window.addEventListener(g, again, { once: true, passive: true });
          return;
        }
        if (!isOk(r)) return setState("error");
        setTrace((await r.json()) as TraceResponse);
        setState("ready");
      })
      .catch(() => !controller.signal.aborted && setState("error"));
    return () => {
      controller.abort();
      if (waiting) for (const g of GESTURES) window.removeEventListener(g, again);
    };
  }, [chainId, hash, enabled, key, retry]);
  return { trace, state };
}
