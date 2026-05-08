"use client";

import { motion } from "framer-motion";

/**
 * Per-city iconic identity SVGs.
 *
 * Each component is a layered city poster:
 *   1. sky / atmosphere
 *   2. background skyline silhouette
 *   3. foreground iconic landmark
 *   4. industry motifs (what the city ships)
 *   5. cultural / geographic element (sea / lake / river)
 *   6. ambient animated activity (vehicle, particle, beam)
 *
 * Goal: at a glance, the visual answers both "what does this city look like"
 * and "what does this city do". Stylised posters, not photo-realistic
 * renders — every layer is hand-tuned per metro.
 *
 * All components share a 480×340 viewBox and animate in on viewport entry
 * with subtle, non-distracting ongoing motion.
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

const fade = (delay = 0) => ({
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { delay, duration: 0.6 } },
});

const VIEWBOX = "0 0 480 340";

/** Reusable backdrop skyline — generates random-feel building silhouettes. */
function Skyline({
  buildings,
  color,
  groundY = 240,
}: {
  buildings: Array<{ x: number; w: number; h: number; type?: "flat" | "step" | "antenna" | "dome" }>;
  color: string;
  groundY?: number;
}) {
  return (
    <>
      {buildings.map((b, i) => {
        const top = groundY - b.h;
        return (
          <motion.g
            key={`bldg-${i}-${b.x}`}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + i * 0.03, duration: 0.45 }}
          >
            <rect
              x={b.x}
              y={top}
              width={b.w}
              height={b.h}
              fill={`${color.replace(")", " / 0.28)")}`}
              stroke={`${color.replace(")", " / 0.4)")}`}
              strokeWidth="0.4"
            />
            {/* small windows */}
            {Array.from({ length: Math.floor(b.h / 12) }).map((_, r) =>
              Array.from({ length: Math.max(1, Math.floor(b.w / 6)) }).map((_, c) => (
                <rect
                  key={`w-${i}-${r}-${c}`}
                  x={b.x + 1.5 + c * 6}
                  y={top + 4 + r * 12}
                  width="2.5"
                  height="3"
                  fill={`${color.replace(")", " / 0.5)")}`}
                />
              ))
            )}
            {b.type === "step" && (
              <rect
                x={b.x + 2}
                y={top - 6}
                width={b.w - 4}
                height={6}
                fill={`${color.replace(")", " / 0.4)")}`}
              />
            )}
            {b.type === "antenna" && (
              <line
                x1={b.x + b.w / 2}
                y1={top}
                x2={b.x + b.w / 2}
                y2={top - 14}
                stroke={`${color.replace(")", " / 0.6)")}`}
                strokeWidth="0.6"
              />
            )}
            {b.type === "dome" && (
              <path
                d={`M ${b.x} ${top} Q ${b.x + b.w / 2} ${top - 8} ${b.x + b.w} ${top}`}
                fill={`${color.replace(")", " / 0.4)")}`}
              />
            )}
          </motion.g>
        );
      })}
    </>
  );
}

/** Reusable industry chip — small badge with icon + label. */
function IndustryChip({
  x,
  y,
  label,
  color,
  delay = 0,
  width = 56,
}: {
  x: number | string;
  y: number | string;
  label: string;
  color: string;
  delay?: number;
  width?: number | string;
}) {
  const xn = typeof x === "string" ? parseFloat(x) : x;
  const yn = typeof y === "string" ? parseFloat(y) : y;
  return (
    <motion.g
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={pop(delay)}
    >
      <rect
        x={xn}
        y={yn}
        width={width}
        height="14"
        rx="7"
        fill="var(--background)"
        stroke={color}
        strokeWidth="0.6"
      />
      <circle cx={xn + 7} cy={yn + 7} r="2.5" fill={color} />
      <text
        x={xn + 13}
        y={yn + 9.5}
        fontFamily="var(--font-mono)"
        fontSize="6"
        letterSpacing="0.1em"
        fontWeight="600"
        fill={color}
      >
        {label}
      </text>
    </motion.g>
  );
}

/* ============================================================================ */
/*                                  JAIPUR                                      */
/* ============================================================================ */
/** Hawa Mahal facade + Amber Fort silhouette + gemstone + block-print loom */

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
        <linearGradient id="jp-sky" x1="0" y1="0" x2="0" y2="240" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={`${pink.replace(")", " / 0.22)")}`} />
          <stop offset="100%" stopColor={`${pink.replace(")", " / 0.04)")}`} />
        </linearGradient>
        <linearGradient id="jp-facade" x1="240" y1="80" x2="240" y2="240" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={`${pink.replace(")", " / 0.22)")}`} />
          <stop offset="100%" stopColor={`${pink.replace(")", " / 0.06)")}`} />
        </linearGradient>
      </defs>

      {/* sky */}
      <rect x="0" y="0" width="480" height="240" fill="url(#jp-sky)" />

      {/* sun */}
      <motion.circle
        cx="400"
        cy="64"
        r="28"
        fill={`${accent.replace(")", " / 0.22)")}`}
        stroke={`${accent.replace(")", " / 0.4)")}`}
        strokeWidth="0.6"
        animate={{ r: [26, 32, 26], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Amber Fort silhouette in the back — hill profile + crenellations */}
      <motion.path
        d="M 0 175 L 30 165 L 50 150 L 75 145 L 95 138 L 110 145 L 100 150 L 110 152 L 105 158 L 115 160 L 110 165 L 120 168 L 0 240 Z"
        fill={`${pink.replace(")", " / 0.18)")}`}
        stroke={`${pink.replace(")", " / 0.4)")}`}
        strokeWidth="0.6"
        variants={fade(0.1)}
      />

      {/* Old-city sand-stone walls (right side) */}
      <motion.path
        d="M 380 240 L 380 175 L 400 170 L 420 175 L 440 168 L 460 175 L 480 172 L 480 240 Z"
        fill={`${pink.replace(")", " / 0.16)")}`}
        stroke={`${pink.replace(")", " / 0.4)")}`}
        strokeWidth="0.6"
        variants={fade(0.15)}
      />

      {/* central spire of Hawa Mahal */}
      <motion.path
        d="M 240 75 L 250 100 L 230 100 Z"
        fill={`${pink.replace(")", " / 0.5)")}`}
        stroke={pink}
        strokeWidth="1"
        variants={draw(0.2)}
      />
      <motion.circle cx="240" cy="100" r="9" fill={pink} variants={pop(0.35)} />
      <motion.path
        d="M 234 106 L 246 106 L 244 112 L 236 112 Z"
        fill={`${pink.replace(")", " / 0.7)")}`}
        variants={pop(0.4)}
      />

      {/* Hawa Mahal facade */}
      <motion.rect
        x="120"
        y="112"
        width="240"
        height="128"
        fill="url(#jp-facade)"
        stroke={pink}
        strokeWidth="1.4"
        variants={draw(0.25, 1.2)}
      />
      {/* roofline crenellations */}
      {Array.from({ length: 12 }).map((_, i) => {
        const x = 122 + i * 20;
        return (
          <motion.path
            key={`crl-${i}`}
            d={`M ${x} 112 L ${x + 6} 106 L ${x + 12} 112`}
            stroke={pink}
            strokeWidth="0.7"
            fill="none"
            variants={draw(0.55 + i * 0.025, 0.4)}
          />
        );
      })}

      {/* honeycomb window grid — 5 storeys */}
      {[
        { y: 124, count: 11, w: 18 },
        { y: 150, count: 10, w: 20 },
        { y: 178, count: 9, w: 22 },
        { y: 206, count: 8, w: 25 },
      ].map((row, r) =>
        Array.from({ length: row.count }).map((_, i) => {
          const totalW = row.count * row.w;
          const startX = 240 - totalW / 2;
          const x = startX + i * row.w;
          return (
            <motion.g key={`win-${r}-${i}`} variants={pop(0.55 + r * 0.04 + i * 0.012)}>
              <rect
                x={x + 1}
                y={row.y}
                width={row.w - 2}
                height="16"
                rx="3"
                fill={`${accent.replace(")", " / 0.28)")}`}
                stroke={`${accent.replace(")", " / 0.55)")}`}
                strokeWidth="0.5"
              />
              <path
                d={`M ${x + 1} ${row.y + 4} Q ${x + row.w / 2} ${row.y - 4} ${x + row.w - 1} ${row.y + 4}`}
                fill="none"
                stroke={`${accent.replace(")", " / 0.55)")}`}
                strokeWidth="0.5"
              />
            </motion.g>
          );
        })
      )}

      {/* INDUSTRY: gemstone (left foreground) — Jaipur is world's #3 gem cutting hub */}
      <motion.g variants={pop(0.95)}>
        {/* faceted diamond shape */}
        <path
          d="M 50 220 L 70 200 L 90 220 L 70 250 Z"
          fill={`${accent.replace(")", " / 0.5)")}`}
          stroke={accent}
          strokeWidth="0.8"
        />
        <line x1="50" y1="220" x2="90" y2="220" stroke={accent} strokeWidth="0.5" />
        <line x1="60" y1="210" x2="70" y2="220" stroke={accent} strokeWidth="0.4" />
        <line x1="80" y1="210" x2="70" y2="220" stroke={accent} strokeWidth="0.4" />
        <line x1="70" y1="200" x2="70" y2="220" stroke={accent} strokeWidth="0.4" />
        <motion.circle
          cx="62"
          cy="208"
          r="1.5"
          fill="oklch(0.99 0.05 30)"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2.4, repeat: Infinity }}
        />
      </motion.g>

      {/* INDUSTRY: block-print stamp + fabric (right foreground) */}
      <motion.g variants={pop(1.0)}>
        {/* fabric drape */}
        <path
          d="M 380 220 Q 410 230 440 222 L 444 250 Q 410 258 380 252 Z"
          fill={`${pink.replace(")", " / 0.28)")}`}
          stroke={pink}
          strokeWidth="0.6"
        />
        {/* block prints on fabric */}
        {[
          { cx: 392, cy: 235 },
          { cx: 410, cy: 240 },
          { cx: 428, cy: 238 },
        ].map((m, i) => (
          <g key={`bp-${i}`}>
            <circle cx={m.cx} cy={m.cy} r="2.5" fill={accent} />
            <circle cx={m.cx} cy={m.cy} r="1" fill={pink} />
          </g>
        ))}
        {/* stamping block */}
        <rect x="420" y="200" width="14" height="10" rx="1" fill={`${pink.replace(")", " / 0.6)")}`} stroke={pink} strokeWidth="0.5" />
        <line x1="420" y1="210" x2="434" y2="210" stroke={pink} strokeWidth="0.5" />
      </motion.g>

      {/* ground line */}
      <line x1="0" y1="240" x2="480" y2="240" stroke={`${pink.replace(")", " / 0.3)")}`} strokeWidth="0.6" />

      {/* INDUSTRY chips */}
      <IndustryChip x="20" y="266" label="GEM TRADE" color={accent} delay={1.2} width={64} />
      <IndustryChip x="92" y="266" label="BLOCK PRINT" color={pink} delay={1.25} width={68} />
      <IndustryChip x="168" y="266" label="HERITAGE TOURISM" color={accent} delay={1.3} width={92} />
      <IndustryChip x="268" y="266" label="JEWELLERY" color={pink} delay={1.35} width={62} />
      <IndustryChip x="338" y="266" label="MICE + JLF" color={accent} delay={1.4} width={62} />

      {/* nameplate */}
      <motion.text
        x="240"
        y="312"
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="11"
        letterSpacing="0.4em"
        fill={pink}
        fontWeight="700"
        variants={pop(1.5)}
      >
        JAIPUR · PINK CITY
      </motion.text>
      <motion.text
        x="240"
        y="328"
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="6.5"
        letterSpacing="0.25em"
        fill="var(--muted-foreground)"
        variants={pop(1.55)}
      >
        EST. 1727 · HAWA MAHAL · AMBER FORT · JOHARI BAZAAR
      </motion.text>
    </motion.svg>
  );
}

