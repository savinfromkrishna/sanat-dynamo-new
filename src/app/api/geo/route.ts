// app/api/geo/route.ts

import { geolocation, ipAddress } from '@vercel/functions';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

const FALLBACK_IP = '106.219.70.174';

interface GeoResult {
  ip: string;
  city: string | null;
  region: string | null;
  country: string | null;
  latitude: number | null;
  longitude: number | null;
  timezone: string | null;
  isp: string | null;
  error?: string;
}

const DEFAULT_RESULT: GeoResult = {
  ip: FALLBACK_IP,
  city: null,
  region: null,
  country: null,
  latitude: null,
  longitude: null,
  timezone: null,
  isp: null,
};

/**
 * Normalize different API responses into consistent shape
 */
function normalizeGeoData(
  source: string,
  data: any,
  extra: Partial<GeoResult> = {},
): GeoResult {
  const base: GeoResult = { ...DEFAULT_RESULT, ...extra };

  if (source === 'vercel') {
    return {
      ...base,
      ip: data.ip,
      city: data.city ?? null,
      region: data.countryRegion ?? data.region ?? null, // countryRegion is more specific (state)
      country: data.country ?? null,
      latitude: data.latitude ? Number(data.latitude) : null,
      longitude: data.longitude ? Number(data.longitude) : null,
      // timezone comes from header, not in geolocation()
      isp: null,
    };
  }

  if (source === 'ip-api') {
    return {
      ...base,
      ip: data.query ?? data.ip ?? base.ip,
      city: data.city ?? null,
      region: data.regionName ?? null,
      country: data.countryCode ?? null,
      latitude: data.lat ?? null,
      longitude: data.lon ?? null,
      timezone: data.timezone ?? null,
      isp: data.isp ?? null,
    };
  }

  if (source === 'ipinfo') {
    const [latStr, lonStr] = (data.loc ?? '').split(',');
    return {
      ...base,
      ip: data.ip ?? base.ip,
      city: data.city ?? null,
      region: data.region ?? null,
      country: data.country ?? null,
      latitude: latStr ? Number(latStr) : null,
      longitude: lonStr ? Number(lonStr) : null,
      timezone: data.timezone ?? null,
      isp: data.org ?? data.company?.name ?? null,
    };
  }

  if (source === 'ipwhois') {
    return {
      ...base,
      ip: data.ip ?? base.ip,
      city: data.city ?? null,
      region: data.region ?? null,
      country: data.country_code ?? data.country ?? null,
      latitude: data.latitude ?? null,
      longitude: data.longitude ?? null,
      timezone: data.timezone?.name ?? null,
      isp: data.asn?.org ?? data.connection?.isp ?? null,
    };
  }

  return base;
}

/**
 * Try fetching from external APIs in fallback order
 */
async function fetchFallbackGeo(ip: string, lang = 'en'): Promise<GeoResult> {
  // 1. ip-api.com
  try {
    let url = `http://ip-api.com/json/${ip}`;
    if (lang !== 'en') url += `?lang=${lang}`;

    const res = await fetch(url, {
      headers: { 'User-Agent': 'NextJS-Geo-Fallback' },
      cache: 'no-store',
    });

    if (res.ok) {
      const data = await res.json();
      if (data.status !== 'fail') {
        return normalizeGeoData('ip-api', data);
      }
    }
  } catch {}

  // 2. ipinfo.io (free tier)
  try {
    const res = await fetch(`https://ipinfo.io/${ip}/json`, {
      headers: { 'User-Agent': 'NextJS-Geo-Fallback' },
      cache: 'no-store',
    });

    if (res.ok) {
      const data = await res.json();
      if (!data.error) {
        return normalizeGeoData('ipinfo', data);
      }
    }
  } catch {}

  // 3. ipwho.is
  try {
    const res = await fetch(`https://ipwho.is/${ip}`, {
      headers: { 'User-Agent': 'NextJS-Geo-Fallback' },
      cache: 'no-store',
    });

    if (res.ok) {
      const data = await res.json();
      if (data.success) {
        return normalizeGeoData('ipwhois', data);
      }
    }
  } catch {}

  return { ...DEFAULT_RESULT, ip };
}

export async function GET(req: NextRequest) {
  try {
    const queryLang = req.nextUrl.searchParams.get('lang') || 'en';

    // ── Primary: Vercel ────────────────────────────────────────
    const vercelGeo = geolocation(req);
    const vercelIP = ipAddress(req) || FALLBACK_IP;

    const hasVercelGeo = !!vercelGeo.country && vercelGeo.country !== 'undefined';

    if (hasVercelGeo) {
      const timezone = req.headers.get('x-vercel-ip-timezone') ?? null;

      const result = normalizeGeoData('vercel', {
        ip: vercelIP,
        ...vercelGeo,
      }, { timezone });

      return NextResponse.json({
        ...result,
        source: 'vercel',
        isLocalDev: false,
      });
    }

    // ── Fallbacks ──────────────────────────────────────────────
    console.log(`Vercel geo missing → fallback for IP: ${vercelIP}`);

    const fallbackResult = await fetchFallbackGeo(vercelIP, queryLang);

    return NextResponse.json({
      ...fallbackResult,
      source: fallbackResult.error ? 'fallback-failed' : 'fallback',
      isLocalDev: true,
    });
  } catch (err: any) {
    console.error('Geo endpoint error:', err);

    return NextResponse.json(
      {
        ...DEFAULT_RESULT,
        error: err.message || 'Internal error',
      },
      { status: 500 }
    );
  }
}