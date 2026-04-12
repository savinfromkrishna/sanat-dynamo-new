import { STATIC_PAGES, BASE_URL, LANGUAGES } from "@/lib/constants";
import { LOCALES, type Locale } from "@/lib/i18n";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/** SEO priority per page type — homepage highest, legal pages lowest */
const PAGE_PRIORITY: Record<string, number> = {
  "": 1.0,
  services: 0.9,
  industries: 0.9,
  "case-studies": 0.8,
  about: 0.7,
  contact: 0.8,
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
  privacy: "yearly",
  terms: "yearly",
};

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ country: string }> }
) {
  const { country } = await params;
  const today = new Date().toISOString().split("T")[0];

  const urls = LANGUAGES.flatMap((locale) =>
    STATIC_PAGES.map((page) => {
      const loc =
        page === ""
          ? `${BASE_URL}/${country}/${locale}`
          : `${BASE_URL}/${country}/${locale}/${page}`;

      // Build hreflang alternates for this URL across all locales
      const alternates = LANGUAGES.map((altLocale) => {
        const altLoc =
          page === ""
            ? `${BASE_URL}/${country}/${altLocale}`
            : `${BASE_URL}/${country}/${altLocale}/${page}`;
        const htmlLang = LOCALES[altLocale as Locale]?.htmlLang ?? altLocale;
        return `      <xhtml:link rel="alternate" hreflang="${htmlLang}" href="${altLoc}" />`;
      });
      // x-default
      const xDefault =
        page === ""
          ? `${BASE_URL}/in/en`
          : `${BASE_URL}/in/en/${page}`;
      alternates.push(
        `      <xhtml:link rel="alternate" hreflang="x-default" href="${xDefault}" />`
      );

      return {
        loc,
        lastmod: today,
        priority: PAGE_PRIORITY[page] ?? 0.5,
        changefreq: PAGE_CHANGEFREQ[page] ?? "monthly",
        alternates: alternates.join("\n"),
      };
    })
  );

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
      "Content-Type": "application/xml",
      "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=43200",
    },
  });
}
