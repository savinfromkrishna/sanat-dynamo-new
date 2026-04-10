import type { Metadata } from "next";
import { getTranslation, type Locale } from "@/lib/i18n";
import { buildPageMetadata, buildFaqJsonLd } from "@/lib/seo";
import { Hero } from "@/components/sections/Hero";
import { LogosMarquee } from "@/components/sections/LogosMarquee";
import { CityBanner } from "@/components/sections/CityBanner";
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
  const faqLd = buildFaqJsonLd(t.faq.items);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <Hero t={t} />
      <LogosMarquee t={t} />
      <CityBanner t={t} country={country} />
      <Problem t={t} />
      <Approach t={t} />
      <Services t={t} />
      <FeatureGrid t={t} />
      <Industries t={t} />
      <BigNumbers t={t} />
      <Process t={t} />
      <CaseStudies t={t} />
      <TechStack t={t} />
      <Testimonials t={t} />
      <Faq t={t} />
      <KnowMore t={t} pageKey="home" pageLabel="home" />
      <Cta t={t} />
    </>
  );
}
