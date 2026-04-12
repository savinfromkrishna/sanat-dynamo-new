"use client";

import { motion } from "framer-motion";

/**
 * Industry-specific contextual sketch illustrations.
 * Each tells the problem → solution story for that sector,
 * using real metrics from the content.
 */

const draw = (i: number) => ({
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { pathLength: { duration: 1, delay: i * 0.12, ease: "easeInOut" as const }, opacity: { duration: 0.2, delay: i * 0.12 } },
  },
});

const pop = (i: number) => ({
  hidden: { opacity: 0, scale: 0.7 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { delay: 0.3 + i * 0.1, type: "spring" as const, stiffness: 170, damping: 14 },
  },
});

/* E-commerce: Cart → conversion funnel with recovery loop */
export function IllustEcommerce({ className = "" }: { className?: string }) {
  return (
    <motion.svg viewBox="0 0 160 110" fill="none" className={className} initial="hidden" whileInView="visible" viewport={{ once: true }}>
      {/* Shopping cart */}
      <motion.path d="M 20 30 L 28 30 L 38 60 L 70 60 L 75 40 L 32 40" stroke="oklch(0.78 0.165 70 / 0.35)" strokeWidth="1" strokeLinejoin="round" fill="none" variants={draw(0)} />
      <motion.circle cx="42" cy="66" r="3" fill="none" stroke="oklch(0.78 0.165 70 / 0.25)" strokeWidth="0.8" variants={pop(1)} />
      <motion.circle cx="66" cy="66" r="3" fill="none" stroke="oklch(0.78 0.165 70 / 0.25)" strokeWidth="0.8" variants={pop(1)} />
      {/* Arrow to conversion */}
      <motion.path d="M 75 50 L 95 50" stroke="oklch(0.78 0.165 70 / 0.2)" strokeWidth="0.8" strokeDasharray="2 2" variants={draw(2)} />
      {/* Conversion box */}
      <motion.rect x="95" y="38" width="50" height="24" rx="5" fill="oklch(0.74 0.16 155 / 0.05)" stroke="oklch(0.74 0.16 155 / 0.3)" strokeWidth="0.8" variants={draw(2)} />
      <motion.text x="120" y="50" textAnchor="middle" fontFamily="var(--font-display)" fontSize="9" fontWeight="700" fill="oklch(0.74 0.16 155 / 0.5)" variants={pop(3)}>+3%</motion.text>
      <motion.text x="120" y="58" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="5" fill="oklch(0.74 0.16 155 / 0.3)" variants={pop(3)}>CVR</motion.text>
      {/* Cart recovery loop (the WhatsApp recovery) */}
      <motion.path d="M 50 60 C 50 80, 80 85, 95 75 C 105 68, 110 62, 110 55" stroke="oklch(0.66 0.18 295 / 0.2)" strokeWidth="0.8" strokeDasharray="3 3" fill="none" variants={draw(3)} />
      <motion.text x="72" y="88" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="5" fill="oklch(0.66 0.18 295 / 0.35)" variants={pop(4)}>28% RECOVERY</motion.text>
      {/* Revenue result */}
      <motion.g variants={pop(5)}>
        <text x="120" y="96" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="6" fill="oklch(0.78 0.165 70 / 0.4)">2x REPEAT</text>
        <text x="120" y="104" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="5" fill="oklch(0.78 0.165 70 / 0.3)">PURCHASE RATE</text>
      </motion.g>
    </motion.svg>
  );
}

