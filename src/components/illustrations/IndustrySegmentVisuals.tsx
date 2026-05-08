"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Sparkles, Layers, AlertTriangle, CheckCircle2, Zap } from "lucide-react";

/**
 * Visualizations specific to /industries/[slug] pages.
 * Each one tells a piece of the per-industry story:
 *   - StuckStateFlow: today (chaos) → migration → after (one system)
 *   - DeliverableStack: the building blocks we ship, layered
 *   - MetricRadialGrid: animated radial dials for outcome metrics
 *   - PainConnectionWeb: pain points wired together so the systemic
 *     nature of the leak is obvious
 */

type SectorTheme = {
  /* oklch base color, no opacity */
  primary: string;
  /* secondary accent, oklch base */
  secondary: string;
  /* "Today" label e.g. "Tally + Excel + WhatsApp" */
  beforeLabel: string;
  /* before-state nodes shown as the chaos cluster */
  beforeNodes: string[];
  /* migration phrase shown along the arrow */
  migrationLabel: string;
  /* "After" label e.g. "Cloud ERP" */
  afterLabel: string;
  /* after-state surface labels */
  afterModules: string[];
  /* outcome metrics — value + label */
  outcomeMetrics: Array<{ value: string; label: string; pct?: number }>;
};

export const SECTOR_THEMES: Record<string, SectorTheme> = {
  manufacturing: {
    primary: "oklch(0.78 0.165 70)",
    secondary: "oklch(0.66 0.18 295)",
    beforeLabel: "Today's stack",
    beforeNodes: ["Tally", "Excel", "WhatsApp", "Paper job-cards", "Walk-up CA"],
    migrationLabel: "6-week migration · parallel run with Tally",
    afterLabel: "After we ship",
    afterModules: ["BOM + Routing", "Multi-godown", "GST e-invoice", "Daily P&L", "Shop-floor app"],
    outcomeMetrics: [
      { value: "−80%", label: "manual entry", pct: 80 },
      { value: "Daily", label: "P&L on phone", pct: 100 },
      { value: "−40%", label: "lead-time", pct: 40 },
      { value: "100%", label: "GST automated", pct: 100 },
    ],
  },
  "real-estate": {
    primary: "oklch(0.66 0.18 295)",
    secondary: "oklch(0.78 0.165 70)",
    beforeLabel: "Today's funnel",
    beforeNodes: ["99acres", "MagicBricks", "Housing.com", "WhatsApp", "Excel"],
    migrationLabel: "4–6 week routing build · sub-5-min SLA live in 30 days",
    afterLabel: "After we ship",
    afterModules: ["Round-robin CRM", "WhatsApp nurture", "RERA pages", "NRI microsites", "CP sub-accounts"],
    outcomeMetrics: [
      { value: "0–5 min", label: "first response", pct: 95 },
      { value: "3–5x", label: "qualified inbound", pct: 80 },
      { value: "−40%", label: "cost per lead", pct: 40 },
      { value: "2x", label: "site-visit → booking", pct: 65 },
    ],
  },
  healthcare: {
    primary: "oklch(0.74 0.16 155)",
    secondary: "oklch(0.78 0.165 70)",
    beforeLabel: "Today's clinic stack",
    beforeNodes: ["Practo", "WhatsApp", "Paper file", "iPad scan", "Excel"],
    migrationLabel: "4-week booking + EMR live · Practo runs in parallel",
    afterLabel: "After we ship",
    afterModules: ["Online + WA booking", "Auto reminders", "EMR (3-tap)", "Review automation", "Recall flows"],
    outcomeMetrics: [
      { value: "−60%", label: "reception calls", pct: 60 },
      { value: "−25%", label: "no-show rate", pct: 25 },
      { value: "5–10x", label: "review velocity", pct: 90 },
      { value: "+40–80%", label: "organic bookings", pct: 70 },
    ],
  },
  ecommerce: {
    primary: "oklch(0.65 0.22 25)",
    secondary: "oklch(0.66 0.18 295)",
    beforeLabel: "Today's stack",
    beforeNodes: ["Shopify defaults", "Generic theme", "No abandoned-cart", "Manual COD calls", "No retention"],
    migrationLabel: "6–10 week build · WhatsApp recovery live in week 2",
    afterLabel: "After we ship",
    afterModules: ["Headless storefront", "WA cart recovery", "COD verification", "Subscriptions", "Retention loop"],
    outcomeMetrics: [
      { value: "+3%", label: "CVR lift", pct: 75 },
      { value: "28%", label: "cart recovery", pct: 28 },
      { value: "2x", label: "repeat purchase", pct: 65 },
      { value: "−40%", label: "RTO loss", pct: 40 },
    ],
  },
  edtech: {
    primary: "oklch(0.66 0.18 295)",
    secondary: "oklch(0.74 0.16 155)",
    beforeLabel: "Today's enrollment ops",
    beforeNodes: ["Spreadsheets", "Manual calls", "WhatsApp groups", "Generic LMS", "No retention"],
    migrationLabel: "6–8 week build · counsellor inbox live in week 3",
    afterLabel: "After we ship",
    afterModules: ["Counsellor CRM", "WhatsApp drip", "Demo booking", "Batch + payment", "Parent app"],
    outcomeMetrics: [
      { value: "3–4x", label: "faster enrollments", pct: 80 },
      { value: "−30%", label: "dropout rate", pct: 30 },
      { value: "0–5 min", label: "lead response", pct: 95 },
      { value: "2x", label: "referrals", pct: 60 },
    ],
  },
};

