"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  BookOpen,
  Briefcase,
  Building2,
  Factory,
  GraduationCap,
  LineChart,
  Mail,
  MapPin,
  ShoppingBag,
  Sparkles,
  Stethoscope,
  Users,
  type LucideIcon,
} from "lucide-react";
import LocalizedLink from "../LocalizedLink";
import type { Messages } from "@/lib/i18n";

export interface CityNavItem {
  slug: string;
  name: string;
  state: string;
  nickname?: string;
  themeColor?: string;
}

type PanelKey = "services" | "industries" | "work" | "cities";

interface NavItem {
  label: string;
  href: string;
  panel?: PanelKey;
  Icon: LucideIcon;
}

interface MegaMenuProps {
  translations: Messages;
  cities: CityNavItem[];
}

const INDUSTRY_ORDER = [
  "manufacturing",
  "real-estate",
  "healthcare",
  "ecommerce",
  "edtech",
] as const;

const INDUSTRY_ICON: Record<(typeof INDUSTRY_ORDER)[number], typeof Factory> = {
  manufacturing: Factory,
  "real-estate": Building2,
  healthcare: Stethoscope,
  ecommerce: ShoppingBag,
  edtech: GraduationCap,
};

export function DesktopMegaNav({ translations: t, cities }: MegaMenuProps) {
  const [active, setActive] = useState<PanelKey | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const items: NavItem[] = [
    { label: t.nav.services, href: "/services", panel: "services", Icon: Briefcase },
    { label: t.nav.industries, href: "/industries", panel: "industries", Icon: Factory },
    { label: t.nav.work, href: "/case-studies", panel: "work", Icon: LineChart },
    { label: "Cities", href: "/cities", panel: "cities", Icon: MapPin },
    { label: "Blog", href: "/blogs", Icon: BookOpen },
    { label: t.nav.about, href: "/about", Icon: Users },
    { label: t.nav.contact, href: "/contact", Icon: Mail },
  ];

  const open = (panel: PanelKey | undefined) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActive(panel ?? null);
  };
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setActive(null), 140);
  };
  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="relative" onMouseLeave={scheduleClose}>
      <nav
        className="hidden items-center gap-0.5 lg:flex xl:gap-1"
        onMouseEnter={cancelClose}
      >
        {items.map((item) => {
          const isActive = !!item.panel && active === item.panel;
          const { Icon } = item;
          return (
            <LocalizedLink
              key={item.href}
              href={item.href}
              className={`group relative inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-2 text-sm font-medium transition-all duration-200 xl:px-3.5 ${
                isActive
                  ? "bg-surface/70 text-foreground"
                  : "text-muted-foreground hover:bg-surface/60 hover:text-foreground"
              }`}
              onMouseEnter={() => open(item.panel)}
              onFocus={() => open(item.panel)}
              aria-haspopup={item.panel ? "true" : undefined}
              aria-expanded={item.panel ? isActive : undefined}
            >
              <Icon
                size={13}
                strokeWidth={2}
                className={`shrink-0 transition-all duration-300 ${
                  isActive
                    ? "text-accent scale-110"
                    : "text-muted-foreground/70 group-hover:text-accent group-hover:scale-110"
                }`}
              />
              <span>{item.label}</span>
              <span
                aria-hidden
                className={`pointer-events-none absolute inset-x-3 -bottom-0.5 h-[2px] origin-center rounded-full bg-gradient-to-r from-transparent via-accent to-transparent transition-transform duration-300 ${
                  isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                }`}
              />
            </LocalizedLink>
          );
        })}
      </nav>

      <AnimatePresence>
        {active && (
          <motion.div
            key={active}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute left-1/2 top-full z-[120] mt-3 w-[min(96vw,1100px)] -translate-x-1/2 overflow-hidden rounded-3xl border border-border bg-background/95 shadow-[0_28px_72px_-32px_rgba(0,0,0,0.55)] backdrop-blur-xl"
            onMouseEnter={cancelClose}
            onMouseLeave={scheduleClose}
            role="menu"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent"
            />
            {active === "services" && <ServicesPanel t={t} />}
            {active === "industries" && <IndustriesPanel t={t} />}
            {active === "work" && <WorkPanel t={t} />}
            {active === "cities" && <CitiesPanel cities={cities} />}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                  Panels                                    */
/* -------------------------------------------------------------------------- */

function ServicesPanel({ t }: { t: Messages }) {
  return (
    <div className="grid gap-2 p-3 lg:grid-cols-[2fr_1fr]">
      <div className="grid gap-1 sm:grid-cols-2">
        {t.services.items.map((s) => (
          <LocalizedLink
            key={s.id}
            href={`/services#${s.id}`}
            className="group relative rounded-2xl border border-transparent bg-surface/40 p-4 transition-all hover:-translate-y-0.5 hover:border-accent/30 hover:bg-surface"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
                {s.number} · {s.kicker}
              </span>
              <ArrowUpRight
                size={12}
                className="text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
              />
            </div>
            <div className="mt-2 font-display text-base font-semibold tracking-tight text-foreground">
              {s.name}
            </div>
            <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
              {s.summary}
            </p>
            <div className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-border bg-background/60 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
              {s.investment}
            </div>
          </LocalizedLink>
        ))}
      </div>
      <PanelAside
        eyebrow={t.services.eyebrow}
        title="We don't sell services. We solve problems."
        body={t.services.subtitle}
        cta={{ label: "All services", href: "/services" }}
      />
    </div>
  );
}

function IndustriesPanel({ t }: { t: Messages }) {
  const ordered = INDUSTRY_ORDER.flatMap((slug) => {
    const item = t.industries.items.find((it) => it.id === slug);
    return item ? [{ slug, item }] : [];
  });

  return (
    <div className="grid gap-2 p-3 lg:grid-cols-[2fr_1fr]">
      <div className="grid gap-1 sm:grid-cols-2">
        {ordered.map(({ slug, item }) => {
          const Icon = INDUSTRY_ICON[slug];
          const isPrimary = slug === "manufacturing";
          return (
            <LocalizedLink
              key={slug}
              href={`/industries/${slug}`}
              className={`group rounded-2xl border bg-surface/40 p-4 transition-all hover:-translate-y-0.5 hover:bg-surface ${
                isPrimary
                  ? "border-accent/40 hover:border-accent/60"
                  : "border-transparent hover:border-accent/30"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border ${
                    isPrimary
                      ? "border-accent/40 bg-accent-soft text-accent"
                      : "border-border bg-background text-accent"
                  }`}
                >
                  <Icon size={16} strokeWidth={1.75} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <div className="font-display text-sm font-semibold tracking-tight text-foreground">
                      {item.name}
                    </div>
                    {isPrimary && (
                      <span className="rounded-full bg-accent px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-[0.2em] text-accent-foreground">
                        Pivot
                      </span>
                    )}
                  </div>
                  <div className="mt-0.5 line-clamp-1 text-[11px] text-muted-foreground">
                    {item.tag}
                  </div>
                </div>
              </div>
              <div className="mt-3 line-clamp-2 rounded-xl border border-border/50 bg-background/60 p-2 font-mono text-[10px] leading-relaxed text-muted-foreground">
                {item.outcome}
              </div>
            </LocalizedLink>
          );
        })}
      </div>
      <PanelAside
        accent
        eyebrow="Primary pivot · Ahmedabad"
        title="Manufacturing first."
        body="Tally → cloud ERP in 6 weeks. GST e-invoicing, daily P&L on phone, 80% less manual entry."
        cta={{ label: "Open Manufacturing", href: "/industries/manufacturing" }}
      />
    </div>
  );
}

function WorkPanel({ t }: { t: Messages }) {
  const featured = t.caseStudies.items.slice(0, 4);
  return (
    <div className="grid gap-2 p-3 lg:grid-cols-[2fr_1fr]">
      <div className="grid gap-1 sm:grid-cols-2">
        {featured.map((c) => {
          const headline = c.metrics?.[0];
          return (
            <LocalizedLink
              key={c.id}
              href={`/case-studies#${c.id}`}
              className="group rounded-2xl border border-transparent bg-surface/40 p-4 transition-all hover:-translate-y-0.5 hover:border-accent/30 hover:bg-surface"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="rounded-full border border-border bg-background/60 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground">
                  {c.industry}
                </span>
                <span className="inline-flex items-center gap-1 font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground">
                  <MapPin size={9} />
                  {c.location}
                </span>
              </div>
              <div className="mt-3 line-clamp-2 font-display text-sm font-semibold leading-snug tracking-tight text-foreground">
                {c.title}
              </div>
              {headline && (
                <div className="mt-3 flex items-baseline gap-2 rounded-xl border border-border/50 bg-background/60 p-2">
                  <span className="font-display text-base font-semibold leading-none text-accent">
                    {headline.delta}
                  </span>
                  <span className="text-[10px] leading-tight text-muted-foreground">
                    {headline.label}
                  </span>
                </div>
              )}
            </LocalizedLink>
          );
        })}
      </div>
      <PanelAside
        eyebrow={t.caseStudies.eyebrow}
        title="₹40Cr+ revenue impacted across India."
        body="Every case measured by one thing — did revenue go up."
        cta={{ label: "All case studies", href: "/case-studies" }}
        sparkle
      />
    </div>
  );
}

function CitiesPanel({ cities }: { cities: CityNavItem[] }) {
  return (
    <div className="grid gap-2 p-3 lg:grid-cols-[3fr_1fr]">
      <div className="grid grid-cols-2 gap-1 sm:grid-cols-3 lg:grid-cols-4">
        {cities.map((c) => (
          <LocalizedLink
            key={c.slug}
            href={`/cities/${c.slug}`}
            className="group relative overflow-hidden rounded-2xl border border-transparent bg-surface/40 p-4 transition-all hover:-translate-y-0.5 hover:border-accent/30 hover:bg-surface"
          >
            {c.themeColor && (
              <span
                aria-hidden
                className="absolute inset-y-0 left-0 w-0.5 transition-all group-hover:w-1"
                style={{
                  background: `linear-gradient(180deg, ${c.themeColor}, transparent)`,
                }}
              />
            )}
            <div className="pl-3">
              <div className="font-display text-sm font-semibold tracking-tight text-foreground">
                {c.name}
              </div>
              {c.nickname && (
                <div
                  className="mt-1 line-clamp-1 font-mono text-[9px] uppercase tracking-[0.22em]"
                  style={{ color: c.themeColor }}
                >
                  {c.nickname}
                </div>
              )}
              <div className="mt-2 flex items-center gap-1 text-[10px] text-muted-foreground">
                <MapPin size={9} />
                {c.state}
              </div>
            </div>
          </LocalizedLink>
        ))}
      </div>
      <PanelAside
        eyebrow="Local everywhere"
        title="11 Indian metros. One opinionated playbook."
        body="From Mumbai BFSI to Hyderabad pharma — tailored to how each city actually buys."
        cta={{ label: "All cities", href: "/cities" }}
      />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                  Aside                                     */
/* -------------------------------------------------------------------------- */

function PanelAside({
  eyebrow,
  title,
  body,
  cta,
  accent,
  sparkle,
}: {
  eyebrow: string;
  title: string;
  body: string;
  cta: { label: string; href: string };
  accent?: boolean;
  sparkle?: boolean;
}) {
  return (
    <div
      className={`flex h-full flex-col rounded-2xl border p-5 ${
        accent
          ? "border-accent/30 bg-accent-soft"
          : "border-border bg-surface/30"
      }`}
    >
      <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
        {sparkle && <Sparkles size={11} />}
        {eyebrow}
      </div>
      <div className="mt-3 font-display text-lg font-semibold leading-tight tracking-tight text-foreground">
        {title}
      </div>
      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
        {body}
      </p>
      <LocalizedLink
        href={cta.href}
        className="mt-auto inline-flex w-fit items-center gap-1.5 rounded-full bg-accent px-3 py-1.5 text-xs font-semibold text-accent-foreground transition-transform hover:-translate-y-0.5"
      >
        {cta.label}
        <ArrowUpRight size={12} />
      </LocalizedLink>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                          Mobile expansion variant                          */
/* -------------------------------------------------------------------------- */

export function MobileMegaNav({
  translations: t,
  cities,
  onNavigate,
}: MegaMenuProps & { onNavigate: () => void }) {
  const [open, setOpen] = useState<PanelKey | null>(null);

  const toggle = (panel: PanelKey) =>
    setOpen((cur) => (cur === panel ? null : panel));

  return (
    <div className="flex flex-col gap-1">
      <MobileLinkRow
        label={t.nav.services}
        index="01"
        panel="services"
        active={open === "services"}
        onToggle={() => toggle("services")}
        href="/services"
        onNavigate={onNavigate}
      >
        {t.services.items.map((s) => (
          <MobileSubLink
            key={s.id}
            href={`/services#${s.id}`}
            primary={s.name}
            secondary={s.kicker}
            onNavigate={onNavigate}
          />
        ))}
      </MobileLinkRow>

      <MobileLinkRow
        label={t.nav.industries}
        index="02"
        panel="industries"
        active={open === "industries"}
        onToggle={() => toggle("industries")}
        href="/industries"
        onNavigate={onNavigate}
      >
        {INDUSTRY_ORDER.flatMap((slug) => {
          const item = t.industries.items.find((it) => it.id === slug);
          if (!item) return [];
          return [
            <MobileSubLink
              key={slug}
              href={`/industries/${slug}`}
              primary={item.name}
              secondary={item.tag}
              onNavigate={onNavigate}
            />,
          ];
        })}
      </MobileLinkRow>

      <MobileLinkRow
        label={t.nav.work}
        index="03"
        panel="work"
        active={open === "work"}
        onToggle={() => toggle("work")}
        href="/case-studies"
        onNavigate={onNavigate}
      >
        {t.caseStudies.items.slice(0, 4).map((c) => (
          <MobileSubLink
            key={c.id}
            href={`/case-studies#${c.id}`}
            primary={c.industry}
            secondary={c.location}
            onNavigate={onNavigate}
          />
        ))}
      </MobileLinkRow>

      <MobileLinkRow
        label="Cities"
        index="04"
        panel="cities"
        active={open === "cities"}
        onToggle={() => toggle("cities")}
        href="/cities"
        onNavigate={onNavigate}
      >
        {cities.map((c) => (
          <MobileSubLink
            key={c.slug}
            href={`/cities/${c.slug}`}
            primary={c.name}
            secondary={c.nickname ?? c.state}
            color={c.themeColor}
            onNavigate={onNavigate}
          />
        ))}
      </MobileLinkRow>

      <MobileFlatRow
        label="Blog"
        index="05"
        href="/blogs"
        onNavigate={onNavigate}
      />
      <MobileFlatRow
        label={t.nav.about}
        index="06"
        href="/about"
        onNavigate={onNavigate}
      />
      <MobileFlatRow
        label={t.nav.contact}
        index="07"
        href="/contact"
        onNavigate={onNavigate}
      />
    </div>
  );
}

function MobileLinkRow({
  label,
  index,
  active,
  onToggle,
  href,
  children,
  onNavigate,
}: {
  label: string;
  index: string;
  panel: PanelKey;
  active: boolean;
  onToggle: () => void;
  href: string;
  children: React.ReactNode;
  onNavigate: () => void;
}) {
  return (
    <div className="rounded-2xl border border-border bg-surface/40">
      <div className="flex items-center justify-between gap-2 px-5 py-4">
        <LocalizedLink
          href={href}
          onClick={onNavigate}
          className="text-2xl font-semibold tracking-tight text-foreground"
        >
          {label}
        </LocalizedLink>
        <button
          type="button"
          onClick={onToggle}
          aria-label={`${active ? "Hide" : "Show"} ${label} sub-menu`}
          aria-expanded={active}
          className={`flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background font-mono text-xs transition-all ${
            active ? "bg-accent text-accent-foreground" : "text-muted-foreground"
          }`}
        >
          {active ? "–" : "+"}
        </button>
      </div>
      <AnimatePresence initial={false}>
        {active && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-border/60"
          >
            <div className="grid gap-1 p-3">
              <div className="px-3 pb-2 font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground">
                §{index}
              </div>
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MobileFlatRow({
  label,
  index,
  href,
  onNavigate,
}: {
  label: string;
  index: string;
  href: string;
  onNavigate: () => void;
}) {
  return (
    <LocalizedLink
      href={href}
      onClick={onNavigate}
      className="flex items-center justify-between rounded-2xl border border-border bg-surface/40 px-5 py-4"
    >
      <span className="text-2xl font-semibold tracking-tight text-foreground">
        {label}
      </span>
      <span className="font-mono text-xs text-muted-foreground">{index}</span>
    </LocalizedLink>
  );
}

function MobileSubLink({
  href,
  primary,
  secondary,
  color,
  onNavigate,
}: {
  href: string;
  primary: string;
  secondary?: string;
  color?: string;
  onNavigate: () => void;
}) {
  return (
    <LocalizedLink
      href={href}
      onClick={onNavigate}
      className="group flex items-center justify-between rounded-xl border border-transparent bg-background/60 px-3 py-2.5 transition-colors hover:border-accent/30"
    >
      <span className="flex items-center gap-2 min-w-0">
        {color && (
          <span
            aria-hidden
            className="h-2 w-2 shrink-0 rounded-full"
            style={{ background: color }}
          />
        )}
        <span className="min-w-0">
          <span className="block truncate text-sm font-semibold text-foreground">
            {primary}
          </span>
          {secondary && (
            <span className="mt-0.5 block truncate text-[11px] text-muted-foreground">
              {secondary}
            </span>
          )}
        </span>
      </span>
      <ArrowUpRight
        size={12}
        className="text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
      />
    </LocalizedLink>
  );
}
