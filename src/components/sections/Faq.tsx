"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, MessageCircle, ArrowUpRight } from "lucide-react";
import { Section, SectionHeader } from "../primitives/section";
import LocalizedLink from "../LocalizedLink";
import type { Messages } from "@/lib/i18n";
import { getCountryContent } from "@/lib/country-content";
import { isTargetCountry } from "@/lib/constants";

export function Faq({ t, country }: { t: Messages; country?: string }) {
  const [open, setOpen] = useState<number | null>(0);

  const countryContent =
    country && isTargetCountry(country) ? getCountryContent(country) : null;

  // Append country-specific FAQs after the global list. Appending (not
  // prepending) preserves the most important global questions at the top
  // of the rendered list while adding unique market-relevant Q&As at the
  // bottom — which is where Google's FAQ rich-result picker reads from too.
  const items = countryContent
    ? [...t.faq.items, ...countryContent.faqAdditions]
    : t.faq.items;

  return (
    <Section id="faq">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeader
            eyebrow={t.faq.eyebrow}
            title={t.faq.title}
            subtitle="Direct answers — no fluff. If you don't see your question, just ask us."
          />

          {/* Sidebar contact card */}
          <div className="mt-8 sm:mt-10 rounded-2xl sm:rounded-3xl border border-accent/30 bg-accent/5 p-5 sm:p-7">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-accent/40 bg-background text-accent">
              <MessageCircle size={20} />
            </div>
            <h3 className="mt-5 font-display text-xl font-semibold text-foreground">
              Still have questions?
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Book a free 30-minute call. We&apos;ll answer everything specific to
              your business — no slide deck, no pitch.
            </p>
            <LocalizedLink
              href="/contact"
              className="group mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground shadow-[0_8px_28px_-10px_oklch(0.78_0.165_70/0.6)]"
            >
              Talk to a strategist
              <ArrowUpRight
                size={14}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </LocalizedLink>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="divide-y divide-border rounded-3xl border border-border bg-surface/40">
            {items.map((item, i) => {
              const isOpen = open === i;
              return (
                <div key={i}>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-4 py-5 text-left transition-colors hover:bg-surface sm:gap-6 sm:px-6 sm:py-6 lg:px-8"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-start gap-4">
                      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                        0{i + 1}
                      </span>
                      <span className="text-base font-semibold text-foreground sm:text-lg">
                        {item.q}
                      </span>
                    </div>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.25 }}
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors ${
                        isOpen
                          ? "border-accent bg-accent text-accent-foreground"
                          : "border-border text-accent"
                      }`}
                    >
                      <Plus size={16} />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="overflow-hidden"
                      >
                        <p className="px-4 pb-5 pl-12 text-sm leading-relaxed text-muted-foreground sm:px-6 sm:pb-7 sm:pl-[3.75rem] sm:text-base lg:px-8 lg:pl-[5rem]">
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Section>
  );
}
