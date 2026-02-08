// app/[country]/sitemap.xml/route.ts
import { STATIC_PAGES, BASE_URL, PRODUCT_HIERARCHY } from '@/lib/constants';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ country: string }> }   // ← only country here
) {
  const { country } = await params;                     // ← await it

  // locale is NOT available in this route → remove or hardcode/default it
  const locale = 'en';  // or get from headers, cookie, etc. if needed

  const staticUrls = STATIC_PAGES.map(page => {
    const fullPath =
      page === ""
        ? `${BASE_URL}/${country}/${locale}`
        : `${BASE_URL}/${country}/${locale}/${page}`;
    return {
      loc: fullPath,
      lastmod: new Date().toISOString().split('T')[0],
    };
  });

  const productUrls = Object.entries(PRODUCT_HIERARCHY).flatMap(([category, products]) => {
    return products.map(product => ({
      loc: `${BASE_URL}/${country}/${locale}/${category}/${product}`,
      lastmod: new Date().toISOString().split('T')[0],
    }));
  });

  const allUrls = [...staticUrls, ...productUrls];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allUrls.map(url => `
    <url>
      <loc>${url.loc}</loc>
      <lastmod>${url.lastmod}</lastmod>
    </url>
  `).join('\n')}
</urlset>`;

  return new NextResponse(xml, {
    headers: { 'Content-Type': 'application/xml' },
  });
}

export const dynamic = 'force-dynamic';  // good for sitemaps