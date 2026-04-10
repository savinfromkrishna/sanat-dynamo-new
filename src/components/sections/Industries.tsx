"use client";

import { motion } from "framer-motion";
import {
  ShoppingBag,
  Building2,
  GraduationCap,
  Stethoscope,
  Factory,
  ArrowUpRight,
  AlertTriangle,
  Sparkles,
} from "lucide-react";
import { Section, SectionHeader } from "../primitives/section";
import LocalizedLink from "../LocalizedLink";
import type { Messages } from "@/lib/i18n";

const iconMap = {
  ecommerce: ShoppingBag,
  "real-estate": Building2,
  edtech: GraduationCap,
  healthcare: Stethoscope,
  "sme-erp": Factory,
} as const;

export function Industries({ t }: { t: Messages }) {
  return (
    <Section id="industries" className="bg-surface/20">
      <SectionHeader
        eyebrow={t.industries.eyebrow}
        title={t.industries.title}
        subtitle={t.industries.subtitle}
        meta="5 sectors"
      />

      {/* Bento layout: featured (col-span 7) + 4 small cards */}
      <div className="mt-16 grid gap-5 lg:grid-cols-12">
        {t.industries.items.map((ind, i) => {
          const Icon = iconMap[ind.id as keyof typeof iconMap];
          const isFeatured = i === 0;
          return (
            <motion.div
              key={ind.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              id={ind.id}
              className={`group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-surface/60 p-7 transition-all duration-500 hover:border-accent/40 hover:bg-surface ${
                isFeatured ? "lg:col-span-7 lg:row-span-2" : "lg:col-span-5"
              }`}
            >
              <div className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-accent/5 blur-3xl transition-opacity duration-500 group-hover:bg-accent/15" />
              {isFeatured && (
                <div className="absolute right-6 top-6 z-10 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.22em] text-accent">
                  Largest segment
                </div>
              )}

              <div className="flex items-start justify-between gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-border bg-background text-accent transition-colors group-hover:border-accent/40">
                  {Icon && <Icon size={20} strokeWidth={1.75} />}
                </div>
                <span className="rounded-full border border-border bg-background px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground">
                  {ind.tag}
                </span>
              </div>

              <h3
                className={`mt-6 font-display font-semibold tracking-tight text-foreground ${
                  isFeatured ? "text-3xl sm:text-4xl" : "text-2xl"
                }`}
              >
                {ind.name}
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {ind.description}
              </p>

              {isFeatured && (
                <>
                  <div className="mt-6">
                    <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.22em] text-danger/80">
                      <AlertTriangle size={11} />
                      Common pain
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {ind.painPoints.map((pp) => (
                        <span
                          key={pp}
                          className="rounded-full border border-border bg-background px-3 py-1.5 text-xs text-muted-foreground"
                        >
                          {pp}
                        </span>
                      ))}
                    </div>
                  </div>
                </>
              )}

              <div className="mt-auto flex items-center justify-between border-t border-border pt-6">
                <div className="min-w-0 flex-1 pr-4">
                  <div className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.22em] text-accent">
                    <Sparkles size={10} />
                    Outcome
                  </div>
                  <div className="mt-1 truncate text-xs font-semibold text-accent">
                    {ind.outcome}
                  </div>
                </div>
                <LocalizedLink
                  href={`/industries#${ind.id}`}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-foreground transition-all hover:border-accent hover:text-accent"
                  aria-label={`Learn more about ${ind.name}`}
                >
                  <ArrowUpRight size={14} />
                </LocalizedLink>
              </div>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
