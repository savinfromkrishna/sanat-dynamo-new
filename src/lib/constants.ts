// Site-wide constants for Sanat Dynamo
import { validCountryISOs } from "@/middleware";

export const BASE_URL = "https://sanat-rewa.vercel.app";

export const COUNTRIES = validCountryISOs;
export const LANGUAGES = ["en", "es", "fr", "de", "ar", "hi", "zh"] as const;

export const STATIC_PAGES = [
  "",
  "services",
  "industries",
  "case-studies",
  "about",
  "contact",
  "privacy",
  "terms",
];

export const URLS_PER_SITEMAP = 50000;
