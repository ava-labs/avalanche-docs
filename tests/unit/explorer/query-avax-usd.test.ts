import { describe, expect, it } from 'vitest';

import { AVAX_USD_PROXY, avaxUsdNotes, avaxUsdWith } from '@/lib/explorer-query/avax-usd';
import { guardSql } from '@/lib/explorer-query/guard';
import { collapseMacros, expandMacros } from '@/lib/explorer-query/macros';
import { systemPrompt } from '@/lib/explorer-query/prompt';
import { sqlWindow } from '@/lib/explorer-query/scope';
import { withSources } from '@/lib/explorer-query/sources';

const C = 43114;
const since = 'toStartOfDay(now()) - INTERVAL 7 DAY';
const FEES = `, f AS (SELECT toStartOfHour(block_time) AS h, sum(toFloat64(gas_used) * gas_price) / 1e18 AS fee FROM raw_txs WHERE chain_id = ${C} AND block_time >= ${since} GROUP BY h) SELECT toDate(f.h) AS t, round(sum(f.fee * nullIf(p.price, 0)), 2) AS fees_usd FROM f LEFT JOIN avax_usd AS p ON f.h = p.hour GROUP BY t ORDER BY t`;
const prompt = (chainId: number, dex = false) => systemPrompt({ chainId, chainName: 'x', symbol: 'AVAX', schema: '', coverage: null, dex });

describe('$AVAXUSD', () => {
  it("writes the hourly Chainlink series out from the window's start, with an end when it has one", () => {
    const x = expandMacros(`$AVAXUSD(${since})${FEES}`, C);
    expect(x.ok && x.sql).toBe(avaxUsdWith(since) + FEES);
    const sql = x.ok ? x.sql : '';
    expect(sql).toMatch(/^WITH avax_usd AS \(SELECT hour, price FROM \(/);
    expect(sql).toContain(`block_time >= toStartOfHour(toDateTime(${since})) - INTERVAL 1 DAY GROUP BY hour`);
    expect(sql).toContain(`WHERE hour >= toStartOfHour(toDateTime(${since})))`);
    expect(sql).toContain('WITH FILL STEP toIntervalHour(1) INTERPOLATE (price)');
    // the first aggregator before the hour the second took over, the second after
    expect(sql).toContain("if(block_time < toDateTime('2024-09-30 09:00:00'), address = unhex('9450a29ef091b625e976ce66f2a5818e20791999'), address = unhex('cfbfe648ba88bf7d9776d970417a0b26c315feb4'))");
    expect(sql).not.toContain('block_time < toStartOfDay');
    const day = expandMacros("$AVAXUSD('2025-07-18', '2025-07-19') SELECT hour, price FROM avax_usd ORDER BY hour", C);
    expect(day.ok && day.sql).toContain("block_time >= toStartOfHour(toDateTime(toDateTime('2025-07-18'))) - INTERVAL 1 DAY AND block_time < toDateTime('2025-07-19') GROUP BY hour");
  });

  it('goes back to the shorthand the writer typed, and refuses a slug or no start', () => {
    const typed = `$AVAXUSD(${since})${FEES}`;
    const x = expandMacros(typed, C);
    expect(x.ok && collapseMacros(x.sql, C)).toBe(typed);
    const r = (sql: string) => {
      const y = expandMacros(sql, C);
      return y.ok ? '' : y.error;
    };
    expect(r(`$AVAXUSD(${since}, 'pharaoh') SELECT 1 FROM avax_usd`)).toMatch(/^\$AVAXUSD takes no slug: /);
    expect(r('$AVAXUSD() SELECT 1 FROM avax_usd')).toMatch(/^\$AVAXUSD takes the window's start first/);
    expect(r(`$PRICES(${since}) SELECT 1 FROM lpx WHERE 1 = $AVAXUSD(now())`)).toMatch(/^the shorthand stands for the query's WITH, once, at its start: .*\$AVAXUSD\(start\) or \$AVAXUSD\(start, end\) for AVAX in USD/);
  });

  it('passes the guard, and its window is the shorthand\'s', () => {
    const g = guardSql(`$AVAXUSD(${since})${FEES}`, C);
    expect(g.ok, g.ok ? '' : g.error).toBe(true);
    const now = Date.UTC(2026, 9, 23, 12);
    expect(sqlWindow(`$AVAXUSD(${since})${FEES}`, now)).toMatchObject({ start: Date.UTC(2026, 9, 16), open: true });
  });

  it('is told on the mainnet C-Chain only, beside the DEX chapter too', () => {
    for (const p of [prompt(C), prompt(C, true)]) {
      expect(p).toContain('- Dollars: AVAX has a USD price.');
      expect(p).toContain('Never answer kind "none" for want of an AVAX price');
      expect(p).toMatch(/\n\$AVAXUSD\(toStartOfDay\(now\(\)\) - INTERVAL 7 DAY\), f AS \(SELECT/);
    }
    for (const chainId of [43113, 432204]) expect(prompt(chainId)).not.toContain('AVAXUSD');
  });

  it('runs the worked example through the guard as written', () => {
    const line = prompt(C).split('\n').find((l) => l.startsWith('$AVAXUSD('))!;
    const g = guardSql(line, C);
    expect(g.ok, g.ok ? '' : g.error).toBe(true);
  });
});

describe('the AVAX/USD source line', () => {
  it('names the feed on an answer that reads it, typed or written out, and on no other', async () => {
    const typed = `$AVAXUSD(${since})${FEES}`;
    const out = expandMacros(typed, C);
    for (const sql of [typed, out.ok ? out.sql : '']) {
      const [note] = avaxUsdNotes(sql, C);
      expect(note.text).toContain("Chainlink's AVAX/USD price feed");
      expect(note.text.toLowerCase()).toContain(AVAX_USD_PROXY);
      expect(note.text).toContain('July 14, 2021');
      expect(note.label).toBe('');
    }
    expect(avaxUsdNotes(`SELECT count() FROM raw_txs WHERE chain_id = ${C} AND block_time >= ${since}`, C)).toEqual([]);
    expect(avaxUsdNotes(typed, 43113)).toEqual([]);
    const { sources } = await withSources(out.ok ? out.sql : '', C);
    expect(sources.map((s) => s.table)).toEqual(['avax_usd']);
  });
});
