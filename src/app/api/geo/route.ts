// api/geo/route.ts (assuming this is the path for your API route)

import { NextRequest, NextResponse } from "next/server";

/**
 * Default fallback IP (used in localhost/private networks)
 */
const DEFAULT_IP = "106.219.70.174";

/**
 * Check if IP is private or localhost
 */
function isPrivateIP(ip: string): boolean {
  if (!ip) return true;

  return (
    ip === "::1" || // IPv6 localhost
    ip === "127.0.0.1" || // IPv4 localhost
    ip.startsWith("192.168.") ||
    ip.startsWith("10.") ||
    /^172\.(1[6-9]|2\d|3[0-1])\./.test(ip)
  );
}

/**
 * Extract real client IP from request headers
 */
function getClientIP(req: NextRequest): string {
  // 1️⃣ From proxy/CDN
  const forwardedFor = req.headers.get("x-forwarded-for");
  let ip = forwardedFor?.split(",")[0].trim();

  // 2️⃣ From nginx / reverse proxy
  if (!ip) {
    ip = req.headers.get("x-real-ip") || "";
  }

  // 3️⃣ fallback (rare case)
  // @ts-ignore
  if (!ip && req.ip) ip = req.ip;

  // 4️⃣ Validate IP
  if (isPrivateIP(ip || "")) {
    console.log("Private or localhost IP detected → using default IP");
    return DEFAULT_IP;
  }

  return ip || DEFAULT_IP;
}

/**
 * GET API Handler
 */
export async function GET(req: NextRequest) {
  try {
    const clientIP = getClientIP(req);
    const lang = req.nextUrl.searchParams.get("lang") || "en";

    console.log("Final Client IP:", clientIP);
    console.log("Requested language:", lang);

    // 🔥 Fetch geo data using ip-api.com for language support
    let url = `http://ip-api.com/json/${clientIP}`;
    if (lang !== "en") {
      url += `?lang=${lang}`;
    }

    const response = await fetch(url, {
      headers: {
        "User-Agent": "NextJS-IP-Service",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Geo API request failed: ${response.status}`);
    }

    const data = await response.json();

    if (data.status === "fail") {
      throw new Error(`Geo API failed: ${data.message}`);
    }

    // ✅ Normalize response (adjust fields to match original structure)
    const result = {
      ip: clientIP,
      city: data.city ?? null,
      region: data.regionName ?? null,
      country: data.countryCode ?? null,
      latitude: data.lat ?? null,
      longitude: data.lon ?? null,
      timezone: data.timezone ?? null,
      isp: data.isp ?? null,
    };

    console.log("Geo Result:", result);

    return NextResponse.json(result);
  } catch (error) {
    console.error("IP lookup error:", error);

    return NextResponse.json(
      {
        ip: DEFAULT_IP,
        latitude: null,
        longitude: null,
        error: "Failed to fetch IP info",
      },
      { status: 500 }
    );
  }
}