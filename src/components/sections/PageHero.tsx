import { ChevronRight } from "lucide-react";
import { Eyebrow } from "../primitives/section";
import LocalizedLink from "../LocalizedLink";

export function PageHero({
  eyebrow,
  title,
  subtitle,
  breadcrumb,
}: {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: string;
  breadcrumb?: string;
}) {
  return (
    <section className="relative overflow-hidden pt-28 pb-12 sm:pt-44 sm:pb-20 lg:pt-48 lg:pb-24">
      <div className="bg-mesh absolute inset-0 -z-20" />
      <div className="bg-grid bg-grid-fade absolute inset-0 -z-10 opacity-50" />
      <div className="bg-noise absolute inset-0 -z-10 opacity-[0.18] mix-blend-overlay" />
      <div
        className="absolute inset-x-0 top-12 -z-10 mx-auto h-72 w-3/4 max-w-3xl blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, oklch(0.78 0.165 70 / 0.18), transparent)",
        }}
      />
      <div className="container-px relative mx-auto max-w-7xl">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="mb-6 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground"
        >
          <LocalizedLink
            href="/"
            className="transition-colors hover:text-foreground"
          >
            Home
          </LocalizedLink>
          <ChevronRight size={11} />
          <span className="text-foreground">{breadcrumb ?? eyebrow}</span>
        </nav>

        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="text-balance mt-4 sm:mt-6 max-w-4xl font-display text-3xl font-semibold leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-[5rem]">
          {title}
        </h1>
        {subtitle && (
          <p className="text-pretty mt-4 sm:mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-muted-foreground">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
