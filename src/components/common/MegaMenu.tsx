"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Bot,
  Briefcase,
  Building2,
  Database,
  Factory,
  Globe2,
  GraduationCap,
  Handshake,
  LineChart,
  Mail,
  MapPin,
  MapPinned,
  MonitorSmartphone,
  Search,
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

const INDUSTRY_ICON: Record<(typeof INDUSTRY_ORDER)[number], LucideIcon> = {
  manufacturing: Factory,
  "real-estate": Building2,
  healthcare: Stethoscope,
  ecommerce: ShoppingBag,
  edtech: GraduationCap,
};

const SERVICE_ICON: Record<string, LucideIcon> = {
  "revsite-pro": MonitorSmartphone,
  "autosell-engine": Bot,
  "localdom-seo": Search,
  "globalscale-suite": Globe2,
  "operate-os": Database,
  "growthos-retainer": Handshake,
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
    <PanelShell>
      <TileGrid columns={3}>
        {t.services.items.map((s, i) => {
          const Icon = SERVICE_ICON[s.id] ?? Briefcase;
          return (
            <IconTile
              key={s.id}
              href={`/services#${s.id}`}
              label={s.name}
              Icon={Icon}
              index={String(i + 1).padStart(2, "0")}
            />
          );
        })}
      </TileGrid>
      <Spotlight
        eyebrow={t.services.eyebrow}
        titleLead="Revenue"
        titleAccent="Systems"
        body={t.services.subtitle}
        cta={{ label: "View All", href: "/services" }}
        WatermarkIcon={Briefcase}
        primaryCta
      />
    </PanelShell>
  );
}

function IndustriesPanel({ t }: { t: Messages }) {
  const ordered = INDUSTRY_ORDER.flatMap((slug) => {
    const item = t.industries.items.find((it) => it.id === slug);
    return item ? [{ slug, item }] : [];
  });

  return (
    <PanelShell>
      <TileGrid columns={3}>
        {ordered.map(({ slug, item }) => {
          const Icon = INDUSTRY_ICON[slug];
          const isPrimary = slug === "manufacturing";
          return (
            <IconTile
              key={slug}
              href={`/industries/${slug}`}
              label={item.name}
              Icon={Icon}
              badge={isPrimary ? "Pivot" : undefined}
              highlight={isPrimary}
            />
          );
        })}
      </TileGrid>
      <Spotlight
        eyebrow="Primary pivot · Ahmedabad"
        titleLead="Manufacturing"
        titleAccent="First"
        body="Tally → cloud ERP in 6 weeks. GST e-invoicing, daily P&L on phone, 80% less manual entry."
        cta={{ label: "Explore More", href: "/industries/manufacturing" }}
        WatermarkIcon={Factory}
      />
    </PanelShell>
  );
}

function WorkPanel({ t }: { t: Messages }) {
  const featured = t.caseStudies.items.slice(0, 6);
  return (
    <PanelShell>
      <TileGrid columns={3}>
        {featured.map((c) => {
          const headline = c.metrics?.[0];
          return (
            <IconTile
              key={c.id}
              href={`/case-studies#${c.id}`}
              label={c.industry}
              Icon={LineChart}
              caption={headline?.delta}
            />
          );
        })}
      </TileGrid>
      <Spotlight
        eyebrow={t.caseStudies.eyebrow}
        titleLead="₹40Cr+"
        titleAccent="Impacted"
        body="Every case measured by one thing — did revenue go up."
        cta={{ label: "Explore More", href: "/case-studies" }}
        WatermarkIcon={LineChart}
        sparkle
      />
    </PanelShell>
  );
}

function CitiesPanel({ cities }: { cities: CityNavItem[] }) {
  return (
    <PanelShell asideRatio="3fr_1fr">
      <TileGrid columns={5}>
        {cities.map((c) => (
          <IconTile
            key={c.slug}
            href={`/cities/${c.slug}`}
            label={c.name}
            Icon={MapPinned}
            accentColor={c.themeColor}
          />
        ))}
      </TileGrid>
      <Spotlight
        eyebrow="Local everywhere"
        titleLead="11 Metros"
        titleAccent="One Playbook"
        body="From Mumbai BFSI to Hyderabad pharma — tailored to how each city actually buys."
        cta={{ label: "Explore More", href: "/cities" }}
        WatermarkIcon={MapPin}
      />
    </PanelShell>
  );
}

/* -------------------------------------------------------------------------- */
/*                       Tile + Spotlight building blocks                     */
/* -------------------------------------------------------------------------- */

