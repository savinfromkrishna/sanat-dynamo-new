"use client";

import { motion } from "framer-motion";

/* ------------------------------------------------------------------ */
/* CONTACT PROCESS FLOW                                               */
/* ------------------------------------------------------------------ */
export function ContactProcessFlow({ className = "" }: { className?: string }) {
  const pop = (i: number) => ({
    hidden: { opacity: 0, scale: 0.7 },
    visible: { opacity: 1, scale: 1, transition: { delay: 0.3 + i * 0.15, type: "spring" as const, stiffness: 160, damping: 14 } },
  });
  const draw = (i: number) => ({
    hidden: { pathLength: 0, opacity: 0 },
    visible: { pathLength: 1, opacity: 1, transition: { pathLength: { duration: 0.8, delay: i * 0.2, ease: "easeInOut" as const }, opacity: { duration: 0.2, delay: i * 0.2 } } },
  });

  const steps = [
    { x: 60, icon: "✉", label: "WE REPLY", sub: "< 1 business day", color: "var(--accent)" },
    { x: 200, icon: "☎", label: "30-MIN CALL", sub: "No pitch, just diagnosis", color: "oklch(0.66 0.18 295 / 0.6)" },
    { x: 340, icon: "📋", label: "WRITTEN AUDIT", sub: "12-20 page diagnosis", color: "oklch(0.74 0.16 155 / 0.6)" },
  ];

  return (
    <motion.svg viewBox="0 0 400 150" fill="none" className={`w-full h-auto ${className}`} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}>
      <motion.path d="M 95 65 L 165 65" stroke="var(--border-strong)" strokeWidth="1.5" strokeDasharray="3 3" variants={draw(1)} />
      <motion.polygon points="162,61 170,65 162,69" fill="var(--border-strong)" variants={pop(1)} />
      <motion.path d="M 235 65 L 305 65" stroke="var(--border-strong)" strokeWidth="1.5" strokeDasharray="3 3" variants={draw(2)} />
      <motion.polygon points="302,61 310,65 302,69" fill="var(--border-strong)" variants={pop(2)} />
      {steps.map((s, i) => (
        <motion.g key={s.label} variants={pop(i)}>
          <circle cx={s.x} cy="65" r="28" fill="var(--svg-node-fill)" stroke={s.color} strokeWidth="1.5" />
          <text x={s.x - 18} y="46" fontFamily="var(--font-mono)" fontSize="8" fontWeight="600" fill={s.color}>{`0${i + 1}`}</text>
          <text x={s.x} y="72" textAnchor="middle" fontSize="20">{s.icon}</text>
          <text x={s.x} y="108" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8" letterSpacing="0.1em" fontWeight="600" fill="var(--foreground)">{s.label}</text>
          <text x={s.x} y="122" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="6" fill="var(--muted-foreground)">{s.sub}</text>
        </motion.g>
      ))}
      <motion.circle cx="340" cy="65" r="28" fill="none" stroke="oklch(0.74 0.16 155 / 0.3)" strokeWidth="1" animate={{ r: [28, 40, 28], opacity: [0.3, 0, 0.3] }} transition={{ duration: 3, repeat: Infinity }} />
      <motion.text x="200" y="144" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="6.5" letterSpacing="0.15em" fill="var(--muted-foreground)" variants={pop(4)}>NO COMMITMENT · NO PITCH · JUST DIAGNOSIS</motion.text>
    </motion.svg>
  );
}

/* ------------------------------------------------------------------ */
/* TRUST VISUAL                                                       */
/* ------------------------------------------------------------------ */
export function TrustVisual({ className = "" }: { className?: string }) {
  return (
    <motion.svg viewBox="0 0 200 160" fill="none" className={`w-full h-auto ${className}`} initial="hidden" whileInView="visible" viewport={{ once: true }}>
      <motion.path d="M 100 20 L 155 40 L 155 85 C 155 115, 130 135, 100 145 C 70 135, 45 115, 45 85 L 45 40 Z" stroke="var(--accent)" strokeWidth="1.5" fill="var(--accent-soft)" initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1.5 }} />
      <motion.rect x="88" y="68" width="24" height="20" rx="4" fill="var(--svg-node-fill)" stroke="var(--accent)" strokeWidth="1" initial={{ opacity: 0, scale: 0 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 1, type: "spring" as const }} />
      <motion.path d="M 94 68 L 94 60 C 94 54, 106 54, 106 60 L 106 68" stroke="var(--accent)" strokeWidth="1.2" fill="none" strokeLinecap="round" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ delay: 1.2, duration: 0.5 }} />
      <motion.circle cx="100" cy="78" r="2.5" fill="var(--accent)" initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 1.5 }} />
      <motion.text x="100" y="105" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="7" letterSpacing="0.12em" fontWeight="600" fill="var(--accent)" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 1.8 }}>CONFIDENTIAL</motion.text>
      <motion.text x="100" y="117" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="5.5" fill="var(--muted-foreground)" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 2 }}>NDA AVAILABLE</motion.text>
    </motion.svg>
  );
}

