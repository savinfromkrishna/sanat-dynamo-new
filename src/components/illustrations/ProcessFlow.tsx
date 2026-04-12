"use client";

import { motion } from "framer-motion";

/**
 * Animated vertical flow/pipeline SVG connector for the Process section.
 * Shows data flowing downward through the 4-step process.
 */
export function ProcessFlowConnector({ className = "" }: { className?: string }) {
  return (
    <motion.svg
      viewBox="0 0 60 600"
      fill="none"
      className={`absolute left-[27px] top-0 h-full w-[60px] hidden lg:block ${className}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      style={{ left: "calc(50% - 30px)" }}
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="flow-grad" x1="30" y1="0" x2="30" y2="600" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="oklch(0.78 0.165 70)" stopOpacity="0.4" />
          <stop offset="25%" stopColor="oklch(0.66 0.18 295)" stopOpacity="0.3" />
          <stop offset="50%" stopColor="oklch(0.78 0.165 70)" stopOpacity="0.3" />
          <stop offset="75%" stopColor="oklch(0.74 0.16 155)" stopOpacity="0.3" />
          <stop offset="100%" stopColor="oklch(0.78 0.165 70)" stopOpacity="0.4" />
        </linearGradient>
        <filter id="flow-glow">
          <feGaussianBlur stdDeviation="1" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Main flow line */}
      <motion.line
        x1="30" y1="10" x2="30" y2="590"
        stroke="url(#flow-grad)"
        strokeWidth="1"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2.5, ease: "easeInOut" }}
      />

      {/* Node pulses at each step position */}
      {[75, 225, 375, 525].map((y, i) => (
        <motion.g key={i}>
          <motion.circle
            cx="30" cy={y} r="6"
            fill="oklch(0.78 0.165 70 / 0.35)"
            stroke="oklch(0.78 0.165 70 / 0.4)"
            strokeWidth="1"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 + i * 0.3, type: "spring", stiffness: 200 }}
          />
          <motion.circle
            cx="30" cy={y} r="6"
            fill="none"
            stroke="oklch(0.78 0.165 70 / 0.4)"
            strokeWidth="1"
            animate={{ r: [6, 16, 6], opacity: [0.2, 0, 0.2] }}
            transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
          />
        </motion.g>
      ))}

      {/* Flowing data particles */}
      <motion.circle
        r="3" cx="30"
        fill="oklch(0.78 0.165 70)"

        animate={{ cy: [10, 590], opacity: [0, 1, 1, 1, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      />
      <motion.circle
        r="2" cx="30"
        fill="oklch(0.66 0.18 295)"

        animate={{ cy: [10, 590], opacity: [0, 1, 1, 1, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear", delay: 2 }}
      />
      <motion.circle
        r="2.5" cx="30"
        fill="oklch(0.74 0.16 155)"

        animate={{ cy: [10, 590], opacity: [0, 1, 1, 1, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear", delay: 4 }}
      />
    </motion.svg>
  );
}
