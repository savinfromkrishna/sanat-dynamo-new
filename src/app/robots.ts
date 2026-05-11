import { MetadataRoute } from "next";
import { BASE_URL } from "@/lib/constants";

/**
 * Site robots policy.
 *
 *  - Allow the entire public tree. Non-indexable country URLs (`/us/*`,
 *    `/de/*`, ...) are kept *crawlable* on purpose — they ship `noindex`
 *    metadata, and Google must be allowed to fetch the page to see that tag.
 *    Disallowing them here would freeze the existing index entries.
 *  - Disallow API + internal Next.js paths (no SEO value, leak surface area).
 *  - Block the major AI-training crawlers. This site's content is the moat;
 *    we don't want it scraped into training corpora. Live-browsing UAs
 *    (ChatGPT-User, Google search itself) are NOT blocked — those drive
 *    referral traffic.
 *
 * The sitemap pointer fans out via `/sitemap-index.xml` → per-country
 * `/in/sitemap.xml`, which currently emits the home + 8 static pages +
 * blog index/posts/categories + 5 industries + 11 cities × (overview +
 * services + process + case-studies + contact + about + blog) sub-pages.
 */
export default function robots(): MetadataRoute.Robots {
  // Crawlers that scrape content for LLM training. Live-browsing bots
  // (ChatGPT-User, PerplexityBot, etc.) are intentionally left allowed.
  const aiTrainingBots = [
    "GPTBot",          // OpenAI training
    "CCBot",           // Common Crawl (feeds most open LLM datasets)
    "Google-Extended", // Gemini / Vertex AI training opt-out
    "ClaudeBot",       // Anthropic training crawler
    "anthropic-ai",    // legacy Anthropic UA
    "Bytespider",      // ByteDance / Doubao training
  ];

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
      ...aiTrainingBots.map((userAgent) => ({
        userAgent,
        disallow: "/",
      })),
    ],
    sitemap: `${BASE_URL}/sitemap-index.xml`,
    host: BASE_URL,
  };
}
