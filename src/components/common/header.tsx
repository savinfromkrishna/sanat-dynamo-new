"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Menu, X, ArrowUpRight, Sparkles } from "lucide-react";
import LocalizedLink from "../LocalizedLink";
import Logo from "../Logo/logo";
import LanguageSwitcher from "./LanguageSwitcher";
import { ThemeToggle } from "./ThemeToggle";
import {
  DesktopMegaNav,
  MobileMegaNav,
  type CityNavItem,
} from "./MegaMenu";
import type { Messages, Locale } from "@/lib/i18n";

interface HeaderProps {
  translations: Messages;
  locale: Locale;
  country: string;
  cities: CityNavItem[];
}

export default function Header({
  translations,
  locale,
  country,
  cities,
}: HeaderProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Top announcement bar */}
      <div className="relative z-[101] hidden border-b border-border/60 bg-surface/80 backdrop-blur-xl sm:block">
        <div className="container-px mx-auto flex h-9 max-w-7xl items-center justify-between text-[11px]">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Sparkles size={11} className="text-accent" />
            <span className="font-mono uppercase tracking-[0.22em]">
              Revenue Audits — 3 slots open this week
            </span>
          </div>
          <div className="hidden items-center gap-5 font-mono uppercase tracking-[0.22em] text-muted-foreground md:flex">
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-success pulse-dot" />
              All systems operational
            </span>
            <span>India · Serving global</span>
          </div>
        </div>
      </div>

      <header
        className={`fixed inset-x-0 z-[100] transition-all duration-500 ${
          scrolled
            ? "top-0 border-b border-border/60 bg-background/80 backdrop-blur-xl"
            : "top-0 sm:top-9 border-b border-transparent bg-transparent"
        }`}
      >
        <motion.div
          className="absolute inset-x-0 top-0 h-px origin-left bg-gradient-to-r from-transparent via-accent to-transparent"
          style={{ scaleX }}
        />

        <div className="container-px mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-3">
          <LocalizedLink href="/" className="group shrink-0">
            <Logo size="md" />
          </LocalizedLink>

          <DesktopMegaNav translations={translations} cities={cities} />

          <div className="hidden shrink-0 items-center gap-2 lg:flex xl:gap-3">
            <ThemeToggle />
            <LanguageSwitcher locale={locale} country={country} />
            <LocalizedLink
              href="/contact"
              className="group relative inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-accent px-4 py-2.5 text-sm font-semibold text-accent-foreground shadow-[0_8px_32px_-12px_oklch(0.78_0.165_70/0.6)] transition-all hover:shadow-[0_12px_36px_-10px_oklch(0.78_0.165_70/0.75)] xl:px-5"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-accent to-[oklch(0.7_0.18_55)] opacity-0 blur-md transition-opacity group-hover:opacity-80"
              />
              <span className="hidden xl:inline">{translations.nav.cta}</span>
              <span className="xl:hidden">Book audit</span>
              <ArrowUpRight
                size={15}
                className="shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </LocalizedLink>
          </div>

          <button
            className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface text-foreground lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="absolute inset-x-0 top-full max-h-[calc(100vh-72px)] overflow-y-auto border-b border-border bg-background/95 backdrop-blur-xl lg:hidden"
            >
              <div className="container-px mx-auto flex max-w-7xl flex-col gap-3 py-6">
                <MobileMegaNav
                  translations={translations}
                  cities={cities}
                  onNavigate={() => setOpen(false)}
                />
                <LocalizedLink
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-4 text-base font-semibold text-accent-foreground"
                >
                  {translations.nav.cta}
                  <ArrowUpRight size={18} />
                </LocalizedLink>
                <div className="mt-2 flex items-center justify-between px-5">
                  <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-success pulse-dot" />
                    All systems operational
                  </div>
                  <div className="flex items-center gap-2">
                    <ThemeToggle />
                    <LanguageSwitcher locale={locale} country={country} />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
