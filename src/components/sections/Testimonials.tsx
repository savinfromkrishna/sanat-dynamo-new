"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { Section, SectionHeader } from "../primitives/section";
import type { Messages } from "@/lib/i18n";

export function Testimonials({ t }: { t: Messages }) {
  return (
    <Section id="testimonials">
      <SectionHeader
        eyebrow={t.testimonials.eyebrow}
        title={t.testimonials.title}
        align="center"
      />

      {/* Average rating bar */}
      <div className="mx-auto mt-8 flex w-fit items-center gap-3 rounded-full border border-border bg-surface/60 px-5 py-2.5 backdrop-blur-sm">
        <div className="flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={14}
              className="text-accent"
              fill="currentColor"
            />
          ))}
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
          4.9 / 5 · 50+ engagements
        </span>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2">
        {t.testimonials.items.map((tm, i) => (
          <motion.figure
            key={i}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: (i % 2) * 0.08 }}
            className="group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-border bg-surface/60 p-5 sm:p-8 transition-all hover:border-accent/30 hover:bg-surface"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-accent/5 blur-3xl transition-opacity duration-500 group-hover:bg-accent/15"
            />
            <div className="flex items-center justify-between">
              <Quote
                size={36}
                strokeWidth={1}
                className="text-accent/30"
                aria-hidden
              />
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, k) => (
                  <Star
                    key={k}
                    size={12}
                    className="text-accent"
                    fill="currentColor"
                  />
                ))}
              </div>
            </div>
            <blockquote className="mt-4 text-balance text-base sm:text-lg leading-relaxed text-foreground">
              {tm.quote}
            </blockquote>
            <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-accent/30 to-accent/10 font-display text-base font-semibold text-accent ring-1 ring-accent/30">
                {tm.author.charAt(0)}
              </div>
              <div>
                <div className="text-sm font-semibold text-foreground">
                  {tm.author}
                </div>
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                  {tm.role}
                </div>
              </div>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </Section>
  );
}
