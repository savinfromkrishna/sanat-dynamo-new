import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

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
export const validLocales = ["en", "es"];

// Default values for country and locale
const defaultCountry = "in";
const defaultLocale = "en";

/**
 * Get the browser language from the request headers
 * @param req NextRequest object
 * @returns The detected browser language or the default locale
 */
function getBrowserLanguage(req: NextRequest): string {
  const acceptLanguageHeader = req.headers.get("accept-language");
  if (!acceptLanguageHeader) return defaultLocale;
  const browserLanguage = acceptLanguageHeader.split(",")[0]?.split("-")[0];
  return validLocales.includes(browserLanguage) ? browserLanguage : defaultLocale;
}

/**
 * Fetch user location data using the client's IP address from the request
 * @param req NextRequest object
 * @returns Object containing country, language, and IP data
 */
async function fetchUserLocation(req: NextRequest): Promise<{ country: string; language: string; ipData: any }> {
  const clientIP =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    "0.0.0.0";

  console.log("Client IP from request x-forwarded:", req.headers.get("x-forwarded-for"));
  console.log("Client IP from request:", clientIP);

  try {
    const response = await fetch(`https://ip.nesscoindia.com/${clientIP}`, {
      headers: {
        "User-Agent": "NextJS-Middleware",
      },
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const ipData = await response.json();
    console.log("IP Data:", ipData);

    return {
      country: ipData.country.toLowerCase(),
      language: defaultLocale,
      ipData: ipData,
    };
  } catch (error) {
    console.error("Error in fetchUserLocation:", error);
    throw error;
  }
}

/**
 * Middleware function to handle country and language redirection
 * @param req NextRequest object
 * @returns NextResponse object
 */
export async function middleware(req: NextRequest) {
  console.log("Middleware execution started");
  const { pathname } = req.nextUrl;
  console.log("Current path:", pathname);

  // Parse country and language from the URL
  const pathParts = pathname.split("/").filter(Boolean);
  const userCountryISO = pathParts[0]?.toLowerCase();
  const userLanguage = pathParts[1]?.toLowerCase();

  // Check if the country and language in the URL are valid
  const isCountryValid = validCountryISOs.includes(userCountryISO);
  const isLanguageValid = validLocales.includes(userLanguage);

  // Prepare the response
  const res = NextResponse.next();
  res.headers.set("x-next-url-path", req.nextUrl.pathname);
  res.headers.set("x-next-url-query", req.nextUrl.search);

  // If both country and language are valid, continue
  if (isCountryValid && isLanguageValid) {
    console.log("Valid country and language in URL, proceeding...");
    return res;
  }

  try {
    // Fetch user location data
    const userLocation = await fetchUserLocation(req);
    console.log("User location:", userLocation?.country);
    const detectedCountry = userLocation.country;
    const browserLanguage = getBrowserLanguage(req);

    // Determine final country and language
    const finalCountry = isCountryValid
      ? userCountryISO
      : validCountryISOs.includes(detectedCountry)
        ? detectedCountry
        : defaultCountry;

    const finalLanguage = isLanguageValid
      ? userLanguage
      : validLocales.includes(browserLanguage)
        ? browserLanguage
        : defaultLocale;

    console.log("Final country:", finalCountry);
    console.log("Final language:", finalLanguage);

    // Redirect to the appropriate URL with country and language
    const newPathParts = [finalCountry, finalLanguage, ...pathParts.slice(2)];
    const redirectURL = `/${newPathParts.join("/")}`;
    console.log("Redirecting to:", redirectURL);

    const url = req.nextUrl.clone();
    url.pathname = redirectURL;
    return NextResponse.redirect(url.toString(), 301);
  } catch (error) {
    console.error("Error in middleware:", error);
    // Redirect to "/in/en" route in case of fetch error
    const fallbackURL = "/in/en";
    const url = req.nextUrl.clone();
    url.pathname = fallbackURL;
    return NextResponse.redirect(url.toString(), 301);
  }
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|assets|favicon-96x96.png|favicon-180x180.png|favicon.ico|favicon.svg|google059bd1b2c050b28b.html|nessco-product-catalog.pdf|robots.txt|api|^app$|^app/|sitemap-index.xml|[a-zA-Z]{2}/sitemap.xml|[a-zA-Z]{2}/[a-zA-Z]{2}/sitemap.xml).*)",
  ],
};