/* ------------------------------------------------------------------ */
/* GLOBAL REACH MAP                                                   */
/*                                                                    */
/* Clean dot-map approach: no fake continent outlines.                 */
/* Instead uses a grid of faint dots as the "world" background,       */
/* with bright city markers, arcs drawn as simple quadratic curves,   */
/* and clean labels that don't overlap.                               */
/* ------------------------------------------------------------------ */

interface CityData {
  id: string;
  name: string;
  x: number;
  y: number;
  label?: string; // optional short label for tight spaces
  region: "HQ" | "India" | "Middle East" | "SEA" | "Americas" | "Europe" | "Oceania" | "Africa";
}

const CITIES: CityData[] = [
  { id: "blr", name: "Bangalore", x: 558, y: 225, region: "HQ" },
  { id: "del", name: "Delhi", x: 545, y: 182, region: "India" },
  { id: "mum", name: "Mumbai", x: 530, y: 212, region: "India" },
  { id: "dxb", name: "Dubai", x: 490, y: 198, region: "Middle East" },
  { id: "sgp", name: "Singapore", x: 610, y: 252, region: "SEA" },
  { id: "nyc", name: "New York", x: 218, y: 155, region: "Americas" },
  { id: "sfo", name: "San Francisco", x: 120, y: 165, label: "SF", region: "Americas" },
  { id: "ldn", name: "London", x: 375, y: 130, region: "Europe" },
  { id: "syd", name: "Sydney", x: 690, y: 320, region: "Oceania" },
  { id: "nbo", name: "Nairobi", x: 460, y: 258, region: "Africa" },
];

const HQ = CITIES[0];