/* -------------------------------------------------------------------------- */
/*                            StuckStateFlow                                  */
/* -------------------------------------------------------------------------- */

/** Animated before → migration → after diagram. Used between intro & pains. */
export function StuckStateFlow({ slug }: { slug: string }) {
  const theme = SECTOR_THEMES[slug];
  if (!theme) return null;

  return (
    <div className="relative overflow-hidden rounded-3xl border border-border bg-surface/40 p-6 sm:p-10">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full blur-3xl"
        style={{ background: `${theme.primary.replace(")", " / 0.12)")}` }}
      />
      <div className="bg-grid bg-grid-fade absolute inset-0 opacity-40" />

      <div className="relative">
        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            <Zap size={11} className="text-accent" />
            Migration map
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            today → live system
          </span>
        </div>

        <h3 className="mt-5 max-w-2xl font-display text-2xl font-semibold leading-tight tracking-tight text-foreground sm:text-3xl">
          What we replace, in plain view.
        </h3>

        <div className="mt-10 grid gap-6 lg:grid-cols-12 lg:items-stretch">
          {/* BEFORE */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5"
          >
            <div className="h-full rounded-2xl border border-danger/30 bg-danger/5 p-5">
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-danger/80">
                <AlertTriangle size={11} />
                {theme.beforeLabel}
              </div>
              <div className="mt-5 grid grid-cols-2 gap-2.5">
                {theme.beforeNodes.map((n, i) => (
                  <motion.div
                    key={n}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 + i * 0.06 }}
                    className="relative overflow-hidden rounded-xl border border-danger/20 bg-background/70 px-3 py-2.5 text-xs font-semibold text-foreground"
                  >
                    <span className="absolute inset-y-0 left-0 w-0.5 bg-danger/60" />
                    {n}
                  </motion.div>
                ))}
              </div>
              <div className="mt-5 flex items-center justify-between border-t border-danger/15 pt-4">
                <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-danger/70">
                  Status
                </span>
                <span className="text-xs font-semibold text-danger">
                  Disconnected · manual · slow
                </span>
              </div>
            </div>
          </motion.div>

          {/* ARROW */}
          <div className="relative flex items-center justify-center lg:col-span-2">
            <MigrationArrow color={theme.primary} label={theme.migrationLabel} />
          </div>

          {/* AFTER */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <div
              className="h-full rounded-2xl border p-5"
              style={{
                borderColor: theme.primary.replace(")", " / 0.4)"),
                background: theme.primary.replace(")", " / 0.05)"),
              }}
            >
              <div
                className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em]"
                style={{ color: theme.primary }}
              >
                <Sparkles size={11} />
                {theme.afterLabel}
              </div>
              <div className="mt-5 space-y-2">
                {theme.afterModules.map((m, i) => (
                  <motion.div
                    key={m}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.08, type: "spring", stiffness: 180 }}
                    className="flex items-center justify-between rounded-xl border border-border bg-background/70 px-4 py-2.5"
                  >
                    <div className="flex min-w-0 items-center gap-2.5">
                      <CheckCircle2
                        size={14}
                        strokeWidth={2}
                        style={{ color: theme.primary }}
                      />
                      <span className="truncate text-sm font-semibold text-foreground">
                        {m}
                      </span>
                    </div>
                    <span
                      className="font-mono text-[9px] uppercase tracking-[0.18em]"
                      style={{ color: theme.primary }}
                    >
                      live
                    </span>
                  </motion.div>
                ))}
              </div>
              <div
                className="mt-5 flex items-center justify-between border-t pt-4"
                style={{ borderColor: theme.primary.replace(")", " / 0.2)") }}
              >
                <span
                  className="font-mono text-[9px] uppercase tracking-[0.22em]"
                  style={{ color: theme.primary }}
                >
                  Status
                </span>
                <span
                  className="text-xs font-semibold"
                  style={{ color: theme.primary }}
                >
                  One system · automated · daily
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function MigrationArrow({ color, label }: { color: string; label: string }) {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center py-4">
      <svg
        viewBox="0 0 200 60"
        className="hidden h-12 w-full max-w-[200px] lg:block"
        fill="none"
      >
        <defs>
          <linearGradient id="mig-grad" x1="0" y1="30" x2="200" y2="30" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="oklch(0.55 0.22 25 / 0.4)" />
            <stop offset="100%" stopColor={color.replace(")", " / 0.65)")} />
          </linearGradient>
        </defs>
        <motion.path
          d="M 5 30 L 185 30"
          stroke="url(#mig-grad)"
          strokeWidth="1.4"
          strokeDasharray="4 3"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
        <motion.path
          d="M 178 22 L 195 30 L 178 38"
          stroke={color.replace(")", " / 0.7)")}
          strokeWidth="1.4"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 1.2 }}
        />
        {/* travelling particle */}
        <motion.circle
          r="3"
          cy="30"
          fill={color}
          animate={{ cx: [5, 185], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }}
        />
        <motion.circle
          r="2.5"
          cy="30"
          fill={color.replace(")", " / 0.6)")}
          animate={{ cx: [5, 185], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "linear", delay: 0.8 }}
        />
      </svg>
      {/* mobile vertical arrow */}
      <svg
        viewBox="0 0 60 120"
        className="block h-24 w-full max-w-[60px] lg:hidden"
        fill="none"
      >
        <motion.path
          d="M 30 5 L 30 105"
          stroke={color.replace(")", " / 0.6)")}
          strokeWidth="1.4"
          strokeDasharray="4 3"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
        />
        <motion.path
          d="M 22 100 L 30 115 L 38 100"
          stroke={color.replace(")", " / 0.7)")}
          strokeWidth="1.4"
          fill="none"
          strokeLinecap="round"
        />
        <motion.circle
          r="3"
          cx="30"
          fill={color}
          animate={{ cy: [5, 105], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }}
        />
      </svg>
      <div
        className="mt-3 max-w-[180px] text-center font-mono text-[9px] uppercase leading-relaxed tracking-[0.16em]"
        style={{ color }}
      >
        {label}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                            DeliverableStack                                */
