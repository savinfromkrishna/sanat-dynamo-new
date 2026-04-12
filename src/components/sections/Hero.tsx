"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Play,
  Sparkles,
  TrendingUp,
  Users,
  IndianRupee,
  Layers,
} from "lucide-react";
import LocalizedLink from "../LocalizedLink";
import { HeroNetwork } from "../illustrations";
import type { Messages } from "@/lib/i18n";

const statIcons = [Users, IndianRupee, TrendingUp, Layers] as const;

export function Hero({ t }: { t: Messages }) {
  const stats = t.socialProof.stats;

  return (
    <section className="relative overflow-hidden pt-28 pb-16 sm:pt-44 sm:pb-32 lg:pt-52 lg:pb-40">
      {/* Background layers */}
      <div className="bg-mesh absolute inset-0 -z-20" />
      <div className="bg-grid bg-grid-fade absolute inset-0 -z-10 opacity-60" />
      <div className="bg-noise absolute inset-0 -z-10 opacity-[0.18] mix-blend-overlay" />
      <div
        className="absolute inset-x-0 top-0 -z-10 mx-auto h-[520px] w-[80%] max-w-5xl blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, oklch(0.78 0.165 70 / 0.18), transparent)",
        }}
      />
      <div className="pointer-events-none absolute -left-24 top-32 -z-10 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 -z-10 h-96 w-96 rounded-full bg-accent-2/10 blur-3xl" />

      <div className="container-px relative mx-auto max-w-7xl">
        {/* Eyebrow + live availability */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-2 backdrop-blur-sm">
            <Sparkles size={12} className="text-accent" />
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              {t.hero.eyebrow}
            </span>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-success/30 bg-success/10 px-4 py-2 backdrop-blur-sm">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-success">
              3 audit slots open this week
            </span>
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08 }}
          className="text-balance mx-auto mt-8 max-w-5xl text-center font-display text-[clamp(2.5rem,7vw,5.75rem)] font-semibold leading-[0.95] tracking-tight text-foreground"
        >
          {t.hero.title}
          <br />
          <span className="relative inline-block">
            <span className="relative z-10 bg-gradient-to-br from-[oklch(0.85_0.16_72)] via-accent to-[oklch(0.66_0.18_55)] bg-clip-text text-transparent">
              {t.hero.titleAccent}
            </span>
            <svg
              aria-hidden
              viewBox="0 0 300 12"
              className="absolute -bottom-3 left-0 h-3 w-full text-accent/70"
              preserveAspectRatio="none"
            >
              <path
                d="M2 8 Q 75 2, 150 6 T 298 4"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.18 }}
          className="text-pretty mx-auto mt-10 max-w-2xl text-center text-lg leading-relaxed text-muted-foreground sm:text-xl"
        >
          {t.hero.subtitle}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.28 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <LocalizedLink
            href="/contact"
            className="group relative inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-7 py-4 text-base font-semibold text-accent-foreground shadow-[0_16px_48px_-12px_oklch(0.78_0.165_70/0.55)] transition-all hover:-translate-y-0.5 hover:shadow-[0_24px_56px_-12px_oklch(0.78_0.165_70/0.7)] sm:w-auto"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-accent to-[oklch(0.7_0.18_55)] opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-80"
            />
            {t.hero.primaryCta}
            <ArrowUpRight
              size={18}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </LocalizedLink>
          <LocalizedLink
            href="/case-studies"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-border bg-surface/60 px-7 py-4 text-base font-semibold text-foreground backdrop-blur-sm transition-all hover:border-border-strong hover:bg-surface sm:w-auto"
          >
            <Play size={14} className="text-accent" fill="currentColor" />
            {t.hero.secondaryCta}
          </LocalizedLink>
        </motion.div>

        {/* Trust note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-6 text-center font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground"
        >
          ✦ {t.hero.trustNote}
        </motion.p>

        {/* Network diagram — visual representation of the revenue system */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mx-auto mt-16 max-w-3xl"
        >
          <HeroNetwork />
        </motion.div>

        {/* Stats card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="border-grad mt-12 rounded-3xl p-1 shadow-2xl"
        >
          <div className="rounded-[22px] bg-surface/80 p-5 backdrop-blur-xl sm:p-8">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                  By the numbers
                </span>
              </div>
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                Last 18 months
              </span>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-4 sm:gap-x-4">
              {stats.map((s, i) => {
                const Icon = statIcons[i] ?? TrendingUp;
                return (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 + i * 0.08 }}
                    className="relative flex flex-col items-start"
                  >
                    {i > 0 && (
                      <div className="absolute -left-3 top-2 hidden h-16 w-px bg-border sm:block" />
                    )}
                    <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-background text-accent">
                      <Icon size={16} strokeWidth={1.75} />
                    </div>
                    <div className="font-display text-4xl font-semibold leading-none tracking-tight text-foreground sm:text-5xl">
                      {s.value}
                    </div>
                    <div className="mt-3 text-sm text-muted-foreground">
                      {s.label}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
