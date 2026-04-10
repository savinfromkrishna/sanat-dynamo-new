"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Menu, X, ArrowUpRight, Sparkles } from "lucide-react";
import LocalizedLink from "../LocalizedLink";
import Logo from "../Logo/logo";
import LanguageSwitcher from "./LanguageSwitcher";
import type { Messages, Locale } from "@/lib/i18n";

interface HeaderProps {
  translations: Messages;
  locale: Locale;
  country: string;
}

export default function Header({ translations, locale, country }: HeaderProps) {
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

  const nav = [
    { label: translations.nav.services, href: "/services" },
    { label: translations.nav.industries, href: "/industries" },
    { label: translations.nav.work, href: "/case-studies" },
    { label: translations.nav.about, href: "/about" },
    { label: translations.nav.contact, href: "/contact" },
  ];

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

        <div className="container-px mx-auto flex h-[72px] max-w-7xl items-center justify-between">
          <LocalizedLink href="/" className="group">
            <Logo size="md" />
          </LocalizedLink>

          <nav className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => (
              <LocalizedLink
                key={item.href}
                href={item.href}
                className="group relative rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
                <span className="pointer-events-none absolute inset-x-4 -bottom-px h-px scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100" />
              </LocalizedLink>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <LanguageSwitcher locale={locale} country={country} />
            <LocalizedLink
              href="/contact"
              className="group relative inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground shadow-[0_8px_32px_-12px_oklch(0.78_0.165_70/0.6)] transition-all hover:shadow-[0_12px_36px_-10px_oklch(0.78_0.165_70/0.75)]"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-accent to-[oklch(0.7_0.18_55)] opacity-0 blur-md transition-opacity group-hover:opacity-80"
              />
              {translations.nav.cta}
              <ArrowUpRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
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
              className="absolute inset-x-0 top-full border-b border-border bg-background/95 backdrop-blur-xl lg:hidden"
            >
              <div className="container-px mx-auto flex max-w-7xl flex-col gap-1 py-6">
                {nav.map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                  >
                    <LocalizedLink
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between rounded-2xl px-5 py-4 text-2xl font-semibold tracking-tight text-foreground hover:bg-surface"
                    >
                      {item.label}
                      <span className="font-mono text-xs text-muted-foreground">
                        0{i + 1}
                      </span>
                    </LocalizedLink>
                  </motion.div>
                ))}
                <LocalizedLink
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-4 text-base font-semibold text-accent-foreground"
                >
                  {translations.nav.cta}
                  <ArrowUpRight size={18} />
                </LocalizedLink>
                <div className="mt-4 flex items-center justify-between px-5">
                  <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-success pulse-dot" />
                    All systems operational
                  </div>
                  <LanguageSwitcher locale={locale} country={country} />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
