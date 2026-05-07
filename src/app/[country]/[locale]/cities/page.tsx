import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowUpRight, MapPin } from "lucide-react";
import { getTranslation, type Locale, LOCALE_CODES, LOCALES } from "@/lib/i18n";
import {
  BASE_URL,
  INDEXABLE_LOCALES,
  isIndexable,
} from "@/lib/constants";
import { INDIA_CITIES } from "@/lib/cities";
import { buildBreadcrumbJsonLd } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/primitives/section";
import { Cta } from "@/components/sections/Cta";
import LocalizedLink from "@/components/LocalizedLink";

const PAGE_PATH = "cities";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ country: string; locale: string }>;
}): Promise<Metadata> {
  const { country, locale } = await params;
  const lc = (LOCALE_CODES.includes(locale as Locale) ? locale : "en") as Locale;

  const title =
    country === "in"
      ? "Website Development Company in India · Cities We Serve"
      : "Cities We Serve";
  const description =
    country === "in"
      ? "Hand-built revenue systems and websites for India's 11 largest metros — Mumbai, Delhi NCR, Bengaluru, Pune, Chennai, Hyderabad, Kolkata, Ahmedabad, Jaipur, Indore, and Bhopal. Locally relevant SEO, INR pricing, GST-compliant invoicing."
      : "Cities and regions we serve.";

  const canonical = `/${country}/${lc}/${PAGE_PATH}`;
  // Hreflang cluster: indexable locales pinned to /in/. The cities hub is
  // intrinsically India-only, so the cluster only includes IN URLs.
  const languages: Record<string, string> = {};
  for (const lang of INDEXABLE_LOCALES) {
    languages[LOCALES[lang].htmlLang] = `${BASE_URL}/in/${lang}/${PAGE_PATH}`;
  }
  languages["x-default"] = `${BASE_URL}/in/en/${PAGE_PATH}`;

  return {
    title,
    description,
    keywords:
      "website development company India, cities we serve, web design Mumbai, Delhi NCR, Bengaluru, Pune, Chennai, Hyderabad, Kolkata, Ahmedabad, Jaipur, Indore, Bhopal",
    metadataBase: new URL(BASE_URL),
    alternates: { canonical, languages },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}${canonical}`,
      siteName: "Sanat Dynamo",
      locale: `${lc}_${country.toUpperCase()}`,
      type: "website",
      images: [{ url: `${BASE_URL}/og.png`, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${BASE_URL}/og.png`],
    },
    robots: isIndexable(country, lc)
      ? {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-snippet": -1,
            "max-image-preview": "large",
            "max-video-preview": -1,
          },
        }
      : { index: false, follow: true, googleBot: { index: false, follow: true } },
  };
}

export default async function CitiesIndexPage({
  params,
}: {
  params: Promise<{ country: string; locale: string }>;
}) {
  const { country, locale } = await params;
  const lc = (LOCALE_CODES.includes(locale as Locale) ? locale : "en") as Locale;
  const t = getTranslation(lc);

  // Cities directory is India-specific. Surface a 404 elsewhere so Google
  // doesn't index a near-empty hub for non-India markets — this is a
  // deliberate noindex+404 pattern, not a soft 404.
  if (country !== "in") {
    notFound();
  }

  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: t.nav.home, url: `${BASE_URL}/${country}/${lc}` },
    { name: "Cities", url: `${BASE_URL}/${country}/${lc}/${PAGE_PATH}` },
  ]);

  // ItemList JSON-LD — tells Google this is a curated list of city pages,
  // not a flat directory. Improves the rich-result presentation.
  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Cities served by Sanat Dynamo in India",
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    numberOfItems: INDIA_CITIES.length,
    itemListElement: INDIA_CITIES.map((city, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${BASE_URL}/${country}/${lc}/${PAGE_PATH}/${city.slug}`,
      name: `${city.name} — ${t.brand.name}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }}
      />

      <PageHero
        eyebrow="11 Indian metros · 1 revenue-system playbook"
        title={
          <>
            We build{" "}
            <span className="text-accent">city-aware revenue systems</span> across
            India.
          </>
        }
        subtitle="Each city below is its own market — different buyer, different stack, different pace. We tailor the build to the metro, not the other way around. Pick yours."
        breadcrumb="Cities"
      />

      <Section className="pt-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {INDIA_CITIES.map((city) => (
            <LocalizedLink
              key={city.slug}
              href={`/cities/${city.slug}`}
              className="group relative overflow-hidden rounded-3xl border border-border bg-surface/40 p-6 transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:bg-surface"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-accent/5 blur-3xl"
              />

              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
                  <MapPin size={11} />
                  {city.state}
                </div>
                <ArrowUpRight
                  size={16}
                  className="text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                />
              </div>

              <h2 className="mt-5 font-display text-2xl font-semibold tracking-tight text-foreground transition-colors group-hover:text-accent">
                {city.name}
              </h2>

              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {city.heroSubheadline.split(".")[0]}.
              </p>

              <div className="mt-5 flex flex-wrap gap-2 border-t border-border pt-5">
                {city.heroStats.slice(0, 2).map((s) => (
                  <span
                    key={s.label}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground"
                  >
                    <span className="text-accent">{s.value}</span>
                    <span className="truncate max-w-[18ch]">{s.label}</span>
                  </span>
                ))}
              </div>
            </LocalizedLink>
          ))}
        </div>
      </Section>

      <Cta t={t} country={country} />
    </>
  );
}
