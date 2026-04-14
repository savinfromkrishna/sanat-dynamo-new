import type { Metadata } from "next";
import {
  getTranslation,
  LOCALE_CODES,
  LOCALES,
  type Locale,
  type Messages,
} from "@/lib/i18n";
import { BASE_URL } from "@/lib/constants";
import { validCountryISOs } from "@/middleware";
import { getGeo, formatLocation, formatLocationShort, type GeoInfo } from "@/lib/geo";

export type PageKey =
  | "home"
  | "about"
  | "services"
  | "industries"
  | "caseStudies"
  | "contact"
  | "privacy"
  | "terms";

const PAGE_PATHS: Record<PageKey, string> = {
  home: "",
  about: "about",
  services: "services",
  industries: "industries",
  caseStudies: "case-studies",
  contact: "contact",
  privacy: "privacy",
  terms: "terms",
};

/** Pages that should be geo-personalized in metadata. Legal pages skip personalization. */
const GEO_PERSONALIZED: PageKey[] = [
  "home",
  "about",
  "services",
  "industries",
  "caseStudies",
  "contact",
];

interface BuildMetadataArgs {
  page: PageKey;
  country: string;
  locale: Locale;
}

/* -------------------------------------------------------------------------- */
/*               Geo-aware title, description, keywords injection             */
/* -------------------------------------------------------------------------- */

/**
 * Inject the visitor's country (and optionally city) into the title.
 *
 * The country slug is always known from the URL, so the country name is
 * GUARANTEED to appear in every personalized title — even when IP geo
 * detection fails. The city is added only when it makes the title fit.
 *
 * Examples:
 *   IN, detected city: "Sanat Dynamo in Bangalore, India — We Build Revenue Systems…"
 *   IN, no city:       "Sanat Dynamo in India — We Build Revenue Systems…"
 *   US, detected city: "Sanat Dynamo in New York, United States — We Build…"
 *
 * Length budget: ~85 chars. The country always wins; city is dropped first
 * if total length would exceed the budget.
 */
function geoifyTitle(title: string, geo: GeoInfo): string {
  const country = geo.countryName;
  if (!country) return title;

  const cityPart = geo.detected && geo.city ? `${geo.city}, ` : "";
  const fullInsert = `in ${cityPart}${country}`;
  const countryOnlyInsert = `in ${country}`;

  // 1. Try inserting "in {city}, {country}" right after the brand name
  //    Matches: "Sanat Dynamo —", "Sanat Dynamo -", "Sanat Dynamo ·", "Sanat Dynamo |"
  const brandRe = /^(Sanat Dynamo)(\s*[—\-·|])/;

  if (brandRe.test(title)) {
    // First try full city+country
    const withCity = title.replace(brandRe, `$1 ${fullInsert}$2`);
    if (withCity.length <= 90) return withCity;

    // City made it too long → drop the city, keep the country
    const withCountry = title.replace(brandRe, `$1 ${countryOnlyInsert}$2`);
    if (withCountry.length <= 90) return withCountry;

    // Even country is too long → truncate the suffix after the separator
    // but always keep the country in the title
    const parts = title.split(/\s*[—\-·|]\s*/);
    if (parts.length >= 2) {
      const core = `Sanat Dynamo ${countryOnlyInsert} — ${parts[1]}`;
      return core.length <= 90 ? core : `Sanat Dynamo ${countryOnlyInsert} — ${parts[1].slice(0, 40)}…`;
    }
    return withCountry;
  }

  // 2. Brand didn't match the start of the title — append " · {city, country}"
  const withCity = `${title} · ${cityPart}${country}`;
  if (withCity.length <= 90) return withCity;

  const countryOnly = `${title} · ${country}`;
  return countryOnly.length <= 90 ? countryOnly : title;
}

/**
 * Prepend "Serving {city}, {state}, {country}." (or "Serving {country}." when
 * city/state are not detected) to the meta description.
 */
function geoifyDescription(desc: string, geo: GeoInfo): string {
  const loc = geo.detected ? formatLocation(geo) : geo.countryName;
  if (!loc) return desc;
  const prefix = `Serving ${loc}. `;
  const combined = prefix + desc;
  // Google snippet limit ~170 chars
  return combined.length > 170 ? combined.slice(0, 167) + "…" : combined;
}

/**
 * Append local keywords. Country keywords are always added; city/state
 * keywords are added only when they were actually detected.
 */
