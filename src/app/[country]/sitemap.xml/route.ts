// app/[country]/sitemap.xml/route.ts
import { STATIC_PAGES, BASE_URL, LANGUAGES } from "@/lib/constants";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ country: string }> }
) {
  const { country } = await params;
  const today = new Date().toISOString().split("T")[0];

  const urls = LANGUAGES.flatMap((locale) =>
    STATIC_PAGES.map((page) => ({
      loc:
        page === ""
          ? `${BASE_URL}/${country}/${locale}`
          : `${BASE_URL}/${country}/${locale}/${page}`,
      lastmod: today,
    }))
  );

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
  </url>`
  )
  .join("\n")}
</urlset>`;

  return new NextResponse(xml, {
    headers: { "Content-Type": "application/xml" },
  });
}
