// Site-wide constants for Sanat Dynamo

export const BASE_URL = "https://www.savingroup.in";

/**
 * Countries we actively target for SEO / indexing.
 *
 * Every country in this list gets:
 *   - its own entry in the sitemap index
 *   - unique body content from `country-content.ts`
 *   - `<meta name="robots" content="index,follow">` on every page
 *
 * Countries outside this list still *resolve* (URL works, content renders)
 * but ship with `noindex,follow` and are excluded from the sitemap so Google
 * doesn't see them as duplicate canonicals. Keeping this list small is the
 * single most important SEO lever — ~240 near-duplicate country variants is
 * what was killing indexing before.
 *
 * Tiers (see `country-content.ts` for content depth):
 *   T1 — deep hand-written content: in, us, gb, ae
 *   T2 — templated + market-specific bullets: ca, au, sg, de
 *   T3 — lighter localization:       fr, es, nl, sa
 */
export const TARGET_COUNTRIES = [
  "in", "us", "gb", "ae",
  "ca", "au", "sg", "de",
  "fr", "es", "nl", "sa",
] as const;

export type TargetCountry = (typeof TARGET_COUNTRIES)[number];

export const COUNTRIES = TARGET_COUNTRIES;
export const LANGUAGES = ["en", "es", "fr", "de", "ar", "hi", "zh"] as const;

export function isTargetCountry(code: string): code is TargetCountry {
  return (TARGET_COUNTRIES as readonly string[]).includes(code.toLowerCase());
}

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
