import { ChevronRight } from "lucide-react";
import { Eyebrow } from "../primitives/section";
import LocalizedLink from "../LocalizedLink";
import { HeroBackground } from "../illustrations";

export function PageHero({
  eyebrow,
  title,
  subtitle,
  breadcrumb,
  bgVariant = "top",
}: {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: string;
  breadcrumb?: string;
  /** `center` shifts the animated story strip down so it sits behind taller heroes. */
  bgVariant?: "top" | "center";
}) {
  return (
    <section className="relative isolate overflow-hidden mt-40 mb-16 sm:mt-48 sm:mb-24 lg:mt-64 lg:mb-32  pt-28 pb-16 sm:pt-44 sm:pb-32 lg:pt-64 lg:pb-40 ">
      {/* Advanced animated SVG background — visualizes the living revenue system */}
      <HeroBackground variant={bgVariant} />
      <div className="container-px relative z-10 mx-auto max-w-7xl">
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
