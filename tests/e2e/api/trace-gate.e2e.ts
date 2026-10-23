import { describe, expect, test } from 'e2e';
import { appFetch } from './app-fetch';

// The trace route runs work on the shared C-Chain debug node. Crawlers get a 403 there (from the Vercel firewall rule
// on the deployed site, and from the route itself), and robots.txt asks them to stay off it. Chain 1 has no trace node here, so no request in this file reaches a node.
const HASH = `0x${'0'.repeat(63)}1`;
const CRAWLER = 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)';
const BROWSER =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36';

describe('trace route gate', { platforms: ['api'], tags: ['api', 'explorer'] }, () => {
  test('robots.txt disallows the trace and debug routes and nothing else', async ({ app }) => {
    const res = await appFetch(app, '/robots.txt');
    expect(res.status).toBe(200);
    const text = await res.text();
    expect(text).toMatch(/^Disallow: \/api\/trace\/$/m);
    expect(text).toMatch(/^Disallow: \/api\/debug-rpc$/m);
    expect(text).not.toMatch(/^Disallow: \/$/m);
    expect(text).not.toMatch(/^Allow:/m);
    expect(text).not.toMatch(/^Disallow: \/api\/og/m);
  });

  test('a crawler gets a 403 on the trace route', async ({ app }) => {
    const res = await appFetch(app, `/api/trace/1/${HASH}`, { headers: { 'user-agent': CRAWLER } });
    expect(res.status).toBe(403);
  });

  test('a browser gets the route answer: no trace node for chain 1', async ({ app }) => {
    const res = await appFetch(app, `/api/trace/1/${HASH}`, { headers: { 'user-agent': BROWSER } });
    expect(res.status).toBe(404);
    expect(res.headers.get('cache-control') ?? '').not.toContain('s-maxage');
  });
});
