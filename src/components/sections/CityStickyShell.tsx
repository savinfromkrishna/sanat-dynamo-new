"use client";

import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  BookOpen,
  Calendar,
  Clock,
  Landmark,
  Languages,
  MapPin,
  MessageCircle,
  Phone,
  Sparkles,
  Users,
} from "lucide-react";
import LocalizedLink from "../LocalizedLink";
import type { CityContent } from "@/lib/cities";
import type { CityIdentity } from "@/lib/city-identity";
import type { CityOrganization } from "@/lib/city-organization";

/**
 * Sticky-left + scroll-right shell for the city page.
 *
 * Left rail (sticky on lg+): city identity card · live SLA chip · primary
 * lead CTAs (Book audit / WhatsApp / Call) · scroll-spied Table of Contents
 * that highlights the active section as the reader scrolls.
 *
 * Right column (scrollable): the long-form content sections passed in via
 * children. Each section is expected to use the `data-toc-id` attribute on
 * its outermost wrapper so the scroll-spy can highlight it.
 *
 * SEO note — the TOC anchors are real `<a href="#...">` links, so search
 * engines see a fully-traversable, hash-anchored ToC for the page.
 */

export interface CityTocItem {
  id: string;
  label: string;
  /** Optional eyebrow shown above the label (e.g. "§01") */
  eyebrow?: string;
}

