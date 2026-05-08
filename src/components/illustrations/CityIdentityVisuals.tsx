"use client";

import { motion } from "framer-motion";

/**
 * Per-city iconic identity SVGs.
 *
 * Each component is a stylised, animated visual identity of the city —
 * landmarks + cultural motifs in the city's theme palette. They are NOT
 * geographic maps; they're posters. The intention is for the /about page
 * and the city hero to feel distinctively local at a glance.
 *
 * All components are sized to a 480×320 (or 480×360) viewBox and stretch
 * fluidly. They animate in on viewport entry, with subtle ongoing motion
 * (no looping noise) so they feel alive without being distracting.
 */

const draw = (delay = 0, duration = 1.2) => ({
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration, delay, ease: "easeInOut" as const },
      opacity: { duration: 0.25, delay },
    },
  },
});

const pop = (delay = 0) => ({
  hidden: { opacity: 0, scale: 0.7 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { delay, type: "spring" as const, stiffness: 180, damping: 14 },
  },
});

const VIEWBOX = "0 0 480 320";

/* -------------------------------------------------------------------------- */
/*                                  Jaipur                                    */
/* -------------------------------------------------------------------------- */

/** Hawa Mahal facade in pink — 953 windows stylised across 5 storeys */
export function JaipurIdentity({ className = "" }: { className?: string }) {
  const pink = "oklch(0.72 0.16 12)";
  const accent = "oklch(0.6 0.2 30)";
  return (
    <motion.svg
      viewBox={VIEWBOX}
      className={`h-auto w-full ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-30px" }}
    >
      <defs>
        <linearGradient id="jp-sky" x1="0" y1="0" x2="0" y2="220" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={`${pink.replace(")", " / 0.18)")}`} />
          <stop offset="100%" stopColor={`${pink.replace(")", " / 0)")}`} />
        </linearGradient>
        <linearGradient id="jp-facade" x1="240" y1="60" x2="240" y2="280" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={`${pink.replace(")", " / 0.15)")}`} />
          <stop offset="100%" stopColor={`${pink.replace(")", " / 0.05)")}`} />
        </linearGradient>
      </defs>

      {/* sky / pink wash */}
      <rect x="0" y="0" width="480" height="320" fill="url(#jp-sky)" />

      {/* sun */}
      <motion.circle
        cx="380"
        cy="80"
        r="32"
        fill={`${accent.replace(")", " / 0.2)")}`}
        stroke={`${accent.replace(")", " / 0.4)")}`}
        strokeWidth="0.8"
        animate={{ r: [30, 36, 30], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Hawa Mahal central spire */}
      <motion.path
        d="M 240 50 L 250 80 L 230 80 Z"
        fill={`${pink.replace(")", " / 0.5)")}`}
        stroke={pink}
        strokeWidth="1"
        variants={draw(0)}
      />
      {/* spire dome */}
      <motion.circle cx="240" cy="80" r="9" fill={pink} variants={pop(0.2)} />
      <motion.path
        d="M 234 86 L 246 86 L 244 92 L 236 92 Z"
        fill={`${pink.replace(")", " / 0.7)")}`}
        variants={pop(0.25)}
      />

      {/* Hawa Mahal facade — 5 storeys, terraced */}
      <motion.rect
        x="120"
        y="92"
        width="240"
        height="178"
        fill="url(#jp-facade)"
        stroke={pink}
        strokeWidth="1.4"
        variants={draw(0.1, 1.4)}
      />
      {/* roofline crenellations */}
      {Array.from({ length: 12 }).map((_, i) => {
        const x = 122 + i * 20;
        return (
          <motion.path
            key={`crl-${i}`}
            d={`M ${x} 92 L ${x + 6} 86 L ${x + 12} 92`}
            stroke={pink}
            strokeWidth="0.8"
            fill="none"
            variants={draw(0.5 + i * 0.03, 0.4)}
          />
        );
      })}

      {/* 953-window grid stylised — 5 rows, asymmetric arches */}
      {[
        { y: 110, count: 11, w: 18 },
        { y: 145, count: 10, w: 20 },
        { y: 180, count: 9, w: 22 },
        { y: 215, count: 8, w: 25 },
        { y: 250, count: 7, w: 28 },
      ].map((row, r) =>
        Array.from({ length: row.count }).map((_, i) => {
          const totalW = row.count * row.w;
          const startX = 240 - totalW / 2;
          const x = startX + i * row.w;
          return (
            <motion.g key={`win-${r}-${i}`} variants={pop(0.6 + r * 0.05 + i * 0.015)}>
              <rect
                x={x + 1}
                y={row.y}
                width={row.w - 2}
                height="20"
                rx="3"
                fill={`${accent.replace(")", " / 0.25)")}`}
                stroke={`${accent.replace(")", " / 0.5)")}`}
                strokeWidth="0.5"
              />
              {/* arched top */}
              <path
                d={`M ${x + 1} ${row.y + 5} Q ${x + row.w / 2} ${row.y - 4} ${x + row.w - 1} ${row.y + 5}`}
                fill="none"
                stroke={`${accent.replace(")", " / 0.5)")}`}
                strokeWidth="0.5"
              />
            </motion.g>
          );
        })
      )}

      {/* nameplate */}
      <motion.text
        x="240"
        y="300"
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="11"
        letterSpacing="0.4em"
        fill={pink}
        fontWeight="700"
        variants={pop(1.2)}
      >
        JAIPUR · PINK CITY
      </motion.text>
      <motion.text
        x="240"
        y="314"
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="6.5"
        letterSpacing="0.25em"
        fill="var(--muted-foreground)"
        variants={pop(1.3)}
      >
        EST. 1727 · HAWA MAHAL
      </motion.text>
    </motion.svg>
  );
}

/* -------------------------------------------------------------------------- */
/*                                  Mumbai                                    */
/* -------------------------------------------------------------------------- */

/** Gateway of India arch + Marine Drive curve + skyline + waves */
export function MumbaiIdentity({ className = "" }: { className?: string }) {
  const blue = "oklch(0.62 0.2 250)";
  const orange = "oklch(0.78 0.165 50)";
  return (
    <motion.svg
      viewBox={VIEWBOX}
      className={`h-auto w-full ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-30px" }}
    >
      <defs>
        <linearGradient id="mb-sky" x1="0" y1="0" x2="0" y2="220" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={`${blue.replace(")", " / 0.2)")}`} />
          <stop offset="50%" stopColor={`${orange.replace(")", " / 0.1)")}`} />
          <stop offset="100%" stopColor="oklch(0.99 0.002 260)" />
        </linearGradient>
      </defs>

      <rect x="0" y="0" width="480" height="220" fill="url(#mb-sky)" />

      {/* sun */}
      <motion.circle
        cx="240"
        cy="100"
        r="42"
        fill={`${orange.replace(")", " / 0.4)")}`}
        animate={{ r: [38, 45, 38], opacity: [0.7, 0.9, 0.7] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* skyline silhouette — buildings of varying heights */}
      {[
        { x: 30, h: 70, w: 18 },
        { x: 50, h: 90, w: 22 },
        { x: 74, h: 60, w: 20 },
        { x: 96, h: 100, w: 18 },
        { x: 116, h: 80, w: 24 },
        { x: 142, h: 110, w: 20 },
        { x: 164, h: 75, w: 22 },
        { x: 320, h: 85, w: 22 },
        { x: 344, h: 105, w: 18 },
        { x: 364, h: 70, w: 24 },
        { x: 390, h: 95, w: 20 },
        { x: 412, h: 65, w: 22 },
        { x: 436, h: 88, w: 18 },
      ].map((b, i) => (
        <motion.rect
          key={`bldg-${i}`}
          x={b.x}
          y={210 - b.h}
          width={b.w}
          height={b.h}
          fill={`${blue.replace(")", " / 0.35)")}`}
          stroke={`${blue.replace(")", " / 0.5)")}`}
          strokeWidth="0.5"
          variants={pop(0.3 + i * 0.04)}
        />
      ))}

      {/* Gateway of India arch — central */}
      <motion.path
        d="M 200 210 L 200 130 Q 200 110 220 110 L 260 110 Q 280 110 280 130 L 280 210"
        stroke={blue}
        strokeWidth="2"
        fill={`${blue.replace(")", " / 0.15)")}`}
        variants={draw(0.2, 1.2)}
      />
      {/* arch dome top */}
      <motion.path
        d="M 200 130 Q 240 95 280 130"
        stroke={blue}
        strokeWidth="1.6"
        fill={`${blue.replace(")", " / 0.2)")}`}
        variants={draw(0.5, 0.8)}
      />
      {/* central archway */}
      <motion.path
        d="M 220 210 L 220 160 Q 220 145 240 145 Q 260 145 260 160 L 260 210"
        stroke={blue}
        strokeWidth="1"
        fill="var(--background)"
        variants={draw(0.7, 0.6)}
      />
      {/* corner spires */}
      {[200, 280].map((x, i) => (
        <motion.g key={`sp-${i}`} variants={pop(0.9 + i * 0.1)}>
          <rect x={x - 4} y="100" width="8" height="20" fill={blue} />
          <path
            d={`M ${x - 5} 100 L ${x} 88 L ${x + 5} 100 Z`}
            fill={blue}
          />
        </motion.g>
      ))}

      {/* sea waves */}
      {[230, 250, 270, 290].map((y, i) => (
        <motion.path
          key={`wave-${i}`}
          d={`M 0 ${y} Q 60 ${y - 4} 120 ${y} T 240 ${y} T 360 ${y} T 480 ${y}`}
          stroke={`${blue.replace(")", " / 0.4)")}`}
          strokeWidth="0.8"
          fill="none"
          animate={{
            d: [
              `M 0 ${y} Q 60 ${y - 4} 120 ${y} T 240 ${y} T 360 ${y} T 480 ${y}`,
              `M 0 ${y} Q 60 ${y + 4} 120 ${y} T 240 ${y} T 360 ${y} T 480 ${y}`,
              `M 0 ${y} Q 60 ${y - 4} 120 ${y} T 240 ${y} T 360 ${y} T 480 ${y}`,
            ],
          }}
          transition={{ duration: 6 + i, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* nameplate */}
      <motion.text
        x="240"
        y="298"
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="11"
        letterSpacing="0.4em"
        fill={blue}
        fontWeight="700"
        variants={pop(1.2)}
      >
        MUMBAI · MAXIMUM CITY
      </motion.text>
      <motion.text
        x="240"
        y="312"
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="6.5"
        letterSpacing="0.25em"
        fill="var(--muted-foreground)"
        variants={pop(1.3)}
      >
        EST. 1668 · GATEWAY OF INDIA
      </motion.text>
    </motion.svg>
  );
}

/* -------------------------------------------------------------------------- */
/*                                  Delhi                                     */
/* -------------------------------------------------------------------------- */

/** India Gate arch + Lotus Temple petals + Qutub Minar */
export function DelhiIdentity({ className = "" }: { className?: string }) {
  const red = "oklch(0.55 0.22 25)";
  const accent = "oklch(0.78 0.165 70)";
  return (
    <motion.svg
      viewBox={VIEWBOX}
      className={`h-auto w-full ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-30px" }}
    >
      <defs>
        <radialGradient id="dl-glow" cx="50%" cy="40%">
          <stop offset="0%" stopColor={`${accent.replace(")", " / 0.18)")}`} />
          <stop offset="100%" stopColor={`${accent.replace(")", " / 0)")}`} />
        </radialGradient>
      </defs>

      <rect x="0" y="0" width="480" height="220" fill="url(#dl-glow)" />

      {/* India Gate centre — triumphal arch */}
      <motion.g variants={pop(0.2)}>
        <rect x="200" y="90" width="80" height="130" rx="2" fill={`${red.replace(")", " / 0.3)")}`} stroke={red} strokeWidth="1.4" />
        <rect x="216" y="120" width="48" height="100" rx="3" fill="var(--background)" stroke={red} strokeWidth="1" />
        <path d="M 216 140 Q 240 110 264 140" stroke={red} strokeWidth="1.2" fill="var(--background)" />
        {/* eternal flame */}
        <motion.path
          d="M 234 200 Q 240 188 246 200 Q 244 210 240 212 Q 236 210 234 200"
          fill={accent}
          animate={{ scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.g>

      {/* Lotus Temple — 9 petals around a centre, left side */}
      <motion.g variants={pop(0.4)} style={{ transformOrigin: "100px 160px" }}>
        {Array.from({ length: 9 }).map((_, i) => {
          const a = (i / 9) * Math.PI * 2 - Math.PI / 2;
          const r = 30;
          const x = 100 + r * Math.cos(a);
          const y = 160 + r * Math.sin(a);
          return (
            <motion.path
              key={`petal-${i}`}
              d={`M 100 160 Q ${x * 0.7 + 30} ${y * 0.7 + 48} ${x} ${y}`}
              stroke={red}
              strokeWidth="1.2"
              fill={`${red.replace(")", " / 0.1)")}`}
              variants={draw(0.5 + i * 0.05, 0.6)}
            />
          );
        })}
        <circle cx="100" cy="160" r="8" fill={red} />
      </motion.g>

      {/* Qutub Minar on the right — tapered tower */}
      <motion.g variants={pop(0.4)}>
        {[
          { y: 80, w: 28 },
          { y: 110, w: 32 },
          { y: 140, w: 36 },
          { y: 170, w: 40 },
          { y: 200, w: 44 },
        ].map((seg, i) => (
          <motion.rect
            key={`qm-${i}`}
            x={384 - seg.w / 2}
            y={seg.y}
            width={seg.w}
            height={i === 4 ? 20 : 30}
            fill={`${red.replace(")", " / 0.3)")}`}
            stroke={red}
            strokeWidth="1"
            variants={pop(0.6 + i * 0.07)}
          />
        ))}
        {/* spire top */}
        <motion.path
          d="M 380 80 L 384 70 L 388 80 Z"
          fill={red}
          variants={pop(0.55)}
        />
      </motion.g>

      {/* nameplate */}
      <motion.text
        x="240"
        y="290"
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="11"
        letterSpacing="0.4em"
        fill={red}
        fontWeight="700"
        variants={pop(1.2)}
      >
        DELHI · CAPITAL OF EMPIRES
      </motion.text>
      <motion.text
        x="240"
        y="304"
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="6.5"
        letterSpacing="0.25em"
        fill="var(--muted-foreground)"
        variants={pop(1.3)}
      >
        EST. 1052 · INDIA GATE · LOTUS TEMPLE · QUTUB MINAR
      </motion.text>
    </motion.svg>
  );
}

/* -------------------------------------------------------------------------- */
/*                                Bengaluru                                   */
/* -------------------------------------------------------------------------- */

/** Vidhana Soudha pillars + circuit-board orbit */
export function BengaluruIdentity({ className = "" }: { className?: string }) {
  const teal = "oklch(0.66 0.18 180)";
  const green = "oklch(0.74 0.16 155)";
  return (
    <motion.svg
      viewBox={VIEWBOX}
      className={`h-auto w-full ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-30px" }}
    >
      {/* background grid representing circuits */}
      {Array.from({ length: 24 }).map((_, i) => (
        <line
          key={`g-${i}`}
          x1={(i / 23) * 480}
          y1="0"
          x2={(i / 23) * 480}
          y2="220"
          stroke={`${teal.replace(")", " / 0.06)")}`}
          strokeWidth="0.5"
        />
      ))}
      {Array.from({ length: 12 }).map((_, i) => (
        <line
          key={`gh-${i}`}
          x1="0"
          y1={(i / 11) * 220}
          x2="480"
          y2={(i / 11) * 220}
          stroke={`${teal.replace(")", " / 0.06)")}`}
          strokeWidth="0.5"
        />
      ))}

      {/* Vidhana Soudha base */}
      <motion.rect
        x="100"
        y="180"
        width="280"
        height="40"
        fill={`${teal.replace(")", " / 0.25)")}`}
        stroke={teal}
        strokeWidth="1.4"
        variants={pop(0.2)}
      />
      {/* steps */}
      <motion.rect
        x="80"
        y="200"
        width="320"
        height="20"
        fill={`${teal.replace(")", " / 0.18)")}`}
        stroke={teal}
        strokeWidth="0.8"
        variants={pop(0.25)}
      />

      {/* central dome */}
      <motion.path
        d="M 220 100 Q 240 70 260 100 L 260 130 L 220 130 Z"
        fill={`${teal.replace(")", " / 0.3)")}`}
        stroke={teal}
        strokeWidth="1.4"
        variants={pop(0.3)}
      />
      <motion.circle cx="240" cy="62" r="6" fill={teal} variants={pop(0.4)} />
      <motion.line
        x1="240"
        y1="56"
        x2="240"
        y2="48"
        stroke={teal}
        strokeWidth="1"
        variants={pop(0.45)}
      />

      {/* pillars */}
      {[140, 165, 190, 215, 265, 290, 315, 340].map((x, i) => (
        <motion.g key={`pl-${i}`} variants={pop(0.4 + i * 0.04)}>
          <rect x={x - 4} y="130" width="8" height="50" fill={`${teal.replace(")", " / 0.25)")}`} stroke={teal} strokeWidth="0.6" />
          <rect x={x - 6} y="130" width="12" height="3" fill={teal} />
          <rect x={x - 6} y="178" width="12" height="3" fill={teal} />
        </motion.g>
      ))}

      {/* facade body */}
      <motion.rect
        x="135"
        y="130"
        width="210"
        height="50"
        fill={`${teal.replace(")", " / 0.05)")}`}
        stroke={`${teal.replace(")", " / 0.4)")}`}
        strokeWidth="0.6"
        variants={pop(0.5)}
      />

      {/* circuit-board nodes orbiting */}
      {[
        { cx: 60, cy: 50, label: "API" },
        { cx: 420, cy: 60, label: "DB" },
        { cx: 80, cy: 100, label: "/docs" },
        { cx: 410, cy: 130, label: "/pricing" },
        { cx: 90, cy: 150, label: "stripe" },
      ].map((n, i) => (
        <motion.g key={`cn-${i}`} variants={pop(0.7 + i * 0.07)}>
          <line
            x1={n.cx}
            y1={n.cy}
            x2={240}
            y2={130}
            stroke={`${green.replace(")", " / 0.25)")}`}
            strokeDasharray="2 3"
            strokeWidth="0.5"
          />
          <circle cx={n.cx} cy={n.cy} r="10" fill="var(--background)" stroke={green} strokeWidth="1" />
          <text
            x={n.cx}
            y={n.cy + 2}
            textAnchor="middle"
            fontFamily="var(--font-mono)"
            fontSize="6.5"
            fill={green}
          >
            {n.label}
          </text>
        </motion.g>
      ))}

      {/* travelling particle */}
      <motion.circle
        r="2.5"
        fill={teal}
        animate={{
          cx: [60, 240, 420, 240, 60],
          cy: [50, 130, 60, 130, 50],
          opacity: [0, 1, 1, 1, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* nameplate */}
      <motion.text
        x="240"
        y="290"
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="11"
        letterSpacing="0.4em"
        fill={teal}
        fontWeight="700"
        variants={pop(1.2)}
      >
        BENGALURU · GARDEN CITY
      </motion.text>
      <motion.text
        x="240"
        y="304"
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="6.5"
        letterSpacing="0.25em"
        fill="var(--muted-foreground)"
        variants={pop(1.3)}
      >
        EST. 1537 · SILICON VALLEY OF INDIA
      </motion.text>
    </motion.svg>
  );
}

/* -------------------------------------------------------------------------- */
/*                                  Pune                                      */
/* -------------------------------------------------------------------------- */

/** Shaniwar Wada gate + manufacturing gear motif */
export function PuneIdentity({ className = "" }: { className?: string }) {
  const earth = "oklch(0.55 0.18 30)";
  const accent = "oklch(0.66 0.18 295)";
  return (
    <motion.svg
      viewBox={VIEWBOX}
      className={`h-auto w-full ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-30px" }}
    >
      {/* sky wash */}
      <rect x="0" y="0" width="480" height="220" fill={`${earth.replace(")", " / 0.06)")}`} />

      {/* Shaniwar Wada Delhi-Darwaza (the iconic spiked gate) */}
      <motion.g variants={pop(0.2)}>
        {/* outer fortified walls */}
        <rect x="120" y="120" width="240" height="100" fill={`${earth.replace(")", " / 0.18)")}`} stroke={earth} strokeWidth="1.6" />
        {/* crenellations */}
        {Array.from({ length: 13 }).map((_, i) => (
          <rect
            key={`cr-${i}`}
            x={122 + i * 18}
            y="113"
            width="10"
            height="9"
            fill={earth}
          />
        ))}
        {/* central gate */}
        <path
          d="M 220 220 L 220 165 Q 220 145 240 145 Q 260 145 260 165 L 260 220 Z"
          fill="var(--background)"
          stroke={earth}
          strokeWidth="1.4"
        />
        {/* gate spikes (the historical iron-spiked gate) */}
        {Array.from({ length: 7 }).map((_, i) => (
          <motion.path
            key={`sp-${i}`}
            d={`M ${224 + i * 5.5} 165 L ${226.5 + i * 5.5} 158 L ${229 + i * 5.5} 165`}
            stroke={accent}
            strokeWidth="0.8"
            fill="none"
            variants={draw(0.6 + i * 0.05)}
          />
        ))}
        {/* corner towers */}
        {[120, 360].map((x, i) => (
          <motion.g key={`tw-${i}`} variants={pop(0.3 + i * 0.08)}>
            <rect x={x - 12} y="100" width="24" height="120" fill={`${earth.replace(")", " / 0.25)")}`} stroke={earth} strokeWidth="1" />
            <path d={`M ${x - 14} 100 L ${x} 84 L ${x + 14} 100 Z`} fill={earth} />
          </motion.g>
        ))}
      </motion.g>

      {/* Manufacturing gear top-left */}
      <motion.g
        variants={pop(0.5)}
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "60px 60px" }}
      >
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i / 12) * Math.PI * 2;
          const r1 = 28;
          const r2 = 36;
          return (
            <line
              key={`gt-${i}`}
              x1={60 + r1 * Math.cos(a)}
              y1={60 + r1 * Math.sin(a)}
              x2={60 + r2 * Math.cos(a)}
              y2={60 + r2 * Math.sin(a)}
              stroke={accent}
              strokeWidth="2"
            />
          );
        })}
        <circle cx="60" cy="60" r="22" fill={`${accent.replace(")", " / 0.2)")}`} stroke={accent} strokeWidth="1.4" />
        <circle cx="60" cy="60" r="6" fill={accent} />
      </motion.g>

      {/* SaaS terminal motif top-right */}
      <motion.g variants={pop(0.6)}>
        <rect x="380" y="40" width="80" height="50" rx="4" fill="var(--background)" stroke={accent} strokeWidth="1" />
        <circle cx="386" cy="46" r="1.5" fill={earth} />
        <circle cx="392" cy="46" r="1.5" fill={accent} />
        <circle cx="398" cy="46" r="1.5" fill="var(--muted-foreground)" />
        <text x="386" y="62" fontFamily="var(--font-mono)" fontSize="6" fill={accent}>$ build</text>
        <motion.text
          x="386"
          y="74"
          fontFamily="var(--font-mono)"
          fontSize="6"
          fill={earth}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          ✓ shipped
        </motion.text>
        <text x="386" y="86" fontFamily="var(--font-mono)" fontSize="6" fill="var(--muted-foreground)">
          hinjewadi
        </text>
      </motion.g>

      {/* nameplate */}
      <motion.text
        x="240"
        y="290"
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="11"
        letterSpacing="0.4em"
        fill={earth}
        fontWeight="700"
        variants={pop(1.2)}
      >
        PUNE · OXFORD OF THE EAST
      </motion.text>
      <motion.text
        x="240"
        y="304"
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="6.5"
        letterSpacing="0.25em"
        fill="var(--muted-foreground)"
        variants={pop(1.3)}
      >
        SHANIWAR WADA · CHAKAN · HINJEWADI
      </motion.text>
    </motion.svg>
  );
}

/* -------------------------------------------------------------------------- */
/*                                Chennai                                     */
/* -------------------------------------------------------------------------- */

/** Marina lighthouse + temple gopuram + auto wheel */
export function ChennaiIdentity({ className = "" }: { className?: string }) {
  const teal = "oklch(0.65 0.16 200)";
  const gold = "oklch(0.78 0.165 70)";
  return (
    <motion.svg
      viewBox={VIEWBOX}
      className={`h-auto w-full ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-30px" }}
    >
      <defs>
        <linearGradient id="cn-sky" x1="0" y1="0" x2="0" y2="220" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={`${teal.replace(")", " / 0.15)")}`} />
          <stop offset="100%" stopColor="oklch(0.99 0.002 260 / 0)" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="480" height="220" fill="url(#cn-sky)" />

      {/* sun */}
      <motion.circle
        cx="60"
        cy="70"
        r="22"
        fill={`${gold.replace(")", " / 0.4)")}`}
        animate={{ r: [20, 24, 20], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 5, repeat: Infinity }}
      />

      {/* Kapaleeshwarar gopuram (right side) */}
      <motion.g variants={pop(0.2)}>
        {[
          { y: 60, w: 30, h: 18 },
          { y: 78, w: 38, h: 22 },
          { y: 100, w: 46, h: 26 },
          { y: 126, w: 54, h: 30 },
          { y: 156, w: 62, h: 34 },
          { y: 190, w: 70, h: 30 },
        ].map((tier, i) => (
          <motion.g key={`gop-${i}`} variants={pop(0.25 + i * 0.06)}>
            <rect
              x={400 - tier.w / 2}
              y={tier.y}
              width={tier.w}
              height={tier.h}
              fill={`${gold.replace(")", " / 0.25)")}`}
              stroke={gold}
              strokeWidth="0.8"
            />
            {/* horizontal trim */}
            <rect
              x={400 - tier.w / 2}
              y={tier.y + tier.h - 2}
              width={tier.w}
              height={2}
              fill={gold}
            />
          </motion.g>
        ))}
        {/* topmost finial / kalasham */}
        <motion.path
          d="M 392 60 L 400 48 L 408 60 Z"
          fill={gold}
          variants={pop(0.7)}
        />
        <motion.circle cx="400" cy="44" r="3" fill={gold} variants={pop(0.75)} />
      </motion.g>

      {/* Marina Lighthouse (left side) */}
      <motion.g variants={pop(0.3)}>
        <rect x="138" y="70" width="14" height="150" fill={`${teal.replace(")", " / 0.3)")}`} stroke={teal} strokeWidth="1" />
        <rect x="134" y="78" width="22" height="6" fill={teal} />
        <rect x="134" y="118" width="22" height="6" fill={teal} />
        <rect x="134" y="160" width="22" height="6" fill={teal} />
        {/* lamp */}
        <rect x="132" y="58" width="26" height="14" fill={teal} />
        <motion.circle
          cx="145"
          cy="65"
          r="4"
          fill={gold}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        {/* light beam */}
        <motion.path
          d="M 145 65 L 80 50 L 80 80 Z"
          fill={`${gold.replace(")", " / 0.15)")}`}
          animate={{ opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.g>

      {/* Marina sand + waves */}
      <rect x="0" y="210" width="480" height="10" fill={`${gold.replace(")", " / 0.15)")}`} />
      {[200, 215].map((y, i) => (
        <motion.path
          key={`w-${i}`}
          d={`M 0 ${y} Q 60 ${y - 3} 120 ${y} T 240 ${y} T 360 ${y} T 480 ${y}`}
          stroke={`${teal.replace(")", " / 0.4)")}`}
          strokeWidth="0.8"
          fill="none"
          animate={{
            d: [
              `M 0 ${y} Q 60 ${y - 3} 120 ${y} T 240 ${y} T 360 ${y} T 480 ${y}`,
              `M 0 ${y} Q 60 ${y + 3} 120 ${y} T 240 ${y} T 360 ${y} T 480 ${y}`,
              `M 0 ${y} Q 60 ${y - 3} 120 ${y} T 240 ${y} T 360 ${y} T 480 ${y}`,
            ],
          }}
          transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* Auto wheel (centre bottom — Detroit of India) */}
      <motion.g
        variants={pop(0.5)}
        animate={{ rotate: 360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "240px 150px" }}
      >
        <circle cx="240" cy="150" r="38" fill="none" stroke={teal} strokeWidth="1.6" />
        <circle cx="240" cy="150" r="14" fill={`${teal.replace(")", " / 0.25)")}`} stroke={teal} strokeWidth="1" />
        {Array.from({ length: 8 }).map((_, i) => {
          const a = (i / 8) * Math.PI * 2;
          return (
            <line
              key={`sp-${i}`}
              x1={240 + 14 * Math.cos(a)}
              y1={150 + 14 * Math.sin(a)}
              x2={240 + 36 * Math.cos(a)}
              y2={150 + 36 * Math.sin(a)}
              stroke={teal}
              strokeWidth="1.4"
            />
          );
        })}
      </motion.g>

      {/* nameplate */}
      <motion.text
        x="240"
        y="290"
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="11"
        letterSpacing="0.4em"
        fill={teal}
        fontWeight="700"
        variants={pop(1.2)}
      >
        CHENNAI · DETROIT OF INDIA
      </motion.text>
      <motion.text
        x="240"
        y="304"
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="6.5"
        letterSpacing="0.25em"
        fill="var(--muted-foreground)"
        variants={pop(1.3)}
      >
        EST. 1639 · MARINA · GOPURAM · SRIPERUMBUDUR
      </motion.text>
    </motion.svg>
  );
}

/* -------------------------------------------------------------------------- */
/*                                Hyderabad                                   */
/* -------------------------------------------------------------------------- */

/** Charminar 4 minarets + pearl + pharma molecule */
export function HyderabadIdentity({ className = "" }: { className?: string }) {
  const violet = "oklch(0.62 0.18 295)";
  const green = "oklch(0.74 0.16 155)";
  return (
    <motion.svg
      viewBox={VIEWBOX}
      className={`h-auto w-full ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-30px" }}
    >
      <rect x="0" y="0" width="480" height="220" fill={`${violet.replace(")", " / 0.06)")}`} />

      {/* Charminar — 4 minarets + central arches */}
      <motion.g variants={pop(0.2)}>
        {/* base square */}
        <rect x="170" y="160" width="140" height="60" fill={`${violet.replace(")", " / 0.18)")}`} stroke={violet} strokeWidth="1.4" />
        {/* central arches */}
        <path
          d="M 200 220 L 200 195 Q 200 180 215 180 Q 230 180 230 195 L 230 220"
          fill="var(--background)"
          stroke={violet}
          strokeWidth="1"
        />
        <path
          d="M 250 220 L 250 195 Q 250 180 265 180 Q 280 180 280 195 L 280 220"
          fill="var(--background)"
          stroke={violet}
          strokeWidth="1"
        />
        {/* decorative band */}
        <line x1="170" y1="170" x2="310" y2="170" stroke={violet} strokeWidth="1" />

        {/* 4 minarets — corners */}
        {[170, 310].map((x) =>
          [60, 100].map((segY, j) => (
            <motion.g key={`min-${x}-${j}`} variants={pop(0.3 + j * 0.06)}>
              <rect x={x - 6} y={segY} width="12" height="100" fill={`${violet.replace(")", " / 0.25)")}`} stroke={violet} strokeWidth="0.8" />
            </motion.g>
          ))
        )}
        {/* minaret bulbs at top */}
        {[170, 310].map((x, i) => (
          <motion.g key={`bulb-${i}`} variants={pop(0.45 + i * 0.05)}>
            <circle cx={x} cy="60" r="10" fill={`${violet.replace(")", " / 0.4)")}`} stroke={violet} strokeWidth="1.2" />
            <path d={`M ${x - 8} 60 Q ${x} 50 ${x + 8} 60`} fill={violet} />
            <line x1={x} y1="50" x2={x} y2="42" stroke={violet} strokeWidth="1" />
            <circle cx={x} cy="40" r="2" fill={violet} />
          </motion.g>
        ))}
        {/* small minarets second row */}
        {[170, 310].map((x, i) => (
          <motion.g key={`bulb2-${i}`} variants={pop(0.5 + i * 0.05)}>
            <rect x={x - 5} y="100" width="10" height="6" fill={violet} />
          </motion.g>
        ))}
      </motion.g>

      {/* Pearl on the left — pulsing */}
      <motion.g variants={pop(0.6)}>
        <defs>
          <radialGradient id="pearl" cx="35%" cy="35%">
            <stop offset="0%" stopColor="oklch(0.97 0.04 290)" />
            <stop offset="100%" stopColor="oklch(0.7 0.12 295)" />
          </radialGradient>
        </defs>
        <motion.circle
          cx="60"
          cy="80"
          r="22"
          fill="url(#pearl)"
          stroke={`${violet.replace(")", " / 0.6)")}`}
          strokeWidth="0.8"
          animate={{ r: [20, 24, 20] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <text
          x="60"
          y="118"
          textAnchor="middle"
          fontFamily="var(--font-mono)"
          fontSize="7"
          letterSpacing="0.18em"
          fill={violet}
        >
          PEARL TRADE
        </text>
      </motion.g>

      {/* Pharma molecule on the right */}
      <motion.g variants={pop(0.6)}>
        {[
          { cx: 420, cy: 60 },
          { cx: 440, cy: 90 },
          { cx: 420, cy: 120 },
          { cx: 390, cy: 105 },
          { cx: 390, cy: 75 },
        ].map((n, i) => (
          <motion.g key={`atom-${i}`} variants={pop(0.7 + i * 0.06)}>
            <circle cx={n.cx} cy={n.cy} r="6" fill={green} stroke={`${green.replace(")", " / 0.5)")}`} strokeWidth="0.8" />
          </motion.g>
        ))}
        <motion.path
          d="M 420 60 L 440 90 L 420 120 L 390 105 L 390 75 Z"
          stroke={`${green.replace(")", " / 0.5)")}`}
          strokeWidth="1"
          fill="none"
          variants={draw(0.9, 1)}
        />
        <line x1="420" y1="60" x2="390" y2="105" stroke={`${green.replace(")", " / 0.4)")}`} strokeWidth="0.8" />
        <line x1="440" y1="90" x2="390" y2="75" stroke={`${green.replace(")", " / 0.4)")}`} strokeWidth="0.8" />
        <text
          x="415"
          y="148"
          textAnchor="middle"
          fontFamily="var(--font-mono)"
          fontSize="7"
          letterSpacing="0.18em"
          fill={green}
        >
          GENOME VALLEY
        </text>
      </motion.g>

      {/* nameplate */}
      <motion.text
        x="240"
        y="290"
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="11"
        letterSpacing="0.4em"
        fill={violet}
        fontWeight="700"
        variants={pop(1.2)}
      >
        HYDERABAD · CITY OF PEARLS
      </motion.text>
      <motion.text
        x="240"
        y="304"
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="6.5"
        letterSpacing="0.25em"
        fill="var(--muted-foreground)"
        variants={pop(1.3)}
      >
        EST. 1591 · CHARMINAR · GENOME VALLEY · CYBERABAD
      </motion.text>
    </motion.svg>
  );
}

/* -------------------------------------------------------------------------- */
/*                                Kolkata                                     */
/* -------------------------------------------------------------------------- */

/** Howrah Bridge cables + Victoria Memorial dome + tram */
export function KolkataIdentity({ className = "" }: { className?: string }) {
  const maroon = "oklch(0.55 0.18 25)";
  const cream = "oklch(0.85 0.06 80)";
  return (
    <motion.svg
      viewBox={VIEWBOX}
      className={`h-auto w-full ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-30px" }}
    >
      <rect x="0" y="0" width="480" height="220" fill={`${maroon.replace(")", " / 0.05)")}`} />

      {/* Howrah Bridge — cantilevered truss */}
      <motion.g variants={pop(0.2)}>
        {/* river line */}
        <rect x="0" y="170" width="480" height="50" fill={`${maroon.replace(")", " / 0.05)")}`} />
        {/* river waves */}
        {[180, 195, 210].map((y, i) => (
          <motion.path
            key={`riv-${i}`}
            d={`M 0 ${y} Q 60 ${y - 2} 120 ${y} T 240 ${y} T 360 ${y} T 480 ${y}`}
            stroke={`${maroon.replace(")", " / 0.25)")}`}
            strokeWidth="0.6"
            fill="none"
            animate={{
              d: [
                `M 0 ${y} Q 60 ${y - 2} 120 ${y} T 240 ${y} T 360 ${y} T 480 ${y}`,
                `M 0 ${y} Q 60 ${y + 2} 120 ${y} T 240 ${y} T 360 ${y} T 480 ${y}`,
                `M 0 ${y} Q 60 ${y - 2} 120 ${y} T 240 ${y} T 360 ${y} T 480 ${y}`,
              ],
            }}
            transition={{ duration: 6 + i, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
        {/* deck */}
        <rect x="40" y="160" width="400" height="6" fill={maroon} />
        {/* twin towers */}
        {[120, 360].map((x, i) => (
          <motion.g key={`tw-${i}`} variants={pop(0.3 + i * 0.06)}>
            <rect x={x - 8} y="50" width="16" height="110" fill={maroon} />
            <rect x={x - 14} y="46" width="28" height="6" fill={maroon} />
            <rect x={x - 12} y="74" width="24" height="4" fill={maroon} />
            <rect x={x - 10} y="100" width="20" height="4" fill={maroon} />
            <rect x={x - 8} y="126" width="16" height="4" fill={maroon} />
          </motion.g>
        ))}
        {/* truss diagonals */}
        {Array.from({ length: 12 }).map((_, i) => {
          const x1 = 130 + i * 19;
          const y1 = 162;
          const y2 = 56;
          return (
            <motion.line
              key={`tr-${i}`}
              x1={x1}
              y1={y1}
              x2={x1 + 9}
              y2={y2}
              stroke={`${maroon.replace(")", " / 0.5)")}`}
              strokeWidth="0.6"
              variants={draw(0.4 + i * 0.04, 0.5)}
            />
          );
        })}
        {/* horizontal upper chord */}
        <motion.line x1="120" y1="56" x2="360" y2="56" stroke={maroon} strokeWidth="1.4" variants={draw(0.5)} />
      </motion.g>

      {/* Victoria Memorial dome — left */}
      <motion.g variants={pop(0.5)}>
        <rect x="20" y="120" width="80" height="40" fill={`${cream.replace(")", " / 0.4)")}`} stroke={maroon} strokeWidth="1" />
        <path
          d="M 30 120 Q 60 80 90 120"
          fill={`${cream.replace(")", " / 0.6)")}`}
          stroke={maroon}
          strokeWidth="1.2"
        />
        <line x1="60" y1="80" x2="60" y2="68" stroke={maroon} strokeWidth="1" />
        <circle cx="60" cy="65" r="2.5" fill={maroon} />
      </motion.g>

      {/* Yellow taxi (tram) at the right */}
      <motion.g
        variants={pop(0.6)}
        animate={{ x: [0, 20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <rect x="380" y="135" width="60" height="22" rx="3" fill="oklch(0.85 0.18 90)" stroke={maroon} strokeWidth="0.8" />
        <rect x="386" y="138" width="14" height="9" fill={`${maroon.replace(")", " / 0.7)")}`} />
        <rect x="402" y="138" width="14" height="9" fill={`${maroon.replace(")", " / 0.7)")}`} />
        <rect x="418" y="138" width="18" height="9" fill={`${maroon.replace(")", " / 0.7)")}`} />
        <circle cx="392" cy="160" r="4" fill={maroon} />
        <circle cx="430" cy="160" r="4" fill={maroon} />
      </motion.g>

      {/* nameplate */}
      <motion.text
        x="240"
        y="290"
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="11"
        letterSpacing="0.4em"
        fill={maroon}
        fontWeight="700"
        variants={pop(1.2)}
      >
        KOLKATA · CITY OF JOY
      </motion.text>
      <motion.text
        x="240"
        y="304"
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="6.5"
        letterSpacing="0.25em"
        fill="var(--muted-foreground)"
        variants={pop(1.3)}
      >
        EST. 1690 · HOWRAH BRIDGE · VICTORIA MEMORIAL · PARK STREET
      </motion.text>
    </motion.svg>
  );
}

/* -------------------------------------------------------------------------- */
/*                                Ahmedabad                                   */
/* -------------------------------------------------------------------------- */

/** Sidi Saiyyed jali (tree-of-life) + chakra + textile loom motif */
export function AhmedabadIdentity({ className = "" }: { className?: string }) {
  const indigo = "oklch(0.55 0.22 250)";
  const accent = "oklch(0.78 0.165 50)";
  return (
    <motion.svg
      viewBox={VIEWBOX}
      className={`h-auto w-full ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-30px" }}
    >
      <rect x="0" y="0" width="480" height="220" fill={`${indigo.replace(")", " / 0.05)")}`} />

      {/* Sidi Saiyyed jali — tree of life arch (centre) */}
      <motion.g variants={pop(0.2)}>
        {/* arch frame */}
        <path
          d="M 180 200 L 180 100 Q 180 60 240 60 Q 300 60 300 100 L 300 200 Z"
          fill={`${indigo.replace(")", " / 0.06)")}`}
          stroke={indigo}
          strokeWidth="1.6"
        />
        {/* tree-of-life trunk */}
        <motion.path
          d="M 240 200 L 240 80"
          stroke={indigo}
          strokeWidth="1.4"
          variants={draw(0.4)}
        />
        {/* branches — symmetrical */}
        {[
          { y: 170, dx: 35 },
          { y: 150, dx: 30 },
          { y: 130, dx: 25 },
          { y: 110, dx: 20 },
          { y: 95, dx: 14 },
        ].map((br, i) => (
          <motion.g key={`br-${i}`} variants={draw(0.5 + i * 0.06, 0.5)}>
            <path
              d={`M 240 ${br.y} Q ${240 - br.dx / 2} ${br.y - 8} ${240 - br.dx} ${br.y - 16}`}
              stroke={indigo}
              strokeWidth="1"
              fill="none"
            />
            <path
              d={`M 240 ${br.y} Q ${240 + br.dx / 2} ${br.y - 8} ${240 + br.dx} ${br.y - 16}`}
              stroke={indigo}
              strokeWidth="1"
              fill="none"
            />
            {/* leaf-tips */}
            <circle cx={240 - br.dx} cy={br.y - 16} r="2" fill={accent} />
            <circle cx={240 + br.dx} cy={br.y - 16} r="2" fill={accent} />
          </motion.g>
        ))}
        {/* curl detail at top */}
        <motion.path
          d="M 234 80 Q 240 70 246 80 Q 244 88 240 90 Q 236 88 234 80"
          fill={accent}
          variants={pop(0.95)}
        />
      </motion.g>

      {/* Gandhi chakra (left) */}
      <motion.g
        variants={pop(0.45)}
        animate={{ rotate: 360 }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "70px 110px" }}
      >
        <circle cx="70" cy="110" r="32" fill="none" stroke={indigo} strokeWidth="1.4" />
        <circle cx="70" cy="110" r="6" fill={indigo} />
        {Array.from({ length: 24 }).map((_, i) => {
          const a = (i / 24) * Math.PI * 2;
          return (
            <line
              key={`spk-${i}`}
              x1={70 + 6 * Math.cos(a)}
              y1={110 + 6 * Math.sin(a)}
              x2={70 + 30 * Math.cos(a)}
              y2={110 + 30 * Math.sin(a)}
              stroke={`${indigo.replace(")", " / 0.6)")}`}
              strokeWidth="0.6"
            />
          );
        })}
      </motion.g>
      <motion.text
        x="70"
        y="158"
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="6.5"
        letterSpacing="0.18em"
        fill={indigo}
        variants={pop(0.7)}
      >
        SABARMATI
      </motion.text>

      {/* Textile loom (right) — vertical warps + horizontal weft */}
      <motion.g variants={pop(0.5)}>
        {Array.from({ length: 9 }).map((_, i) => (
          <motion.line
            key={`warp-${i}`}
            x1={390 + i * 8}
            y1="58"
            x2={390 + i * 8}
            y2="160"
            stroke={accent}
            strokeWidth="0.8"
            variants={draw(0.6 + i * 0.04, 0.8)}
          />
        ))}
        {[70, 90, 110, 130, 150].map((y, i) => (
          <motion.line
            key={`weft-${i}`}
            x1="386"
            y1={y}
            x2="466"
            y2={y}
            stroke={indigo}
            strokeWidth="0.8"
            variants={draw(1 + i * 0.04, 0.5)}
          />
        ))}
        {/* shuttle */}
        <motion.rect
          x="416"
          y="115"
          width="14"
          height="6"
          rx="1"
          fill={accent}
          animate={{ x: [386, 450, 386] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.g>
      <motion.text
        x="426"
        y="180"
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="6.5"
        letterSpacing="0.18em"
        fill={accent}
        variants={pop(1.1)}
      >
        TEXTILE LOOM
      </motion.text>

      {/* nameplate */}
      <motion.text
        x="240"
        y="290"
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="11"
        letterSpacing="0.4em"
        fill={indigo}
        fontWeight="700"
        variants={pop(1.2)}
      >
        AHMEDABAD · MANCHESTER OF INDIA
      </motion.text>
      <motion.text
        x="240"
        y="304"
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="6.5"
        letterSpacing="0.25em"
        fill="var(--muted-foreground)"
        variants={pop(1.3)}
      >
        EST. 1411 · SIDI SAIYYED JALI · NARODA · GIFT CITY
      </motion.text>
    </motion.svg>
  );
}

/* -------------------------------------------------------------------------- */
/*                                  Indore                                    */
/* -------------------------------------------------------------------------- */

/** Rajwada arched gates + logistics truck/route */
export function IndoreIdentity({ className = "" }: { className?: string }) {
  const orange = "oklch(0.7 0.2 50)";
  const violet = "oklch(0.66 0.18 295)";
  return (
    <motion.svg
      viewBox={VIEWBOX}
      className={`h-auto w-full ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-30px" }}
    >
      <rect x="0" y="0" width="480" height="220" fill={`${orange.replace(")", " / 0.05)")}`} />

      {/* Rajwada — multi-storey wood + stone palace */}
      <motion.g variants={pop(0.2)}>
        {/* base */}
        <rect x="100" y="180" width="280" height="40" fill={`${orange.replace(")", " / 0.25)")}`} stroke={orange} strokeWidth="1.4" />
        {/* central arch */}
        <path
          d="M 220 220 L 220 180 Q 220 160 240 160 Q 260 160 260 180 L 260 220 Z"
          fill="var(--background)"
          stroke={orange}
          strokeWidth="1.4"
        />
        {/* storey 2 */}
        <rect x="120" y="140" width="240" height="40" fill={`${orange.replace(")", " / 0.18)")}`} stroke={orange} strokeWidth="1" />
        {/* storey 3 */}
        <rect x="140" y="100" width="200" height="40" fill={`${orange.replace(")", " / 0.12)")}`} stroke={orange} strokeWidth="1" />
        {/* storey 4 */}
        <rect x="170" y="70" width="140" height="30" fill={`${orange.replace(")", " / 0.1)")}`} stroke={orange} strokeWidth="0.8" />
        {/* roof central */}
        <path d="M 200 70 L 240 50 L 280 70" fill={orange} />
        <line x1="240" y1="50" x2="240" y2="38" stroke={orange} strokeWidth="1" />
        <circle cx="240" cy="36" r="2.5" fill={orange} />
        {/* arched windows */}
        {[
          { y: 145, count: 6 },
          { y: 105, count: 5 },
        ].map((row, r) =>
          Array.from({ length: row.count }).map((_, i) => {
            const totalW = row.count * 32;
            const startX = 240 - totalW / 2;
            const x = startX + i * 32 + 10;
            return (
              <motion.g key={`win-${r}-${i}`} variants={pop(0.4 + r * 0.04 + i * 0.02)}>
                <rect x={x} y={row.y} width="14" height="22" rx="2" fill={`${orange.replace(")", " / 0.15)")}`} stroke={orange} strokeWidth="0.5" />
                <path d={`M ${x} ${row.y + 6} Q ${x + 7} ${row.y - 2} ${x + 14} ${row.y + 6}`} fill="none" stroke={orange} strokeWidth="0.5" />
              </motion.g>
            );
          })
        )}
      </motion.g>

      {/* Logistics route arc + truck */}
      <motion.g variants={pop(0.6)}>
        {/* route */}
        <motion.path
          d="M 20 180 Q 100 140 200 170"
          stroke={`${violet.replace(")", " / 0.5)")}`}
          strokeWidth="1.2"
          strokeDasharray="4 3"
          fill="none"
          variants={draw(0.7, 1.4)}
        />
        <motion.path
          d="M 280 170 Q 380 140 460 180"
          stroke={`${violet.replace(")", " / 0.5)")}`}
          strokeWidth="1.2"
          strokeDasharray="4 3"
          fill="none"
          variants={draw(0.7, 1.4)}
        />
        {/* lat/lng pins */}
        {[
          { cx: 20, cy: 180, label: "PITHAMPUR" },
          { cx: 460, cy: 180, label: "DELHI" },
        ].map((pin, i) => (
          <motion.g key={`pin-${i}`} variants={pop(0.9 + i * 0.1)}>
            <circle cx={pin.cx} cy={pin.cy} r="4" fill={violet} />
            <text
              x={pin.cx}
              y={pin.cy + 14}
              textAnchor="middle"
              fontFamily="var(--font-mono)"
              fontSize="6"
              fill={violet}
            >
              {pin.label}
            </text>
          </motion.g>
        ))}
        {/* truck */}
        <motion.g
          animate={{ x: [-460, 460] }}
          transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
        >
          <rect x="0" y="142" width="22" height="14" rx="2" fill={orange} />
          <rect x="0" y="138" width="14" height="6" fill={`${orange.replace(")", " / 0.7)")}`} />
          <circle cx="5" cy="158" r="2.5" fill="oklch(0.2 0.04 60)" />
          <circle cx="18" cy="158" r="2.5" fill="oklch(0.2 0.04 60)" />
        </motion.g>
      </motion.g>

      {/* nameplate */}
      <motion.text
        x="240"
        y="290"
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="11"
        letterSpacing="0.4em"
        fill={orange}
        fontWeight="700"
        variants={pop(1.2)}
      >
        INDORE · MINI MUMBAI
      </motion.text>
      <motion.text
        x="240"
        y="304"
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="6.5"
        letterSpacing="0.25em"
        fill="var(--muted-foreground)"
        variants={pop(1.3)}
      >
        EST. 1715 · RAJWADA · PITHAMPUR · CLEANEST CITY
      </motion.text>
    </motion.svg>
  );
}

/* -------------------------------------------------------------------------- */
/*                                  Bhopal                                    */
/* -------------------------------------------------------------------------- */

/** Taj-ul-Masajid 3 domes + lake reflection */
export function BhopalIdentity({ className = "" }: { className?: string }) {
  const teal = "oklch(0.6 0.16 200)";
  const accent = "oklch(0.74 0.16 155)";
  return (
    <motion.svg
      viewBox={VIEWBOX}
      className={`h-auto w-full ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-30px" }}
    >
      <defs>
        <linearGradient id="bp-sky" x1="0" y1="0" x2="0" y2="220" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={`${teal.replace(")", " / 0.18)")}`} />
          <stop offset="50%" stopColor={`${teal.replace(")", " / 0.06)")}`} />
          <stop offset="100%" stopColor={`${teal.replace(")", " / 0.16)")}`} />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="480" height="220" fill="url(#bp-sky)" />

      {/* Taj-ul-Masajid — central + 2 side domes + 2 minarets */}
      <motion.g variants={pop(0.2)}>
        {/* central dome */}
        <motion.path
          d="M 200 130 Q 240 60 280 130 Z"
          fill={`${teal.replace(")", " / 0.3)")}`}
          stroke={teal}
          strokeWidth="1.6"
          variants={draw(0.3, 1)}
        />
        <motion.line x1="240" y1="60" x2="240" y2="44" stroke={teal} strokeWidth="1.4" variants={draw(0.7)} />
        <motion.circle cx="240" cy="40" r="3" fill={teal} variants={pop(0.8)} />

        {/* side domes */}
        {[150, 330].map((cx, i) => (
          <motion.g key={`sd-${i}`} variants={pop(0.4 + i * 0.05)}>
            <path
              d={`M ${cx - 22} 130 Q ${cx} 88 ${cx + 22} 130 Z`}
              fill={`${teal.replace(")", " / 0.22)")}`}
              stroke={teal}
              strokeWidth="1.2"
            />
            <line x1={cx} y1="88" x2={cx} y2="76" stroke={teal} strokeWidth="1" />
            <circle cx={cx} cy="73" r="2" fill={teal} />
          </motion.g>
        ))}

        {/* minarets — corners */}
        {[78, 402].map((x, i) => (
          <motion.g key={`mn-${i}`} variants={pop(0.5 + i * 0.05)}>
            <rect x={x - 5} y="74" width="10" height="86" fill={`${teal.replace(")", " / 0.25)")}`} stroke={teal} strokeWidth="0.8" />
            <rect x={x - 7} y="100" width="14" height="3" fill={teal} />
            <rect x={x - 7} y="130" width="14" height="3" fill={teal} />
            <path d={`M ${x - 7} 74 Q ${x} 60 ${x + 7} 74`} fill={teal} />
            <line x1={x} y1="60" x2={x} y2="50" stroke={teal} strokeWidth="0.8" />
            <circle cx={x} cy="48" r="2" fill={teal} />
          </motion.g>
        ))}

        {/* facade body */}
        <rect x="100" y="130" width="280" height="40" fill={`${teal.replace(")", " / 0.1)")}`} stroke={teal} strokeWidth="1" />
        {/* main archway */}
        <path
          d="M 220 170 L 220 145 Q 220 132 240 132 Q 260 132 260 145 L 260 170 Z"
          fill="var(--background)"
          stroke={teal}
          strokeWidth="1"
        />
      </motion.g>

      {/* Lake water */}
      <motion.rect x="0" y="170" width="480" height="50" fill={`${teal.replace(")", " / 0.15)")}`} variants={pop(0.6)} />

      {/* Reflection of mosque (mirrored, transparent) */}
      <motion.g variants={pop(0.7)} opacity="0.35">
        <path d="M 200 170 Q 240 240 280 170 Z" fill={teal} />
        {[150, 330].map((cx, i) => (
          <path
            key={`rf-${i}`}
            d={`M ${cx - 22} 170 Q ${cx} 212 ${cx + 22} 170 Z`}
            fill={`${teal.replace(")", " / 0.4)")}`}
          />
        ))}
      </motion.g>

      {/* Water ripples */}
      {[185, 200, 215].map((y, i) => (
        <motion.path
          key={`rp-${i}`}
          d={`M 0 ${y} Q 60 ${y - 1} 120 ${y} T 240 ${y} T 360 ${y} T 480 ${y}`}
          stroke={`${accent.replace(")", " / 0.3)")}`}
          strokeWidth="0.5"
          fill="none"
          animate={{
            d: [
              `M 0 ${y} Q 60 ${y - 1} 120 ${y} T 240 ${y} T 360 ${y} T 480 ${y}`,
              `M 0 ${y} Q 60 ${y + 1} 120 ${y} T 240 ${y} T 360 ${y} T 480 ${y}`,
              `M 0 ${y} Q 60 ${y - 1} 120 ${y} T 240 ${y} T 360 ${y} T 480 ${y}`,
            ],
          }}
          transition={{ duration: 8 + i, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* nameplate */}
      <motion.text
        x="240"
        y="290"
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="11"
        letterSpacing="0.4em"
        fill={teal}
        fontWeight="700"
        variants={pop(1.2)}
      >
        BHOPAL · CITY OF LAKES
      </motion.text>
      <motion.text
        x="240"
        y="304"
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="6.5"
        letterSpacing="0.25em"
        fill="var(--muted-foreground)"
        variants={pop(1.3)}
      >
        TAJ-UL-MASAJID · UPPER LAKE · BHIMBETKA
      </motion.text>
    </motion.svg>
  );
}

/* -------------------------------------------------------------------------- */
/*                              Registry                                      */
/* -------------------------------------------------------------------------- */

export const cityIdentityVisuals: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  jaipur: JaipurIdentity,
  mumbai: MumbaiIdentity,
  delhi: DelhiIdentity,
  bengaluru: BengaluruIdentity,
  pune: PuneIdentity,
  chennai: ChennaiIdentity,
  hyderabad: HyderabadIdentity,
  kolkata: KolkataIdentity,
  ahmedabad: AhmedabadIdentity,
  indore: IndoreIdentity,
  bhopal: BhopalIdentity,
};
