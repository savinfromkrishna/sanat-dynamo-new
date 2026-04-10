import { headers } from "next/headers";
import { unstable_cache } from "next/cache";

/* -------------------------------------------------------------------------- */
/*                          Country and city lookups                          */
/* -------------------------------------------------------------------------- */

const COUNTRY_NAMES: Record<string, string> = {
  in: "India",
  us: "United States",
  gb: "United Kingdom",
  ae: "United Arab Emirates",
  sa: "Saudi Arabia",
  ca: "Canada",
  au: "Australia",
  sg: "Singapore",
  de: "Germany",
  fr: "France",
  es: "Spain",
  it: "Italy",
  nl: "Netherlands",
  jp: "Japan",
  kr: "South Korea",
  cn: "China",
  hk: "Hong Kong",
  my: "Malaysia",
  th: "Thailand",
  id: "Indonesia",
  ph: "Philippines",
  vn: "Vietnam",
  bd: "Bangladesh",
  pk: "Pakistan",
  lk: "Sri Lanka",
  np: "Nepal",
  za: "South Africa",
  ng: "Nigeria",
  ke: "Kenya",
  eg: "Egypt",
  br: "Brazil",
  mx: "Mexico",
  ar: "Argentina",
  cl: "Chile",
  co: "Colombia",
  pe: "Peru",
};

/** Default city per country when geo headers are missing. */
const DEFAULT_CITIES: Record<string, string> = {
  in: "Bangalore",
  us: "New York",
  gb: "London",
  ae: "Dubai",
  sa: "Riyadh",
  ca: "Toronto",
  au: "Sydney",
  sg: "Singapore",
  de: "Berlin",
  fr: "Paris",
  es: "Madrid",
  it: "Milan",
  nl: "Amsterdam",
  jp: "Tokyo",
  kr: "Seoul",
  cn: "Shanghai",
  hk: "Hong Kong",
  my: "Kuala Lumpur",
  th: "Bangkok",
  id: "Jakarta",
  ph: "Manila",
  vn: "Ho Chi Minh City",
  bd: "Dhaka",
  pk: "Karachi",
  lk: "Colombo",
  np: "Kathmandu",
  za: "Johannesburg",
  ng: "Lagos",
  ke: "Nairobi",
  eg: "Cairo",
  br: "São Paulo",
  mx: "Mexico City",
};

/** Default state (admin region) per country when geo headers are missing. */
const DEFAULT_STATES: Record<string, string> = {
  in: "Karnataka",
  us: "New York",
  gb: "England",
  ae: "Dubai",
  sa: "Riyadh Province",
  ca: "Ontario",
  au: "New South Wales",
  sg: "Singapore",
  de: "Berlin",
  fr: "Île-de-France",
  es: "Community of Madrid",
  it: "Lombardy",
  nl: "North Holland",
  jp: "Tokyo",
  kr: "Seoul",
  cn: "Shanghai",
  hk: "Hong Kong",
  my: "Kuala Lumpur",
  th: "Bangkok",
  id: "Jakarta",
  ph: "Metro Manila",
  vn: "Ho Chi Minh City",
  bd: "Dhaka",
  pk: "Sindh",
  lk: "Western Province",
  np: "Bagmati",
  za: "Gauteng",
  ng: "Lagos",
  ke: "Nairobi County",
  eg: "Cairo Governorate",
  br: "São Paulo",
  mx: "Mexico City",
};

/** Indian Tier-1 city list — used by CityBanner. */
export const INDIAN_TIER1 = [
  "Bangalore",
  "Mumbai",
  "Delhi",
  "Pune",
  "Hyderabad",
  "Chennai",
  "Kolkata",
  "Ahmedabad",
  "Jaipur",
  "Surat",
];

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

export interface GeoInfo {
  /** Detected or default city (always populated) */
  city: string;
  /** Detected or default state / admin region */
  state: string;
  /** ISO 3166-1 alpha-2 country code, lowercase */
  countryCode: string;
  /** Human-readable country name */
  countryName: string;
  /** Latitude (Vercel or IP API) — may be empty if unknown */
  latitude?: string;
  /** Longitude (Vercel or IP API) — may be empty if unknown */
  longitude?: string;
  /** True if geo was actually detected (not fallback defaults) */
  detected: boolean;
  /** "vercel" | "ipwhois" | "default" — where the data came from */
  source: "vercel" | "ipwhois" | "default";
}

/* -------------------------------------------------------------------------- */
/*                          Free IP API fallback (ipwho.is)                   */
/* -------------------------------------------------------------------------- */

interface IpWhoIsResponse {
  ip?: string;
  success?: boolean;
  city?: string;
  region?: string;
  country?: string;
  country_code?: string;
  latitude?: number;
  longitude?: number;
  message?: string;
}

