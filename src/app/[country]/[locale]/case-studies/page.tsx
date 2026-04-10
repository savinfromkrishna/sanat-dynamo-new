import type { Metadata } from "next";
import { getTranslation, type Locale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { Testimonials } from "@/components/sections/Testimonials";
import { CityBanner } from "@/components/sections/CityBanner";
import { BigNumbers } from "@/components/sections/BigNumbers";
import { KnowMore } from "@/components/sections/KnowMore";
import { Cta } from "@/components/sections/Cta";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ country: string; locale: string }>;
}): Promise<Metadata> {
  const { country, locale } = await params;
  return buildPageMetadata({
    page: "caseStudies",
    country,
    locale: locale as Locale,
  });
}

export default async function CaseStudiesPage({
  params,
}: {
  params: Promise<{ country: string; locale: string }>;
}) {
  const { country, locale } = await params;
  const t = getTranslation(locale as Locale);

  return (
    <>
      <PageHero
        eyebrow={t.caseStudies.eyebrow}
        title={
          <>
            Real businesses.{" "}
            <span className="text-accent">Real numbers.</span>
          </>
        }
        subtitle={t.caseStudies.subtitle}
        breadcrumb="Case Studies"
      />
      <CityBanner t={t} country={country} />
      <CaseStudies t={t} expanded />
      <BigNumbers t={t} />
      <Testimonials t={t} />
      <KnowMore t={t} pageKey="caseStudies" pageLabel="Case Studies" />
      <Cta t={t} />
    </>
  );
}