function geoifyKeywords(keywords: string, geo: GeoInfo): string {
  const parts = new Set(
    keywords.split(",").map((k) => k.trim()).filter(Boolean)
  );
  const extra: string[] = [];

  // Country keywords — always present
  if (geo.countryName) {
    extra.push(
      geo.countryName,
      `agency ${geo.countryName}`,
      `digital agency ${geo.countryName}`,
      `custom software ${geo.countryName}`,
      `SEO agency ${geo.countryName}`
    );
  }

  // City keywords — only when geo was actually detected
  if (geo.detected && geo.city) {
    extra.push(
      geo.city,
      `${geo.city} agency`,
      `agency in ${geo.city}`,
      `custom software ${geo.city}`,
      `SEO agency ${geo.city}`,
      `digital agency ${geo.city}`
    );
  }

  // State only when present
  if (geo.detected && geo.state && geo.state !== geo.city) {
    extra.push(geo.state);
  }

  for (const e of extra) parts.add(e);
  return Array.from(parts).join(", ");
}

/* -------------------------------------------------------------------------- */
/*                             buildPageMetadata                              */
/* -------------------------------------------------------------------------- */

/**
 * Build a fully-populated `Metadata` object for a given page + locale + country.
 *
 * Automatically personalizes title/description/keywords with the visitor's
 * detected city, state, and country (from IP) for SEO boost.
 */
export async function buildPageMetadata({
  page,
  country,
  locale,
}: BuildMetadataArgs): Promise<Metadata> {
  const t = getTranslation(locale);
  const meta = t.pages[page];
  const subPath = PAGE_PATHS[page];
  const canonical = `/${country}/${locale}${subPath ? `/${subPath}` : ""}`;
  const fullUrl = `${BASE_URL}${canonical}`;

  // Personalize with geo. The country slug in the URL guarantees we always
  // have at least a country name — even when IP geo detection fails — so
  // personalization runs unconditionally for non-legal pages.
  const geo = await getGeo(country);
  const geoize = GEO_PERSONALIZED.includes(page);

  const title = geoize ? geoifyTitle(meta.metaTitle, geo) : meta.metaTitle;
  const description = geoize
    ? geoifyDescription(meta.metaDescription, geo)
    : meta.metaDescription;
  const keywords = geoize
    ? geoifyKeywords(meta.metaKeywords, geo)
    : meta.metaKeywords;

  // hreflang alternates: every supported locale, same country
  const languages: Record<string, string> = {};
  for (const lang of LOCALE_CODES) {
    languages[LOCALES[lang].htmlLang] =
      `${BASE_URL}/${country}/${lang}${subPath ? `/${subPath}` : ""}`;
  }
  languages["x-default"] =
    `${BASE_URL}/in/en${subPath ? `/${subPath}` : ""}`;

  const ogTitleBase =
    (meta as { ogTitle?: string }).ogTitle ?? meta.metaTitle;
  const ogDescriptionBase =
    (meta as { ogDescription?: string }).ogDescription ?? meta.metaDescription;

  const ogTitle = geoize ? geoifyTitle(ogTitleBase, geo) : ogTitleBase;
  const ogDescription = geoize
    ? geoifyDescription(ogDescriptionBase, geo)
    : ogDescriptionBase;

  // Extra `<meta name="geo.*">` tags that SEO tools like GeoTarget, Yoast,
  // and Bing Places still read for local relevance signals. Country always
  // emitted; city/coords only when actually detected.
  const otherMeta: Record<string, string> = {
    "geo.country": geo.countryCode.toUpperCase(),
    "geo.region": geo.state
      ? `${geo.countryCode.toUpperCase()}-${geo.state}`
      : geo.countryCode.toUpperCase(),
  };
  if (geo.detected && geo.city) {
    otherMeta["geo.placename"] = geo.city;
  }
  if (geo.detected && geo.latitude && geo.longitude) {
    otherMeta["geo.position"] = `${geo.latitude};${geo.longitude}`;
    otherMeta["ICBM"] = `${geo.latitude}, ${geo.longitude}`;
  }

  // Breadcrumb — auto-generated for every page except home
  const breadcrumbItems = [
    { name: "Home", url: `${BASE_URL}/${country}/${locale}` },
  ];
  if (page !== "home") {
    const pageName = meta.metaTitle.split("—")[0]?.split("|")[0]?.trim() ?? page;
    breadcrumbItems.push({ name: pageName, url: fullUrl });
  }

  return {
    title,
    description,
    keywords,
    metadataBase: new URL(BASE_URL),
    alternates: { canonical, languages },
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url: fullUrl,
      siteName: t.brand.name,
      locale: `${locale}_${country.toUpperCase()}`,
      type: page === "home" ? "website" : "article",
      images: [
        {
          url: `${BASE_URL}/og.png`,
          width: 1200,
          height: 630,
          alt: t.brand.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: ogDescription,
      images: [`${BASE_URL}/og.png`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-snippet": -1,
        "max-image-preview": "large",
        "max-video-preview": -1,
      },
    },
    authors: [{ name: t.brand.name }],
    creator: t.brand.name,
    publisher: t.brand.name,
    other: otherMeta,
  };
}

/* -------------------------------------------------------------------------- */
/*                              JSON-LD builders                              */
/* -------------------------------------------------------------------------- */

export function buildOrganizationJsonLd(t: Messages) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: t.brand.name,
    url: BASE_URL,
    logo: `${BASE_URL}/og.png`,
    description: t.seo.description,
    sameAs: [
      "https://www.linkedin.com/",
      "https://x.com/",
      "https://github.com/",
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        email: t.contact.details.emailHref,
        telephone: t.contact.details.phone,
        contactType: "sales",
        availableLanguage: LOCALE_CODES.map((c) => LOCALES[c].name),
        areaServed: validCountryISOs.map((c) => c.toUpperCase()),
      },
    ],
    address: {
      "@type": "PostalAddress",
      addressCountry: "IN",
    },
  };
}

