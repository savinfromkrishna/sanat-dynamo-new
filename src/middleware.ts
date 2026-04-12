// middleware.ts  (or src/middleware.ts)

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const validCountryISOs = [
  "ad", "ae", "af", "ag", "ai", "al", "am", "ao", "ar", "as", "at", "au", "aw", "ax", "az",
  "ba", "bb", "bd", "be", "bf", "bg", "bh", "bi", "bj", "bl", "bm", "bn", "bo", "bq", "br",
  "bs", "bt", "bv", "bw", "by", "bz", "ca", "cc", "cd", "cf", "cg", "ch", "ci", "ck", "cl",
  "cm", "cn", "co", "cr", "cu", "cv", "cw", "cx", "cy", "cz", "de", "dj", "dk", "dm", "do",
  "dz", "ec", "ee", "eg", "eh", "er", "es", "et", "fi", "fj", "fk", "fm", "fo", "fr", "ga",
  "gb", "gd", "ge", "gf", "gg", "gh", "gi", "gl", "gm", "gn", "gp", "gq", "gr", "gt", "gu",
  "gw", "gy", "hk", "hm", "hn", "hr", "ht", "hu", "id", "ie", "il", "im", "in", "io", "iq",
  "ir", "is", "it", "je", "jm", "jo", "jp", "ke", "kg", "kh", "ki", "km", "kn", "kp", "kr",
  "kw", "ky", "kz", "la", "lb", "lc", "li", "lk", "lr", "ls", "lt", "lu", "lv", "ly", "ma",
  "mc", "md", "me", "mf", "mg", "mh", "mk", "ml", "mm", "mn", "mo", "mp", "mq", "mr", "ms",
  "mt", "mu", "mv", "mw", "mx", "my", "mz", "na", "nc", "ne", "nf", "ng", "ni", "nl", "no",
  "np", "nr", "nu", "nz", "om", "pa", "pe", "pf", "pg", "ph", "pk", "pl", "pm", "pn", "pr",
  "ps", "pt", "pw", "py", "qa", "re", "ro", "rs", "ru", "rw", "sa", "sb", "sc", "sd", "se",
  "sg", "sh", "si", "sj", "sk", "sl", "sm", "sn", "so", "sr", "ss", "st", "sv", "sx", "sy",
  "sz", "tc", "td", "tf", "tg", "th", "tj", "tk", "tl", "tm", "tn", "to", "tr", "tt", "tv",
  "tz", "ua", "ug", "um", "us", "uy", "uz", "va", "vc", "ve", "vg", "vi", "vn", "vu", "wf",
  "ws", "ye", "yt", "za", "zm", "zw",
];

export const validLocales = ["en", "es", "fr", "de", "ar", "hi", "zh"];

// Default values
const defaultCountry = "in";
const defaultLocale = "en";

/**
 * Get browser preferred language from accept-language header
 */
function getBrowserLanguage(req: NextRequest): string {
  const acceptLanguage = req.headers.get("accept-language");
  if (!acceptLanguage) return defaultLocale;

  const primaryLang = acceptLanguage.split(",")[0]?.split("-")[0]?.toLowerCase();
  return validLocales.includes(primaryLang) ? primaryLang : defaultLocale;
}

/**
 * Get country code using Vercel headers (preferred) or fallback API
 */
async function getUserCountry(req: NextRequest): Promise<string> {
  // Primary: Vercel geolocation headers (available on Edge & Serverless functions)
  const vercelCountry = req.headers.get("x-vercel-ip-country")?.toLowerCase();

  if (vercelCountry && validCountryISOs.includes(vercelCountry)) {
    console.log("Country from Vercel header:", vercelCountry);
    return vercelCountry;
  }

  // Fallback: your existing IP API (used in local dev or when headers missing)
  const clientIP =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "0.0.0.0";

  console.log("Client IP (fallback):", clientIP);

  try {
    const response = await fetch(`https://ip.nesscoindia.com/${clientIP}`, {
      headers: {
        "User-Agent": "NextJS-Middleware",
      },
      // Optional: add timeout if needed
      // signal: AbortSignal.timeout(3000),
    });

    if (!response.ok) {
      throw new Error(`IP API failed: ${response.status}`);
    }

    const ipData = await response.json();
    const country = ipData.country?.toLowerCase();

    console.log("Country from fallback API:", country);

    if (country && validCountryISOs.includes(country)) {
      return country;
    }
  } catch (err) {
    console.error("Fallback IP fetch error:", err);
  }

  // Ultimate fallback
  return defaultCountry;
}

