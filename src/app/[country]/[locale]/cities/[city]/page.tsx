import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  ArrowUpRight,
  CheckCircle2,
  MapPin,
  Sparkles,
  Star,
  Building2,
  Users,
  Plus,
} from "lucide-react";
import {
  getTranslation,
  type Locale,
  LOCALE_CODES,
  LOCALES,
} from "@/lib/i18n";
import { BASE_URL, isTargetCountry } from "@/lib/constants";
import {
  INDIA_CITIES,
  getCityBySlug,
  type CityContent,
} from "@/lib/cities";
import { buildBreadcrumbJsonLd, buildFaqJsonLd } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { Section, SectionHeader } from "@/components/primitives/section";
import { Cta } from "@/components/sections/Cta";
import { Services } from "@/components/sections/Services";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { TechStack } from "@/components/sections/TechStack";
import LocalizedLink from "@/components/LocalizedLink";

const CITIES_PATH = "cities";

/* -------------------------------------------------------------------------- */
/*                       generateStaticParams + Metadata                      */
/* -------------------------------------------------------------------------- */

/**
 * Pre-render every city × en/hi at build time. Other locales render on-demand
 * via the parent dynamic segments and inherit the same content via i18n
 * fallback. Building only en+hi keeps the static surface focused on the two
 * locales Indian search traffic actually uses.
 */
