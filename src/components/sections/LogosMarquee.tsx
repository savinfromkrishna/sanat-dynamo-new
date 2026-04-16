import { interpolate, type Locale, type Messages } from "@/lib/i18n";
import { getCountryName } from "@/lib/geo";

interface LogosMarqueeProps {
  t: Messages;
  country?: string;
  locale?: Locale;
}

export function LogosMarquee({ t, country, locale = "en" }: LogosMarqueeProps) {
  const label = country
    ? interpolate(t.socialProof.logosLabel, {
        country: getCountryName(country, locale),
      })
    : t.socialProof.logosLabel;
  // Placeholder client wordmarks — replace with real logos when available.
  const rowA = [
    "AURORA · D2C",
    "NORTHFIELD HOMES",
    "SUMMIT COACHING",
    "CLARITY DENTAL",
    "FORTIS METALWORKS",
    "VEDA WELLNESS",
  ];
  const rowB = [
    "PRIME REALTY",
    "EDUSPARK ACADEMY",
    "MERIDIAN CLINICS",
    "BLOCKWORKS LABS",
    "OAKLEAF & CO",
    "TERRA APPAREL",
  ];

  const loopA = [...rowA, ...rowA];
  const loopB = [...rowB, ...rowB];

  return (
    <section className="relative border-y border-border/60 bg-surface/40 py-12">
      <div className="container-px mx-auto max-w-7xl">
        <p className="text-center font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
          {label}
        </p>
      </div>

      <div className="relative mt-8 space-y-5">
        <div className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_15%,black_85%,transparent)]">
          <div className="marquee-track flex w-max gap-12">
            {loopA.map((name, i) => (
              <div
                key={i}
                className="font-display text-xl font-semibold tracking-tight text-muted-foreground/70 sm:text-2xl"
              >
                {name}
              </div>
            ))}
          </div>
        </div>
        <div className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_15%,black_85%,transparent)]">
          <div className="marquee-track-reverse flex w-max gap-12">
            {loopB.map((name, i) => (
              <div
                key={i}
                className="font-display text-xl font-semibold tracking-tight text-muted-foreground/60 sm:text-2xl"
              >
                {name}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container-px mx-auto mt-8 max-w-7xl">
        <div className="flex flex-wrap items-center justify-center gap-2 text-[11px] text-muted-foreground">
          <span className="font-mono uppercase tracking-[0.22em]">
            5 industries
          </span>
          <span className="text-border">·</span>
          <span className="font-mono uppercase tracking-[0.22em]">
            12 cities
          </span>
          <span className="text-border">·</span>
          <span className="font-mono uppercase tracking-[0.22em]">
            ₹40Cr+ revenue impacted
          </span>
        </div>
      </div>
    </section>
  );
}