/* Real Estate: Lead pipeline from portal chaos to qualified inbound */
export function IllustRealEstate({ className = "" }: { className?: string }) {
  return (
    <motion.svg viewBox="0 0 160 110" fill="none" className={className} initial="hidden" whileInView="visible" viewport={{ once: true }}>
      {/* Building silhouette */}
      <motion.rect x="15" y="20" width="35" height="60" rx="3" stroke="oklch(0.78 0.165 70 / 0.25)" strokeWidth="0.8" fill="none" variants={draw(0)} />
      {/* Windows */}
      {[28, 42, 56, 68].map((y) =>
        [22, 34].map((x) => (
          <motion.rect key={`${x}-${y}`} x={x} y={y} width="6" height="5" rx="1" fill="oklch(0.78 0.165 70 / 0.06)" stroke="oklch(0.78 0.165 70 / 0.12)" strokeWidth="0.4" variants={pop(1)} />
        ))
      )}
      {/* Lead funnel — from portal leads to qualified */}
      <motion.path d="M 58 40 L 75 35 L 95 35 L 85 55 L 75 55 Z" stroke="oklch(0.66 0.18 295 / 0.25)" strokeWidth="0.8" fill="oklch(0.66 0.18 295 / 0.03)" variants={draw(2)} />
      <motion.text x="78" y="48" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="5" fill="oklch(0.66 0.18 295 / 0.4)" variants={pop(3)}>QUALIFY</motion.text>
      {/* Arrow to result */}
      <motion.path d="M 90 50 L 105 50" stroke="oklch(0.74 0.16 155 / 0.2)" strokeWidth="0.8" variants={draw(3)} />
      {/* Result metrics */}
      <motion.g variants={pop(4)}>
        <rect x="105" y="30" width="45" height="40" rx="5" fill="oklch(0.74 0.16 155 / 0.04)" stroke="oklch(0.74 0.16 155 / 0.2)" strokeWidth="0.6" />
        <text x="128" y="46" textAnchor="middle" fontFamily="var(--font-display)" fontSize="9" fontWeight="700" fill="oklch(0.74 0.16 155 / 0.5)">3-5x</text>
        <text x="128" y="55" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="5" fill="oklch(0.74 0.16 155 / 0.3)">INBOUND</text>
        <text x="128" y="62" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="5" fill="oklch(0.74 0.16 155 / 0.3)">LEADS</text>
      </motion.g>
      {/* CPL reduction */}
      <motion.g variants={pop(5)}>
        <text x="128" y="85" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="6" fill="oklch(0.78 0.165 70 / 0.4)">-40% CPL</text>
      </motion.g>
    </motion.svg>
  );
}

/* Healthcare: Appointment automation + Google Maps visibility */
export function IllustHealthcare({ className = "" }: { className?: string }) {
  return (
    <motion.svg viewBox="0 0 160 110" fill="none" className={className} initial="hidden" whileInView="visible" viewport={{ once: true }}>
      {/* Cross icon */}
      <motion.g variants={pop(0)}>
        <rect x="20" y="25" width="25" height="25" rx="5" fill="var(--svg-node-fill)" stroke="oklch(0.74 0.16 155 / 0.3)" strokeWidth="0.8" />
        <line x1="32.5" y1="31" x2="32.5" y2="44" stroke="oklch(0.74 0.16 155 / 0.5)" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="26" y1="37.5" x2="39" y2="37.5" stroke="oklch(0.74 0.16 155 / 0.5)" strokeWidth="1.5" strokeLinecap="round" />
      </motion.g>
      {/* Phone with auto-booking flow */}
      <motion.rect x="55" y="18" width="30" height="50" rx="5" stroke="oklch(0.78 0.165 70 / 0.25)" strokeWidth="0.8" fill="none" variants={draw(1)} />
      <motion.rect x="62" y="28" width="16" height="6" rx="2" fill="oklch(0.78 0.165 70 / 0.08)" stroke="oklch(0.78 0.165 70 / 0.15)" strokeWidth="0.4" variants={pop(2)} />
      <motion.rect x="62" y="38" width="16" height="6" rx="2" fill="oklch(0.74 0.16 155 / 0.08)" stroke="oklch(0.74 0.16 155 / 0.15)" strokeWidth="0.4" variants={pop(2)} />
      <motion.rect x="62" y="48" width="16" height="6" rx="2" fill="oklch(0.78 0.165 70 / 0.12)" stroke="oklch(0.78 0.165 70 / 0.25)" strokeWidth="0.4" variants={pop(3)} />
      <motion.text x="70" y="53" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="3.5" fill="oklch(0.78 0.165 70 / 0.5)" variants={pop(3)}>BOOK</motion.text>
      {/* Arrow: auto */}
      <motion.path d="M 48 37 L 55 37" stroke="oklch(0.66 0.18 295 / 0.2)" strokeWidth="0.6" strokeDasharray="2 2" variants={draw(2)} />
      <motion.text x="50" y="33" fontFamily="var(--font-mono)" fontSize="4" fill="oklch(0.66 0.18 295 / 0.35)" variants={pop(3)}>AUTO</motion.text>
      {/* Results */}
      <motion.g variants={pop(4)}>
        <rect x="95" y="22" width="50" height="22" rx="5" fill="oklch(0.74 0.16 155 / 0.04)" stroke="oklch(0.74 0.16 155 / 0.2)" strokeWidth="0.6" />
        <text x="120" y="34" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="6" fontWeight="600" fill="oklch(0.74 0.16 155 / 0.5)">-60% CALLS</text>
        <text x="120" y="41" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="5" fill="oklch(0.74 0.16 155 / 0.3)">AUTO-BOOKED</text>
      </motion.g>
      <motion.g variants={pop(5)}>
        <rect x="95" y="50" width="50" height="22" rx="5" fill="oklch(0.78 0.165 70 / 0.04)" stroke="oklch(0.78 0.165 70 / 0.2)" strokeWidth="0.6" />
        <text x="120" y="62" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="6" fontWeight="600" fill="oklch(0.78 0.165 70 / 0.5)">-25% NO-SHOW</text>
        <text x="120" y="69" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="5" fill="oklch(0.78 0.165 70 / 0.3)">REMINDERS</text>
      </motion.g>
      {/* Google Maps pin */}
      <motion.g variants={pop(6)}>
        <text x="50" y="82" fontFamily="var(--font-mono)" fontSize="5" fill="oklch(0.74 0.16 155 / 0.35)">+80% ORGANIC</text>
        <text x="50" y="90" fontFamily="var(--font-mono)" fontSize="5" fill="oklch(0.74 0.16 155 / 0.35)">APPOINTMENTS</text>
      </motion.g>
    </motion.svg>
  );
}

