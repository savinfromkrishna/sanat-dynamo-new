"use client";

import { motion } from "framer-motion";
import {
  Zap,
  Search,
  Globe,
  Shield,
  Smartphone,
  Database,
  GitBranch,
  Headphones,
  type LucideIcon,
} from "lucide-react";
import { Section, SectionHeader } from "../primitives/section";
import { featureIllustrationMap } from "../illustrations";
import type { Messages } from "@/lib/i18n";

const iconMap: Record<string, LucideIcon> = {
  zap: Zap,
  search: Search,
  globe: Globe,
  shield: Shield,
  smartphone: Smartphone,
  database: Database,
  "git-branch": GitBranch,
  headphones: Headphones,
};

export function FeatureGrid({ t }: { t: Messages }) {
  const fg = t.featureGrid;
  return (
    <Section id="capabilities" className="bg-surface/20">
      <SectionHeader
        eyebrow={fg.eyebrow}
        title={fg.title}
        subtitle={fg.subtitle}
        meta={`${fg.items.length} capabilities`}
      />

      <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {fg.items.map((item, i) => {
          const Icon = iconMap[item.icon] ?? Zap;
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.45, delay: (i % 4) * 0.06 }}
              className="group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-border bg-surface/60 p-4 sm:p-6 transition-all hover:-translate-y-1 hover:border-accent/40 hover:bg-surface"
            >
              <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-accent/5 blur-2xl transition-opacity group-hover:bg-accent/15" />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />
              <div className="flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-border bg-background text-accent transition-colors group-hover:border-accent/40">
                  <Icon size={20} strokeWidth={1.75} />
                </div>
                {/* Animated sketch illustration */}
                {(() => {
                  const FeatIllust = featureIllustrationMap[item.icon];
                  return FeatIllust ? (
                    <div className="pointer-events-none h-14 w-20 opacity-70 transition-opacity duration-500 group-hover:opacity-100">
                      <FeatIllust className="h-full w-full" />
                    </div>
                  ) : null;
                })()}
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold text-foreground">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.body}
              </p>
              <div className="mt-5 font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground">
                Capability · 0{i + 1}
              </div>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
