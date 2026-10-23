import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { RedisFake } from './redis-fake';

/* The node budget for the shared C-Chain debug node (lib/trace-gate.ts).
   One RedisFake stands for the Redis that all Vercel instances share. Only
   Date is faked, so leases and windows move while the gate's own Redis
   timeout still runs on real timers. IPs are from the documentation range. */

const fake = { client: null as RedisFake | null };
vi.mock('@/lib/redis', () => ({ redis: async () => fake.client }));

const gate = await import('@/lib/trace-gate');
const { enterGate, SLOTS, OPEN_SLOTS, PER_MINUTE, OPEN_PER_MINUTE, IP_PER_MINUTE, LEASE_MS, BREAKER_ERRORS, BREAKER_MS } = gate;

let ipN = 0;
/** a new client IP each call, so the per-IP limit stays out of the way */
const ip = () => `203.0.113.${ipN++ % 250}`;
const pass = async (lane: 'open' | 'gesture' | 'chat', from = ip()) => {
  const g = await enterGate(lane, from);
  if (!('pass' in g)) throw new Error(`refused: ${g.refused}`);
  return g.pass;
};
const refusal = async (lane: 'open' | 'gesture' | 'chat', from = ip()) => {
  const g = await enterGate(lane, from);
  return 'refused' in g ? g.refused : 'passed';
};

beforeEach(() => {
  fake.client = new RedisFake();
  vi.stubEnv('REDIS_URL', 'redis://redis.invalid:6379');
  vi.useFakeTimers({ toFake: ['Date'] });
  vi.setSystemTime(new Date('2026-10-23T21:00:05Z'));
});

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllEnvs();
});

describe('slots', () => {
  it(`lets ${SLOTS} traces on the node at once, then refuses as busy`, async () => {
    for (let i = 0; i < SLOTS; i++) await pass('gesture');
    expect(await refusal('gesture')).toBe('busy');
    expect(await refusal('chat')).toBe('busy');
  });

  it(`gives page loads with no gesture ${OPEN_SLOTS} of the slots, and gestures the rest`, async () => {
    for (let i = 0; i < OPEN_SLOTS; i++) await pass('open');
    expect(await refusal('open')).toBe('busy');
    await pass('gesture');
  });

  it("frees a slot when the node answers or fails, but not when our fetch gave up", async () => {
    const held = [];
    for (let i = 0; i < SLOTS; i++) held.push(await pass('gesture'));
    await held[0].done('answered');
    await held[1].done('node_error');
    await held[2].done('abandoned');
    await pass('gesture');
    await pass('gesture');
    // the abandoned trace may still run on the node: its slot waits for the lease
    expect(await refusal('gesture')).toBe('busy');
    vi.setSystemTime(Date.now() + LEASE_MS);
    await pass('gesture');
  });

  it('never frees a slot that a later trace holds after the lease ran out', async () => {
    const first = [];
    for (let i = 0; i < SLOTS; i++) first.push(await pass('gesture'));
    vi.setSystemTime(Date.now() + LEASE_MS + 1);
    const later = [];
    for (let i = 0; i < SLOTS; i++) later.push(await pass('gesture'));
    for (const p of first) await p.done('answered');
    expect(await refusal('gesture')).toBe('busy');
  });
});

describe('budgets', () => {
  it(`allows ${PER_MINUTE} new traces a minute, ${OPEN_PER_MINUTE} of them from page loads with no gesture`, async () => {
    for (let i = 0; i < OPEN_PER_MINUTE; i++) await (await pass('open')).done('answered');
    expect(await refusal('open')).toBe('rate');
    // the refused page loads did not spend the gesture share
    for (let i = OPEN_PER_MINUTE; i < PER_MINUTE; i++) await (await pass('gesture')).done('answered');
    expect(await refusal('gesture')).toBe('rate');
    vi.setSystemTime(Date.now() + 60_000);
    await pass('open');
  });

  it(`allows ${IP_PER_MINUTE} new traces a minute from one IP; the chat has no client IP`, async () => {
    const one = '198.51.100.7';
    for (let i = 0; i < IP_PER_MINUTE; i++) await (await pass('gesture', one)).done('answered');
    expect(await refusal('gesture', one)).toBe('rate');
    await (await pass('gesture')).done('answered');
    await (await pass('chat', one)).done('answered');
  });

  it(`stops all traces for a minute after ${BREAKER_ERRORS} node errors`, async () => {
    for (let i = 0; i < BREAKER_ERRORS; i++) await (await pass('gesture')).done('node_error');
    expect(await refusal('gesture')).toBe('breaker');
    expect(await refusal('chat')).toBe('breaker');
    vi.setSystemTime(Date.now() + BREAKER_MS);
    await pass('gesture');
  });
});

describe('without Redis', () => {
  it('refuses when Redis is down, slow, or not reachable on Vercel', async () => {
    fake.client!.down = true;
    expect(await refusal('gesture')).toBe('unavailable');
    fake.client!.down = false;
    fake.client!.delayMs = 400;
    expect(await refusal('chat')).toBe('unavailable');
    fake.client = null;
    vi.stubEnv('VERCEL', '1');
    expect(await refusal('gesture')).toBe('unavailable');
  });

  it('passes on a local dev server with no REDIS_URL', async () => {
    fake.client = null;
    vi.stubEnv('REDIS_URL', '');
    vi.stubEnv('VERCEL', '');
    for (let i = 0; i < SLOTS + 1; i++) await pass('open');
  });
});