/* EdTech/Coaching: Enrollment funnel with online + offline */
export function IllustEdtech({ className = "" }: { className?: string }) {
  return (
    <motion.svg viewBox="0 0 160 110" fill="none" className={className} initial="hidden" whileInView="visible" viewport={{ once: true }}>
      {/* Graduation cap */}
      <motion.g variants={pop(0)}>
        <path d="M 30 35 L 15 42 L 30 49 L 45 42 Z" fill="oklch(0.66 0.18 295 / 0.1)" stroke="oklch(0.66 0.18 295 / 0.3)" strokeWidth="0.8" />
        <line x1="30" y1="49" x2="30" y2="60" stroke="oklch(0.66 0.18 295 / 0.2)" strokeWidth="0.6" />
        <path d="M 22 50 L 22 58 C 22 62, 30 65, 38 58 L 38 50" stroke="oklch(0.66 0.18 295 / 0.2)" strokeWidth="0.6" fill="none" />
      </motion.g>
      {/* Enrollment pipeline */}
      <motion.path d="M 50 42 L 70 42" stroke="oklch(0.78 0.165 70 / 0.2)" strokeWidth="0.6" strokeDasharray="2 2" variants={draw(1)} />
      {/* Inquiry → Nurture → Enroll */}
      {[
        { x: 70, label: "INQUIRY", color: "oklch(0.7 0.015 260 / 0.3)" },
        { x: 95, label: "NURTURE", color: "oklch(0.66 0.18 295 / 0.35)" },
        { x: 120, label: "ENROLL", color: "oklch(0.74 0.16 155 / 0.4)" },
      ].map((stage, i) => (
        <motion.g key={stage.label} variants={pop(i + 1)}>
          <rect x={stage.x} y={32} width="20" height="20" rx="4" fill="var(--svg-node-fill)" stroke={stage.color} strokeWidth="0.6" />
          <text x={stage.x + 10} y={56} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="4.5" fill={stage.color}>{stage.label}</text>
        </motion.g>
      ))}
      <motion.path d="M 90 42 L 95 42" stroke="oklch(0.78 0.165 70 / 0.15)" strokeWidth="0.5" variants={draw(2)} />
      <motion.path d="M 115 42 L 120 42" stroke="oklch(0.78 0.165 70 / 0.15)" strokeWidth="0.5" variants={draw(3)} />
      {/* Results */}
      <motion.g variants={pop(5)}>
        <text x="105" y="76" textAnchor="middle" fontFamily="var(--font-display)" fontSize="9" fontWeight="700" fill="oklch(0.74 0.16 155 / 0.5)">3-4x</text>
        <text x="105" y="85" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="5" fill="oklch(0.74 0.16 155 / 0.3)">FASTER ENROLLMENT</text>
      </motion.g>
      <motion.g variants={pop(6)}>
        <text x="105" y="98" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="5" fill="oklch(0.78 0.165 70 / 0.35)">-30% DROPOUT</text>
      </motion.g>
    </motion.svg>
  );
}