function PanelShell({
  children,
  asideRatio = "2fr_1fr",
}: {
  children: React.ReactNode;
  asideRatio?: "2fr_1fr" | "3fr_1fr";
}) {
  const cols = asideRatio === "3fr_1fr"
    ? "lg:grid-cols-[3fr_1fr]"
    : "lg:grid-cols-[2fr_1fr]";
  return (
    <div className={`grid gap-3 p-4 ${cols}`}>{children}</div>
  );
}

function TileGrid({
  columns,
  children,
}: {
  columns: 3 | 5;
  children: React.ReactNode;
}) {
  const cols = columns === 5
    ? "grid-cols-3 sm:grid-cols-4 lg:grid-cols-5"
    : "grid-cols-2 sm:grid-cols-3";
  return <div className={`grid gap-3 ${cols}`}>{children}</div>;
}

function IconTile({
  href,
  label,
  Icon,
  index,
  badge,
  caption,
  highlight,
  accentColor,
}: {
  href: string;
  label: string;
  Icon: LucideIcon;
  index?: string;
  badge?: string;
  caption?: string;
  highlight?: boolean;
  accentColor?: string;
}) {
  return (
    <LocalizedLink
      href={href}
      className="group relative flex flex-col items-center gap-2 text-center"
    >
      <div
        className={`relative flex aspect-square w-full items-center justify-center rounded-2xl border bg-surface/60 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-accent/40 group-hover:bg-surface group-hover:shadow-[0_12px_28px_-16px_rgba(0,0,0,0.4)] ${
          highlight ? "border-accent/40 bg-accent-soft/60" : "border-border/60"
        }`}
      >
        {index && (
          <span className="absolute left-2 top-2 font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground/60">
            {index}
          </span>
        )}
        {badge && (
          <span className="absolute right-2 top-2 rounded-full bg-accent px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-[0.2em] text-accent-foreground">
            {badge}
          </span>
        )}
        {accentColor && (
          <span
            aria-hidden
            className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full"
            style={{ background: accentColor }}
          />
        )}
        <Icon
          size={32}
          strokeWidth={1.5}
          className={`transition-all duration-300 group-hover:scale-110 ${
            highlight ? "text-accent" : "text-foreground/80 group-hover:text-accent"
          }`}
        />
        {caption && (
          <span className="absolute bottom-2 right-2 rounded-full bg-background/80 px-1.5 py-0.5 font-mono text-[9px] font-semibold text-accent">
            {caption}
          </span>
        )}
      </div>
      <span className="line-clamp-1 text-xs font-medium tracking-tight text-foreground">
        {label}
      </span>
    </LocalizedLink>
  );
}

function Spotlight({
  eyebrow,
  titleLead,
  titleAccent,
  body,
  cta,
  WatermarkIcon,
  sparkle,
  primaryCta,
}: {
  eyebrow: string;
  titleLead: string;
  titleAccent: string;
  body: string;
  cta: { label: string; href: string };
  WatermarkIcon: LucideIcon;
  sparkle?: boolean;
  primaryCta?: boolean;
}) {
  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-surface/60 via-surface/30 to-background p-6">
      <WatermarkIcon
        aria-hidden
        size={220}
        strokeWidth={0.6}
        className="pointer-events-none absolute -bottom-12 -right-12 text-accent/10"
      />
      <div className="relative flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
        {sparkle && <Sparkles size={11} />}
        {eyebrow}
      </div>
      <div className="relative mt-3 font-display text-2xl font-bold leading-[1.05] tracking-tight">
        <span className="text-foreground">{titleLead}</span>{" "}
        <span className="text-accent">{titleAccent}</span>
      </div>
      <p className="relative mt-3 text-xs leading-relaxed text-muted-foreground">
        {body}
      </p>
      <LocalizedLink
        href={cta.href}
        className={`group relative mt-auto inline-flex w-fit items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition-all hover:-translate-y-0.5 ${
          primaryCta
            ? "bg-accent text-accent-foreground shadow-[0_8px_24px_-12px_oklch(0.78_0.165_70/0.6)] hover:shadow-[0_12px_28px_-10px_oklch(0.78_0.165_70/0.75)]"
            : "border border-accent/40 bg-background/40 text-foreground hover:border-accent hover:bg-accent-soft"
        }`}
      >
        {cta.label}
        <ArrowRight
          size={13}
          className="transition-transform group-hover:translate-x-0.5"
        />
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