/**
 * Main middleware – handles country/language prefix redirects
 */
export async function middleware(req: NextRequest) {
  console.log("Middleware started");

  const { pathname } = req.nextUrl;
  console.log("Pathname:", pathname);

  // Skip internal paths, API routes, static files, etc.
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/assets") ||
    pathname.includes(".") || // files like favicon.ico, robots.txt
    pathname === "/sitemap-index.xml" ||
    pathname.endsWith(".xml")
  ) {
    return NextResponse.next();
  }

  // Parse existing country/language from URL
  const pathParts = pathname.split("/").filter(Boolean);
  const urlCountry = pathParts[0]?.toLowerCase();
  const urlLanguage = pathParts[1]?.toLowerCase();

  const isCountryValid = validCountryISOs.includes(urlCountry);
  const isLanguageValid = validLocales.includes(urlLanguage);

  // If URL already has valid country + language → continue
  if (isCountryValid && isLanguageValid) {
    console.log("Valid country/language in URL → proceeding");
    const res = NextResponse.next();
    res.headers.set("x-next-url-path", pathname);
    res.headers.set("x-next-url-query", req.nextUrl.search);
    // Forward Vercel geo headers so server components can read them via next/headers
    const city = req.headers.get("x-vercel-ip-city");
    const region = req.headers.get("x-vercel-ip-country-region");
    const country = req.headers.get("x-vercel-ip-country");
    const latitude = req.headers.get("x-vercel-ip-latitude");
    const longitude = req.headers.get("x-vercel-ip-longitude");
    if (city) res.headers.set("x-geo-city", decodeURIComponent(city));
    if (region) res.headers.set("x-geo-region", region);
    if (country) res.headers.set("x-geo-country", country);
    if (latitude) res.headers.set("x-geo-latitude", latitude);
    if (longitude) res.headers.set("x-geo-longitude", longitude);
    return res;
  }

  try {
    // Detect country (Vercel preferred + fallback)
    const detectedCountry = await getUserCountry(req);

    // Detect language from browser
    const browserLanguage = getBrowserLanguage(req);

    // Decide final values
    const finalCountry = isCountryValid ? urlCountry : detectedCountry;
    const finalLanguage = isLanguageValid ? urlLanguage : browserLanguage;

    console.log("Final country:", finalCountry);
    console.log("Final language:", finalLanguage);

    // Build new path: /country/language/rest...
    const newPathParts = [finalCountry, finalLanguage, ...pathParts.slice(isCountryValid ? 1 : 0)];
    const newPathname = `/${newPathParts.join("/")}`;

    console.log("Redirecting to:", newPathname);

    const url = req.nextUrl.clone();
    url.pathname = newPathname;

    return NextResponse.redirect(url, 307); // 307 = temporary redirect (better for SEO/testing)
  } catch (error) {
    console.error("Middleware error:", error);

    // Fallback redirect in case of any error
    const fallbackUrl = req.nextUrl.clone();
    fallbackUrl.pathname = "/in/en";
    return NextResponse.redirect(fallbackUrl, 307);
  }
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|assets|favicon-96x96.png|favicon-180x180.png|favicon.ico|favicon.svg|google059bd1b2c050b28b.html|google7f9e3db7a201227d.html|robots.txt|api|^app$|^app/|sitemap-index.xml|[a-zA-Z]{2}/sitemap.xml|[a-zA-Z]{2}/[a-zA-Z]{2}/sitemap.xml).*)",
  ],
};