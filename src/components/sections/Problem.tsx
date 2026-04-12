"use client";

import { motion } from "framer-motion";
import { TrendingDown, AlertTriangle } from "lucide-react";
import { Section, SectionHeader } from "../primitives/section";
import { ButtonLink } from "../primitives/button";
import { LeakFunnel } from "../illustrations";
import type { Messages } from "@/lib/i18n";

export function Problem({ t }: { t: Messages }) {
  return (
    <Section id="problem">
      {/* Decorative backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-72 bg-gradient-to-b from-danger/5 to-transparent"
      />
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <SectionHeader
            eyebrow={t.problem.eyebrow}
            title={t.problem.title}
            subtitle={t.problem.subtitle}
          />
        </div>
        <div className="hidden lg:col-span-5 lg:flex lg:items-center lg:justify-center">
          <LeakFunnel className="max-w-[280px] opacity-60" />
        </div>
      </div>

      <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {t.problem.points.map((p, i) => (
          <motion.div
            key={p.label}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-surface/60 p-7 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-danger/40 hover:bg-surface"
          >
            <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-danger/5 blur-2xl transition-opacity duration-500 group-hover:bg-danger/15" />

            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                Leak · 0{i + 1}
              </span>
              <TrendingDown size={16} className="text-danger/70" />
            </div>

            <div className="mt-6 font-display text-5xl font-semibold leading-none tracking-tight text-foreground sm:text-[3.25rem]">
              {p.stat}
            </div>
            <div className="mt-3 text-sm font-semibold text-foreground">
              {p.label}
            </div>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
              {p.detail}
            </p>

            {/* Mini meter */}
            <div className="mt-6">
              <div className="h-1 w-full overflow-hidden rounded-full bg-border/60">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${[55, 70, 100, 80][i] || 60}%` }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 1.1, delay: 0.2 + i * 0.06, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-danger/70 to-accent"
                />
              </div>
              <div className="mt-2 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground">
                <span>Severity</span>
                <span className="text-danger/80">High</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom CTA strip */}
      <div className="mt-14 flex flex-col items-center justify-between gap-6 rounded-3xl border border-border bg-surface/40 p-8 backdrop-blur-sm sm:flex-row sm:p-10">
        <div className="flex items-start gap-4 sm:items-center">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-danger/40 bg-danger/10 text-danger">
            <AlertTriangle size={20} />
          </div>
          <div>
            <div className="font-display text-xl font-semibold text-foreground sm:text-2xl">
              Every week of inaction compounds the cost.
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              Most leaks are fixed in a single 90-day sprint. Let&apos;s start with the audit.
            </p>
          </div>
        </div>
        <ButtonLink href="/services">{t.problem.cta}</ButtonLink>
      </div>
    </Section>
  );
}
