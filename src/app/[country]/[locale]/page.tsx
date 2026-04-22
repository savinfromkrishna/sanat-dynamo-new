import type { Metadata } from "next";
import { getTranslation, type Locale } from "@/lib/i18n";
import { buildPageMetadata, buildFaqJsonLd } from "@/lib/seo";
import { getCountryContent } from "@/lib/country-content";
import { isTargetCountry } from "@/lib/constants";
import { Hero } from "@/components/sections/Hero";
import { LogosMarquee } from "@/components/sections/LogosMarquee";
import { CityBanner } from "@/components/sections/CityBanner";
import { CountryMarketContext } from "@/components/sections/CountryMarketContext";
import { CountryTrustBlock } from "@/components/sections/CountryTrustBlock";
import { Problem } from "@/components/sections/Problem";
import { Approach } from "@/components/sections/Approach";
import { Services } from "@/components/sections/Services";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { Industries } from "@/components/sections/Industries";
import { BigNumbers } from "@/components/sections/BigNumbers";
import { Process } from "@/components/sections/Process";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { TechStack } from "@/components/sections/TechStack";
import { Testimonials } from "@/components/sections/Testimonials";
import { Faq } from "@/components/sections/Faq";
import { KnowMore } from "@/components/sections/KnowMore";
import { Cta } from "@/components/sections/Cta";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ country: string; locale: string }>;
}): Promise<Metadata> {
  const { country, locale } = await params;
  return buildPageMetadata({
    page: "home",
    country,
    locale: locale as Locale,
  });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ country: string; locale: string }>;
}) {
  const { country, locale } = await params;
  const t = getTranslation(locale as Locale);

  // Build FAQ JSON-LD including country-specific additions so the
  // FAQ rich result matches what's rendered on-page for this market.
  const countryContent = isTargetCountry(country)
    ? getCountryContent(country)
    : null;
  const faqLd = buildFaqJsonLd(
    countryContent
      ? [...t.faq.items, ...countryContent.faqAdditions]
      : t.faq.items,
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <Hero t={t} country={country} />
      <LogosMarquee t={t} country={country} locale={locale as Locale} />
      <CityBanner t={t} country={country} locale={locale as Locale} />
      <CountryMarketContext t={t} country={country} locale={locale as Locale} pageKey="home" />
      <CountryTrustBlock t={t} country={country} />
      <Problem t={t} />
      <Approach t={t} />
      <Services t={t} country={country} />
      <FeatureGrid t={t} />
      <Industries t={t} country={country} />
      <BigNumbers t={t} />
      <Process t={t} />
      <CaseStudies t={t} country={country} />
      <TechStack t={t} />
      <Testimonials t={t} country={country} />
      <Faq t={t} country={country} />
      <KnowMore t={t} pageKey="home" pageLabel="home" />
      <Cta t={t} country={country} />
    </>
  );
}
