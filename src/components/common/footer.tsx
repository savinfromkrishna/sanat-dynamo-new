"use client";

import { ArrowUpRight, Github, Linkedin, Twitter, Mail, MessageCircle } from "lucide-react";
import LocalizedLink from "../LocalizedLink";
import Logo from "../Logo/logo";
import type { Messages } from "@/lib/i18n";

interface FooterProps {
  translations: Messages;
}

export default function Footer({ translations }: FooterProps) {
  const t = translations;
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-32 border-t border-border bg-background">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
      <div className="bg-grid bg-grid-fade absolute inset-0 opacity-30" />

      <div className="container-px relative mx-auto max-w-7xl">
        {/* Top contact strip */}
        <div className="grid gap-4 border-b border-border py-10 md:grid-cols-3">
          <a
            href={`mailto:${t.contact.details.email}`}
            className="group flex items-center gap-4 rounded-2xl border border-border bg-surface/40 p-5 transition-all hover:border-accent/40 hover:bg-surface"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border bg-background text-accent">
              <Mail size={18} />
            </div>
            <div className="min-w-0">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                Email
              </div>
              <div className="truncate text-sm font-semibold text-foreground">
                {t.contact.details.email}
              </div>
            </div>
            <ArrowUpRight
              size={16}
              className="ml-auto shrink-0 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
            />
          </a>
          <a
            href={`https://wa.me/${t.contact.details.phone.replace(/\D/g, "")}`}
            className="group flex items-center gap-4 rounded-2xl border border-border bg-surface/40 p-5 transition-all hover:border-accent/40 hover:bg-surface"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border bg-background text-accent">
              <MessageCircle size={18} />
            </div>
            <div className="min-w-0">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                WhatsApp
              </div>
              <div className="truncate text-sm font-semibold text-foreground">
                {t.contact.details.phone}
              </div>
            </div>
            <ArrowUpRight
              size={16}
              className="ml-auto shrink-0 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
            />
          </a>
          <LocalizedLink
            href="/contact"
            className="group flex items-center gap-4 rounded-2xl border border-accent/40 bg-accent/5 p-5 transition-all hover:border-accent/70 hover:bg-accent/10"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground">
              <ArrowUpRight size={18} />
            </div>
            <div className="min-w-0">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
                Free 30-min audit
              </div>
              <div className="truncate text-sm font-semibold text-foreground">
                Book your slot →
              </div>
            </div>
          </LocalizedLink>
        </div>

        {/* Brand + columns */}
        <div className="grid gap-12 py-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Logo size="lg" />
            <p className="mt-6 max-w-md text-pretty text-base leading-relaxed text-muted-foreground">
              {t.footer.tagline}
            </p>

            <div className="mt-8 flex items-center gap-3">
              {[
                { Icon: Linkedin, href: "https://www.linkedin.com/", label: "LinkedIn" },
                { Icon: Twitter, href: "https://x.com/", label: "X (Twitter)" },
                { Icon: Github, href: "https://github.com/", label: "GitHub" },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface text-muted-foreground transition-all hover:border-accent/50 hover:bg-surface-2 hover:text-foreground"
                  aria-label={label}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>

            <div className="mt-8 flex items-center gap-2.5 text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
              </span>
              {t.footer.status}
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-7">
            {(["services", "industries", "company"] as const).map((key) => {
              const col = t.footer.columns[key];
              return (
                <div key={key}>
                  <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-accent">
                    {col.title}
                  </h4>
                  <ul className="mt-5 space-y-3">
                    {col.links.map((link) => (
                      <li key={link.href}>
                        <LocalizedLink
                          href={link.href}
                          className="group inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                        >
                          {link.label}
                          <ArrowUpRight
                            size={12}
                            className="opacity-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                          />
                        </LocalizedLink>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

        {/* Big wordmark */}
        <div className="select-none border-y border-border py-12">
          <div className="text-center">
            <h2 className="font-display text-[clamp(3rem,12vw,11rem)] font-semibold leading-[0.9] tracking-tighter text-foreground/90">
              Sanat<span className="text-accent">Dynamo</span>
            </h2>
            <p className="mt-3 font-mono text-xs uppercase tracking-[0.4em] text-muted-foreground">
              {t.brand.tagline}
            </p>
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col items-center justify-between gap-4 py-8 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {year} Sanat Dynamo · {t.footer.rights}
          </p>
          <div className="flex items-center gap-6 text-xs text-muted-foreground">
            <LocalizedLink href="/privacy" className="hover:text-foreground">
              Privacy
            </LocalizedLink>
            <LocalizedLink href="/terms" className="hover:text-foreground">
              Terms
            </LocalizedLink>
            <span className="font-mono uppercase tracking-[0.18em]">
              v1.0
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