async function lookupIpWhoIs(ip: string): Promise<Partial<GeoInfo> | null> {
  try {
    // ipwho.is: free, no API key, HTTPS, unlimited for reasonable use
    const url = ip ? `https://ipwho.is/${ip}` : "https://ipwho.is/";
    const res = await fetch(url, {
      headers: { "User-Agent": "SanatDynamo/1.0" },
      // 2s timeout — we don't want slow IP lookups to block the page
      signal: AbortSignal.timeout(2000),
    });
    if (!res.ok) return null;
    const data = (await res.json()) as IpWhoIsResponse;
    if (!data.success) return null;

    return {
      city: data.city || "",
      state: data.region || "",
      countryCode: (data.country_code || "").toLowerCase(),
      countryName: data.country || "",
      latitude: data.latitude !== undefined ? String(data.latitude) : undefined,
      longitude: data.longitude !== undefined ? String(data.longitude) : undefined,
    };
  } catch {
    return null;
  }
}

// Cache IP lookups for 1 hour — avoids hammering the free API and saves response time.
const cachedLookupIpWhoIs = unstable_cache(
  async (ip: string) => lookupIpWhoIs(ip),
  ["ipwhois-v1"],
  { revalidate: 3600, tags: ["geo"] }
);

/* -------------------------------------------------------------------------- */
/*                               Public getGeo                                */
/* -------------------------------------------------------------------------- */

/**
 * Resolve visitor geo info. Preference order:
 *   1. Vercel geo headers (free, instant, accurate in production)
 *   2. Free IP API lookup (ipwho.is — no key needed, HTTPS, 1h cache)
 *   3. Country-aware defaults from the URL slug
 *
 * Always returns a usable `GeoInfo` — never throws.
 */
export async function getGeo(countrySlug: string): Promise<GeoInfo> {
  const h = await headers();

  const fwdCity = h.get("x-geo-city");
  const fwdRegion = h.get("x-geo-region");
  const fwdCountry = h.get("x-geo-country");
  const vercelCity = h.get("x-vercel-ip-city");
  const vercelRegion = h.get("x-vercel-ip-country-region");
  const vercelCountry = h.get("x-vercel-ip-country");
  const vercelLat = h.get("x-vercel-ip-latitude");
  const vercelLng = h.get("x-vercel-ip-longitude");

  const rawCity = fwdCity || vercelCity || "";
  const rawRegion = fwdRegion || vercelRegion || "";
  const rawCountry = (fwdCountry || vercelCountry || "").toLowerCase();

  // 1. Vercel headers — fastest path, available in production on Vercel
  if (rawCity) {
    const code = rawCountry || countrySlug;
    return {
      city: safeDecode(rawCity),
      state: safeDecode(rawRegion) || DEFAULT_STATES[code] || "",
      countryCode: code,
      countryName: COUNTRY_NAMES[code] || code.toUpperCase(),
      latitude: vercelLat || undefined,
      longitude: vercelLng || undefined,
      detected: true,
      source: "vercel",
    };
  }

  // 2. Free IP API fallback — used in local dev or non-Vercel hosts
  const clientIp =
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    h.get("x-real-ip") ||
    "";

  // Don't call the API for obvious private/local IPs — wastes a request
  if (clientIp && !isPrivateIp(clientIp)) {
    const api = await cachedLookupIpWhoIs(clientIp);
    if (api?.city && api.countryCode) {
      return {
        city: api.city,
        state: api.state || DEFAULT_STATES[api.countryCode] || "",
        countryCode: api.countryCode,
        countryName: api.countryName || COUNTRY_NAMES[api.countryCode] || api.countryCode.toUpperCase(),
        latitude: api.latitude,
        longitude: api.longitude,
        detected: true,
        source: "ipwhois",
      };
    }
  }

  // 3. Country-aware defaults
  const code = countrySlug.toLowerCase();
  return {
    city: DEFAULT_CITIES[code] ?? "Bangalore",
    state: DEFAULT_STATES[code] ?? "Karnataka",
    countryCode: code || "in",
    countryName: COUNTRY_NAMES[code] ?? (code ? code.toUpperCase() : "India"),
    detected: false,
    source: "default",
  };
}

/* -------------------------------------------------------------------------- */
/*                                  Helpers                                   */
/* -------------------------------------------------------------------------- */

function safeDecode(s: string): string {
  try {
    return decodeURIComponent(s);
  } catch {
    return s;
  }
}

function isPrivateIp(ip: string): boolean {
  return (
    ip === "127.0.0.1" ||
    ip === "::1" ||
    ip === "0.0.0.0" ||
    ip.startsWith("10.") ||
    ip.startsWith("192.168.") ||
    /^172\.(1[6-9]|2\d|3[01])\./.test(ip)
  );
}

/**
 * Build a compact location string for meta descriptions and social previews.
 * Example: "Bangalore, Karnataka, India"
 */
export function formatLocation(geo: GeoInfo): string {
  const parts = [geo.city, geo.state, geo.countryName].filter(
    (p, i, arr) => p && arr.indexOf(p) === i // de-dupe in case city === state
  );
  return parts.join(", ");
}

/**
 * Short location — "Bangalore, India" — for meta titles where length matters.
 */
export function formatLocationShort(geo: GeoInfo): string {
  return [geo.city, geo.countryName].filter(Boolean).join(", ");
}
