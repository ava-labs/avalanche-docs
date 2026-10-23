import type { MetadataRoute } from "next";

/* Crawlers may read every page. They may not call the routes that run work
   on the shared C-Chain debug node: a crawler that renders a tx page would
   otherwise trace that tx (app/api/trace). The tx pages stay crawlable, and
   the trace is client-side content, so search results do not change. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/trace/", "/api/debug-rpc"] },
  };
}
