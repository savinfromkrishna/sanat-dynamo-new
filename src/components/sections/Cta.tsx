"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Star, Quote } from "lucide-react";
import { ButtonLink } from "../primitives/button";
import { Eyebrow } from "../primitives/section";
import { CtaWaves } from "../illustrations";
import type { Messages } from "@/lib/i18n";
import { getCountryContent } from "@/lib/country-content";
import { isResolvableCountry } from "@/lib/constants";

export function Cta({ t, country }: { t: Messages; country?: string }) {
  const tm = t.testimonials.items[0];
  const countryContent =
    country && isResolvableCountry(country) ? getCountryContent(country) : null;

  // Use country-specific CTA copy when available — timezone-aware primary
  // button and "Free 45-minute audit in IST/ET/GST" support line. Falls
  // back to the global translated CTA for non-target countries.
  const primaryLabel = countryContent?.cta.primary ?? t.cta.primary;
  const trustNote = countryContent?.cta.supportLine ?? t.cta.trustNote;
  return (
    <section className="relative py-24 sm:py-32">
      <div className="container-px mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-2xl sm:rounded-[32px] border border-accent/20 bg-gradient-to-br from-surface via-surface-2 to-surface p-6 shadow-2xl sm:p-12 lg:p-20"
        >
          {/* Background visual */}
          <div className="bg-grid bg-grid-fade absolute inset-0 opacity-30" />
          <div className="bg-noise absolute inset-0 opacity-[0.18] mix-blend-overlay" />
          {/* Animated wave decoration */}
          <CtaWaves className="pointer-events-none" />
          <div
            aria-hidden
            className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full"
            style={{
              background:
                "radial-gradient(closest-side, oklch(0.78 0.165 70 / 0.25), transparent)",
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-32 -bottom-32 h-96 w-96 rounded-full"
            style={{
              background:
                "radial-gradient(closest-side, oklch(0.66 0.18 295 / 0.18), transparent)",
            }}
          />

          <div className="relative grid items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Eyebrow>{t.cta.eyebrow}</Eyebrow>
              <h2 className="text-balance mt-5 font-display text-2xl font-semibold leading-[1.08] tracking-tight text-foreground sm:text-4xl lg:text-6xl">
                {t.cta.title}
              </h2>
              <p className="text-pretty mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
                {t.cta.subtitle}
              </p>

              <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                <ButtonLink href="/contact" size="lg">
                  {primaryLabel}
                </ButtonLink>
                <ButtonLink href="/case-studies" variant="secondary" size="lg">
                  {t.cta.secondary}
                </ButtonLink>
              </div>

              <p className="mt-6 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                ✦ {trustNote}
              </p>
            </div>

            {/* Side testimonial card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl sm:rounded-3xl border border-border bg-background/80 p-5 sm:p-7 backdrop-blur-xl">
                <div
                  aria-hidden
                  className="absolute -top-3 right-6 flex h-9 w-9 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-[0_8px_24px_-8px_oklch(0.78_0.165_70/0.7)]"
                >
                  <ArrowUpRight size={16} />
                </div>
                <Quote
                  size={28}
                  strokeWidth={1}
                  className="text-accent/40"
                />
                <blockquote className="mt-3 text-base leading-relaxed text-foreground">
                  &ldquo;{tm.quote}&rdquo;
                </blockquote>
                <div className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-accent/30 to-accent/10 font-display text-sm font-semibold text-accent ring-1 ring-accent/30">
                    {tm.author.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-foreground">
                      {tm.author}
                    </div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                      {tm.role}
                    </div>
                  </div>
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, k) => (
                      <Star
                        key={k}
                        size={11}
                        className="text-accent"
                        fill="currentColor"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
