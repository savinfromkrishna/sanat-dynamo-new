import { MapPin, ShieldCheck, Clock, Wallet } from "lucide-react";
import { getCountryContent } from "@/lib/country-content";
import { isResolvableCountry, BASE_URL } from "@/lib/constants";
import type { Messages } from "@/lib/i18n";
import { Section } from "../primitives/section";

/**
 * CountryTrustBlock — the single biggest duplicate-content breaker.
 *
 * Renders 2–3 unique paragraphs per country (~100–140 words) plus a row of
 * market-specific facts: currency/VAT, timezone, regulatory compliance,
 * served cities. For non-target countries we render nothing — those pages
 * are `noindex` anyway, and we don't want to ship half-baked templated copy
 * to them.
 *
 * This section also emits a country-scoped LocalBusiness JSON-LD with
 * `areaServed` listing named cities, which is a strong local-SEO signal.
 */
export function CountryTrustBlock({
  t,
  country,
}: {
  t: Messages;
  country: string;
}) {
  if (!isResolvableCountry(country)) return null;

  const c = getCountryContent(country);

  // LocalBusiness JSON-LD — country-specific. Distinct from CityBanner's
  // geo-derived one: that one fires on city-match; this one is always the
  // target-country canonical (Dubai for AE, Bengaluru for IN, London for GB).
  const localBusinessLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: `${t.brand.name} — ${c.countryName}`,
    url: `${BASE_URL}/${c.code}/en`,
    image: `${BASE_URL}/og.png`,
    description: c.trustBlock.body[0],
    priceRange: "₹₹₹",
    address: {
      "@type": "PostalAddress",
      addressLocality: c.business.addressLocality ?? c.countryName,
      addressRegion: c.business.addressRegion,
      addressCountry: c.code.toUpperCase(),
    },
    areaServed: c.business.areaServed.map((city) => ({
      "@type": "City",
      name: city,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessLd) }}
      />
      <Section id="country-trust">
        <div className="mx-auto max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5">
            <MapPin size={12} className="text-accent" />
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
              {c.countryName}
            </span>
          </div>

          <h2 className="text-balance mt-6 font-display text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            {c.trustBlock.title}
          </h2>

          <div className="mt-8 space-y-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {c.trustBlock.body.map((para, i) => (
              <p key={i} className="text-pretty">
                {para}
              </p>
            ))}
          </div>

          {/* Market facts row — currency, timezone, compliance, cities.
              Mobile: 2-col grid (cards are small enough to fit two-up). */}
          <div className="mt-10 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-4 lg:grid-cols-4">
            <div className="rounded-2xl border border-border bg-surface/60 p-5">
              <Wallet size={16} className="text-accent" strokeWidth={1.75} />
              <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                Currency
              </div>
              <div className="mt-2 text-sm text-foreground">
                {c.currencyLine}
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-surface/60 p-5">
              <Clock size={16} className="text-accent" strokeWidth={1.75} />
              <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                Timezone
              </div>
              <div className="mt-2 text-sm text-foreground">
                {c.timezone.label}
              </div>
              <div className="mt-1 text-xs text-muted-foreground">
                {c.timezone.callWindow}
              </div>
            </div>
            {c.regulatoryNote && (
              <div className="rounded-2xl border border-border bg-surface/60 p-5">
                <ShieldCheck size={16} className="text-accent" strokeWidth={1.75} />
                <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                  Compliance
                </div>
                <div className="mt-2 text-sm text-foreground">
                  {c.regulatoryNote}
                </div>
              </div>
            )}
            <div className="rounded-2xl border border-border bg-surface/60 p-5">
              <MapPin size={16} className="text-accent" strokeWidth={1.75} />
              <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                Serving
              </div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {c.business.areaServed.slice(0, 6).map((city) => (
                  <span
                    key={city}
                    className="rounded-full border border-border bg-background px-2.5 py-1 text-xs text-muted-foreground"
                  >
                    {city}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