/* SME/ERP: Connected modules replacing Excel chaos */
export function IllustSmeErp({ className = "" }: { className?: string }) {
  return (
    <motion.svg viewBox="0 0 160 110" fill="none" className={className} initial="hidden" whileInView="visible" viewport={{ once: true }}>
      {/* Central hub */}
      <motion.rect x="55" y="35" width="50" height="35" rx="8" stroke="oklch(0.78 0.165 70 / 0.35)" strokeWidth="1" fill="oklch(0.78 0.165 70 / 0.03)" variants={draw(0)} />
      <motion.text x="80" y="52" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="7" letterSpacing="0.1em" fill="oklch(0.78 0.165 70 / 0.4)" variants={pop(1)}>ERP</motion.text>
      <motion.text x="80" y="62" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="5" fill="oklch(0.78 0.165 70 / 0.25)" variants={pop(1)}>ONE DASHBOARD</motion.text>
      {/* Satellite modules */}
      {[
        { cx: 20, cy: 25, label: "INV", color: "oklch(0.66 0.18 295 / 0.35)" },
        { cx: 140, cy: 25, label: "ORDERS", color: "oklch(0.74 0.16 155 / 0.35)" },
        { cx: 20, cy: 80, label: "GST", color: "oklch(0.78 0.165 70 / 0.35)" },
        { cx: 140, cy: 80, label: "HR", color: "oklch(0.65 0.22 25 / 0.35)" },
      ].map((mod, i) => (
        <motion.g key={mod.label}>
          <motion.line x1="80" y1="52" x2={mod.cx} y2={mod.cy} stroke={`${mod.color.replace(/0\.\d+\)/, "0.1)")}`} strokeWidth="0.6" strokeDasharray="3 3" variants={draw(i + 1)} />
          <motion.circle cx={mod.cx} cy={mod.cy} r="12" fill="var(--svg-node-fill)" stroke={mod.color} strokeWidth="0.8" variants={pop(i + 1)} />
          <text x={mod.cx} y={mod.cy + 3} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="5" fill={mod.color}>{mod.label}</text>
        </motion.g>
      ))}
      {/* Result */}
      <motion.g variants={pop(6)}>
        <text x="80" y="100" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="5.5" fill="oklch(0.78 0.165 70 / 0.4)">-80% MANUAL · DAILY P&L</text>
      </motion.g>
      {/* Data flow particle */}
      <motion.circle r="1.5" fill="oklch(0.78 0.165 70 / 0.5)"
        animate={{ cx: [80, 20], cy: [52, 80], opacity: [1, 0] }}
        transition={{ duration: 2, repeat: Infinity, delay: 0 }}
      />
      <motion.circle r="1.5" fill="oklch(0.66 0.18 295 / 0.5)"
        animate={{ cx: [80, 140], cy: [52, 25], opacity: [1, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, delay: 1 }}
      />
    </motion.svg>
  );
}

export const industryIllustrations: Record<string, React.ComponentType<{ className?: string }>> = {
  ecommerce: IllustEcommerce,
  "real-estate": IllustRealEstate,
  healthcare: IllustHealthcare,
  edtech: IllustEdtech,
  "sme-erp": IllustSmeErp,
};
