// app/lib/constants.ts
// Base URL for production and localhost

import { validCountryISOs } from "@/middleware";


export const BASE_URL = "https://www.supplelogic.com";
// export const BASE_URL = "http://localhost:8890";
// Countries: 195 total (subset shown, expand to full ISO 3166-1 alpha-2 list as needed)
export const COUNTRIES = validCountryISOs;

// Languages: 110+ total (subset shown, expand to full list as needed)
export const LANGUAGES = ["en"];

// Static pages (top-level + subpages): 49 total
export const STATIC_PAGES = [
    "",
    "about",
    "contact",
    "weight-loss-supplements",
    "dental-health-supplements"
];

// Product hierarchy: 100 products across 16 categories
export const PRODUCT_HIERARCHY = {
    "weight-loss-supplements": [
        "metolyn",
        "sleep-lean",
        "bellyflush",
        "citrusburn",
    ], // 9
    "dental-health-supplements": [
        "prodentim",
        "provadent",
        "dentolyn",
        "dentalprime",
    ]

};

// Total counts for reference
export const TOTAL_STATIC_URLS =
    STATIC_PAGES.length * COUNTRIES.length * LANGUAGES.length; // 49 * 195 * 110
export const TOTAL_PRODUCT_URLS =
    Object.values(PRODUCT_HIERARCHY).flat().length *
    COUNTRIES.length *
    LANGUAGES.length; // 60 * 195 * 110
export const TOTAL_URLS = TOTAL_STATIC_URLS + TOTAL_PRODUCT_URLS; // 2,339,550
export const URLS_PER_SITEMAP = 50000; // Google limit