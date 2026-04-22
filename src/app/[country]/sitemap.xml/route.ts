import { STATIC_PAGES, BASE_URL, LANGUAGES, TARGET_COUNTRIES } from "@/lib/constants";
import { LOCALES, type Locale } from "@/lib/i18n";
import { NextResponse } from "next/server";
import { BLOG_POSTS, BLOG_CATEGORIES } from "@/lib/blogs";

// Revalidate at most once per day — Googlebot doesn't need minute-fresh sitemaps,
// and the previous `force-dynamic` was regenerating with a new `lastmod` on every
// crawl, which Google downweights as an unreliable freshness signal.
export const revalidate = 86400;

/**
 * Static timestamps for page-type `lastmod` values. These are bumped manually
 * when the content of the corresponding page meaningfully changes. Previously
 * every page got `new Date()` on every request, which Google flags as spam.
 *
 * Format: ISO date (YYYY-MM-DD).
 */
const STATIC_PAGE_LASTMOD: Record<string, string> = {
  "": "2026-04-15",           // home
  services: "2026-04-10",
  industries: "2026-04-08",
  "case-studies": "2026-04-12",
  about: "2026-03-20",
  contact: "2026-03-20",
  privacy: "2026-01-15",
  terms: "2026-01-15",
  blogs: "2026-04-18",         // index bumped when new posts land
};

/**
 * Resolve the public base URL from the incoming request.
 * Reads `x-forwarded-host`/`host` + `x-forwarded-proto` so that the sitemap's
 * <loc> URLs always match the host the sitemap was served from.
 *
 * Google rejects sitemaps containing cross-domain URLs ("General HTTP error").
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

/** SEO priority per page type — homepage highest, legal pages lowest */
const PAGE_PRIORITY: Record<string, number> = {
  "": 1.0,
  services: 0.9,
  industries: 0.9,
  "case-studies": 0.8,
  about: 0.7,
  contact: 0.8,
  blogs: 0.9,
  privacy: 0.2,
  terms: 0.2,
};

const PAGE_CHANGEFREQ: Record<string, string> = {
  "": "weekly",
  services: "monthly",
  industries: "monthly",
  "case-studies": "weekly",
  about: "monthly",
  contact: "monthly",
  blogs: "weekly",
  privacy: "yearly",
  terms: "yearly",
};

const BLOG_POST_PRIORITY = 0.7;
const BLOG_CATEGORY_PRIORITY = 0.75;
const BLOG_CHANGEFREQ = "monthly";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ country: string }> }
) {
  const { country } = await params;

  // Only our target markets are indexed. Non-target country URLs still resolve
  // (middleware redirects them), but we never ship their sitemap — that's the
  // whole point of TARGET_COUNTRIES.
  if (!(TARGET_COUNTRIES as readonly string[]).includes(country.toLowerCase())) {
    return new NextResponse("Not Found", { status: 404 });
  }

  const base = resolveBaseUrl(request);

  // Latest blog publication date — used as category-page `lastmod` so category
  // freshness actually tracks when new posts land, not when the sitemap renders.
  const latestBlogDate =
    BLOG_POSTS.map((p) => p.updatedAt ?? p.publishedAt)
      .sort()
      .pop() ?? "2026-01-01";

  // Static pages (home, services, industries, case-studies, about, contact, legal)
  // plus the blog index page (hardcoded here because STATIC_PAGES lives in
  // `lib/constants` and we don't want to touch it from here).
  const pagesWithBlogIndex = [...STATIC_PAGES, "blogs"];

  const staticUrls = LANGUAGES.flatMap((locale) =>
    pagesWithBlogIndex.map((page) => {
      const loc =
        page === ""
          ? `${base}/${country}/${locale}`
          : `${base}/${country}/${locale}/${page}`;

      const alternates = LANGUAGES.map((altLocale) => {
        const altLoc =
          page === ""
            ? `${base}/${country}/${altLocale}`
            : `${base}/${country}/${altLocale}/${page}`;
        const htmlLang = LOCALES[altLocale as Locale]?.htmlLang ?? altLocale;
        return `      <xhtml:link rel="alternate" hreflang="${htmlLang}" href="${altLoc}" />`;
      });
      const xDefault =
        page === "" ? `${base}/in/en` : `${base}/in/en/${page}`;
      alternates.push(
        `      <xhtml:link rel="alternate" hreflang="x-default" href="${xDefault}" />`
      );

      return {
        loc,
        lastmod: STATIC_PAGE_LASTMOD[page] ?? "2026-01-01",
        priority: PAGE_PRIORITY[page] ?? 0.5,
        changefreq: PAGE_CHANGEFREQ[page] ?? "monthly",
        alternates: alternates.join("\n"),
      };
    })
  );

  // Individual blog posts — indexed per locale with hreflang alternates
  const blogPostUrls = LANGUAGES.flatMap((locale) =>
    BLOG_POSTS.map((post) => {
      const loc = `${base}/${country}/${locale}/blogs/${post.slug}`;
      const alternates = LANGUAGES.map((altLocale) => {
        const altLoc = `${base}/${country}/${altLocale}/blogs/${post.slug}`;
        const htmlLang = LOCALES[altLocale as Locale]?.htmlLang ?? altLocale;
        return `      <xhtml:link rel="alternate" hreflang="${htmlLang}" href="${altLoc}" />`;
      });
      alternates.push(
        `      <xhtml:link rel="alternate" hreflang="x-default" href="${base}/in/en/blogs/${post.slug}" />`
      );
      return {
        loc,
        lastmod: post.updatedAt ?? post.publishedAt,
        priority: BLOG_POST_PRIORITY,
        changefreq: BLOG_CHANGEFREQ,
        alternates: alternates.join("\n"),
      };
    })
  );

  // Blog category pages
  const categoryKeys = BLOG_CATEGORIES
    .filter((c) => c.key !== "all")
    .map((c) => c.key);
  const blogCategoryUrls = LANGUAGES.flatMap((locale) =>
    categoryKeys.map((catKey) => {
      const loc = `${base}/${country}/${locale}/blogs/category/${catKey}`;
      const alternates = LANGUAGES.map((altLocale) => {
        const altLoc = `${base}/${country}/${altLocale}/blogs/category/${catKey}`;
        const htmlLang = LOCALES[altLocale as Locale]?.htmlLang ?? altLocale;
        return `      <xhtml:link rel="alternate" hreflang="${htmlLang}" href="${altLoc}" />`;
      });
      alternates.push(
        `      <xhtml:link rel="alternate" hreflang="x-default" href="${base}/in/en/blogs/category/${catKey}" />`
      );
      return {
        loc,
        lastmod: latestBlogDate,
        priority: BLOG_CATEGORY_PRIORITY,
        changefreq: BLOG_CHANGEFREQ,
        alternates: alternates.join("\n"),
      };
    })
  );

  const urls = [...staticUrls, ...blogCategoryUrls, ...blogPostUrls];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
${u.alternates}
  </url>`
  )
  .join("\n")}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=43200",
    },
  });
}
