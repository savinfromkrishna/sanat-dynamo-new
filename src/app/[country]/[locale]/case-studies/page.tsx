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
import { Section } from "@/components/primitives/section";
import { RevenueGrowthChart, ProofStripVisual } from "@/components/illustrations";

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

      {/* Revenue growth visualization */}
      <Section className="pt-8 pb-0">
        <div className="rounded-3xl border border-border bg-surface/40 p-6 sm:p-8">
          <div className="mb-4 font-mono text-[10px] uppercase tracking-[0.22em] text-accent">Aggregate Revenue Impact</div>
          <RevenueGrowthChart className="mx-auto max-w-3xl" />
        </div>
      </Section>

      {/* Proof strip */}
      <Section className="pt-6 pb-0">
        <ProofStripVisual className="mx-auto max-w-3xl" />
      </Section>

      <CaseStudies t={t} expanded />
      <BigNumbers t={t} />
      <Testimonials t={t} />
      <KnowMore t={t} pageKey="caseStudies" pageLabel="Case Studies" />
      <Cta t={t} />
    </>
  );
}
