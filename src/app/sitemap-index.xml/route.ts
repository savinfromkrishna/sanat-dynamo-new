// app/sitemap.xml/route.ts  (or similar path with no [brackets])
import { BASE_URL, COUNTRIES } from '@/lib/constants';
import { NextResponse } from 'next/server';

export async function GET() {
  const sitemaps = COUNTRIES.map((country: string) => ({   // ← type string, not any
    loc: `${BASE_URL}/${country}/sitemap.xml`,
    lastmod: new Date().toISOString().split('T')[0],
  }));

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${sitemaps.map(s => `
    <sitemap>
      <loc>${s.loc}</loc>
      <lastmod>${s.lastmod}</lastmod>
    </sitemap>
  `).join('\n')}
</sitemapindex>`;

  return new NextResponse(xml, { headers: { 'Content-Type': 'application/xml' } });
}