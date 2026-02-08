// app/[country]/[locale]/sitemap.xml/route.ts
import { STATIC_PAGES, BASE_URL, PRODUCT_HIERARCHY } from '@/lib/constants';
import { NextResponse } from 'next/server';

interface Params {
    country: string;
    locale: string;
}

export async function GET(request: Request, { params }: { params: Params }) {
    const { country, locale = 'en' } = params;

    const staticUrls = STATIC_PAGES.map(page => {
        const fullPath = page === "" ? `${BASE_URL}/${country}/${locale}` : `${BASE_URL}/${country}/${locale}/${page}`; // Handle root path correctly
        return {
            loc: fullPath,
            lastmod: new Date().toISOString().split('T')[0],
        };
    });

    const productUrls = Object.entries(PRODUCT_HIERARCHY).flatMap(([category, products]) => {
        return products.map(product => ({
            loc: `${BASE_URL}/${country}/${locale}/products/${category}/${product}`,
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

    return new NextResponse(xml, { headers: { 'Content-Type': 'application/xml' } });
}