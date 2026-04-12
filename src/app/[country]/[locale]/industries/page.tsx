import type { Metadata } from "next";
import { getTranslation, type Locale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { Cta } from "@/components/sections/Cta";
import { Faq } from "@/components/sections/Faq";
import { CityBanner } from "@/components/sections/CityBanner";
import { BigNumbers } from "@/components/sections/BigNumbers";
import { KnowMore } from "@/components/sections/KnowMore";
import { Section } from "@/components/primitives/section";
import { industryIllustrations } from "@/components/illustrations";

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
import {
  ShoppingBag,
  Building2,
  GraduationCap,
  Stethoscope,
  Factory,
  AlertTriangle,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import LocalizedLink from "@/components/LocalizedLink";

const iconMap = {
  ecommerce: ShoppingBag,
  "real-estate": Building2,
  edtech: GraduationCap,
  healthcare: Stethoscope,
  "sme-erp": Factory,
} as const;

export default async function IndustriesPage({
  params,
}: {
  params: Promise<{ country: string; locale: string }>;
}) {
  const { country, locale } = await params;
  const t = getTranslation(locale as Locale);

  return (
    <>
      <PageHero
        eyebrow={t.industries.eyebrow}
        title={
          <>
            Five sectors.{" "}
            <span className="text-accent">One growth playbook.</span>
          </>
        }
        subtitle={t.industries.subtitle}
        breadcrumb="Industries"
      />

      <CityBanner t={t} country={country} />

      {/* Quick jump */}
      <Section className="pt-8">
        <div className="rounded-3xl border border-border bg-surface/40 p-2">
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
            {t.industries.items.map((ind) => {
              const Icon = iconMap[ind.id as keyof typeof iconMap];
              return (
                <LocalizedLink
                  key={ind.id}
                  href={`/industries#${ind.id}`}
                  className="group flex items-center gap-3 rounded-2xl border border-border bg-background px-4 py-3 transition-all hover:border-accent/40 hover:bg-surface"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-border bg-surface text-accent">
                    {Icon && <Icon size={16} strokeWidth={1.75} />}
                  </div>
                  <span className="truncate text-sm font-semibold text-foreground">
                    {ind.name}
                  </span>
                </LocalizedLink>
              );
            })}
          </div>
        </div>
      </Section>

      <Section className="pt-0">
        <div className="space-y-6">
          {t.industries.items.map((ind, i) => {
            const Icon = iconMap[ind.id as keyof typeof iconMap];
            const Illust = industryIllustrations[ind.id];
            return (
              <article
                key={ind.id}
                id={ind.id}
                className="group relative scroll-mt-32 overflow-hidden rounded-3xl border border-border bg-surface/60 p-8 transition-colors hover:border-accent/30 sm:p-12"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-32 -top-32 h-72 w-72 rounded-full bg-accent/5 blur-3xl"
                />
                <div className="absolute right-6 top-6 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                  Sector · 0{i + 1}
                </div>

                <div className="grid gap-10 lg:grid-cols-12">
                  <div className="lg:col-span-5">
                    <div className="flex items-start gap-4">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-border bg-background text-accent">
                        {Icon && <Icon size={22} strokeWidth={1.75} />}
                      </div>
                      <div>
                        <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                          {ind.tag}
                        </div>
                        <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                          {ind.name}
                        </h2>
                      </div>
                    </div>
                    <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                      {ind.description}
                    </p>

                    {/* Industry-specific sketch illustration */}
                    {Illust && (
                      <div className="mt-6 hidden sm:block">
                        <Illust className="max-w-[260px] opacity-60" />
                      </div>
                    )}

                    <LocalizedLink
                      href="/contact"
                      className="group/btn mt-8 inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-6 py-3 text-sm font-semibold text-accent transition-all hover:border-accent/70 hover:bg-accent/15"
                    >
                      Build for {ind.name}
                      <ArrowUpRight
                        size={14}
                        className="transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                      />
                    </LocalizedLink>
                  </div>

                  <div className="lg:col-span-7">
                    <div className="rounded-2xl border border-border bg-background/60 p-6">
                      <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-danger/80">
                        <AlertTriangle size={12} />
                        Pain points
                      </div>
                      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                        {ind.painPoints.map((pp) => (
                          <li
                            key={pp}
                            className="flex items-start gap-2.5 text-sm text-muted-foreground"
                          >
                            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-danger/70" />
                            {pp}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-4 rounded-2xl border border-accent/30 bg-accent-soft p-6">
                      <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
                        <Sparkles size={12} />
                        After we ship
                      </div>
                      <p className="mt-3 text-lg font-semibold text-foreground">
                        {ind.outcome}
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </Section>

      <BigNumbers t={t} />
      <Faq t={t} />
      <KnowMore t={t} pageKey="industries" pageLabel="Industries" />
      <Cta t={t} />
    </>
  );
}
