"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Globe, ChevronDown } from "lucide-react";
import { LOCALES, LOCALE_CODES, type Locale } from "@/lib/i18n";

interface LanguageSwitcherProps {
  locale: Locale;
  country: string;
  variant?: "compact" | "full";
}

export default function LanguageSwitcher({
  locale,
  country,
  variant = "compact",
}: LanguageSwitcherProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Close on outside click
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  // Close on Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const current = LOCALES[locale];

  // Build a URL with the new locale, preserving the rest of the path.
  function buildHref(target: Locale): string {
    const segments = (pathname || `/${country}/${locale}`).split("/").filter(Boolean);
    // segments[0] = country, segments[1] = locale, rest = path
    if (segments.length >= 2) {
      segments[1] = target;
      return "/" + segments.join("/");
    }
    return `/${country}/${target}`;
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className={`group inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 backdrop-blur-sm transition-all hover:border-border-strong hover:bg-surface ${
          variant === "compact" ? "h-9 px-3" : "h-11 px-4"
        }`}
        aria-label="Change language"
        aria-expanded={open}
      >
        <Globe size={14} className="text-accent" />
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground group-hover:text-foreground">
          {current.code}
        </span>
        <span className="text-xs text-foreground">{current.flag}</span>
        <ChevronDown
          size={12}
          className={`text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute right-0 top-full z-[110] mt-2 w-64 overflow-hidden rounded-2xl border border-border bg-surface/95 shadow-2xl backdrop-blur-xl"
            role="listbox"
          >
            <div className="border-b border-border bg-background/40 px-4 py-3">
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
                <Globe size={11} />
                Choose language
              </div>
              <div className="mt-1 text-xs text-muted-foreground">
                {LOCALE_CODES.length} languages · Auto-detected
              </div>
            </div>
            <ul className="max-h-80 overflow-y-auto py-2">
              {LOCALE_CODES.map((code) => {
                const item = LOCALES[code];
                const active = code === locale;
                return (
                  <li key={code}>
                    <a
                      href={buildHref(code)}
                      className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                        active
                          ? "bg-accent/10 text-foreground"
                          : "text-muted-foreground hover:bg-surface-2 hover:text-foreground"
                      }`}
                      role="option"
                      aria-selected={active}
                      lang={item.htmlLang}
                      dir={item.dir}
                    >
                      <span className="text-base">{item.flag}</span>
                      <span className="flex-1">
                        <span className="font-semibold text-foreground">
                          {item.nativeName}
                        </span>
                        <span className="ml-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                          {item.code}
                        </span>
                      </span>
                      {active && <Check size={14} className="text-accent" />}
                    </a>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
