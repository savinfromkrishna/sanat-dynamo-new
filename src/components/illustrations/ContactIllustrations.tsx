"use client";

import { motion } from "framer-motion";

/**
 * "What happens next" process flow for Contact page.
 * Animated 3-step visual: Reply → Call → Audit delivered.
 */
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
    { x: 200, icon: "☎", label: "30-MIN CALL", sub: "No pitch, just diagnosis", color: "oklch(0.66 0.18 295 / 0.5)" },
    { x: 340, icon: "📋", label: "WRITTEN AUDIT", sub: "12-20 page diagnosis", color: "oklch(0.74 0.16 155 / 0.5)" },
  ];

  return (
    <motion.svg viewBox="0 0 400 150" fill="none" className={`w-full h-auto ${className}`} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}>
      {/* Connecting arrows */}
      <motion.path d="M 95 65 L 165 65" stroke="var(--border-strong)" strokeWidth="1" strokeDasharray="3 3" variants={draw(1)} />
      <motion.polygon points="162,62 168,65 162,68" fill="var(--border-strong)" variants={pop(1)} />
      <motion.path d="M 235 65 L 305 65" stroke="var(--border-strong)" strokeWidth="1" strokeDasharray="3 3" variants={draw(2)} />
      <motion.polygon points="302,62 308,65 302,68" fill="var(--border-strong)" variants={pop(2)} />

      {steps.map((s, i) => (
        <motion.g key={s.label} variants={pop(i)}>
          {/* Circle node */}
          <circle cx={s.x} cy="65" r="28" fill="var(--svg-node-fill)" stroke={s.color} strokeWidth="1.5" />
          {/* Step number */}
          <text x={s.x - 18} y="48" fontFamily="var(--font-mono)" fontSize="7" fill={s.color}>{`0${i + 1}`}</text>
          {/* Icon */}
          <text x={s.x} y="70" textAnchor="middle" fontSize="18">{s.icon}</text>
          {/* Label */}
          <text x={s.x} y="108" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="7" letterSpacing="0.1em" fill="var(--foreground)" opacity="0.7">{s.label}</text>
          {/* Sub-label */}
          <text x={s.x} y="120" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="5.5" fill="var(--muted-foreground)">{s.sub}</text>
        </motion.g>
      ))}

      {/* Pulse on last step */}
      <motion.circle cx="340" cy="65" r="28" fill="none" stroke="oklch(0.74 0.16 155 / 0.2)" strokeWidth="1" animate={{ r: [28, 38, 28], opacity: [0.2, 0, 0.2] }} transition={{ duration: 3, repeat: Infinity }} />

      {/* Bottom confidence text */}
      <motion.text x="200" y="142" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="6" letterSpacing="0.15em" fill="var(--muted-foreground)" variants={pop(4)}>NO COMMITMENT · NO PITCH · JUST DIAGNOSIS</motion.text>
    </motion.svg>
  );
}

/**
 * Trust/security visual — shield with data flowing safely.
 */
export function TrustVisual({ className = "" }: { className?: string }) {
  return (
    <motion.svg viewBox="0 0 200 160" fill="none" className={`w-full h-auto ${className}`} initial="hidden" whileInView="visible" viewport={{ once: true }}>
      {/* Shield */}
      <motion.path d="M 100 20 L 155 40 L 155 85 C 155 115, 130 135, 100 145 C 70 135, 45 115, 45 85 L 45 40 Z" stroke="var(--accent)" strokeWidth="1.5" fill="var(--accent-soft)"
        initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1.5 }} />
      {/* Lock icon */}
      <motion.rect x="88" y="68" width="24" height="20" rx="4" fill="var(--svg-node-fill)" stroke="var(--accent)" strokeWidth="1" initial={{ opacity: 0, scale: 0 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 1, type: "spring" as const }} />
      <motion.path d="M 94 68 L 94 60 C 94 54, 106 54, 106 60 L 106 68" stroke="var(--accent)" strokeWidth="1.2" fill="none" strokeLinecap="round" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ delay: 1.2, duration: 0.5 }} />
      <motion.circle cx="100" cy="78" r="2" fill="var(--accent)" initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 1.5 }} />
      {/* NDA text */}
      <motion.text x="100" y="105" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="6" letterSpacing="0.12em" fill="var(--accent)" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 1.8 }}>CONFIDENTIAL</motion.text>
      <motion.text x="100" y="115" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="5" fill="var(--muted-foreground)" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 2 }}>NDA AVAILABLE</motion.text>
    </motion.svg>
  );
}
