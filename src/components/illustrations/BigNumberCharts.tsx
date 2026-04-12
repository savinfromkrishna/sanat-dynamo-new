"use client";

import { motion } from "framer-motion";

/**
 * Contextual animated chart visuals for BigNumbers section.
 * Each maps to the actual metrics: 50+ businesses, ₹40Cr+, 200% ROI, 5 industries.
 */

/* Metric 1: Businesses scaled — growing grid of dots */
export function ChartBars({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 70" fill="none" className={className}>
      {/* Grid of business dots — filling up */}
      {Array.from({ length: 50 }).map((_, i) => {
        const col = i % 10;
        const row = Math.floor(i / 10);
        return (
          <motion.circle
            key={i}
            cx={8 + col * 11}
            cy={8 + row * 12}
            r="3"
            fill="oklch(0.78 0.165 70 / 0.15)"
            stroke="oklch(0.78 0.165 70 / 0.25)"
            strokeWidth="0.4"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.02, type: "spring" as const, stiffness: 200 }}
          />
        );
      })}
      {/* "+50" label */}
      <motion.text
        x="115" y="66"
        textAnchor="end"
        fontFamily="var(--font-mono)"
        fontSize="7"
        fill="oklch(0.78 0.165 70 / 0.4)"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.2 }}
      >+</motion.text>
    </svg>
  );
}

/* Metric 2: Revenue impacted — compound growth curve */
export function ChartDonut({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 70" fill="none" className={className}>
      {/* Compound growth curve */}
      <motion.path
        d="M 10 60 C 20 58, 35 52, 50 42 C 65 30, 80 18, 95 10 C 105 5, 110 3, 115 2"
        stroke="oklch(0.78 0.165 70 / 0.4)"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, delay: 0.2, ease: "easeInOut" as const }}
      />
      <motion.path
        d="M 10 60 C 20 58, 35 52, 50 42 C 65 30, 80 18, 95 10 C 105 5, 110 3, 115 2 L 115 65 L 10 65 Z"
        fill="oklch(0.78 0.165 70 / 0.04)"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 1 }}
      />
      <motion.circle
        cx="115" cy="2" r="3"
        fill="oklch(0.78 0.165 70)"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.5, type: "spring" as const }}
      />
      {/* ₹ symbol */}
      <motion.text
        x="105" y="15"
        fontFamily="var(--font-display)"
        fontSize="8"
        fill="oklch(0.78 0.165 70 / 0.3)"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.6 }}
      >₹</motion.text>
    </svg>
  );
}

/* Metric 3: Average ROI — circular gauge hitting 200% */
export function ChartWave({ className = "" }: { className?: string }) {
  const radius = 24;
  const circumference = 2 * Math.PI * radius;
  const pct = 0.67; // 200% out of 300% scale
  const dash = circumference * pct;
  const gap = circumference - dash;

  return (
    <svg viewBox="0 0 80 70" fill="none" className={className}>
      {/* Background ring */}
      <circle cx="40" cy="32" r={radius} fill="none" stroke="var(--svg-grid-line)" strokeWidth="6" />
      {/* Filled arc */}
      <motion.circle
        cx="40" cy="32" r={radius}
        fill="none"
        stroke="oklch(0.78 0.165 70 / 0.35)"
        strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray={`${dash} ${gap}`}
        transform="rotate(-90 40 32)"
        initial={{ strokeDashoffset: dash }}
        whileInView={{ strokeDashoffset: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" as const }}
      />
      {/* Center text */}
      <motion.text
        x="40" y="36"
        textAnchor="middle"
        fontFamily="var(--font-display)"
        fontSize="10"
        fontWeight="700"
        fill="oklch(0.78 0.165 70 / 0.5)"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1 }}
      >ROI</motion.text>
    </svg>
  );
}

/* Metric 4: Industries — 5 connected sectors */
export function ChartStacked({ className = "" }: { className?: string }) {
  const sectors = [
    { cx: 25, cy: 35, label: "D2C", color: "oklch(0.78 0.165 70 / 0.3)" },
    { cx: 55, cy: 18, label: "RE", color: "oklch(0.66 0.18 295 / 0.3)" },
    { cx: 85, cy: 35, label: "HC", color: "oklch(0.74 0.16 155 / 0.3)" },
    { cx: 40, cy: 55, label: "ED", color: "oklch(0.78 0.165 70 / 0.3)" },
    { cx: 70, cy: 55, label: "SME", color: "oklch(0.66 0.18 295 / 0.3)" },
  ];

  return (
    <svg viewBox="0 0 110 70" fill="none" className={className}>
      {/* Connection lines */}
      {sectors.map((s, i) =>
        sectors.slice(i + 1).map((s2, j) => (
          <motion.line
            key={`${i}-${j}`}
            x1={s.cx} y1={s.cy} x2={s2.cx} y2={s2.cy}
            stroke="var(--svg-grid-line)"
            strokeWidth="0.5"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + (i + j) * 0.05 }}
          />
        ))
      )}
      {/* Sector dots */}
      {sectors.map((s, i) => (
        <motion.g key={s.label}>
          <motion.circle
            cx={s.cx} cy={s.cy} r="10"
            fill="var(--svg-node-fill)"
            stroke={s.color}
            strokeWidth="0.8"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + i * 0.1, type: "spring" as const, stiffness: 200 }}
          />
          <text x={s.cx} y={s.cy + 3} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="5" fill={s.color}>{s.label}</text>
        </motion.g>
      ))}
    </svg>
  );
}

export const bigNumberCharts = [ChartBars, ChartDonut, ChartWave, ChartStacked];
