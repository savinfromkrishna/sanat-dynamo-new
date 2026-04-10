"use client";

import { useEffect, useState } from "react";
import { Crosshair, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { interpolate, type Messages } from "@/lib/i18n";

interface PreciseLocationButtonProps {
  t: Messages;
  initialCity: string;
  initialState: string;
}

type Status = "idle" | "loading" | "success" | "denied" | "error";

/**
 * Client-side enhancement for the CityBanner. Asks the user for
 * navigator.geolocation permission, sends coords to /api/geo/reverse,
 * and displays the resolved city/state with an updated pill.
 *
 * This does NOT change server-rendered SEO metadata (that uses IP-based
 * detection). It's a UX nicety that confirms accuracy to the visitor.
 */
export function PreciseLocationButton({
  t,
  initialCity,
  initialState,
}: PreciseLocationButtonProps) {
  const cb = t.cityBanner;
  const [status, setStatus] = useState<Status>("idle");
  const [resolved, setResolved] = useState<{
    city: string;
    state: string;
  } | null>(null);
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    if (typeof navigator === "undefined" || !("geolocation" in navigator)) {
      setSupported(false);
    }
  }, []);

  async function request() {
    if (!supported) return;
    setStatus("loading");

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords;
          const res = await fetch(
            `/api/geo/reverse?lat=${latitude}&lng=${longitude}`
          );
          if (!res.ok) throw new Error("reverse failed");
          const data = await res.json();
          if (data.city) {
            setResolved({ city: data.city, state: data.state || "" });
            setStatus("success");
          } else {
            setStatus("error");
          }
        } catch {
          setStatus("error");
        }
      },
      (err) => {
        if (err.code === err.PERMISSION_DENIED) setStatus("denied");
        else setStatus("error");
      },
      {
        enableHighAccuracy: true,
        timeout: 8000,
        maximumAge: 60_000,
      }
    );
  }

  if (!supported) return null;

  // Show the "success" state — resolved city/state
  if (status === "success" && resolved) {
    const msg = interpolate(cb.preciseUpdated, {
      city: resolved.city,
      state: resolved.state || resolved.city,
    });
    return (
      <div className="mt-4 flex items-start gap-2 rounded-xl border border-success/30 bg-success/5 px-3 py-2.5 text-xs text-foreground">
        <CheckCircle2 size={13} className="mt-0.5 shrink-0 text-success" />
        <span>{msg}</span>
      </div>
    );
  }

  return (
    <div className="mt-4">
      <button
        onClick={request}
        disabled={status === "loading"}
        className="group inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-background px-4 py-2.5 text-xs font-semibold text-foreground transition-all hover:border-accent/50 hover:bg-surface disabled:cursor-wait disabled:opacity-70"
      >
        {status === "loading" ? (
          <Loader2 size={13} className="animate-spin text-accent" />
        ) : (
          <Crosshair size={13} className="text-accent" />
        )}
        {status === "loading" ? cb.preciseLoading : cb.preciseLabel}
      </button>
      {status === "idle" && (
        <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">
          {cb.preciseHint}
        </p>
      )}
      {status === "denied" && (
        <div className="mt-2 flex items-start gap-2 text-[11px] text-danger/90">
          <AlertCircle size={12} className="mt-0.5 shrink-0" />
          <span>{cb.preciseDenied}</span>
        </div>
      )}
      {status === "error" && (
        <div className="mt-2 flex items-start gap-2 text-[11px] text-muted-foreground">
          <AlertCircle size={12} className="mt-0.5 shrink-0" />
          <span>{cb.preciseError}</span>
        </div>
      )}
    </div>
  );
}
