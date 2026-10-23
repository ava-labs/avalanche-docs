import "server-only";
import { randomUUID } from "node:crypto";
import { redis } from "@/lib/redis";

/* The budget for the shared C-Chain debug node. The node caps no debug_*
   call itself, so each trace this site asks for passes this gate first.
   The state lives in Redis, so the caps hold across every Vercel instance:

   - SLOTS traces on the node at once. A slot is a lease of LEASE_MS. A slot
     stays taken after our fetch gives up, because the node's replay of the
     block cannot be cancelled: only the node's answer, or the lease, frees it.
   - PER_MINUTE new traces a minute in all. A page load with no user gesture
     yet (the "open" lane, where crawlers that spoof a browser land) gets
     OPEN_SLOTS of the slots and OPEN_PER_MINUTE of the minute.
   - IP_PER_MINUTE and IP_PER_HOUR from one client IP. The chat calls in
     process, from the server, so it has no client IP here.
   - A breaker: BREAKER_ERRORS node errors in a minute stop all traces for
     BREAKER_MS.

   With Redis down or slow, the gate refuses. One instance cannot see the
   others, so a cap kept in its own memory would grow with the instance
   count. A local dev server with no REDIS_URL passes, for development. */

export type Lane = "open" | "gesture" | "chat";
export type Refusal = "busy" | "rate" | "breaker" | "unavailable";
/** how a trace ended, for the slot and the breaker */
export type Outcome = "answered" | "node_error" | "abandoned";

export const SLOTS = 4;
export const OPEN_SLOTS = 2;
export const LEASE_MS = 60_000;
export const PER_MINUTE = 30;
export const OPEN_PER_MINUTE = 20;
export const IP_PER_MINUTE = 10;
export const IP_PER_HOUR = 100;
export const BREAKER_ERRORS = 5;
export const BREAKER_MS = 60_000;
/** the longest the gate waits for one Redis answer */
export const REDIS_MS = 300;

const KEY = "trace:gate:";
/** frees a slot only for the trace that holds it: a lease that ran out may
 *  already belong to another trace */
const RELEASE = 'if redis.call("get", KEYS[1]) == ARGV[1] then return redis.call("del", KEYS[1]) else return 0 end';

type Client = NonNullable<Awaited<ReturnType<typeof redis>>>;

export interface Pass {
  /** the trace ended: an answer from the node frees the slot, and a node
   *  error also counts toward the breaker. An abandoned trace keeps its
   *  slot until the lease runs out, since the node may still be working */
  done(outcome: Outcome): Promise<void>;
}

const OPEN_GATE: Pass = { done: async () => {} };

function within<T>(p: Promise<T>): Promise<T> {
  return Promise.race([
    p,
    new Promise<never>((_, reject) => setTimeout(() => reject(new Error("redis timeout")), REDIS_MS)),
  ]);
}

/** a counter for one time window: the key ends with the window */
async function bump(r: Client, key: string, ttlSeconds: number): Promise<number> {
  const [n] = await r.multi().incr(key).expire(key, ttlSeconds).exec();
  return Number(n);
}

/** a slot for one trace on the node, or the reason there is none */
export async function enterGate(lane: Lane, ip: string): Promise<{ pass: Pass } | { refused: Refusal }> {
  if (!process.env.REDIS_URL && !process.env.VERCEL) return { pass: OPEN_GATE };
  const r = await within(redis()).catch(() => null);
  if (!r) return { refused: "unavailable" };
  try {
    const now = Date.now();
    const minute = Math.floor(now / 60_000);
    const hour = Math.floor(now / 3_600_000);
    if (await within(r.get(`${KEY}breaker`))) return { refused: "breaker" };
    if (lane !== "chat") {
      const [m, h] = await within(Promise.all([bump(r, `${KEY}ip:${ip}:m${minute}`, 120), bump(r, `${KEY}ip:${ip}:h${hour}`, 7_200)]));
      if (m > IP_PER_MINUTE || h > IP_PER_HOUR) return { refused: "rate" };
    }
    // the open lane has its own count, so a flood of page loads cannot
    // spend the share of the minute that users who tap or click keep
    if (lane === "open" && (await within(bump(r, `${KEY}open:m${minute}`, 120))) > OPEN_PER_MINUTE) return { refused: "rate" };
    if ((await within(bump(r, `${KEY}m${minute}`, 120))) > PER_MINUTE) return { refused: "rate" };
    const id = randomUUID();
    for (let i = 0; i < (lane === "open" ? OPEN_SLOTS : SLOTS); i++) {
      const slot = `${KEY}slot:${i}`;
      if ((await within(r.set(slot, id, { NX: true, PX: LEASE_MS }))) === "OK") return { pass: held(r, slot, id) };
    }
    return { refused: "busy" };
  } catch {
    return { refused: "unavailable" };
  }
}

function held(r: Client, slot: string, id: string): Pass {
  return {
    async done(outcome) {
      try {
        if (outcome !== "abandoned") await within(r.eval(RELEASE, { keys: [slot], arguments: [id] }));
        if (outcome === "answered") return;
        const errors = await within(bump(r, `${KEY}errors:m${Math.floor(Date.now() / 60_000)}`, 120));
        if (errors >= BREAKER_ERRORS) await within(r.set(`${KEY}breaker`, "1", { PX: BREAKER_MS }));
      } catch {
        /* the lease frees the slot; a breaker count lost to a Redis error is one error less */
      }
    },
  };
}