export function GlobalReachMap({
  className = "",
  userCity,
  userCountry,
}: {
  className?: string;
  userCity?: string;
  userCountry?: string;
}) {
  const pop = (i: number) => ({
    hidden: { opacity: 0, scale: 0 },
    visible: { opacity: 1, scale: 1, transition: { delay: 0.3 + i * 0.08, type: "spring" as const, stiffness: 180, damping: 15 } },
  });

  const userCityLower = userCity?.toLowerCase() ?? "";
  const userMatch = CITIES.find(
    (c) => c.name.toLowerCase() === userCityLower || c.id === userCountry?.toLowerCase()
  );

  function arcPath(x1: number, y1: number, x2: number, y2: number): string {
    const mx = (x1 + x2) / 2;
    const dy = Math.abs(x2 - x1) * 0.2 + 30;
    const my = Math.min(y1, y2) - dy;
    return `M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`;
  }

  const arcTargets = CITIES.filter((c) => c.region !== "HQ" && c.region !== "India");

  return (
    <motion.svg
      viewBox="0 0 800 380"
      fill="none"
      className={`w-full h-auto ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
    >
      {/* ── World dot grid background ── */}
      {/* Creates a subtle dotted world shape without ugly hand-drawn continents */}
      {Array.from({ length: 35 }).map((_, row) =>
        Array.from({ length: 70 }).map((_, col) => {
          const x = 20 + col * 11;
          const y = 15 + row * 10;
          // Rough world land mask — dots only appear on "land" areas
          const isLand =
            // North America
            (x > 60 && x < 270 && y > 80 && y < 220 && !(x > 200 && y > 190)) ||
            // South America
            (x > 180 && x < 280 && y > 230 && y < 370) ||
            // Europe
            (x > 340 && x < 440 && y > 80 && y < 170) ||
            // Africa
            (x > 360 && x < 490 && y > 160 && y < 340) ||
            // Asia
            (x > 460 && x < 650 && y > 70 && y < 270) ||
            // India subcontinent
            (x > 510 && x < 580 && y > 170 && y < 260) ||
            // Southeast Asia
            (x > 590 && x < 660 && y > 200 && y < 280) ||
            // Australia
            (x > 640 && x < 740 && y > 280 && y < 360);

          if (!isLand) return null;
          return (
            <circle
              key={`${row}-${col}`}
              cx={x}
              cy={y}
              r="1"
              fill="var(--muted-foreground)"
              opacity="0.15"
            />
          );
        })
      )}

      {/* ── Connection arcs from HQ ── */}
      {arcTargets.map((city, i) => (
        <motion.path
          key={`arc-${city.id}`}
          d={arcPath(HQ.x, HQ.y, city.x, city.y)}
          stroke="var(--accent)"
          strokeWidth="1"
          strokeOpacity="0.35"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.5 + i * 0.1, ease: "easeInOut" as const }}
        />
      ))}

      {/* ── Animated particles (simple cx/cy animation, no offsetPath) ── */}
      {arcTargets.slice(0, 4).map((city, i) => (
        <motion.circle
          key={`particle-${city.id}`}
          r="2.5"
          fill="var(--accent)"
          animate={{
            cx: [HQ.x, (HQ.x + city.x) / 2, city.x],
            cy: [HQ.y, Math.min(HQ.y, city.y) - Math.abs(city.x - HQ.x) * 0.2 - 30, city.y],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2.5 + i * 0.3,
            repeat: Infinity,
            ease: "easeInOut" as const,
            delay: 2 + i * 1.2,
          }}
        />
      ))}

      {/* ── City dots + labels ── */}
      {CITIES.map((city, i) => {
        const isHQ = city.region === "HQ";
        const isUser = userMatch?.id === city.id;

        return (
          <motion.g key={city.id} variants={pop(i)}>
            {/* HQ glow */}
            {isHQ && (
              <circle cx={city.x} cy={city.y} r="24" fill="var(--accent)" opacity="0.08" />
            )}
            {/* User glow */}
            {isUser && !isHQ && (
              <circle cx={city.x} cy={city.y} r="20" fill="oklch(0.74 0.16 155)" opacity="0.1" />
            )}

            {/* Dot */}
            <circle
              cx={city.x}
              cy={city.y}
              r={isHQ ? 5 : isUser ? 4.5 : 3}
              fill={isHQ ? "var(--accent)" : isUser ? "oklch(0.74 0.16 155)" : "var(--foreground)"}
              opacity={isHQ || isUser ? 1 : 0.5}
            />

            {/* Label — positioned to avoid overlap */}
            <text
              x={city.x}
              y={city.y + (city.region === "India" || city.region === "Middle East" ? 16 : -12)}
              textAnchor="middle"
              fontFamily="var(--font-mono)"
              fontSize={isHQ ? "7.5" : "6"}
              fontWeight={isHQ || isUser ? "700" : "500"}
              letterSpacing="0.08em"
              fill={isHQ ? "var(--accent)" : isUser ? "oklch(0.74 0.16 155)" : "var(--foreground)"}
              opacity={isHQ || isUser ? 1 : 0.5}
            >
              {(city.label ?? city.name).toUpperCase()}
            </text>

            {/* HQ tag */}
            {isHQ && (
              <text x={city.x} y={city.y - 16} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="5" letterSpacing="0.15em" fill="var(--accent)" fontWeight="700">
                ● HQ
              </text>
            )}

            {/* User tag */}
            {isUser && !isHQ && (
              <text x={city.x} y={city.y + (city.region === "India" || city.region === "Middle East" ? 26 : -22)} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="5" letterSpacing="0.1em" fill="oklch(0.74 0.16 155)" fontWeight="600">
                ● YOU
              </text>
            )}
          </motion.g>
        );
      })}

      {/* ── HQ pulse ── */}
      <motion.circle cx={HQ.x} cy={HQ.y} r="5" fill="none" stroke="var(--accent)" strokeWidth="1"
        animate={{ r: [5, 18], opacity: [0.6, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeOut" as const }}
      />
      <motion.circle cx={HQ.x} cy={HQ.y} r="5" fill="none" stroke="var(--accent)" strokeWidth="0.5"
        animate={{ r: [5, 30], opacity: [0.3, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeOut" as const, delay: 0.8 }}
      />

      {/* ── Bottom line ── */}
      <motion.text x="400" y="370" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="7" letterSpacing="0.2em" fill="var(--muted-foreground)" variants={pop(12)}>
        INDIA → WORLDWIDE · 190+ COUNTRIES · 50+ CLIENTS
      </motion.text>
    </motion.svg>
  );
}
