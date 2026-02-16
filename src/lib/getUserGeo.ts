// src/lib/getUserGeo.ts

import { headers } from "next/headers";
import type { Locale } from "@/lib/i18n";

export async function getUserGeo() {
  const host = (await headers()).get("host") || "localhost:3000";
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  const apiUrl = `${protocol}://${host}/api/geo`;

  const res = await fetch(apiUrl, { cache: "no-store" });

  if (!res.ok) {
    throw new Error("Failed to fetch geo data");
  }

  return await res.json();
}