export function CityStickyShell({
  city,
  identity,
  org,
  posts,
  whatsappNumber,
  phoneNumber,
  toc,
  children,
}: {
  city: CityContent;
  identity: CityIdentity | undefined;
  org: CityOrganization | undefined;
  posts: number;
  whatsappNumber: string;
  phoneNumber: string;
  toc: CityTocItem[];
  children: React.ReactNode;
}) {
  const themeColor = identity?.themeColor ?? "oklch(0.78 0.165 70)";
  const themeAccent = identity?.themeColorAccent ?? "oklch(0.66 0.18 295)";

  const [activeId, setActiveId] = useState<string | null>(toc[0]?.id ?? null);

  /* -------- scroll-spy: highlight the section currently in view --------- */
  useEffect(() => {
    if (toc.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry that's most in view (largest intersectionRatio)
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        // Top of section reaches ~25% from the top → trigger
        rootMargin: "-25% 0px -55% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    toc.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [toc]);

  const tel = phoneNumber.replace(/[^+\d]/g, "");
  const wa = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    `Hi Sanat Dynamo, I'm in ${city.name} and want to book a revenue audit.`
  )}`;

  return (
    <div className="container-px relative mx-auto max-w-7xl">
      {/* `items-start` keeps each grid item anchored to its own top instead of
          stretching, which is what `position: sticky` needs to actually stick
          inside its grid track without the aside collapsing as the right
          column grows. */}
      <div className="grid gap-8 lg:grid-cols-12 lg:items-start lg:gap-10">
        {/* ============================== LEFT (sticky) ============================== */}
        <aside className="lg:col-span-4 lg:self-start">
          {/* `top-28` (7rem) sits below the 72px header + 9px announcement bar
              with breathing room. `max-h` + `overflow-y-auto` only kick in when
              the rail is taller than the viewport — otherwise no inner scroll. */}
          <div className="lg:sticky lg:top-28 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto lg:overscroll-contain lg:pr-3 [scrollbar-gutter:stable]">
            {/* City identity card */}
            <div
              className="relative overflow-hidden rounded-3xl border p-5"
              style={{
                borderColor: themeColor.replace(")", " / 0.3)"),
                background: `linear-gradient(160deg, ${themeColor.replace(")", " / 0.08)")}, transparent 70%)`,
              }}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full blur-3xl"
                style={{ background: themeColor.replace(")", " / 0.18)") }}
              />
              <div className="relative">
                <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em]"
                     style={{ color: themeColor }}>
                  <MapPin size={11} />
                  {city.state}
                </div>
                <div className="mt-2 font-display text-2xl font-semibold leading-tight tracking-tight text-foreground">
                  {city.name}
                </div>
                {identity && (
                  <div className="mt-1 text-xs text-muted-foreground">
                    {identity.nickname}
                    {identity.nicknameRegional && (
                      <span className="ml-1">· {identity.nicknameRegional}</span>
                    )}
                  </div>
                )}

                {/* live SLA chip */}
                <div className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-success/30 bg-success/10 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.22em] text-success">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
                  </span>
                  3 audit slots · {city.name}
                </div>

                {/* operating model summary */}
                {org && (
                  <div
                    className="mt-4 border-t pt-4"
                    style={{ borderColor: themeColor.replace(")", " / 0.18)") }}
                  >
                    <div className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground">
                      Operating model
                    </div>
                    <div className="mt-1 text-xs font-semibold leading-snug text-foreground">
                      {{
                        "remote-first": "Remote-first",
                        "hybrid-onsite": "Hybrid · monthly site visits",
                        "site-visit": "On-site · weekly visits",
                      }[org.presenceModel]}
                    </div>
                    <div className="mt-3 grid gap-2.5 text-xs">
                      <div className="flex items-start gap-2 text-muted-foreground">
                        <Languages
                          size={11}
                          className="mt-0.5 shrink-0"
                          style={{ color: themeColor }}
                        />
                        <span>{org.languages.join(" · ")}</span>
                      </div>
                      <div className="flex items-start gap-2 text-muted-foreground">
                        <Clock
                          size={11}
                          className="mt-0.5 shrink-0"
                          style={{ color: themeColor }}
                        />
                        <span>{org.hours}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Lead CTAs */}
                <div
                  className="mt-5 space-y-2 border-t pt-5"
                  style={{ borderColor: themeColor.replace(")", " / 0.18)") }}
                >
                  <LocalizedLink
                    href="/contact"
                    className="group flex items-center justify-between gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all hover:-translate-y-0.5"
                    style={{
                      background: themeColor,
                      color: "var(--background)",
                      boxShadow: `0 12px 28px -12px ${themeColor.replace(")", " / 0.6)")}`,
                    }}
                  >
                    <span className="flex items-center gap-2">
                      <Calendar size={14} />
                      Book {city.name} audit
                    </span>
                    <ArrowUpRight
                      size={14}
                      className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </LocalizedLink>
                  <a
                    href={wa}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between gap-2 rounded-xl border border-success/40 bg-success/10 px-4 py-2.5 text-sm font-semibold text-success transition-all hover:-translate-y-0.5 hover:border-success/70 hover:bg-success/15"
                  >
                    <span className="flex items-center gap-2">
                      <MessageCircle size={14} />
                      WhatsApp now
                    </span>
                    <ArrowUpRight size={13} />
                  </a>
                  <a
                    href={`tel:${tel}`}
                    className="group flex items-center justify-between gap-2 rounded-xl border border-border bg-background/70 px-4 py-2.5 text-sm font-semibold text-foreground transition-all hover:border-accent/50 hover:text-accent"
                  >
                    <span className="flex items-center gap-2">
                      <Phone size={14} />
                      {phoneNumber}
                    </span>
                  </a>
                </div>

                {/* Page nav chips */}
                <div
                  className="mt-5 space-y-1.5 border-t pt-5"
                  style={{ borderColor: themeColor.replace(")", " / 0.18)") }}
                >
                  <div className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground">
                    Other {city.name} pages
                  </div>
                  {identity && (
                    <LocalizedLink
                      href={`/cities/${city.slug}/about`}
                      className="group flex items-center justify-between gap-2 rounded-lg border border-border bg-background/60 px-3 py-2 text-xs font-semibold text-foreground transition-all hover:border-accent/40 hover:text-accent"
                    >
                      <span className="flex items-center gap-1.5">
                        <Landmark size={11} />
                        About {identity.nickname}
                      </span>
                      <ArrowUpRight size={11} />
                    </LocalizedLink>
                  )}
                  {posts > 0 && (
                    <LocalizedLink
                      href={`/cities/${city.slug}/blog`}
                      className="group flex items-center justify-between gap-2 rounded-lg border border-border bg-background/60 px-3 py-2 text-xs font-semibold text-foreground transition-all hover:border-accent/40 hover:text-accent"
                    >
                      <span className="flex items-center gap-1.5">
                        <BookOpen size={11} />
                        {city.name} journal · {posts}
                      </span>
                      <ArrowUpRight size={11} />
                    </LocalizedLink>
                  )}
                </div>
              </div>
            </div>

            {/* Table of Contents — scroll-spy highlights active */}
            {toc.length > 0 && (
              <nav
                aria-label="Page contents"
                className="mt-4 rounded-3xl border border-border bg-surface/40 p-4"
              >
                <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                  <Sparkles size={11} style={{ color: themeColor }} />
                  On this page
                </div>
                <ol className="mt-3 space-y-1">
                  {toc.map((item) => {
                    const isActive = item.id === activeId;
                    return (
                      <li key={item.id}>
                        <a
                          href={`#${item.id}`}
                          className="group flex items-start gap-2 rounded-lg px-2.5 py-2 text-xs leading-tight transition-all"
                          style={{
                            background: isActive
                              ? themeColor.replace(")", " / 0.1)")
                              : "transparent",
                            color: isActive ? themeColor : "var(--muted-foreground)",
                          }}
                        >
                          <span
                            aria-hidden
                            className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded font-mono text-[8px] font-bold"
                            style={{
                              background: isActive
                                ? themeColor
                                : themeColor.replace(")", " / 0.1)"),
                              color: isActive ? "var(--background)" : themeColor,
                            }}
                          >
                            {item.eyebrow ?? "§"}
                          </span>
                          <span
                            className={`flex-1 transition-colors ${
                              isActive ? "font-semibold" : "group-hover:text-foreground"
                            }`}
                          >
                            {item.label}
                          </span>
                        </a>
                      </li>
                    );
                  })}
                </ol>
              </nav>
            )}

            {/* social proof footer */}
            <div className="mt-4 flex items-center gap-2 rounded-xl border border-border bg-surface/40 px-3 py-2.5">
              <Users size={12} className="text-accent" />
              <span className="text-[11px] leading-tight text-muted-foreground">
                Serving {city.population}
              </span>
            </div>
          </div>
        </aside>

        {/* ============================== RIGHT (scrollable) ============================== */}
        <main className="lg:col-span-8">
          <div className="space-y-12 sm:space-y-16">{children}</div>
        </main>
      </div>
    </div>
  );
}