/* ============================================================================ */
/*                                  MUMBAI                                      */
/* ============================================================================ */
/** Skyline + Gateway of India + Bandra-Worli Sea Link + container ship + waves */

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
        <linearGradient id="mb-sky" x1="0" y1="0" x2="0" y2="240" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={`${blue.replace(")", " / 0.22)")}`} />
          <stop offset="55%" stopColor={`${orange.replace(")", " / 0.12)")}`} />
          <stop offset="100%" stopColor="oklch(0.99 0.002 260 / 0)" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="480" height="240" fill="url(#mb-sky)" />

      {/* setting sun */}
      <motion.circle
        cx="240"
        cy="115"
        r="36"
        fill={`${orange.replace(")", " / 0.4)")}`}
        animate={{ r: [34, 40, 34], opacity: [0.65, 0.95, 0.65] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* far skyline — South Bombay financial district */}
      <Skyline
        color={blue}
        groundY={240}
        buildings={[
          { x: 16, w: 18, h: 60 },
          { x: 36, w: 22, h: 80, type: "antenna" },
          { x: 60, w: 20, h: 70 },
          { x: 82, w: 18, h: 95 },
          { x: 102, w: 24, h: 78, type: "step" },
          { x: 128, w: 22, h: 110, type: "antenna" },
          { x: 152, w: 18, h: 85 },
          { x: 172, w: 22, h: 100 },
          // BKC / business district right
          { x: 314, w: 22, h: 105, type: "antenna" },
          { x: 338, w: 18, h: 80 },
          { x: 358, w: 26, h: 120, type: "step" },
          { x: 386, w: 20, h: 95 },
          { x: 408, w: 24, h: 88 },
          { x: 434, w: 18, h: 70 },
          { x: 454, w: 24, h: 100, type: "antenna" },
        ]}
      />

      {/* Bandra-Worli Sea Link cables in the sky (background) */}
      <motion.g variants={fade(0.4)}>
        <line x1="120" y1="80" x2="60" y2="190" stroke={`${blue.replace(")", " / 0.3)")}`} strokeWidth="0.5" />
        <line x1="120" y1="80" x2="100" y2="190" stroke={`${blue.replace(")", " / 0.3)")}`} strokeWidth="0.5" />
        <line x1="120" y1="80" x2="140" y2="190" stroke={`${blue.replace(")", " / 0.3)")}`} strokeWidth="0.5" />
        <line x1="120" y1="80" x2="180" y2="190" stroke={`${blue.replace(")", " / 0.3)")}`} strokeWidth="0.5" />
        <rect x="118" y="72" width="4" height="20" fill={`${blue.replace(")", " / 0.4)")}`} />
      </motion.g>

      {/* Gateway of India arch — central foreground */}
      <motion.g variants={pop(0.5)}>
        <path
          d="M 200 240 L 200 150 Q 200 130 220 130 L 260 130 Q 280 130 280 150 L 280 240"
          fill={`${blue.replace(")", " / 0.18)")}`}
          stroke={blue}
          strokeWidth="2"
        />
        {/* dome top */}
        <path
          d="M 200 150 Q 240 110 280 150 Z"
          fill={`${blue.replace(")", " / 0.25)")}`}
          stroke={blue}
          strokeWidth="1.6"
        />
        {/* central archway opening */}
        <path
          d="M 220 240 L 220 180 Q 220 162 240 162 Q 260 162 260 180 L 260 240"
          fill="var(--background)"
          stroke={blue}
          strokeWidth="1"
        />
        {/* corner spires */}
        {[200, 280].map((x, i) => (
          <g key={`sp-${i}`}>
            <rect x={x - 4} y="118" width="8" height="20" fill={blue} />
            <path d={`M ${x - 5} 118 L ${x} 104 L ${x + 5} 118 Z`} fill={blue} />
            <line x1={x} y1="104" x2={x} y2="98" stroke={blue} strokeWidth="0.8" />
            <circle cx={x} cy="96" r="2" fill={blue} />
          </g>
        ))}
        {/* dome finial */}
        <line x1="240" y1="110" x2="240" y2="100" stroke={blue} strokeWidth="0.8" />
        <circle cx="240" cy="98" r="2" fill={blue} />
      </motion.g>

      {/* sea band */}
      <motion.rect
        x="0"
        y="240"
        width="480"
        height="22"
        fill={`${blue.replace(")", " / 0.18)")}`}
        variants={fade(0.7)}
      />

      {/* container ship — moving across */}
      <motion.g
        variants={pop(0.85)}
        animate={{ x: [-50, 480] }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      >
        <rect x="0" y="244" width="46" height="8" rx="1" fill={`${blue.replace(")", " / 0.7)")}`} />
        {/* containers */}
        <rect x="2" y="238" width="6" height="6" fill={orange} />
        <rect x="9" y="238" width="6" height="6" fill={`${blue.replace(")", " / 0.6)")}`} />
        <rect x="16" y="238" width="6" height="6" fill={orange} />
        <rect x="23" y="238" width="6" height="6" fill={`${blue.replace(")", " / 0.6)")}`} />
        <rect x="30" y="238" width="6" height="6" fill={orange} />
        {/* superstructure */}
        <rect x="38" y="232" width="6" height="12" fill={`${blue.replace(")", " / 0.8)")}`} />
        <rect x="40" y="226" width="2" height="6" fill={`${blue.replace(")", " / 0.6)")}`} />
      </motion.g>

      {/* sea waves below ship */}
      {[252, 258].map((y, i) => (
        <motion.path
          key={`wave-${i}`}
          d={`M 0 ${y} Q 60 ${y - 2} 120 ${y} T 240 ${y} T 360 ${y} T 480 ${y}`}
          stroke={`${blue.replace(")", " / 0.45)")}`}
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

      {/* INDUSTRY chips */}
      <IndustryChip x="20" y="278" label="D2C" color={orange} delay={1.0} width={42} />
      <IndustryChip x="68" y="278" label="BFSI · BKC" color={blue} delay={1.05} width={64} />
      <IndustryChip x="138" y="278" label="REAL ESTATE" color={orange} delay={1.1} width={72} />
      <IndustryChip x="216" y="278" label="BOLLYWOOD" color={blue} delay={1.15} width={68} />
      <IndustryChip x="290" y="278" label="SHIPPING · JNPT" color={orange} delay={1.2} width={84} />
      <IndustryChip x="380" y="278" label="MEDIA" color={blue} delay={1.25} width={50} />

      {/* nameplate */}
      <motion.text
        x="240"
        y="312"
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="11"
        letterSpacing="0.4em"
        fill={blue}
        fontWeight="700"
        variants={pop(1.4)}
      >
        MUMBAI · MAXIMUM CITY
      </motion.text>
      <motion.text
        x="240"
        y="328"
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="6.5"
        letterSpacing="0.25em"
        fill="var(--muted-foreground)"
        variants={pop(1.45)}
      >
        EST. 1668 · GATEWAY · MARINE DRIVE · BKC · DHARAVI
      </motion.text>
    </motion.svg>
  );
}

/* ============================================================================ */
/*                                  DELHI                                       */
/* ============================================================================ */
/** India Gate + Lotus Temple + Qutub + NCR construction cranes + edtech */

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
        <linearGradient id="dl-sky" x1="0" y1="0" x2="0" y2="240" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={`${red.replace(")", " / 0.12)")}`} />
          <stop offset="100%" stopColor={`${accent.replace(")", " / 0.06)")}`} />
        </linearGradient>
      </defs>

      <rect x="0" y="0" width="480" height="240" fill="url(#dl-sky)" />
      <rect x="0" y="0" width="480" height="240" fill="url(#dl-glow)" />

      {/* far skyline — Gurugram Cyber Hub on right */}
      <Skyline
        color={red}
        groundY={240}
        buildings={[
          { x: 320, w: 22, h: 95, type: "antenna" },
          { x: 344, w: 20, h: 78 },
          { x: 366, w: 24, h: 110, type: "step" },
          { x: 392, w: 18, h: 70 },
          { x: 412, w: 22, h: 88, type: "antenna" },
          { x: 436, w: 24, h: 65 },
        ]}
      />

      {/* construction crane — NCR real estate signature */}
      <motion.g variants={pop(0.4)}>
        <line x1="406" y1="240" x2="406" y2="120" stroke={`${red.replace(")", " / 0.6)")}`} strokeWidth="1.4" />
        <line x1="406" y1="120" x2="450" y2="120" stroke={`${red.replace(")", " / 0.6)")}`} strokeWidth="1.4" />
        <line x1="406" y1="120" x2="376" y2="120" stroke={`${red.replace(")", " / 0.6)")}`} strokeWidth="1" />
        <line x1="406" y1="120" x2="396" y2="105" stroke={`${red.replace(")", " / 0.6)")}`} strokeWidth="0.8" />
        <line x1="406" y1="120" x2="416" y2="105" stroke={`${red.replace(")", " / 0.6)")}`} strokeWidth="0.8" />
        {/* hook line */}
        <motion.line
          x1="446"
          y1="120"
          x2="446"
          y2="180"
          stroke={`${red.replace(")", " / 0.5)")}`}
          strokeWidth="0.6"
          animate={{ y2: [180, 165, 180] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.rect
          x="442"
          y="180"
          width="8"
          height="6"
          fill={`${red.replace(")", " / 0.5)")}`}
          animate={{ y: [180, 165, 180] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.g>

      {/* India Gate — central foreground */}
      <motion.g variants={pop(0.3)}>
        <rect x="200" y="100" width="80" height="140" rx="2" fill={`${red.replace(")", " / 0.32)")}`} stroke={red} strokeWidth="1.4" />
        {/* archway */}
        <path
          d="M 216 240 L 216 130 Q 216 116 240 116 Q 264 116 264 130 L 264 240"
          fill="var(--background)"
          stroke={red}
          strokeWidth="1"
        />
        {/* eternal flame */}
        <motion.path
          d="M 234 218 Q 240 204 246 218 Q 244 230 240 232 Q 236 230 234 218"
          fill={accent}
          animate={{ scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* roof crown */}
        <rect x="194" y="92" width="92" height="8" fill={red} />
        <rect x="200" y="84" width="80" height="8" fill={`${red.replace(")", " / 0.7)")}`} />
      </motion.g>

      {/* Lotus Temple — left foreground */}
      <motion.g variants={pop(0.55)}>
        {Array.from({ length: 9 }).map((_, i) => {
          const a = (i / 9) * Math.PI * 2 - Math.PI / 2;
          const r = 26;
          const x = 90 + r * Math.cos(a);
          const y = 200 + r * Math.sin(a);
          const tx = 90 + (r * 0.55) * Math.cos(a);
          const ty = 200 + (r * 0.55) * Math.sin(a);
          return (
            <motion.path
              key={`petal-${i}`}
              d={`M 90 200 Q ${tx} ${ty - 12} ${x} ${y}`}
              stroke={red}
              strokeWidth="1.2"
              fill={`${red.replace(")", " / 0.12)")}`}
              variants={draw(0.6 + i * 0.04, 0.5)}
            />
          );
        })}
        <circle cx="90" cy="200" r="6" fill={red} />
      </motion.g>

      {/* Qutub Minar — left background, tapered */}
      <motion.g variants={pop(0.45)}>
        {[
          { y: 90, w: 22 },
          { y: 116, w: 26 },
          { y: 142, w: 30 },
          { y: 168, w: 34 },
          { y: 200, w: 38 },
        ].map((seg, i) => (
          <rect
            key={`qm-${i}`}
            x={28 - seg.w / 2 + 14}
            y={seg.y}
            width={seg.w}
            height={i === 4 ? 26 : 26}
            fill={`${red.replace(")", " / 0.32)")}`}
            stroke={red}
            strokeWidth="0.8"
          />
        ))}
        <path d="M 28 90 L 33 80 L 38 90 Z" fill={red} />
        <line x1="33" y1="80" x2="33" y2="74" stroke={red} strokeWidth="0.8" />
        <circle cx="33" cy="73" r="1.5" fill={red} />
      </motion.g>

      {/* edtech book stack — bottom centre */}
      <motion.g variants={pop(0.85)}>
        <rect x="160" y="218" width="22" height="6" fill={`${accent.replace(")", " / 0.5)")}`} stroke={accent} strokeWidth="0.5" />
        <rect x="158" y="224" width="26" height="6" fill={`${accent.replace(")", " / 0.4)")}`} stroke={accent} strokeWidth="0.5" />
        <rect x="156" y="230" width="30" height="6" fill={`${accent.replace(")", " / 0.3)")}`} stroke={accent} strokeWidth="0.5" />
        {/* graduation cap */}
        <path d="M 165 218 L 158 215 L 171 211 L 178 214 Z" fill={accent} />
        <line x1="171" y1="211" x2="171" y2="206" stroke={accent} strokeWidth="0.5" />
      </motion.g>

      {/* INDUSTRY chips */}
      <IndustryChip x="20" y="278" label="REAL ESTATE" color={red} delay={1.1} width={72} />
      <IndustryChip x="98" y="278" label="EDTECH · NEET / IIT" color={accent} delay={1.15} width={94} />
      <IndustryChip x="198" y="278" label="GOV / PSU" color={red} delay={1.2} width={62} />
      <IndustryChip x="266" y="278" label="GURGAON SAAS" color={accent} delay={1.25} width={78} />
      <IndustryChip x="350" y="278" label="MICE · CP" color={red} delay={1.3} width={64} />

      {/* nameplate */}
      <motion.text
        x="240"
        y="312"
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="11"
        letterSpacing="0.4em"
        fill={red}
        fontWeight="700"
        variants={pop(1.4)}
      >
        DELHI NCR · CAPITAL OF EMPIRES
      </motion.text>
      <motion.text
        x="240"
        y="328"
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="6.5"
        letterSpacing="0.25em"
        fill="var(--muted-foreground)"
        variants={pop(1.45)}
      >
        INDIA GATE · LOTUS · QUTUB · GURUGRAM · NOIDA
      </motion.text>
    </motion.svg>
  );
}

/* ============================================================================ */
/*                                BENGALURU                                     */
/* ============================================================================ */
/** Vidhana Soudha + ITPL tech park + circuit board + ISRO rocket trajectory */

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
      <defs>
        <linearGradient id="bg-sky" x1="0" y1="0" x2="0" y2="240" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={`${teal.replace(")", " / 0.16)")}`} />
          <stop offset="100%" stopColor={`${green.replace(")", " / 0.06)")}`} />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="480" height="240" fill="url(#bg-sky)" />

      {/* circuit-board grid backdrop */}
      {Array.from({ length: 24 }).map((_, i) => (
        <line
          key={`g-${i}`}
          x1={(i / 23) * 480}
          y1="0"
          x2={(i / 23) * 480}
          y2="240"
          stroke={`${teal.replace(")", " / 0.06)")}`}
          strokeWidth="0.4"
        />
      ))}
      {Array.from({ length: 14 }).map((_, i) => (
        <line
          key={`gh-${i}`}
          x1="0"
          y1={(i / 13) * 240}
          x2="480"
          y2={(i / 13) * 240}
          stroke={`${teal.replace(")", " / 0.06)")}`}
          strokeWidth="0.4"
        />
      ))}

      {/* ISRO rocket trajectory — top */}
      <motion.path
        d="M 380 220 Q 360 160 380 100 Q 400 60 460 30"
        stroke={`${green.replace(")", " / 0.5)")}`}
        strokeWidth="1"
        strokeDasharray="2 4"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2, delay: 0.5 }}
      />
      <motion.g variants={pop(2)}>
        <path d="M 458 30 L 462 24 L 466 30 L 462 38 Z" fill={green} />
        <circle cx="462" cy="30" r="2" fill={green} />
      </motion.g>

      {/* ITPL tech towers — right side */}
      <Skyline
        color={teal}
        groundY={240}
        buildings={[
          { x: 320, w: 18, h: 75 },
          { x: 340, w: 22, h: 95, type: "antenna" },
          { x: 364, w: 24, h: 110, type: "step" },
          { x: 390, w: 20, h: 85 },
          { x: 412, w: 24, h: 100, type: "antenna" },
          { x: 438, w: 22, h: 75 },
        ]}
      />
      {/* glass-tower reflections */}
      {[340, 364, 412].map((x, i) => (
        <motion.line
          key={`refl-${i}`}
          x1={x + 4}
          y1={200}
          x2={x + 4}
          y2={150}
          stroke={`${teal.replace(")", " / 0.3)")}`}
          strokeWidth="0.4"
          variants={fade(0.6 + i * 0.05)}
        />
      ))}

      {/* Vidhana Soudha — central foreground */}
      <motion.g variants={pop(0.3)}>
        {/* steps */}
        <rect x="80" y="225" width="280" height="15" fill={`${teal.replace(")", " / 0.2)")}`} stroke={teal} strokeWidth="0.8" />
        {/* base */}
        <rect x="100" y="200" width="240" height="25" fill={`${teal.replace(")", " / 0.28)")}`} stroke={teal} strokeWidth="1.4" />
        {/* main facade */}
        <rect x="135" y="155" width="170" height="45" fill={`${teal.replace(")", " / 0.06)")}`} stroke={`${teal.replace(")", " / 0.5)")}`} strokeWidth="0.6" />
        {/* pillars */}
        {[140, 165, 190, 215, 240, 265, 290].map((x, i) => (
          <motion.g key={`pl-${i}`} variants={pop(0.4 + i * 0.03)}>
            <rect x={x - 4} y="155" width="8" height="45" fill={`${teal.replace(")", " / 0.28)")}`} stroke={teal} strokeWidth="0.6" />
            <rect x={x - 6} y="155" width="12" height="3" fill={teal} />
            <rect x={x - 6} y="198" width="12" height="3" fill={teal} />
          </motion.g>
        ))}
        {/* dome */}
        <path
          d="M 215 155 Q 220 110 270 110 Q 280 110 280 155"
          fill={`${teal.replace(")", " / 0.32)")}`}
          stroke={teal}
          strokeWidth="1.4"
        />
        {/* ribbed dome */}
        <path
          d="M 220 130 Q 240 100 260 105 Q 270 110 270 130"
          fill="none"
          stroke={`${teal.replace(")", " / 0.5)")}`}
          strokeWidth="0.5"
        />
        <line x1="248" y1="100" x2="248" y2="84" stroke={teal} strokeWidth="1" />
        <circle cx="248" cy="80" r="4" fill={teal} />
      </motion.g>

      {/* circuit-node ecosystem (left side) */}
      {[
        { cx: 35, cy: 50, label: "API" },
        { cx: 60, cy: 90, label: "DB" },
        { cx: 30, cy: 130, label: "/docs" },
        { cx: 65, cy: 160, label: "stripe" },
      ].map((n, i) => (
        <motion.g key={`cn-${i}`} variants={pop(0.65 + i * 0.07)}>
          <line
            x1={n.cx}
            y1={n.cy}
            x2={150}
            y2={130}
            stroke={`${green.replace(")", " / 0.3)")}`}
            strokeDasharray="2 3"
            strokeWidth="0.4"
          />
          <circle cx={n.cx} cy={n.cy} r="9" fill="var(--background)" stroke={green} strokeWidth="0.8" />
          <text
            x={n.cx}
            y={n.cy + 2}
            textAnchor="middle"
            fontFamily="var(--font-mono)"
            fontSize="6"
            fill={green}
          >
            {n.label}
          </text>
        </motion.g>
      ))}

      {/* travelling deploy particle */}
      <motion.circle
        r="2.5"
        fill={teal}
        animate={{
          cx: [35, 150, 320, 412, 35],
          cy: [50, 130, 180, 130, 50],
          opacity: [0, 1, 1, 1, 0],
        }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Cubbon Park trees — small foreground accent */}
      {[
        { cx: 290, cy: 226 },
        { cx: 305, cy: 228 },
        { cx: 70, cy: 224 },
      ].map((t, i) => (
        <motion.g key={`tr-${i}`} variants={pop(0.95 + i * 0.05)}>
          <circle cx={t.cx} cy={t.cy - 6} r="6" fill={`${green.replace(")", " / 0.5)")}`} />
          <line x1={t.cx} y1={t.cy - 1} x2={t.cx} y2={t.cy + 4} stroke={`${green.replace(")", " / 0.6)")}`} strokeWidth="0.8" />
        </motion.g>
      ))}

      {/* INDUSTRY chips */}
      <IndustryChip x="20" y="278" label="SAAS" color={teal} delay={1.1} width={50} />
      <IndustryChip x="76" y="278" label="DEV TOOLS" color={green} delay={1.15} width={68} />
      <IndustryChip x="150" y="278" label="ISRO + AEROSPACE" color={teal} delay={1.2} width={94} />
      <IndustryChip x="252" y="278" label="BIOTECH" color={green} delay={1.25} width={58} />
      <IndustryChip x="316" y="278" label="IT SERVICES" color={teal} delay={1.3} width={68} />

      {/* nameplate */}
      <motion.text
        x="240"
        y="312"
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="11"
        letterSpacing="0.4em"
        fill={teal}
        fontWeight="700"
        variants={pop(1.4)}
      >
        BENGALURU · GARDEN CITY
      </motion.text>
      <motion.text
        x="240"
        y="328"
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="6.5"
        letterSpacing="0.25em"
        fill="var(--muted-foreground)"
        variants={pop(1.45)}
      >
        EST. 1537 · VIDHANA SOUDHA · ITPL · ELECTRONIC CITY · ISRO
      </motion.text>
    </motion.svg>
  );
}

/* ============================================================================ */
/*                                  PUNE                                        */
/* ============================================================================ */
/** Shaniwar Wada gate + Pimpri-Chinchwad smokestacks + Hinjewadi tower + gear */

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
      <defs>
        <linearGradient id="pn-sky" x1="0" y1="0" x2="0" y2="240" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={`${earth.replace(")", " / 0.1)")}`} />
          <stop offset="100%" stopColor={`${accent.replace(")", " / 0.04)")}`} />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="480" height="240" fill="url(#pn-sky)" />

      {/* Sahyadri hill silhouette in the back */}
      <motion.path
        d="M 0 200 L 50 175 L 100 195 L 150 165 L 200 188 L 260 170 L 320 195 L 380 175 L 440 198 L 480 180 L 480 240 L 0 240 Z"
        fill={`${earth.replace(")", " / 0.12)")}`}
        variants={fade(0.1)}
      />

      {/* Pimpri-Chinchwad factory silhouettes (left) */}
      <motion.g variants={fade(0.2)}>
        {/* factory body */}
        <rect x="20" y="180" width="80" height="60" fill={`${earth.replace(")", " / 0.22)")}`} stroke={`${earth.replace(")", " / 0.5)")}`} strokeWidth="0.6" />
        {/* sawtooth roof */}
        <path
          d="M 20 180 L 30 168 L 40 180 L 50 168 L 60 180 L 70 168 L 80 180 L 90 168 L 100 180"
          fill={`${earth.replace(")", " / 0.28)")}`}
          stroke={`${earth.replace(")", " / 0.5)")}`}
          strokeWidth="0.6"
        />
        {/* smokestacks */}
        {[28, 50, 72].map((x, i) => (
          <g key={`stack-${i}`}>
            <rect x={x} y="148" width="6" height="32" fill={`${earth.replace(")", " / 0.5)")}`} />
            {/* smoke puff */}
            <motion.circle
              cx={x + 3}
              cy="140"
              r="4"
              fill={`${earth.replace(")", " / 0.18)")}`}
              animate={{ cy: [140, 120, 140], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.5 }}
            />
            <motion.circle
              cx={x + 3}
              cy="135"
              r="5"
              fill={`${earth.replace(")", " / 0.14)")}`}
              animate={{ cy: [135, 110, 135], opacity: [0.4, 0, 0.4] }}
              transition={{ duration: 5 + i, repeat: Infinity, delay: i * 0.7 }}
            />
          </g>
        ))}
      </motion.g>

      {/* Hinjewadi IT tower (far right) */}
      <Skyline
        color={accent}
        groundY={240}
        buildings={[
          { x: 380, w: 20, h: 95, type: "antenna" },
          { x: 402, w: 24, h: 120, type: "step" },
          { x: 428, w: 22, h: 80 },
          { x: 452, w: 22, h: 100, type: "antenna" },
        ]}
      />

      {/* Shaniwar Wada — central foreground */}
      <motion.g variants={pop(0.3)}>
        {/* outer wall */}
        <rect x="140" y="150" width="200" height="90" fill={`${earth.replace(")", " / 0.22)")}`} stroke={earth} strokeWidth="1.4" />
        {/* crenellations */}
        {Array.from({ length: 11 }).map((_, i) => (
          <rect
            key={`cr-${i}`}
            x={142 + i * 18}
            y="143"
            width="10"
            height="9"
            fill={earth}
          />
        ))}
        {/* central gate */}
        <path
          d="M 220 240 L 220 188 Q 220 168 240 168 Q 260 168 260 188 L 260 240 Z"
          fill="var(--background)"
          stroke={earth}
          strokeWidth="1.4"
        />
        {/* iron spikes */}
        {Array.from({ length: 7 }).map((_, i) => (
          <motion.path
            key={`sp-${i}`}
            d={`M ${224 + i * 5.5} 188 L ${226.5 + i * 5.5} 181 L ${229 + i * 5.5} 188`}
            stroke={accent}
            strokeWidth="0.8"
            fill="none"
            variants={draw(0.55 + i * 0.04)}
          />
        ))}
        {/* corner towers */}
        {[140, 340].map((x, i) => (
          <g key={`tw-${i}`}>
            <rect x={x - 12} y="125" width="24" height="115" fill={`${earth.replace(")", " / 0.3)")}`} stroke={earth} strokeWidth="1" />
            <path d={`M ${x - 14} 125 L ${x} 110 L ${x + 14} 125 Z`} fill={earth} />
            <line x1={x} y1="110" x2={x} y2="100" stroke={earth} strokeWidth="0.8" />
            <circle cx={x} cy="98" r="1.5" fill={earth} />
          </g>
        ))}
      </motion.g>

      {/* manufacturing gear (top-left) */}
      <motion.g
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "60px 70px" }}
      >
        <motion.g variants={pop(0.5)}>
          {Array.from({ length: 12 }).map((_, i) => {
            const a = (i / 12) * Math.PI * 2;
            const r1 = 24;
            const r2 = 32;
            return (
              <line
                key={`gt-${i}`}
                x1={60 + r1 * Math.cos(a)}
                y1={70 + r1 * Math.sin(a)}
                x2={60 + r2 * Math.cos(a)}
                y2={70 + r2 * Math.sin(a)}
                stroke={accent}
                strokeWidth="2"
              />
            );
          })}
          <circle cx="60" cy="70" r="20" fill={`${accent.replace(")", " / 0.18)")}`} stroke={accent} strokeWidth="1.4" />
          <circle cx="60" cy="70" r="5" fill={accent} />
        </motion.g>
      </motion.g>

      {/* SaaS terminal (top-right) */}
      <motion.g variants={pop(0.6)}>
        <rect x="380" y="40" width="80" height="48" rx="4" fill="var(--background)" stroke={accent} strokeWidth="1" />
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

      {/* INDUSTRY chips */}
      <IndustryChip x="20" y="278" label="AUTO · CHAKAN" color={earth} delay={1.1} width={84} />
      <IndustryChip x="110" y="278" label="MANUFACTURING" color={accent} delay={1.15} width={88} />
      <IndustryChip x="204" y="278" label="IT · HINJEWADI" color={earth} delay={1.2} width={84} />
      <IndustryChip x="294" y="278" label="EDU · FERGUSSON" color={accent} delay={1.25} width={92} />
      <IndustryChip x="392" y="278" label="PHARMA" color={earth} delay={1.3} width={56} />

      {/* nameplate */}
      <motion.text
        x="240"
        y="312"
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="11"
        letterSpacing="0.4em"
        fill={earth}
        fontWeight="700"
        variants={pop(1.4)}
      >
        PUNE · OXFORD OF THE EAST
      </motion.text>
      <motion.text
        x="240"
        y="328"
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="6.5"
        letterSpacing="0.25em"
        fill="var(--muted-foreground)"
        variants={pop(1.45)}
      >
        SHANIWAR WADA · CHAKAN · HINJEWADI · KHARADI
      </motion.text>
    </motion.svg>
  );
}

