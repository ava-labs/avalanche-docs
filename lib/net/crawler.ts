import { userAgentFromString } from "next/server";

/* Crawlers, by user agent. Next.js knows the search engines and the link
   previewers; this adds the crawlers that render pages and that Next.js
   does not name. A scraper that sends a browser's agent passes: the
   routes that need it hold those with budgets. An empty agent passes too,
   since no crawler we know sends none. */

const MORE = /GoogleOther|Bytespider|PetalBot|ClaudeBot|Claude-SearchBot|CCBot|Amazonbot|OAI-SearchBot|PerplexityBot|meta-externalagent|AhrefsBot|SemrushBot|MJ12bot|DotBot|YouBot|Querit/i;

export function isCrawler(userAgent: string | null | undefined): boolean {
  if (!userAgent) return false;
  return userAgentFromString(userAgent).isBot || MORE.test(userAgent);
}