/* -------------------------------------------------------------------------- */

/**
 * Renders deliverables as a layered stack — each layer reveals on scroll
 * with parallax depth, evoking the architectural build the team ships.
 */
export function DeliverableStack({
  slug,
  deliverables,
}: {
  slug: string;
  deliverables: Array<{ label: string; description: string }>;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const theme = SECTOR_THEMES[slug];
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const accent = theme?.primary ?? "oklch(0.78 0.165 70)";

  return (
    <div ref={containerRef} className="relative">
      {/* layered glow background */}
      <motion.div
        aria-hidden
        style={{
          y: useTransform(scrollYProgress, [0, 1], [-40, 40]),
          background: accent.replace(")", " / 0.1)"),
        }}
        className="pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full blur-3xl"
      />

      <div className="relative grid gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <div
              className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em]"
              style={{
                borderColor: accent.replace(")", " / 0.4)"),
                background: accent.replace(")", " / 0.06)"),
                color: accent,
              }}
            >
              <Layers size={11} />
              Build stack · {deliverables.length} layers
            </div>
            <h3 className="mt-4 font-display text-2xl font-semibold leading-tight tracking-tight text-foreground sm:text-3xl">
              Each layer is a thing we ship
              <span className="text-accent">.</span>
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              The stack is opinionated. We don&apos;t check boxes; every layer
              earns its place by removing a specific manual step from your team.
            </p>
            <StackOverviewSVG count={deliverables.length} accent={accent} />
          </div>
        </div>

        <div className="lg:col-span-8">
          <div className="space-y-3">
            {deliverables.map((d, i) => {
              return (
                <motion.article
                  key={d.label}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                  className="group relative overflow-hidden rounded-2xl border border-border bg-background/70 p-5 transition-all hover:-translate-y-0.5 hover:border-accent/40 sm:p-6"
                  style={{
                    transform: `translateZ(0)`,
                  }}
                >
                  {/* layer index strip */}
                  <span
                    aria-hidden
                    className="absolute inset-y-0 left-0 w-1"
                    style={{
                      background: `linear-gradient(180deg, ${accent.replace(")", " / 0.55)")}, ${accent.replace(")", " / 0)")})`,
                    }}
                  />
                  <div className="flex items-start gap-4 pl-3 sm:gap-5">
                    <div
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border font-mono text-xs font-bold"
                      style={{
                        borderColor: accent.replace(")", " / 0.35)"),
                        background: accent.replace(")", " / 0.06)"),
                        color: accent,
                      }}
                    >
                      L{String(i + 1).padStart(2, "0")}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="font-display text-lg font-semibold tracking-tight text-foreground">
                          {d.label}
                        </h4>
                        <span
                          className="rounded-full px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.18em]"
                          style={{
                            background: accent.replace(")", " / 0.1)"),
                            color: accent,
                          }}
                        >
                          shipped
                        </span>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {d.description}
                      </p>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function StackOverviewSVG({ count, accent }: { count: number; accent: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className="mt-8 hidden h-44 w-full max-w-[200px] lg:block"
      fill="none"
      aria-hidden
    >
      {Array.from({ length: count }).map((_, i) => {
        const y = 30 + i * 18;
        const fade = 1 - i / count;
        return (
          <motion.g
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
          >
            <rect
              x={20 + i * 4}
              y={y}
              width={140 - i * 8}
              height={12}
              rx={3}
              fill={accent.replace(")", ` / ${0.08 + fade * 0.18})`)}
              stroke={accent.replace(")", ` / ${0.25 + fade * 0.25})`)}
              strokeWidth="0.6"
            />
            <circle
              cx={28 + i * 4}
              cy={y + 6}
              r="2"
              fill={accent}
              opacity={0.4 + fade * 0.4}
            />
          </motion.g>
        );
      })}
      <motion.path
        d={`M 10 ${30 + count * 18 + 8} L 190 ${30 + count * 18 + 8}`}
        stroke={accent.replace(")", " / 0.4)")}
        strokeWidth="0.8"
        strokeDasharray="2 3"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: count * 0.08 }}
      />
      <text
        x="100"
        y={30 + count * 18 + 22}
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="7"
        fill={accent.replace(")", " / 0.6)")}
      >
        ONE COHERENT BUILD
      </text>
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*                            MetricRadialGrid                                */
/* -------------------------------------------------------------------------- */

/**
 * Replaces flat metric cards with animated radial dials. The arc length
 * encodes a rough magnitude (pct, 0–100); the value text is the headline.
 */
export function MetricRadialGrid({
  slug,
  metrics,
  summary,
  title,
}: {
  slug: string;
  title: string;
  summary: string;
  metrics: Array<{ value: string; label: string }>;
}) {
  const theme = SECTOR_THEMES[slug];
  const themedMetrics = theme?.outcomeMetrics ?? [];
  // merge — fall back to provided metrics if theme not found
  const display = metrics.map((m, i) => ({
    value: m.value,
    label: m.label,
    pct: themedMetrics[i]?.pct ?? 70,
  }));
  const accent = theme?.primary ?? "oklch(0.78 0.165 70)";

  return (
    <div
      className="relative overflow-hidden rounded-3xl border p-6 sm:p-12"
      style={{
        borderColor: accent.replace(")", " / 0.3)"),
        background: `linear-gradient(135deg, ${accent.replace(")", " / 0.06)")}, ${accent.replace(")", " / 0.01)")})`,
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full blur-3xl"
        style={{ background: accent.replace(")", " / 0.18)") }}
      />
      <div className="relative grid gap-10 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-5">
          <div
            className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em]"
            style={{
              borderColor: accent.replace(")", " / 0.4)"),
              background: accent.replace(")", " / 0.06)"),
              color: accent,
            }}
          >
            <Sparkles size={11} />
            After we ship · 90 days
          </div>
          <h2 className="text-balance mt-4 font-display text-2xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            {summary}
          </p>
        </div>

        <div className="lg:col-span-7">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
            {display.map((m, i) => (
              <RadialDial
                key={m.label}
                value={m.value}
                label={m.label}
                pct={m.pct}
                color={accent}
                index={i}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function RadialDial({
  value,
  label,
  pct,
  color,
  index,
}: {
  value: string;
  label: string;
  pct: number;
  color: string;
  index: number;
}) {
  const r = 36;
  const c = 2 * Math.PI * r;
  const filled = Math.max(8, Math.min(100, pct));
  const dash = (filled / 100) * c;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ delay: index * 0.08, duration: 0.55 }}
      className="group relative flex flex-col items-center rounded-2xl border border-border bg-background/70 p-4 transition-all hover:-translate-y-0.5 sm:p-5"
    >
      <svg viewBox="0 0 100 100" className="h-24 w-24 sm:h-28 sm:w-28">
        {/* track */}
        <circle
          cx="50"
          cy="50"
          r={r}
          stroke="var(--svg-line-faint)"
          strokeWidth="3"
          fill="none"
        />
        {/* progress arc */}
        <motion.circle
          cx="50"
          cy="50"
          r={r}
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          strokeDasharray={`${dash} ${c}`}
          transform="rotate(-90 50 50)"
          initial={{ strokeDasharray: `0 ${c}` }}
          whileInView={{ strokeDasharray: `${dash} ${c}` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.2 + index * 0.08, ease: "easeOut" }}
        />
        {/* hash markers */}
        {Array.from({ length: 24 }).map((_, i) => {
          const a = (i / 24) * Math.PI * 2 - Math.PI / 2;
          const inner = 28;
          const outer = 32;
          return (
            <line
              key={i}
              x1={50 + inner * Math.cos(a)}
              y1={50 + inner * Math.sin(a)}
              x2={50 + outer * Math.cos(a)}
              y2={50 + outer * Math.sin(a)}
              stroke="var(--svg-line-faint)"
              strokeWidth="0.6"
            />
          );
        })}
        <text
          x="50"
          y="48"
          textAnchor="middle"
          fontFamily="var(--font-display)"
          fontSize="13"
          fontWeight="700"
          fill={color}
        >
          {value}
        </text>
        <text
          x="50"
          y="62"
          textAnchor="middle"
          fontFamily="var(--font-mono)"
          fontSize="6"
          letterSpacing="0.15em"
          fill="var(--muted-foreground)"
        >
          OUTCOME
        </text>
      </svg>
      <div className="mt-2 text-center text-xs leading-snug text-foreground sm:text-sm">
        {label}
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*                            PainConnectionWeb                               */
/* -------------------------------------------------------------------------- */

/**
 * Renders pain points in a connected graph view. Each pain links to a
 * shared "revenue leak" hub on the right, with animated trickle particles
 * making the systemic loss visceral.
 */
export function PainConnectionWeb({
  pains,
  title,
}: {
  pains: Array<{ title: string; body: string }>;
  title: string;
}) {
  return (
    <div>
      <div className="max-w-3xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-danger/30 bg-danger/5 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-danger">
          <AlertTriangle size={11} />
          Where revenue leaks today
        </div>
        <h2 className="text-balance mt-4 font-display text-2xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem]">
          {title}
        </h2>
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <div className="space-y-3">
            {pains.map((p, i) => (
              <motion.article
                key={p.title}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.05, duration: 0.45 }}
                className="group relative overflow-hidden rounded-2xl border border-border bg-surface/40 p-4 transition-all hover:-translate-y-0.5 hover:border-danger/30 sm:p-5"
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-danger/30 bg-danger/5 font-mono text-xs font-semibold text-danger">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-display text-base font-semibold tracking-tight text-foreground sm:text-lg">
                      {p.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      {p.body}
                    </p>
                  </div>
                  <ArrowRight
                    size={16}
                    className="hidden shrink-0 text-danger/50 transition-transform group-hover:translate-x-0.5 lg:block"
                  />
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <PainHubSVG count={pains.length} />
          </div>
        </div>
      </div>
    </div>
  );
}

function PainHubSVG({ count }: { count: number }) {
  const cx = 200;
  const cy = 200;
  const r = 28;
  const distance = 130;
  const top = 60;
  const bottom = 340;

  return (
    <div className="relative overflow-hidden rounded-3xl border border-border bg-surface/40 p-4 sm:p-6">
      <div className="bg-grid bg-grid-fade absolute inset-0 opacity-50" />
      <div className="relative">
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-danger/80">
          <AlertTriangle size={11} />
          Revenue leak network
        </div>
        <p className="mt-2 max-w-xs text-xs leading-relaxed text-muted-foreground">
          Each pain isn&apos;t isolated — together they form one slow leak from
          first-touch to repeat purchase.
        </p>
        <svg viewBox="0 0 400 400" className="mt-4 h-auto w-full" fill="none">
          <defs>
            <radialGradient id="leak-grad" cx="50%" cy="50%">
              <stop offset="0%" stopColor="oklch(0.55 0.22 25 / 0.4)" />
              <stop offset="100%" stopColor="oklch(0.55 0.22 25 / 0)" />
            </radialGradient>
          </defs>
          {/* central leak hub */}
          <motion.circle
            cx={cx}
            cy={cy}
            r="60"
            fill="url(#leak-grad)"
            animate={{ r: [55, 68, 55], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <circle
            cx={cx}
            cy={cy}
            r="34"
            fill="var(--svg-node-fill)"
            stroke="oklch(0.55 0.22 25 / 0.5)"
            strokeWidth="1.2"
          />
          <text
            x={cx}
            y={cy - 2}
            textAnchor="middle"
            fontFamily="var(--font-mono)"
            fontSize="8"
            fill="oklch(0.55 0.22 25 / 0.7)"
          >
            REVENUE
          </text>
          <text
            x={cx}
            y={cy + 8}
            textAnchor="middle"
            fontFamily="var(--font-mono)"
            fontSize="8"
            fill="oklch(0.55 0.22 25 / 0.7)"
          >
            LEAK
          </text>

          {Array.from({ length: count }).map((_, i) => {
            // distribute on left side (where pain rows are listed)
            const t = count > 1 ? i / (count - 1) : 0.5;
            const y = top + t * (bottom - top);
            const x = cx - distance;
            return (
              <motion.g
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                {/* connecting curve */}
                <motion.path
                  d={`M ${x} ${y} Q ${(x + cx) / 2} ${y} ${cx - r} ${cy + (y - cy) * 0.2}`}
                  stroke="oklch(0.55 0.22 25 / 0.35)"
                  strokeWidth="0.7"
                  strokeDasharray="2 3"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: 0.2 + i * 0.08 }}
                />
                {/* travelling drip */}
                <motion.circle
                  r="2"
                  fill="oklch(0.55 0.22 25 / 0.7)"
                  animate={{
                    cx: [x, cx - r],
                    cy: [y, cy + (y - cy) * 0.2],
                    opacity: [0, 1, 1, 0],
                  }}
                  transition={{
                    duration: 2.4,
                    repeat: Infinity,
                    delay: i * 0.4,
                    ease: "easeInOut",
                  }}
                />
                {/* pain endpoint dot */}
                <circle
                  cx={x}
                  cy={y}
                  r="4"
                  fill="var(--svg-node-fill)"
                  stroke="oklch(0.55 0.22 25 / 0.5)"
                  strokeWidth="0.8"
                />
                <text
                  x={x - 8}
                  y={y + 3}
                  textAnchor="end"
                  fontFamily="var(--font-mono)"
                  fontSize="7"
                  fill="oklch(0.55 0.22 25 / 0.5)"
                >
                  P{String(i + 1).padStart(2, "0")}
                </text>
              </motion.g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
