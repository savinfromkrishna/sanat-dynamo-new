"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Tiny progress indicator that sits directly under a mobile snap-x scroller.
 * Tracks its previous sibling's scrollLeft to render an active page count and
 * a thin progress bar. Mobile-only (sm:hidden) so it doesn't clutter the
 * desktop grid layout the same parent renders at sm+.
 */
export function SnapRowHint({
  count,
  className = "",
}: {
  count: number;
  className?: string;
}) {
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(1);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const me = ref.current;
    if (!me) return;
    const scroller = me.previousElementSibling as HTMLElement | null;
    if (!scroller) return;

    const update = () => {
      const max = scroller.scrollWidth - scroller.clientWidth;
      if (max <= 1) {
        setProgress(0);
        setActive(1);
        return;
      }
      const p = Math.min(1, Math.max(0, scroller.scrollLeft / max));
      setProgress(p);
      setActive(Math.min(count, Math.max(1, Math.round(p * (count - 1)) + 1)));
    };

    update();
    scroller.addEventListener("scroll", update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(scroller);
    return () => {
      scroller.removeEventListener("scroll", update);
      ro.disconnect();
    };
  }, [count]);

  if (count <= 1) return null;

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div
      ref={ref}
      aria-hidden
      className={`mt-4 flex items-center justify-center gap-3 sm:hidden ${className}`}
    >
      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
        {pad(active)} / {pad(count)}
      </span>
      <div className="relative h-[2px] w-20 overflow-hidden rounded-full bg-border">
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-accent transition-[width] duration-150 ease-out"
          style={{ width: `${Math.max(8, progress * 100)}%` }}
        />
      </div>
      <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground">
        Swipe
      </span>
    </div>
  );
}
