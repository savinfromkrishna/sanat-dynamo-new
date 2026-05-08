import type { Metadata } from "next";
import {
  ShoppingBag,
  Building2,
  GraduationCap,
  Stethoscope,
  Factory,
} from "lucide-react";

import { getTranslation, type Locale } from "@/lib/i18n";
import {
  buildPageMetadata,
  buildPageBreadcrumbJsonLd,
  buildBreadcrumbJsonLd,
} from "@/lib/seo";
import { BASE_URL } from "@/lib/constants";
import { INDUSTRY_DATA, INDUSTRY_SLUGS } from "@/lib/industry-data";
import type { IndustryKey } from "@/lib/country-content";

import { PageHero } from "@/components/sections/PageHero";
import { Cta } from "@/components/sections/Cta";
import { Faq } from "@/components/sections/Faq";
import { CityBanner } from "@/components/sections/CityBanner";
import { CountryMarketContext } from "@/components/sections/CountryMarketContext";
import { BigNumbers } from "@/components/sections/BigNumbers";
import { KnowMore } from "@/components/sections/KnowMore";
import { Section } from "@/components/primitives/section";
import {
  IndustryConstellation,
  WhyPerIndustryMatrix,
} from "@/components/illustrations/IndustryHubVisuals";
import { IndustryScrollTimeline } from "@/components/sections/IndustryScrollTimeline";
import LocalizedLink from "@/components/LocalizedLink";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ country: string; locale: string }>;
}): Promise<Metadata> {
  const { country, locale } = await params;
  return buildPageMetadata({
    page: "industries",
    country,
    locale: locale as Locale,
  });
}

const iconMap: Record<IndustryKey, typeof Factory> = {
  manufacturing: Factory,
  "real-estate": Building2,
  healthcare: Stethoscope,
  ecommerce: ShoppingBag,
  edtech: GraduationCap,
};

export default async function IndustriesHubPage({
  params,
}: {
  params: Promise<{ country: string; locale: string }>;
}) {
  const { country, locale } = await params;
  const t = getTranslation(locale as Locale);

  const breadcrumbLd = buildPageBreadcrumbJsonLd(
    "industries",
    locale as Locale,
    country,
  );

  // ItemList JSON-LD — tells Google this hub indexes 5 standalone industry
  // URLs, each with its own canonical page. Critical for hub→spoke ranking.
  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: t.industries.title,
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    numberOfItems: INDUSTRY_SLUGS.length,
    itemListElement: INDUSTRY_SLUGS.map((slug, i) => {
      const data = INDUSTRY_DATA[slug];
      const display =
        t.industries.items.find((it) => it.id === slug)?.name ??
        data.serviceType;
      return {
        "@type": "ListItem",
        position: i + 1,
        url: `${BASE_URL}/${country}/${locale}/industries/${slug}`,
        name: display,
        description: data.metaDescription,
      };
    }),
  };

  // Sub-breadcrumb that lists each industry as an extra navigational hint
  const industryNavLd = buildBreadcrumbJsonLd(
    INDUSTRY_SLUGS.map((slug) => ({
      name:
        t.industries.items.find((it) => it.id === slug)?.name ??
        INDUSTRY_DATA[slug].serviceType,
      url: `${BASE_URL}/${country}/${locale}/industries/${slug}`,
    })),
  );

  // Reorder translations.items to match INDUSTRY_SLUGS (manufacturing first,
  // matching the SEO pivot for Ahmedabad / Gujarat manufacturing).
  const orderedItems = INDUSTRY_SLUGS.flatMap((slug) => {
    const item = t.industries.items.find((it) => it.id === slug);
    return item ? [item] : [];
  });

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(industryNavLd) }}
      />

      <PageHero
        eyebrow={t.industries.eyebrow}
        title={
          <>
            Industry-specific{" "}
            <span className="text-accent">growth systems for Indian SMEs</span>
            : manufacturing, real estate, clinics, D2C &amp; coaching.
          </>
        }
        subtitle={t.industries.subtitle}
        breadcrumb="Industries"
      />

      <CityBanner t={t} country={country} locale={locale as Locale} />

      {/* Animated constellation hero — shows the 5-sector revenue system map */}
      <Section className="pt-8">
        <IndustryConstellation
          countryHint="India · Ahmedabad manufacturing pivot live"
        />
      </Section>

      <CountryMarketContext
        t={t}
        country={country}
        locale={locale as Locale}
        pageKey="industries"
      />

      {/* Quick-jump nav — every chip links to a standalone /industries/[slug] URL */}
      <Section className="pt-0">
        <div className="rounded-3xl border border-border bg-surface/40 p-2">
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
            {INDUSTRY_SLUGS.map((slug) => {
              const Icon = iconMap[slug];
              const item = t.industries.items.find((it) => it.id === slug);
              return (
                <LocalizedLink
                  key={slug}
                  href={`/industries/${slug}`}
                  className="group flex items-center gap-3 rounded-2xl border border-border bg-background px-4 py-3 transition-all hover:border-accent/40 hover:bg-surface"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-border bg-surface text-accent">
                    <Icon size={16} strokeWidth={1.75} />
                  </div>
                  <span className="truncate text-sm font-semibold text-foreground">
                    {item?.name ?? INDUSTRY_DATA[slug].serviceType}
                  </span>
                </LocalizedLink>
              );
            })}
          </div>
        </div>
      </Section>

      {/* Scroll-driven sector timeline — replaces the static cards */}
      <IndustryScrollTimeline
        rows={orderedItems.map((it) => ({
          id: it.id as IndustryKey,
          name: it.name,
          tag: it.tag,
          description: it.description,
          outcome: it.outcome,
          painPoints: it.painPoints,
        }))}
        primaryId="manufacturing"
        primaryBadge="Primary pivot · Ahmedabad"
      />

      {/* Why per-industry — animated comparison matrix */}
      <Section className="pt-0">
        <WhyPerIndustryMatrix />
      </Section>

      <BigNumbers t={t} />
      <Faq t={t} country={country} />
      <KnowMore t={t} pageKey="industries" pageLabel="Industries" />
      <Cta t={t} country={country} />
    </>
  );
}