/* ============================================================================ */
/*                                CHENNAI                                       */
/* ============================================================================ */
/** Marina Lighthouse + Kapaleeshwarar gopuram + auto plant + temple chariot + sea */

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
        <linearGradient id="cn-sky" x1="0" y1="0" x2="0" y2="240" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={`${teal.replace(")", " / 0.18)")}`} />
          <stop offset="100%" stopColor="oklch(0.99 0.002 260 / 0)" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="480" height="220" fill="url(#cn-sky)" />

      {/* sun rising over Marina */}
      <motion.circle
        cx="100"
        cy="76"
        r="22"
        fill={`${gold.replace(")", " / 0.4)")}`}
        animate={{ r: [20, 24, 20], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 5, repeat: Infinity }}
      />

      {/* OMR IT corridor skyline (mid distance) */}
      <Skyline
        color={teal}
        groundY={220}
        buildings={[
          { x: 200, w: 20, h: 60 },
          { x: 222, w: 18, h: 75, type: "antenna" },
          { x: 244, w: 22, h: 90, type: "step" },
          { x: 268, w: 18, h: 65 },
          { x: 290, w: 22, h: 80, type: "antenna" },
        ]}
      />

      {/* Sriperumbudur auto-plant silhouette (far right) */}
      <motion.g variants={fade(0.3)}>
        <rect x="332" y="170" width="76" height="50" fill={`${teal.replace(")", " / 0.2)")}`} stroke={`${teal.replace(")", " / 0.4)")}`} strokeWidth="0.5" />
        {/* sawtooth roof */}
        <path
          d="M 332 170 L 342 162 L 352 170 L 362 162 L 372 170 L 382 162 L 392 170 L 402 162 L 408 170"
          fill={`${teal.replace(")", " / 0.3)")}`}
        />
        {/* "Ford / Hyundai" feel — branding lines */}
        <line x1="340" y1="195" x2="400" y2="195" stroke={`${teal.replace(")", " / 0.4)")}`} strokeWidth="0.5" />
        <line x1="340" y1="200" x2="400" y2="200" stroke={`${teal.replace(")", " / 0.4)")}`} strokeWidth="0.5" />
      </motion.g>

      {/* Marina Lighthouse — left foreground */}
      <motion.g variants={pop(0.3)}>
        <rect x="138" y="80" width="14" height="140" fill={`${teal.replace(")", " / 0.32)")}`} stroke={teal} strokeWidth="1" />
        <rect x="134" y="88" width="22" height="6" fill={teal} />
        <rect x="134" y="120" width="22" height="6" fill={teal} />
        <rect x="134" y="152" width="22" height="6" fill={teal} />
        <rect x="134" y="184" width="22" height="6" fill={teal} />
        {/* lamp room */}
        <rect x="132" y="68" width="26" height="14" fill={teal} />
        <motion.circle
          cx="145"
          cy="75"
          r="4"
          fill={gold}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        {/* light beam */}
        <motion.path
          d="M 145 75 L 60 50 L 60 95 Z"
          fill={`${gold.replace(")", " / 0.18)")}`}
          animate={{ opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path
          d="M 145 75 L 60 95 L 60 60 Z"
          fill={`${gold.replace(")", " / 0.12)")}`}
          animate={{ opacity: [0.5, 0.1, 0.5] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.g>

      {/* Kapaleeshwarar gopuram — right foreground */}
      <motion.g variants={pop(0.4)}>
        {[
          { y: 70, w: 32, h: 18 },
          { y: 88, w: 40, h: 22 },
          { y: 110, w: 48, h: 26 },
          { y: 136, w: 56, h: 30 },
          { y: 166, w: 64, h: 26 },
          { y: 192, w: 70, h: 28 },
        ].map((tier, i) => (
          <g key={`gop-${i}`}>
            <rect
              x={420 - tier.w / 2}
              y={tier.y}
              width={tier.w}
              height={tier.h}
              fill={`${gold.replace(")", " / 0.28)")}`}
              stroke={gold}
              strokeWidth="0.8"
            />
            <rect
              x={420 - tier.w / 2}
              y={tier.y + tier.h - 2}
              width={tier.w}
              height={2}
              fill={gold}
            />
            {/* sculptural detail dots */}
            {Array.from({ length: Math.floor(tier.w / 8) }).map((_, j) => (
              <circle
                key={`dot-${i}-${j}`}
                cx={420 - tier.w / 2 + 4 + j * 8}
                cy={tier.y + tier.h / 2}
                r="0.8"
                fill={`${gold.replace(")", " / 0.6)")}`}
              />
            ))}
          </g>
        ))}
        <path d="M 412 70 L 420 56 L 428 70 Z" fill={gold} />
        <circle cx="420" cy="52" r="3" fill={gold} />
      </motion.g>

      {/* sand strip + sea */}
      <rect x="0" y="220" width="480" height="6" fill={`${gold.replace(")", " / 0.14)")}`} />
      <rect x="0" y="226" width="480" height="14" fill={`${teal.replace(")", " / 0.18)")}`} />
      {[228, 234, 240].map((y, i) => (
        <motion.path
          key={`w-${i}`}
          d={`M 0 ${y} Q 60 ${y - 2} 120 ${y} T 240 ${y} T 360 ${y} T 480 ${y}`}
          stroke={`${teal.replace(")", " / 0.4)")}`}
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

      {/* auto wheel (centre-bottom) */}
      <motion.g
        animate={{ rotate: 360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "240px 200px" }}
      >
        <motion.g variants={pop(0.55)}>
          <circle cx="240" cy="200" r="20" fill="var(--background)" stroke={teal} strokeWidth="1.4" />
          <circle cx="240" cy="200" r="7" fill={`${teal.replace(")", " / 0.28)")}`} stroke={teal} strokeWidth="0.8" />
          {Array.from({ length: 8 }).map((_, i) => {
            const a = (i / 8) * Math.PI * 2;
            return (
              <line
                key={`sp-${i}`}
                x1={240 + 7 * Math.cos(a)}
                y1={200 + 7 * Math.sin(a)}
                x2={240 + 19 * Math.cos(a)}
                y2={200 + 19 * Math.sin(a)}
                stroke={teal}
                strokeWidth="1"
              />
            );
          })}
        </motion.g>
      </motion.g>

      {/* INDUSTRY chips */}
      <IndustryChip x="20" y="266" label="AUTO · SRIPERUMBUDUR" color={teal} delay={1.0} width={108} />
      <IndustryChip x="134" y="266" label="HEALTHCARE · APOLLO" color={gold} delay={1.05} width={106} />
      <IndustryChip x="246" y="266" label="IT · OMR" color={teal} delay={1.1} width={56} />
      <IndustryChip x="308" y="266" label="PORT · ENNORE" color={gold} delay={1.15} width={80} />
      <IndustryChip x="394" y="266" label="KOLLYWOOD" color={teal} delay={1.2} width={64} />

      {/* nameplate */}
      <motion.text
        x="240"
        y="302"
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="11"
        letterSpacing="0.4em"
        fill={teal}
        fontWeight="700"
        variants={pop(1.4)}
      >
        CHENNAI · DETROIT OF INDIA
      </motion.text>
      <motion.text
        x="240"
        y="318"
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="6.5"
        letterSpacing="0.25em"
        fill="var(--muted-foreground)"
        variants={pop(1.45)}
      >
        EST. 1639 · MARINA · GOPURAM · SRIPERUMBUDUR · OMR
      </motion.text>
    </motion.svg>
  );
}

/* ============================================================================ */
/*                                HYDERABAD                                     */
/* ============================================================================ */
/** Charminar + HITEC towers + pearl + Genome Valley molecule + Hussain Sagar */

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
      <defs>
        <linearGradient id="hyd-sky" x1="0" y1="0" x2="0" y2="240" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={`${violet.replace(")", " / 0.16)")}`} />
          <stop offset="100%" stopColor={`${violet.replace(")", " / 0.04)")}`} />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="480" height="240" fill="url(#hyd-sky)" />

      {/* HITEC City + Cyberabad skyline (right) */}
      <Skyline
        color={violet}
        groundY={240}
        buildings={[
          { x: 320, w: 20, h: 90, type: "antenna" },
          { x: 342, w: 24, h: 115, type: "step" },
          { x: 368, w: 22, h: 80 },
          { x: 392, w: 26, h: 130, type: "antenna" },
          { x: 420, w: 22, h: 95, type: "step" },
          { x: 444, w: 20, h: 78 },
        ]}
      />

      {/* Microsoft / Google campus halo (right top) */}
      <motion.circle
        cx="404"
        cy="60"
        r="14"
        fill={`${green.replace(")", " / 0.18)")}`}
        animate={{ r: [12, 16, 12], opacity: [0.6, 0.9, 0.6] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.text
        x="404"
        y="63"
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="6"
        fill={green}
        variants={pop(0.7)}
      >
        HITEC
      </motion.text>

      {/* Charminar — central foreground */}
      <motion.g variants={pop(0.3)}>
        {/* base */}
        <rect x="170" y="170" width="140" height="70" fill={`${violet.replace(")", " / 0.22)")}`} stroke={violet} strokeWidth="1.4" />
        {/* central arches */}
        <path
          d="M 200 240 L 200 205 Q 200 188 215 188 Q 230 188 230 205 L 230 240"
          fill="var(--background)"
          stroke={violet}
          strokeWidth="1"
        />
        <path
          d="M 250 240 L 250 205 Q 250 188 265 188 Q 280 188 280 205 L 280 240"
          fill="var(--background)"
          stroke={violet}
          strokeWidth="1"
        />
        {/* decorative band */}
        <line x1="170" y1="180" x2="310" y2="180" stroke={violet} strokeWidth="1" />
        <line x1="170" y1="184" x2="310" y2="184" stroke={`${violet.replace(")", " / 0.6)")}`} strokeWidth="0.4" />

        {/* 4 minarets */}
        {[170, 310].map((x, i) => (
          <g key={`min-${x}`}>
            <rect x={x - 6} y="100" width="12" height="80" fill={`${violet.replace(")", " / 0.28)")}`} stroke={violet} strokeWidth="0.8" />
            <rect x={x - 8} y="140" width="16" height="3" fill={violet} />
            <rect x={x - 8} y="105" width="16" height="3" fill={violet} />
            {/* bulb */}
            <circle cx={x} cy="92" r="10" fill={`${violet.replace(")", " / 0.4)")}`} stroke={violet} strokeWidth="1.2" />
            <path d={`M ${x - 8} 92 Q ${x} 82 ${x + 8} 92`} fill={violet} />
            <line x1={x} y1="82" x2={x} y2="74" stroke={violet} strokeWidth="1" />
            <circle cx={x} cy="72" r="2" fill={violet} />
          </g>
        ))}

        {/* small minarets second row */}
        {[200, 280].map((x) => (
          <rect key={`bulb2-${x}`} x={x - 5} y="100" width="10" height="6" fill={violet} />
        ))}
      </motion.g>

      {/* Pearl on the left */}
      <motion.g variants={pop(0.6)}>
        <defs>
          <radialGradient id="hyd-pearl" cx="35%" cy="35%">
            <stop offset="0%" stopColor="oklch(0.97 0.04 290)" />
            <stop offset="100%" stopColor="oklch(0.7 0.12 295)" />
          </radialGradient>
        </defs>
        <motion.circle
          cx="60"
          cy="80"
          r="20"
          fill="url(#hyd-pearl)"
          stroke={`${violet.replace(")", " / 0.6)")}`}
          strokeWidth="0.8"
          animate={{ r: [18, 22, 18] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* shimmer */}
        <motion.circle
          cx="56"
          cy="76"
          r="3"
          fill="oklch(0.99 0.04 290)"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        />
      </motion.g>

      {/* Hussain Sagar Buddha statue silhouette */}
      <motion.g variants={pop(0.5)}>
        {/* base */}
        <ellipse cx="60" cy="220" rx="20" ry="3" fill={`${violet.replace(")", " / 0.3)")}`} />
        {/* statue */}
        <path
          d="M 56 220 L 56 200 Q 56 192 60 188 Q 64 192 64 200 L 64 220 Z"
          fill={`${violet.replace(")", " / 0.5)")}`}
          stroke={violet}
          strokeWidth="0.6"
        />
        <circle cx="60" cy="186" r="3" fill={`${violet.replace(")", " / 0.6)")}`} />
      </motion.g>

      {/* Hussain Sagar lake band */}
      <rect x="20" y="225" width="80" height="14" fill={`${violet.replace(")", " / 0.1)")}`} />
      <motion.path
        d="M 20 232 Q 40 230 60 232 T 100 232"
        stroke={`${green.replace(")", " / 0.4)")}`}
        strokeWidth="0.5"
        fill="none"
        animate={{
          d: [
            "M 20 232 Q 40 230 60 232 T 100 232",
            "M 20 232 Q 40 234 60 232 T 100 232",
            "M 20 232 Q 40 230 60 232 T 100 232",
          ],
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      {/* pharma molecule — top right */}
      <motion.g variants={pop(0.7)}>
        {[
          { cx: 420, cy: 160 },
          { cx: 442, cy: 178 },
          { cx: 432, cy: 205 },
          { cx: 408, cy: 205 },
          { cx: 398, cy: 178 },
        ].map((n, i) => (
          <g key={`atom-${i}`}>
            <circle cx={n.cx} cy={n.cy} r="5" fill={green} stroke={`${green.replace(")", " / 0.5)")}`} strokeWidth="0.6" />
          </g>
        ))}
        <path
          d="M 420 160 L 442 178 L 432 205 L 408 205 L 398 178 Z"
          stroke={`${green.replace(")", " / 0.5)")}`}
          strokeWidth="0.8"
          fill="none"
        />
        <line x1="420" y1="160" x2="408" y2="205" stroke={`${green.replace(")", " / 0.4)")}`} strokeWidth="0.6" />
        <line x1="442" y1="178" x2="398" y2="178" stroke={`${green.replace(")", " / 0.4)")}`} strokeWidth="0.6" />
        <text
          x="420"
          y="222"
          textAnchor="middle"
          fontFamily="var(--font-mono)"
          fontSize="6"
          letterSpacing="0.16em"
          fill={green}
        >
          GENOME VALLEY
        </text>
      </motion.g>

      {/* INDUSTRY chips */}
      <IndustryChip x="20" y="266" label="PHARMA · BIOTECH" color={green} delay={1.0} width={92} />
      <IndustryChip x="118" y="266" label="HITEC · CYBERABAD" color={violet} delay={1.05} width={102} />
      <IndustryChip x="226" y="266" label="PEARL TRADE" color={violet} delay={1.1} width={70} />
      <IndustryChip x="302" y="266" label="DEFENCE · DRDL" color={green} delay={1.15} width={86} />
      <IndustryChip x="394" y="266" label="FILM CITY" color={violet} delay={1.2} width={64} />

      {/* nameplate */}
      <motion.text
        x="240"
        y="302"
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="11"
        letterSpacing="0.4em"
        fill={violet}
        fontWeight="700"
        variants={pop(1.4)}
      >
        HYDERABAD · CITY OF PEARLS
      </motion.text>
      <motion.text
        x="240"
        y="318"
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="6.5"
        letterSpacing="0.25em"
        fill="var(--muted-foreground)"
        variants={pop(1.45)}
      >
        EST. 1591 · CHARMINAR · GENOME VALLEY · CYBERABAD
      </motion.text>
    </motion.svg>
  );
}

/* ============================================================================ */
/*                                  KOLKATA                                     */
/* ============================================================================ */
/** Howrah Bridge + Victoria Memorial + tram + Park Street + Hooghly + jute mill */

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
      <defs>
        <linearGradient id="kol-sky" x1="0" y1="0" x2="0" y2="200" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={`${maroon.replace(")", " / 0.12)")}`} />
          <stop offset="100%" stopColor={`${cream.replace(")", " / 0.08)")}`} />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="480" height="200" fill="url(#kol-sky)" />

      {/* Park Street / BBD Bagh skyline (right back) */}
      <Skyline
        color={maroon}
        groundY={200}
        buildings={[
          { x: 320, w: 18, h: 70, type: "dome" },
          { x: 342, w: 22, h: 88 },
          { x: 366, w: 20, h: 65 },
          { x: 388, w: 22, h: 95, type: "dome" },
          { x: 412, w: 18, h: 60 },
          { x: 432, w: 24, h: 85 },
        ]}
      />

      {/* Howrah Bridge — central */}
      <motion.g variants={pop(0.3)}>
        {/* twin towers */}
        {[120, 360].map((x) => (
          <g key={`tw-${x}`}>
            <rect x={x - 8} y="50" width="16" height="150" fill={maroon} />
            <rect x={x - 14} y="46" width="28" height="6" fill={maroon} />
            <rect x={x - 12} y="72" width="24" height="4" fill={maroon} />
            <rect x={x - 10} y="98" width="20" height="4" fill={maroon} />
            <rect x={x - 8} y="124" width="16" height="4" fill={maroon} />
            <rect x={x - 8} y="150" width="16" height="4" fill={maroon} />
          </g>
        ))}
        {/* upper chord */}
        <line x1="120" y1="56" x2="360" y2="56" stroke={maroon} strokeWidth="1.6" />
        {/* truss diagonals */}
        {Array.from({ length: 14 }).map((_, i) => {
          const x1 = 130 + i * 16.5;
          return (
            <motion.line
              key={`tr-${i}`}
              x1={x1}
              y1={195}
              x2={x1 + 8}
              y2={56}
              stroke={`${maroon.replace(")", " / 0.55)")}`}
              strokeWidth="0.5"
              variants={draw(0.4 + i * 0.03, 0.45)}
            />
          );
        })}
        {/* deck */}
        <rect x="40" y="195" width="400" height="6" fill={maroon} />
      </motion.g>

      {/* Victoria Memorial — left foreground */}
      <motion.g variants={pop(0.5)}>
        <rect x="20" y="155" width="80" height="42" fill={`${cream.replace(")", " / 0.4)")}`} stroke={maroon} strokeWidth="1" />
        {/* central dome */}
        <path
          d="M 30 155 Q 60 110 90 155"
          fill={`${cream.replace(")", " / 0.65)")}`}
          stroke={maroon}
          strokeWidth="1.4"
        />
        <line x1="60" y1="110" x2="60" y2="98" stroke={maroon} strokeWidth="1" />
        <circle cx="60" cy="95" r="3" fill={maroon} />
        {/* corner cupolas */}
        {[24, 96].map((x) => (
          <g key={`cup-${x}`}>
            <path d={`M ${x - 6} 155 Q ${x} 138 ${x + 6} 155`} fill={`${cream.replace(")", " / 0.55)")}`} stroke={maroon} strokeWidth="0.6" />
          </g>
        ))}
        {/* facade pillars */}
        {[35, 50, 70, 85].map((x) => (
          <line key={`vp-${x}`} x1={x} y1="160" x2={x} y2="195" stroke={`${maroon.replace(")", " / 0.6)")}`} strokeWidth="0.5" />
        ))}
      </motion.g>

      {/* jute mill silhouette (far right, behind skyline) */}
      <motion.g variants={fade(0.55)}>
        <rect x="430" y="158" width="40" height="42" fill={`${cream.replace(")", " / 0.25)")}`} stroke={`${maroon.replace(")", " / 0.5)")}`} strokeWidth="0.5" />
        <path d="M 430 158 L 438 150 L 446 158 L 454 150 L 462 158 L 470 150" fill="none" stroke={`${maroon.replace(")", " / 0.5)")}`} strokeWidth="0.5" />
        {/* small chimney */}
        <rect x="466" y="135" width="4" height="23" fill={maroon} />
        <motion.circle
          cx="468"
          cy="130"
          r="3"
          fill={`${maroon.replace(")", " / 0.18)")}`}
          animate={{ cy: [130, 110, 130], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 5, repeat: Infinity }}
        />
      </motion.g>

      {/* river — Hooghly */}
      <motion.rect x="0" y="200" width="480" height="40" fill={`${maroon.replace(")", " / 0.08)")}`} variants={fade(0.7)} />
      {[208, 218, 228].map((y, i) => (
        <motion.path
          key={`riv-${i}`}
          d={`M 0 ${y} Q 60 ${y - 2} 120 ${y} T 240 ${y} T 360 ${y} T 480 ${y}`}
          stroke={`${maroon.replace(")", " / 0.3)")}`}
          strokeWidth="0.5"
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

      {/* Yellow Ambassador taxi — moving across the bridge */}
      <motion.g
        animate={{ x: [-50, 480] }}
        transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
      >
        <rect x="0" y="178" width="36" height="14" rx="2" fill="oklch(0.85 0.18 90)" stroke={maroon} strokeWidth="0.6" />
        <rect x="6" y="170" width="24" height="9" rx="1" fill={`${maroon.replace(")", " / 0.7)")}`} />
        <rect x="3" y="180" width="6" height="4" fill={`${maroon.replace(")", " / 0.6)")}`} />
        <circle cx="9" cy="194" r="2.5" fill={maroon} />
        <circle cx="29" cy="194" r="2.5" fill={maroon} />
      </motion.g>

      {/* tram silhouette (left bottom) — Kolkata's trams */}
      <motion.g variants={pop(0.85)}>
        <rect x="120" y="230" width="60" height="10" rx="1" fill={`${cream.replace(")", " / 0.55)")}`} stroke={maroon} strokeWidth="0.6" />
        {[124, 138, 152, 166].map((x) => (
          <rect key={`tw-${x}`} x={x} y="232" width="8" height="5" fill={`${maroon.replace(")", " / 0.6)")}`} />
        ))}
        <line x1="120" y1="240" x2="180" y2="240" stroke={maroon} strokeWidth="0.4" />
        <circle cx="128" cy="241" r="1.5" fill={maroon} />
        <circle cx="172" cy="241" r="1.5" fill={maroon} />
        {/* overhead wire pole */}
        <line x1="148" y1="230" x2="148" y2="220" stroke={maroon} strokeWidth="0.5" />
      </motion.g>

      {/* INDUSTRY chips */}
      <IndustryChip x="20" y="262" label="LEGACY COMMERCE" color={maroon} delay={1.0} width={104} />
      <IndustryChip x="130" y="262" label="EDU · IIM-C · ISI" color={cream} delay={1.05} width={88} />
      <IndustryChip x="224" y="262" label="JUTE · TEA · LEATHER" color={maroon} delay={1.1} width={108} />
      <IndustryChip x="338" y="262" label="IT · SECTOR V" color={cream} delay={1.15} width={78} />
      <IndustryChip x="422" y="262" label="LIT" color={maroon} delay={1.2} width={36} />

      {/* nameplate */}
      <motion.text
        x="240"
        y="298"
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="11"
        letterSpacing="0.4em"
        fill={maroon}
        fontWeight="700"
        variants={pop(1.4)}
      >
        KOLKATA · CITY OF JOY
      </motion.text>
      <motion.text
        x="240"
        y="314"
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="6.5"
        letterSpacing="0.25em"
        fill="var(--muted-foreground)"
        variants={pop(1.45)}
      >
        EST. 1690 · HOWRAH · VICTORIA · PARK STREET · HOOGHLY
      </motion.text>
    </motion.svg>
  );
}

/* ============================================================================ */
/*                                  AHMEDABAD                                   */
/* ============================================================================ */
/** Sidi Saiyyed jali + textile mill stacks + GIFT City + chakra + Sabarmati */

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
      <defs>
        <linearGradient id="ahm-sky" x1="0" y1="0" x2="0" y2="240" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={`${indigo.replace(")", " / 0.1)")}`} />
          <stop offset="100%" stopColor={`${accent.replace(")", " / 0.04)")}`} />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="480" height="240" fill="url(#ahm-sky)" />

      {/* GIFT City twin towers (right) — modern finance signature */}
      <motion.g variants={fade(0.2)}>
        <rect x="380" y="80" width="22" height="160" fill={`${indigo.replace(")", " / 0.3)")}`} stroke={indigo} strokeWidth="0.8" />
        <rect x="406" y="60" width="26" height="180" fill={`${indigo.replace(")", " / 0.32)")}`} stroke={indigo} strokeWidth="0.8" />
        {/* glass-tower window grid */}
        {Array.from({ length: 14 }).map((_, r) => (
          <g key={`gt-${r}`}>
            <line x1="380" y1={90 + r * 10} x2="402" y2={90 + r * 10} stroke={`${indigo.replace(")", " / 0.45)")}`} strokeWidth="0.3" />
            <line x1="406" y1={70 + r * 12} x2="432" y2={70 + r * 12} stroke={`${indigo.replace(")", " / 0.45)")}`} strokeWidth="0.3" />
          </g>
        ))}
        {/* antenna */}
        <line x1="391" y1="80" x2="391" y2="68" stroke={indigo} strokeWidth="1" />
        <line x1="419" y1="60" x2="419" y2="44" stroke={indigo} strokeWidth="1" />
      </motion.g>

      {/* Naroda / Narol textile mill silhouette (left) */}
      <motion.g variants={fade(0.25)}>
        {/* mill body */}
        <rect x="20" y="170" width="80" height="70" fill={`${accent.replace(")", " / 0.18)")}`} stroke={`${accent.replace(")", " / 0.4)")}`} strokeWidth="0.5" />
        {/* sawtooth roof */}
        <path
          d="M 20 170 L 30 158 L 40 170 L 50 158 L 60 170 L 70 158 L 80 170 L 90 158 L 100 170"
          fill={`${accent.replace(")", " / 0.25)")}`}
          stroke={`${accent.replace(")", " / 0.5)")}`}
          strokeWidth="0.5"
        />
        {/* chimney + smoke */}
        <rect x="86" y="130" width="6" height="40" fill={`${indigo.replace(")", " / 0.5)")}`} />
        <motion.circle
          cx="89"
          cy="125"
          r="5"
          fill={`${indigo.replace(")", " / 0.18)")}`}
          animate={{ cy: [125, 100, 125], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 5, repeat: Infinity }}
        />
        <motion.circle
          cx="89"
          cy="118"
          r="6"
          fill={`${indigo.replace(")", " / 0.14)")}`}
          animate={{ cy: [118, 90, 118], opacity: [0.4, 0, 0.4] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
      </motion.g>

      {/* Sidi Saiyyed jali — central foreground */}
      <motion.g variants={pop(0.4)}>
        {/* arch frame */}
        <path
          d="M 180 230 L 180 110 Q 180 70 240 70 Q 300 70 300 110 L 300 230 Z"
          fill={`${indigo.replace(")", " / 0.06)")}`}
          stroke={indigo}
          strokeWidth="1.6"
        />
        {/* tree-of-life trunk */}
        <motion.path
          d="M 240 230 L 240 90"
          stroke={indigo}
          strokeWidth="1.4"
          variants={draw(0.5)}
        />
        {/* branches */}
        {[
          { y: 200, dx: 38 },
          { y: 178, dx: 32 },
          { y: 156, dx: 26 },
          { y: 134, dx: 20 },
          { y: 114, dx: 14 },
        ].map((br, i) => (
          <motion.g key={`br-${i}`} variants={draw(0.55 + i * 0.05, 0.5)}>
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
            <circle cx={240 - br.dx} cy={br.y - 16} r="2" fill={accent} />
            <circle cx={240 + br.dx} cy={br.y - 16} r="2" fill={accent} />
          </motion.g>
        ))}
        {/* crown leaf */}
        <motion.path
          d="M 234 90 Q 240 80 246 90 Q 244 98 240 100 Q 236 98 234 90"
          fill={accent}
          variants={pop(0.95)}
        />
      </motion.g>

      {/* Gandhi chakra (top-left) */}
      <motion.g
        animate={{ rotate: 360 }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "60px 90px" }}
      >
        <motion.g variants={pop(0.5)}>
          <circle cx="60" cy="90" r="26" fill="none" stroke={indigo} strokeWidth="1.4" />
          <circle cx="60" cy="90" r="5" fill={indigo} />
          {Array.from({ length: 24 }).map((_, i) => {
            const a = (i / 24) * Math.PI * 2;
            return (
              <line
                key={`spk-${i}`}
                x1={60 + 5 * Math.cos(a)}
                y1={90 + 5 * Math.sin(a)}
                x2={60 + 24 * Math.cos(a)}
                y2={90 + 24 * Math.sin(a)}
                stroke={`${indigo.replace(")", " / 0.6)")}`}
                strokeWidth="0.5"
              />
            );
          })}
        </motion.g>
      </motion.g>
      <motion.text
        x="60"
        y="132"
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="6"
        letterSpacing="0.18em"
        fill={indigo}
        variants={pop(0.7)}
      >
        SABARMATI
      </motion.text>

      {/* Sabarmati river band */}
      <motion.rect x="0" y="240" width="480" height="6" fill={`${indigo.replace(")", " / 0.15)")}`} variants={fade(0.7)} />

      {/* INDUSTRY chips */}
      <IndustryChip x="20" y="266" label="TEXTILE · NARODA" color={accent} delay={1.0} width={90} />
      <IndustryChip x="116" y="266" label="DENIM EXPORT" color={indigo} delay={1.05} width={76} />
      <IndustryChip x="198" y="266" label="CHEMICAL · VATVA" color={accent} delay={1.1} width={94} />
      <IndustryChip x="298" y="266" label="GIFT CITY" color={indigo} delay={1.15} width={62} />
      <IndustryChip x="366" y="266" label="DIAMONDS" color={accent} delay={1.2} width={62} />

      {/* nameplate */}
      <motion.text
        x="240"
        y="302"
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="11"
        letterSpacing="0.4em"
        fill={indigo}
        fontWeight="700"
        variants={pop(1.4)}
      >
        AHMEDABAD · MANCHESTER OF INDIA
      </motion.text>
      <motion.text
        x="240"
        y="318"
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="6.5"
        letterSpacing="0.25em"
        fill="var(--muted-foreground)"
        variants={pop(1.45)}
      >
        EST. 1411 · SIDI SAIYYED · NARODA · GIFT CITY · SABARMATI
      </motion.text>
    </motion.svg>
  );
}

/* ============================================================================ */
/*                                  INDORE                                      */
/* ============================================================================ */
/** Rajwada palace + Pithampur factory + logistics truck route + Sarafa lights */

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
      <defs>
        <linearGradient id="ind-sky" x1="0" y1="0" x2="0" y2="240" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={`${orange.replace(")", " / 0.1)")}`} />
          <stop offset="100%" stopColor={`${violet.replace(")", " / 0.04)")}`} />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="480" height="240" fill="url(#ind-sky)" />

      {/* moon (Sarafa midnight market) */}
      <motion.circle
        cx="80"
        cy="60"
        r="20"
        fill={`${orange.replace(")", " / 0.3)")}`}
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <circle cx="74" cy="56" r="3" fill={`${orange.replace(")", " / 0.5)")}`} />
      <circle cx="84" cy="64" r="2" fill={`${orange.replace(")", " / 0.5)")}`} />
      <circle cx="88" cy="54" r="1.5" fill={`${orange.replace(")", " / 0.5)")}`} />

      {/* Pithampur factory cluster (left back) */}
      <motion.g variants={fade(0.2)}>
        <rect x="0" y="170" width="100" height="50" fill={`${violet.replace(")", " / 0.18)")}`} stroke={`${violet.replace(")", " / 0.4)")}`} strokeWidth="0.5" />
        <path
          d="M 0 170 L 10 162 L 20 170 L 30 162 L 40 170 L 50 162 L 60 170 L 70 162 L 80 170 L 90 162 L 100 170"
          fill={`${violet.replace(")", " / 0.22)")}`}
        />
        {/* factory smokestack */}
        <rect x="40" y="138" width="5" height="32" fill={`${violet.replace(")", " / 0.5)")}`} />
        <motion.circle
          cx="42"
          cy="135"
          r="4"
          fill={`${violet.replace(")", " / 0.18)")}`}
          animate={{ cy: [135, 110, 135], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 5, repeat: Infinity }}
        />
      </motion.g>

      {/* Rajwada palace — central */}
      <motion.g variants={pop(0.3)}>
        {/* base level */}
        <rect x="100" y="200" width="280" height="40" fill={`${orange.replace(")", " / 0.28)")}`} stroke={orange} strokeWidth="1.4" />
        {/* central arch */}
        <path
          d="M 220 240 L 220 205 Q 220 188 240 188 Q 260 188 260 205 L 260 240 Z"
          fill="var(--background)"
          stroke={orange}
          strokeWidth="1.4"
        />
        {/* storey 2 */}
        <rect x="120" y="160" width="240" height="40" fill={`${orange.replace(")", " / 0.22)")}`} stroke={orange} strokeWidth="1" />
        {/* storey 3 */}
        <rect x="140" y="125" width="200" height="35" fill={`${orange.replace(")", " / 0.16)")}`} stroke={orange} strokeWidth="1" />
        {/* storey 4 */}
        <rect x="170" y="95" width="140" height="30" fill={`${orange.replace(")", " / 0.12)")}`} stroke={orange} strokeWidth="0.8" />
        {/* roof central */}
        <path d="M 200 95 L 240 75 L 280 95" fill={orange} />
        <line x1="240" y1="75" x2="240" y2="62" stroke={orange} strokeWidth="1" />
        <circle cx="240" cy="60" r="2.5" fill={orange} />

        {/* arched windows storey 2 */}
        {Array.from({ length: 6 }).map((_, i) => {
          const x = 130 + i * 36;
          return (
            <motion.g key={`wn2-${i}`} variants={pop(0.45 + i * 0.03)}>
              <rect x={x} y="168" width="14" height="22" rx="2" fill={`${orange.replace(")", " / 0.18)")}`} stroke={orange} strokeWidth="0.5" />
              <path d={`M ${x} 174 Q ${x + 7} 166 ${x + 14} 174`} fill="none" stroke={orange} strokeWidth="0.5" />
            </motion.g>
          );
        })}
        {/* arched windows storey 3 */}
        {Array.from({ length: 5 }).map((_, i) => {
          const x = 150 + i * 36;
          return (
            <motion.g key={`wn3-${i}`} variants={pop(0.5 + i * 0.03)}>
              <rect x={x} y="133" width="14" height="22" rx="2" fill={`${orange.replace(")", " / 0.15)")}`} stroke={orange} strokeWidth="0.5" />
              <path d={`M ${x} 139 Q ${x + 7} 131 ${x + 14} 139`} fill="none" stroke={orange} strokeWidth="0.5" />
            </motion.g>
          );
        })}
      </motion.g>

      {/* Sarafa Bazaar street-food cart (right) */}
      <motion.g variants={pop(0.6)}>
        <rect x="400" y="180" width="40" height="30" rx="2" fill={`${orange.replace(")", " / 0.4)")}`} stroke={orange} strokeWidth="0.6" />
        <rect x="400" y="172" width="40" height="8" fill={`${violet.replace(")", " / 0.6)")}`} />
        <circle cx="408" cy="212" r="3" fill={orange} />
        <circle cx="432" cy="212" r="3" fill={orange} />
        {/* steam from cart */}
        <motion.path
          d="M 410 172 Q 412 162 410 152"
          stroke={`${orange.replace(")", " / 0.4)")}`}
          strokeWidth="0.5"
          fill="none"
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.path
          d="M 425 172 Q 427 158 425 146"
          stroke={`${orange.replace(")", " / 0.4)")}`}
          strokeWidth="0.5"
          fill="none"
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 2.4, repeat: Infinity, delay: 0.5 }}
        />
      </motion.g>

      {/* logistics route — runs underneath */}
      <motion.g variants={pop(0.7)}>
        <motion.path
          d="M 0 230 Q 240 205 480 230"
          stroke={`${violet.replace(")", " / 0.5)")}`}
          strokeWidth="1"
          strokeDasharray="4 3"
          fill="none"
          variants={draw(0.7, 1.4)}
        />
        {/* truck moving along */}
        <motion.g
          animate={{ x: [-460, 460] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        >
          <rect x="0" y="222" width="22" height="14" rx="2" fill={orange} />
          <rect x="0" y="218" width="14" height="6" fill={`${orange.replace(")", " / 0.7)")}`} />
          <circle cx="5" cy="238" r="2.5" fill="oklch(0.2 0.04 60)" />
          <circle cx="18" cy="238" r="2.5" fill="oklch(0.2 0.04 60)" />
        </motion.g>
      </motion.g>

      {/* INDUSTRY chips */}
      <IndustryChip x="20" y="266" label="LOGISTICS" color={violet} delay={1.0} width={62} />
      <IndustryChip x="86" y="266" label="PITHAMPUR · MFG" color={orange} delay={1.05} width={92} />
      <IndustryChip x="184" y="266" label="EDU · IIM-I · IIT-I" color={violet} delay={1.1} width={94} />
      <IndustryChip x="282" y="266" label="FOOD · POHA-JALEBI" color={orange} delay={1.15} width={108} />
      <IndustryChip x="394" y="266" label="CLEANEST" color={violet} delay={1.2} width={64} />

      {/* nameplate */}
      <motion.text
        x="240"
        y="302"
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="11"
        letterSpacing="0.4em"
        fill={orange}
        fontWeight="700"
        variants={pop(1.4)}
      >
        INDORE · MINI MUMBAI
      </motion.text>
      <motion.text
        x="240"
        y="318"
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="6.5"
        letterSpacing="0.25em"
        fill="var(--muted-foreground)"
        variants={pop(1.45)}
      >
        EST. 1715 · RAJWADA · SARAFA · PITHAMPUR · CLEANEST CITY
      </motion.text>
    </motion.svg>
  );
}

/* ============================================================================ */
/*                                  BHOPAL                                      */
/* ============================================================================ */
/** Taj-ul-Masajid + Vidhan Sabha + Upper Lake reflection + Sanchi stupa hint */

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
        <linearGradient id="bp-sky" x1="0" y1="0" x2="0" y2="200" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={`${teal.replace(")", " / 0.22)")}`} />
          <stop offset="100%" stopColor={`${teal.replace(")", " / 0.04)")}`} />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="480" height="200" fill="url(#bp-sky)" />

      {/* Sanchi stupa (far right back) */}
      <motion.g variants={fade(0.2)}>
        <ellipse cx="430" cy="170" rx="32" ry="20" fill={`${teal.replace(")", " / 0.18)")}`} stroke={`${teal.replace(")", " / 0.4)")}`} strokeWidth="0.6" />
        <rect x="426" y="135" width="8" height="20" fill={`${teal.replace(")", " / 0.5)")}`} />
        <rect x="420" y="130" width="20" height="6" fill={`${teal.replace(")", " / 0.55)")}`} />
        <line x1="430" y1="125" x2="430" y2="115" stroke={`${teal.replace(")", " / 0.6)")}`} strokeWidth="0.6" />
        <text
          x="430"
          y="105"
          textAnchor="middle"
          fontFamily="var(--font-mono)"
          fontSize="5.5"
          letterSpacing="0.18em"
          fill={`${teal.replace(")", " / 0.6)")}`}
        >
          SANCHI
        </text>
      </motion.g>

      {/* Vidhan Sabha (state assembly) silhouette — left back */}
      <motion.g variants={fade(0.25)}>
        <rect x="20" y="155" width="80" height="45" fill={`${teal.replace(")", " / 0.18)")}`} stroke={`${teal.replace(")", " / 0.4)")}`} strokeWidth="0.6" />
        {/* central low dome */}
        <path
          d="M 38 155 Q 60 130 82 155"
          fill={`${teal.replace(")", " / 0.25)")}`}
          stroke={`${teal.replace(")", " / 0.5)")}`}
          strokeWidth="0.6"
        />
        <line x1="60" y1="130" x2="60" y2="120" stroke={`${teal.replace(")", " / 0.6)")}`} strokeWidth="0.6" />
        <text
          x="60"
          y="115"
          textAnchor="middle"
          fontFamily="var(--font-mono)"
          fontSize="5.5"
          letterSpacing="0.18em"
          fill={`${teal.replace(")", " / 0.6)")}`}
        >
          VIDHAN
        </text>
      </motion.g>

      {/* Taj-ul-Masajid — central foreground */}
      <motion.g variants={pop(0.3)}>
        {/* central dome */}
        <path
          d="M 200 130 Q 240 60 280 130 Z"
          fill={`${teal.replace(")", " / 0.32)")}`}
          stroke={teal}
          strokeWidth="1.6"
        />
        <line x1="240" y1="60" x2="240" y2="44" stroke={teal} strokeWidth="1.4" />
        <circle cx="240" cy="40" r="3" fill={teal} />

        {/* side domes */}
        {[150, 330].map((cx) => (
          <g key={`sd-${cx}`}>
            <path
              d={`M ${cx - 22} 130 Q ${cx} 88 ${cx + 22} 130 Z`}
              fill={`${teal.replace(")", " / 0.22)")}`}
              stroke={teal}
              strokeWidth="1.2"
            />
            <line x1={cx} y1="88" x2={cx} y2="76" stroke={teal} strokeWidth="1" />
            <circle cx={cx} cy="73" r="2" fill={teal} />
          </g>
        ))}

        {/* corner minarets */}
        {[80, 400].map((x) => (
          <g key={`mn-${x}`}>
            <rect x={x - 5} y="74" width="10" height="86" fill={`${teal.replace(")", " / 0.28)")}`} stroke={teal} strokeWidth="0.8" />
            <rect x={x - 7} y="100" width="14" height="3" fill={teal} />
            <rect x={x - 7} y="130" width="14" height="3" fill={teal} />
            <path d={`M ${x - 7} 74 Q ${x} 60 ${x + 7} 74`} fill={teal} />
            <line x1={x} y1="60" x2={x} y2="50" stroke={teal} strokeWidth="0.8" />
            <circle cx={x} cy="48" r="2" fill={teal} />
          </g>
        ))}

        {/* facade body */}
        <rect x="100" y="130" width="280" height="40" fill={`${teal.replace(")", " / 0.12)")}`} stroke={teal} strokeWidth="1" />
        {/* main archway */}
        <path
          d="M 220 170 L 220 145 Q 220 132 240 132 Q 260 132 260 145 L 260 170 Z"
          fill="var(--background)"
          stroke={teal}
          strokeWidth="1"
        />
      </motion.g>

      {/* Upper Lake water + reflection */}
      <motion.rect x="0" y="170" width="480" height="60" fill={`${teal.replace(")", " / 0.16)")}`} variants={fade(0.6)} />

      {/* mosque reflection */}
      <motion.g variants={fade(0.7)} opacity="0.32">
        <path d="M 200 170 Q 240 240 280 170 Z" fill={teal} />
        {[150, 330].map((cx) => (
          <path
            key={`rf-${cx}`}
            d={`M ${cx - 22} 170 Q ${cx} 212 ${cx + 22} 170 Z`}
            fill={`${teal.replace(")", " / 0.4)")}`}
          />
        ))}
      </motion.g>

      {/* boat on lake */}
      <motion.g
        variants={pop(0.85)}
        animate={{ x: [-30, 480] }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      >
        <path
          d="M 0 196 L 4 200 L 24 200 L 28 196 Z"
          fill={`${teal.replace(")", " / 0.6)")}`}
          stroke={teal}
          strokeWidth="0.5"
        />
        <line x1="14" y1="196" x2="14" y2="184" stroke={teal} strokeWidth="0.6" />
        <path d="M 14 184 L 22 192 L 14 192 Z" fill={`${accent.replace(")", " / 0.5)")}`} stroke={accent} strokeWidth="0.4" />
      </motion.g>

      {/* water ripples */}
      {[185, 200, 215].map((y, i) => (
        <motion.path
          key={`rp-${i}`}
          d={`M 0 ${y} Q 60 ${y - 1} 120 ${y} T 240 ${y} T 360 ${y} T 480 ${y}`}
          stroke={`${accent.replace(")", " / 0.3)")}`}
          strokeWidth="0.4"
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

      {/* INDUSTRY chips */}
      <IndustryChip x="20" y="252" label="GOV / PSU" color={teal} delay={1.0} width={62} />
      <IndustryChip x="86" y="252" label="EDU · IISER · AIIMS" color={accent} delay={1.05} width={104} />
      <IndustryChip x="194" y="252" label="MANUFACTURING" color={teal} delay={1.1} width={92} />
      <IndustryChip x="290" y="252" label="HERITAGE · SANCHI" color={accent} delay={1.15} width={102} />
      <IndustryChip x="396" y="252" label="BHEL" color={teal} delay={1.2} width={48} />

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
        variants={pop(1.4)}
      >
        BHOPAL · CITY OF LAKES
      </motion.text>
      <motion.text
        x="240"
        y="306"
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="6.5"
        letterSpacing="0.25em"
        fill="var(--muted-foreground)"
        variants={pop(1.45)}
      >
        TAJ-UL-MASAJID · UPPER LAKE · BHIMBETKA · SANCHI
      </motion.text>
    </motion.svg>
  );
}

/* ============================================================================ */
/*                              REGISTRY                                        */
/* ============================================================================ */

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
