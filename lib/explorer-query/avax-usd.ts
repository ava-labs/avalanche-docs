/* The USD price of AVAX on the mainnet C-Chain, for a query that values
   fees, gas or any AVAX amount in dollars. It reads Chainlink's AVAX/USD
   feed from its own AnswerUpdated logs in raw_logs, so it needs no API
   and no key, and it covers every hour since the feed went live on
   2021-07-14. Checked 2026-10-23 through stats-api /v2/query:
   - the proxy 0x0A77230d17318075983913bC2145DB16C7366156 says "AVAX / USD"
     with 8 decimals, and names two aggregators (phaseAggregators 1 and 2);
   - every hour from 2022 on has an update but 5 (gaps of up to 5 h), so the
     series fills an hour with no update from the hour before;
   - the hourly mean was within 0.15 to 0.37% (median) of Binance AVAXUSDT
     in four 41-day windows from 2021 to 2026;
   - the Uniswap v3 WAVAX/USDC median that $PRICES and $DEX read sat at
     $20.00 for 15 hours on 2025-07-18, when this feed and Binance read about
     $24.4. That pool also starts only on 2023-07-12. */

import type { SourceNote } from "./types";

export const AVAX_USD_CHAIN_ID = 43114;
/** the feed's proxy: what a contract that reads AVAX/USD calls */
export const AVAX_USD_PROXY = "0x0a77230d17318075983913bc2145db16c7366156";
/** the aggregators behind the proxy, by phase, and the hour the second took over (the first logged its last regular
    update at 2024-09-30 08:00:19; the second ran beside it from 2024-08-28) */
const PHASE_1 = "9450a29ef091b625e976ce66f2a5818e20791999";
const PHASE_2 = "cfbfe648ba88bf7d9776d970417a0b26c315feb4";
const PHASE_2_FROM = "2024-09-30 09:00:00";
/** AnswerUpdated(int256 indexed current, uint256 indexed roundId, uint256 updatedAt) */
const ANSWER_UPDATED = "0559884fd3a460db3073b7fc896cc77986f16e378210ded43186175bf646fc5f";
/** the feed's first answer, 2021-07-14 20:47:32 UTC */
export const AVAX_USD_FIRST = Date.UTC(2021, 6, 14, 20, 47, 32);

/** the WITH $AVAXUSD stands for: avax_usd(hour, price), one row per hour from the window's start, each the mean of the
    hour's answers, an hour with none filled from the hour before. It reads a day before the start, so the first hour
    has an answer to fill from */
export function avaxUsdWith(start: string, end?: string): string {
  const answers =
    `SELECT toStartOfHour(block_time) AS hour, avg(toFloat64(reinterpretAsInt256(reverse(topic1))) / 1e8) AS price FROM raw_logs ` +
    `WHERE chain_id = ${AVAX_USD_CHAIN_ID} AND topic0 = unhex('${ANSWER_UPDATED}') ` +
    `AND if(block_time < toDateTime('${PHASE_2_FROM}'), address = unhex('${PHASE_1}'), address = unhex('${PHASE_2}')) ` +
    `AND block_time >= toStartOfHour(toDateTime(${start})) - INTERVAL 1 DAY${end ? ` AND block_time < ${end}` : ""} ` +
    `GROUP BY hour ORDER BY hour WITH FILL STEP toIntervalHour(1) INTERPOLATE (price)`;
  return `WITH avax_usd AS (SELECT hour, price FROM (${answers}) WHERE hour >= toStartOfHour(toDateTime(${start})))`;
}

/** whether a query reads the feed: by the shorthand, or by the WITH it stands for */
const readsFeed = (sql: string) => /\$AVAXUSD\b/.test(sql) || sql.toLowerCase().includes(PHASE_2);

/** the line that says where an answer's dollar figures come from, for a query that reads the feed */
export function avaxUsdNotes(sql: string, chainId: number, now = Date.now()): SourceNote[] {
  if (chainId !== AVAX_USD_CHAIN_ID || !readsFeed(sql)) return [];
  const text =
    "AVAX is valued in USD at the hourly mean of Chainlink's AVAX/USD price feed on the C-Chain (0x0A77230d17318075983913bC2145DB16C7366156), read from its own on-chain updates. The feed starts on July 14, 2021, so earlier hours have no USD value.";
  return [{ table: "avax_usd", label: "", at: now, total: 0, known: 0, text }];
}

/** the prompt's rule for dollar figures, on the mainnet C-Chain */
export const avaxUsdRule = () =>
  `- Dollars: AVAX has a USD price. A question about fees, gas or any AVAX amount in USD (dollars, $1 worth, what it cost) opens with $AVAXUSD(start) or $AVAXUSD(start, end), the start and end of the window the query reads. Our server writes it out as avax_usd: one row per hour from start, hour and price (the USD price of 1 AVAX, the mean that hour of Chainlink's AVAX/USD feed on this chain; an hour with no update keeps the price before). Sum each hour's AVAX in a WITH of your own, then LEFT JOIN avax_usd AS p ON f.h = p.hour and multiply by nullIf(p.price, 0): an hour before the feed began (2021-07-14) joins no row, and its USD figure stays NULL. Its logs are few, so it keeps the window of the query it prices, up to raw_txs's 365 days. Name a dollar column _usd and round it to cents; a count per dollar divides by nullIf(the USD sum, 0). Never answer kind "none" for want of an AVAX price, and never price AVAX from swaps in a query of your own. A query that opens with $DEX, $LEND or $PRICES values its rows with their own usd and px. The page says where the price comes from; the note need not.`;

/** the worked example: fees burned per day in AVAX and USD, and the transactions it took to burn $1 */
export const avaxUsdExample = (chainId: number, symbol: string) => {
  const since = "toStartOfDay(now()) - INTERVAL 7 DAY";
  const sym = symbol.toLowerCase();
  return `Fees burned per day in ${symbol} and USD over the last 7 days, and the transactions it took to burn $1:
$AVAXUSD(${since}), f AS (SELECT toStartOfHour(block_time) AS h, sum(toFloat64(gas_used) * gas_price) / 1e18 AS fee, count() AS n FROM raw_txs WHERE chain_id = ${chainId} AND block_time >= ${since} GROUP BY h) SELECT toDate(f.h) AS t, sum(f.fee) AS fees_${sym}, round(sum(f.fee * nullIf(p.price, 0)), 2) AS fees_usd, sum(f.n) AS txs, round(sum(f.n) / nullIf(sum(f.fee * nullIf(p.price, 0)), 0), 1) AS txs_per_usd, round(sum(f.fee * nullIf(p.price, 0)) / nullIf(sum(f.fee), 0), 4) AS avax_price_usd FROM f LEFT JOIN avax_usd AS p ON f.h = p.hour GROUP BY t ORDER BY t

`;
};
