import type { Metadata } from "next";
import { getTranslation, type Locale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/primitives/section";
import { ContactForm } from "@/components/sections/ContactForm";
import { CityBanner } from "@/components/sections/CityBanner";
import { KnowMore } from "@/components/sections/KnowMore";
import { ContactProcessFlow, TrustVisual } from "@/components/illustrations";
import {
  Mail,
  MessageCircle,
  Clock,
  MapPin,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ country: string; locale: string }>;
}): Promise<Metadata> {
  const { country, locale } = await params;
  return buildPageMetadata({
    page: "contact",
    country,
    locale: locale as Locale,
  });
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ country: string; locale: string }>;
}) {
  const { country, locale } = await params;
  const t = getTranslation(locale as Locale);
  const d = t.contact.details;

  const detailItems = [
    {
      icon: Mail,
      label: d.emailLabel,
      value: d.email,
      href: `mailto:${d.email}`,
    },
    {
      icon: MessageCircle,
      label: d.phoneLabel,
      value: d.phone,
      href: `https://wa.me/${d.phone.replace(/[^\d]/g, "")}`,
    },
    { icon: Clock, label: d.hoursLabel, value: d.hours },
    { icon: MapPin, label: d.locationLabel, value: d.location },
  ] as const;

  return (
    <>
      <PageHero
        eyebrow={t.contact.eyebrow}
        title={
          <>
            Book your free <span className="text-accent">Revenue Audit.</span>
          </>
        }
        subtitle={t.contact.subtitle}
        breadcrumb="Contact"
      />

      <CityBanner t={t} country={country} />

      {/* Process flow diagram */}
      <Section className="pt-8 pb-0">
        <ContactProcessFlow className="mx-auto max-w-2xl" />
      </Section>

      <Section className="pt-8">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <ContactForm t={t} />
          </div>

          <aside className="space-y-4 lg:col-span-5">
            {detailItems.map((item) => {
              const Icon = item.icon;
              const Inner = (
                <div className="group flex items-start gap-4 rounded-2xl border border-border bg-surface/60 p-6 transition-all hover:border-accent/40 hover:bg-surface">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border bg-background text-accent">
                    <Icon size={18} />
                  </div>
                  <div className="min-w-0">
                    <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                      {item.label}
                    </div>
                    <div className="mt-2 truncate text-base font-semibold text-foreground">
                      {item.value}
                    </div>
                  </div>
                </div>
              );
              return "href" in item && item.href ? (
                <a key={item.label} href={item.href}>
                  {Inner}
                </a>
              ) : (
                <div key={item.label}>{Inner}</div>
              );
            })}

            <div className="rounded-2xl border border-accent/30 bg-accent-soft p-6">
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
                <Sparkles size={11} />
                What happens next
              </div>
              <ol className="mt-4 space-y-3 text-sm text-foreground/90">
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-accent/40 bg-background font-mono text-[10px] text-accent">
                    1
                  </span>
                  We&apos;ll reply within one business day.
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-accent/40 bg-background font-mono text-[10px] text-accent">
                    2
                  </span>
                  Book a 30-min slot — no pitch, just diagnosis.
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-accent/40 bg-background font-mono text-[10px] text-accent">
                    3
                  </span>
                  You walk away with a written revenue audit.
                </li>
              </ol>
            </div>

            <div className="rounded-2xl border border-border bg-surface/40 p-6">
              <TrustVisual className="mx-auto mb-4 max-w-[140px]" />
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                <ShieldCheck size={12} className="text-accent" />
                Confidential by default
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Anything you share with us — business data, financials, customer
                lists — stays confidential. Happy to sign a mutual NDA before
                discovery if your industry requires it.
              </p>
            </div>
          </aside>
        </div>
      </Section>

      <KnowMore t={t} pageKey="contact" pageLabel="Contact" />
    </>
  );
}