export async function generateStaticParams() {
  const locales: Locale[] = ["en", "hi"];
  const country = "in";
  const params: Array<{ country: string; locale: string; city: string }> = [];
  for (const city of INDIA_CITIES) {
    for (const locale of locales) {
      params.push({ country, locale, city: city.slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ country: string; locale: string; city: string }>;
}): Promise<Metadata> {
  const { country, locale, city: citySlug } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) return { title: "Not found" };

  const lc = (LOCALE_CODES.includes(locale as Locale) ? locale : "en") as Locale;

  // City pages only have unique value on the India market — same content
  // rendered under another country slug would be a duplicate. Non-IN
  // countries get noindex so Google never sees them as ranking candidates.
  const indexable = country === "in" && isTargetCountry(country);

  const canonical = `/${country}/${lc}/${CITIES_PATH}/${city.slug}`;
  const languages: Record<string, string> = {};
  for (const lang of LOCALE_CODES) {
    languages[LOCALES[lang].htmlLang] =
      `${BASE_URL}/${country}/${lang}/${CITIES_PATH}/${city.slug}`;
  }
  languages["x-default"] = `${BASE_URL}/in/en/${CITIES_PATH}/${city.slug}`;

  return {
    title: city.metaTitle,
    description: city.metaDescription,
    keywords: city.metaKeywords,
    metadataBase: new URL(BASE_URL),
    alternates: { canonical, languages },
    openGraph: {
      title: city.metaTitle,
      description: city.metaDescription,
      url: `${BASE_URL}${canonical}`,
      siteName: "Sanat Dynamo",
      locale: `${lc}_${country.toUpperCase()}`,
      type: "website",
      images: [
        {
          url: `${BASE_URL}/og.png`,
          width: 1200,
          height: 630,
          alt: `Sanat Dynamo — ${city.name}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: city.metaTitle,
      description: city.metaDescription,
      images: [`${BASE_URL}/og.png`],
    },
    robots: indexable
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
      : {
          index: false,
          follow: true,
          googleBot: { index: false, follow: true },
        },
    other: {
      "geo.country": "IN",
      "geo.region": `IN-${city.stateCode}`,
      "geo.placename": city.name,
      "geo.position": `${city.geo.lat};${city.geo.lng}`,
      ICBM: `${city.geo.lat}, ${city.geo.lng}`,
    },
  };
}

/* -------------------------------------------------------------------------- */
/*                              Page component                                */
/* -------------------------------------------------------------------------- */

export default async function CityPage({
  params,
}: {
  params: Promise<{ country: string; locale: string; city: string }>;
}) {
  const { country, locale, city: citySlug } = await params;
  const city = getCityBySlug(citySlug);

  // Cities only exist on the India market. Other countries get a 404 so
  // Google never treats those URLs as soft-200 duplicates.
  if (!city || country !== "in") {
    notFound();
  }

  const lc = (LOCALE_CODES.includes(locale as Locale) ? locale : "en") as Locale;
  const t = getTranslation(lc);

  return (
    <>
      <CityJsonLd city={city} country={country} locale={lc} t={t} />
      <CityHero city={city} t={t} />
      <CityLocalContext city={city} />
      <CityWhyHire city={city} />
      <CityNeighborhoods city={city} />
      <Services t={t} country={country} />
      <CityIndustriesAngle city={city} />
      <CaseStudies t={t} country={country} />
      <CityCaseStudyCallout city={city} />
      <CityTestimonials city={city} />
      <TechStack t={t} />
      <CityFaq city={city} />
      <CityRelatedCities city={city} />
      <Cta t={t} country={country} />
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*                            JSON-LD (per-city)                              */
/* -------------------------------------------------------------------------- */

function CityJsonLd({
  city,
  country,
  locale,
  t,
}: {
  city: CityContent;
  country: string;
  locale: Locale;
  t: ReturnType<typeof getTranslation>;
}) {
  const url = `${BASE_URL}/${country}/${locale}/${CITIES_PATH}/${city.slug}`;

  // Breadcrumb: Home → Cities → {City}
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: t.nav.home, url: `${BASE_URL}/${country}/${locale}` },
    { name: "Cities", url: `${BASE_URL}/${country}/${locale}/${CITIES_PATH}` },
    { name: city.name, url },
  ]);

  // LocalBusiness — the single most important schema for ranking on
  // "best [service] in [city]" intent. Anchors the page to a real place
  // with NAP (name, address, phone) and lat/lng.
  const localBusinessLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${url}#business`,
    name: `${t.brand.name} — ${city.name}`,
    url,
    image: `${BASE_URL}/og.png`,
    description: city.metaDescription,
    priceRange: "₹₹₹",
    telephone: t.contact.details.phone,
    email: t.contact.details.emailHref,
    address: {
      "@type": "PostalAddress",
      addressLocality: city.name,
      addressRegion: city.state,
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: city.geo.lat,
      longitude: city.geo.lng,
    },
    areaServed: [
      { "@type": "City", name: city.name },
      ...city.neighborhoods.map((n) => ({ "@type": "Place", name: n })),
    ],
    knowsAbout: [
      "Website Development",
      "WhatsApp Automation",
      "SEO",
      "Custom Software",
      "ERP Integration",
      "D2C Commerce",
      "Lead Generation",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `Services offered in ${city.name}`,
      itemListElement: t.services.items.map((s, i) => ({
        "@type": "Offer",
        position: i + 1,
        itemOffered: {
          "@type": "Service",
          name: s.name,
          description: s.summary,
        },
      })),
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      bestRating: "5",
      ratingCount: "50",
      reviewCount: String(city.testimonials.length),
    },
    review: city.testimonials.map((tm) => ({
      "@type": "Review",
      author: { "@type": "Person", name: tm.author },
      reviewBody: tm.quote,
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
    })),
  };

  // FAQ — city-specific FAQs go into Google's FAQ rich result for the page
  const faqLd = buildFaqJsonLd(city.faq);

  // City-anchored web page node — ties the URL itself to the locality
  const pageLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": url,
    url,
    name: city.metaTitle,
    description: city.metaDescription,
    inLanguage: locale,
    isPartOf: { "@id": `${BASE_URL}/${country}/${locale}#website` },
    about: { "@id": `${url}#business` },
    breadcrumb: breadcrumbLd,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageLd) }}
      />
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*                             Sections (city)                                */
/* -------------------------------------------------------------------------- */

function CityHero({
  city,
  t,
}: {
  city: CityContent;
  t: ReturnType<typeof getTranslation>;
}) {
  return (
    <PageHero
      eyebrow={`${city.name} · ${city.state}`}
      title={
        <>
          The best website development & revenue-system company in{" "}
          <span className="text-accent">{city.name}</span>.
        </>
      }
      subtitle={city.heroSubheadline}
      breadcrumb={city.name}
    />
  );
}

function CityLocalContext({ city }: { city: CityContent }) {
  return (
    <Section className="pt-8">
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <div className="space-y-5">
            {city.localContext.map((p, i) => (
              <p
                key={i}
                className="text-base leading-relaxed text-muted-foreground sm:text-lg"
              >
                {p}
              </p>
            ))}
          </div>
        </div>

        <div className="lg:col-span-4">
          <div className="rounded-3xl border border-border bg-surface/40 p-6 backdrop-blur-xl">
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
              <MapPin size={11} />
              {city.name} · {city.state}
            </div>

            <div className="mt-4 grid gap-3">
              {city.heroStats.map((s) => (
                <div
                  key={s.label}
                  className="flex items-baseline justify-between gap-3 rounded-2xl border border-border bg-background p-4"
                >
                  <div className="font-display text-2xl font-semibold text-foreground">
                    {s.value}
                  </div>
                  <div className="text-right text-xs leading-snug text-muted-foreground">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 flex items-center gap-2 rounded-2xl border border-accent/30 bg-accent/5 p-4">
              <Users size={14} className="text-accent" />
              <span className="text-xs text-foreground">
                Serving {city.population}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

function CityWhyHire({ city }: { city: CityContent }) {
  return (
    <Section>
      <SectionHeader
        eyebrow={`Why hire us in ${city.name}`}
        title={
          <>
            Three things we do that{" "}
            <span className="text-accent">{city.name} agencies don&apos;t</span>.
          </>
        }
      />

      <div className="mt-10 grid gap-4 sm:gap-6 md:grid-cols-3">
        {city.whyHire.map((item, i) => (
          <div
            key={item.title}
            className="group relative overflow-hidden rounded-3xl border border-border bg-surface/40 p-6 transition-all hover:border-accent/30"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-2xl border border-accent/40 bg-accent/10 font-mono text-xs text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <CheckCircle2 size={16} className="text-accent" />
            </div>
            <h3 className="mt-5 font-display text-xl font-semibold text-foreground">
              {item.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {item.body}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function CityNeighborhoods({ city }: { city: CityContent }) {
  return (
    <Section className="bg-surface/20">
      <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <SectionHeader
            eyebrow="Areas we serve"
            title={
              <>
                Across {city.name}&apos;s commercial belts —{" "}
                <span className="text-accent">no zone untouched</span>.
              </>
            }
            subtitle={`We work with founders and operators headquartered across ${city.name}'s major business hubs. Each area below has its own buyer pattern; we tailor.`}
          />
        </div>

        <div className="lg:col-span-5">
          <div className="flex flex-wrap gap-2">
            {city.neighborhoods.map((n) => (
              <span
                key={n}
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-xs text-foreground"
              >
                <Building2 size={11} className="text-accent" />
                {n}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

function CityIndustriesAngle({ city }: { city: CityContent }) {
  return (
    <Section className="pt-0">
      <div className="rounded-3xl border border-accent/30 bg-accent/5 p-8 sm:p-12">
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
          <Sparkles size={11} />
          {city.name} industries
        </div>
        <p className="mt-5 max-w-3xl text-pretty text-base leading-relaxed text-foreground sm:text-lg">
          {city.industriesAngle}
        </p>
      </div>
    </Section>
  );
}

function CityCaseStudyCallout({ city }: { city: CityContent }) {
  return (
    <Section className="pt-0">
      <div className="grid gap-8 rounded-3xl border border-border bg-surface/40 p-8 sm:gap-10 sm:p-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
            <Star size={11} />
            {city.name} case study
          </div>
          <h3 className="mt-5 font-display text-2xl font-semibold leading-tight tracking-tight text-foreground sm:text-3xl">
            What a {city.name} engagement actually ships.
          </h3>
        </div>
        <div className="lg:col-span-8">
          <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
            {city.caseStudyCallout}
          </p>
          <LocalizedLink
            href="/case-studies"
            className="group mt-6 inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 py-2.5 text-sm font-semibold text-foreground transition-all hover:border-accent/50"
          >
            See more case studies
            <ArrowUpRight
              size={14}
              className="text-accent transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </LocalizedLink>
        </div>
      </div>
    </Section>
  );
}

function CityTestimonials({ city }: { city: CityContent }) {
  if (!city.testimonials.length) return null;
  return (
    <Section className="pt-0">
      <SectionHeader
        eyebrow="What our clients say"
        title={
          <>
            Operators in {city.name} who&apos;ve{" "}
            <span className="text-accent">shipped with us</span>.
          </>
        }
      />

      <div className="mt-10 grid gap-4 sm:gap-6 md:grid-cols-2">
        {city.testimonials.map((tm, i) => (
          <figure
            key={i}
            className="rounded-3xl border border-border bg-surface/40 p-7"
          >
            <div className="flex items-center gap-1 text-accent">
              {[0, 1, 2, 3, 4].map((s) => (
                <Star key={s} size={14} fill="currentColor" />
              ))}
            </div>
            <blockquote className="mt-4 text-base leading-relaxed text-foreground sm:text-lg">
              &ldquo;{tm.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-5 border-t border-border pt-5">
              <div className="font-semibold text-foreground">{tm.author}</div>
              <div className="mt-1 text-xs text-muted-foreground">{tm.role}</div>
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}

function CityFaq({ city }: { city: CityContent }) {
  return (
    <Section id="city-faq">
      <SectionHeader
        eyebrow={`${city.name} FAQs`}
        title={
          <>
            Direct answers about working with us in{" "}
            <span className="text-accent">{city.name}</span>.
          </>
        }
        subtitle="If you don't see your question, just ask us — we'll answer specifically for your business."
      />

      <div className="mt-10 grid gap-3 sm:gap-4">
        {city.faq.map((item) => (
          <details
            key={item.q}
            className="group rounded-2xl border border-border bg-surface/40 p-5 transition-colors open:border-accent/40 open:bg-surface"
          >
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-base font-semibold text-foreground">
              <span>{item.q}</span>
              <Plus
                size={18}
                className="mt-0.5 shrink-0 text-accent transition-transform duration-200 group-open:rotate-45"
              />
            </summary>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {item.a}
            </p>
          </details>
        ))}
      </div>
    </Section>
  );
}

function CityRelatedCities({ city }: { city: CityContent }) {
  const related = city.relatedCities
    .map((slug) => INDIA_CITIES.find((c) => c.slug === slug))
    .filter((c): c is CityContent => Boolean(c));
  if (!related.length) return null;
  return (
    <Section className="pt-0">
      <div className="rounded-3xl border border-border bg-surface/30 p-8 sm:p-12">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
              Other Indian metros
            </div>
            <h3 className="mt-3 font-display text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
              Looking somewhere else?
            </h3>
          </div>
          <LocalizedLink
            href="/cities"
            className="hidden items-center gap-1.5 rounded-full border border-border bg-background px-4 py-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground transition hover:border-accent/50 hover:text-accent sm:inline-flex"
          >
            All cities
            <ArrowUpRight size={11} />
          </LocalizedLink>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {related.map((r) => (
            <LocalizedLink
              key={r.slug}
              href={`/cities/${r.slug}`}
              className="group flex items-center justify-between rounded-2xl border border-border bg-background px-5 py-4 transition-all hover:border-accent/40 hover:bg-surface"
            >
              <div>
                <div className="text-sm font-semibold text-foreground">
                  {r.name}
                </div>
                <div className="mt-0.5 text-xs text-muted-foreground">
                  {r.state}
                </div>
              </div>
              <ArrowUpRight
                size={14}
                className="text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
              />
            </LocalizedLink>
          ))}
        </div>
      </div>
    </Section>
  );
}