/**
 * `LocalBusiness` JSON-LD keyed to the visitor's detected city/state/country.
 * This is what tells Google "this page is relevant for [city] searches".
 */
export function buildLocalBusinessJsonLd(t: Messages, geo: GeoInfo) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: `${t.brand.name} — ${geo.city}`,
    url: BASE_URL,
    image: `${BASE_URL}/og.png`,
    description: t.seo.description,
    priceRange: "₹₹₹",
    telephone: t.contact.details.phone,
    email: t.contact.details.emailHref,
    address: {
      "@type": "PostalAddress",
      addressLocality: geo.city,
      addressRegion: geo.state,
      addressCountry: geo.countryCode.toUpperCase(),
    },
    ...(geo.latitude && geo.longitude
      ? {
          geo: {
            "@type": "GeoCoordinates",
            latitude: geo.latitude,
            longitude: geo.longitude,
          },
        }
      : {}),
    areaServed: {
      "@type": "City",
      name: geo.city,
    },
  };
}

export function buildWebsiteJsonLd(t: Messages, locale: Locale, country: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: t.brand.name,
    url: `${BASE_URL}/${country}/${locale}`,
    inLanguage: locale,
    publisher: { "@type": "Organization", name: t.brand.name },
    potentialAction: {
      "@type": "SearchAction",
      target: `${BASE_URL}/${country}/${locale}/?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

/**
 * Build breadcrumb JSON-LD for a page. Call from page components.
 */
export function buildPageBreadcrumbJsonLd(
  page: PageKey,
  locale: Locale,
  country: string,
): object {
  const t = getTranslation(locale);
  const subPath = PAGE_PATHS[page];
  const homeUrl = `${BASE_URL}/${country}/${locale}`;
  const items = [{ name: t.nav.home, url: homeUrl }];

  if (page !== "home") {
    const pageUrl = `${homeUrl}/${subPath}`;
    const label =
      page === "caseStudies" ? t.nav.work :
      page === "about" ? t.nav.about :
      page === "services" ? t.nav.services :
      page === "industries" ? t.nav.industries :
      page === "contact" ? t.nav.contact :
      page;
    items.push({ name: label, url: pageUrl });
  }

  return buildBreadcrumbJsonLd(items);
}

export function buildBreadcrumbJsonLd(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
}

export function buildFaqJsonLd(items: Array<{ q: string; a: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

export function buildServiceJsonLd(
  service: Messages["services"]["items"][number],
  locale: Locale,
  country: string,
) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    serviceType: service.kicker,
    description: service.summary,
    provider: { "@type": "Organization", name: "Sanat Dynamo" },
    url: `${BASE_URL}/${country}/${locale}/services#${service.id}`,
    areaServed: "Worldwide",
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: "INR",
        description: service.investment,
      },
    },
  };
}
