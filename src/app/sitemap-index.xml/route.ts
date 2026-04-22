import { BASE_URL, COUNTRIES } from "@/lib/constants";
import { BLOG_POSTS } from "@/lib/blogs";
import { NextResponse } from "next/server";

// Revalidate at most once per day — same rationale as the per-country sitemap.
export const revalidate = 86400;

/**
 * Resolve the public base URL from the incoming request.
 *
 * Uses the `Host` header (forwarded by Vercel/proxies) + protocol detection
 * so that:
 *   - localhost:3000 requests return http://localhost:3000 URLs
 *   - www.savingroup.in requests return https://www.savingroup.in URLs
 *   - Falls back to BASE_URL constant if headers are unavailable
 *
 * This matters for SEO: Google rejects sitemaps where the <loc> URLs don't
 * match the host the sitemap was served from (cross-submission restriction).
 */
function resolveBaseUrl(request: Request): string {
  const host =
    request.headers.get("x-forwarded-host") ??
    request.headers.get("host");
  if (!host) return BASE_URL;

  const proto =
    request.headers.get("x-forwarded-proto") ??
    (host.startsWith("localhost") || host.startsWith("127.0.0.1")
      ? "http"
      : "https");

  return `${proto}://${host}`;
}

export async function GET(request: Request) {
  const base = resolveBaseUrl(request);

  // Real freshness signal: the most recent blog post timestamp. Static pages
  // change rarely; blog posts drive actual sitemap churn. Previously this was
  // `new Date()` on every render, which Google's crawler learns to ignore.
  const latestBlogDate =
    BLOG_POSTS.map((p) => p.updatedAt ?? p.publishedAt)
      .sort()
      .pop() ?? "2026-01-01";

  const sitemaps = COUNTRIES.map((country: string) => ({
    loc: `${base}/${country}/sitemap.xml`,
    lastmod: latestBlogDate,
  }));

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps
  .map(
    (s) => `  <sitemap>
    <loc>${s.loc}</loc>
    <lastmod>${s.lastmod}</lastmod>
  </sitemap>`
  )
  .join("\n")}
</sitemapindex>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=43200",
    },
  });
}
