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
    <section className="relative isolate overflow-hidden mt-16 mb-8 pt-20 pb-12 sm:mt-32 sm:mb-16 sm:pt-32 sm:pb-24 lg:mt-48 lg:mb-24 lg:pt-48 lg:pb-32">
      {/* Advanced animated SVG background — visualizes the living revenue system */}
      <HeroBackground variant={bgVariant} />
      <div className="container-px relative z-10 mx-auto max-w-7xl">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="mb-4 flex flex-wrap items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground sm:mb-6"
        >
          <LocalizedLink
            href="/"
            className="transition-colors hover:text-foreground"
          >
            Home
          </LocalizedLink>
          <ChevronRight size={11} />
          <span className="line-clamp-1 text-foreground">{breadcrumb ?? eyebrow}</span>
        </nav>

        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="text-balance mt-4 sm:mt-6 max-w-4xl font-display text-[clamp(2rem,7vw,5rem)] font-semibold leading-[1.08] tracking-tight text-foreground lg:text-[5rem]">
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
