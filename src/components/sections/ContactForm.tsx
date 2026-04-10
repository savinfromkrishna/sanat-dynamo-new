"use client";

import { useState } from "react";
import { ArrowUpRight, CheckCircle2, ShieldCheck, Lock } from "lucide-react";
import type { Messages } from "@/lib/i18n";

export function ContactForm({ t }: { t: Messages }) {
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const f = t.contact.form;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    // Hook this up to your real backend / email provider when ready.
    await new Promise((r) => setTimeout(r, 900));
    setSubmitting(false);
    setDone(true);
  }

  if (done) {
    return (
      <div className="relative overflow-hidden rounded-3xl border border-accent/30 bg-accent-soft p-10 text-center">
        <div className="bg-noise absolute inset-0 opacity-[0.18] mix-blend-overlay" />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-accent/20 blur-3xl"
        />
        <div className="relative">
          <div className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-accent/40 bg-background text-accent">
            <CheckCircle2 size={28} strokeWidth={1.75} />
          </div>
          <h3 className="mt-6 font-display text-3xl font-semibold tracking-tight text-foreground">
            Got it. We&apos;ll be in touch.
          </h3>
          <p className="mt-4 text-base text-muted-foreground">
            We&apos;ll respond within one business day with a 30-minute slot to
            walk through your business.
          </p>
          <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-success pulse-dot" />
            Confirmation email sent
          </div>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="relative overflow-hidden rounded-3xl border border-border bg-surface/60 p-8 sm:p-10"
    >
      <div className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-accent/5 blur-3xl" />

      <div className="relative">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
              Step 1 of 1
            </div>
            <h3 className="mt-2 font-display text-xl font-semibold text-foreground">
              Tell us about your business
            </h3>
          </div>
          <div className="flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground">
            <Lock size={10} />
            Encrypted
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label={f.name}>
            <input
              required
              name="name"
              type="text"
              className="input"
              placeholder="Jane Doe"
            />
          </Field>
          <Field label={f.email}>
            <input
              required
              name="email"
              type="email"
              className="input"
              placeholder="jane@company.com"
            />
          </Field>
          <Field label={f.company}>
            <input
              required
              name="company"
              type="text"
              className="input"
              placeholder="Acme Inc."
            />
          </Field>
          <Field label={f.industry}>
            <select required name="industry" className="input" defaultValue="">
              <option value="" disabled>
                Select…
              </option>
              {f.industries.map((i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <Field label={f.challenge} className="mt-5">
          <textarea
            required
            name="challenge"
            rows={5}
            className="input resize-none"
            placeholder="We're spending too much on ads, our website doesn't convert, our team is buried in manual operations…"
          />
        </Field>

        <button
          type="submit"
          disabled={submitting}
          className="group relative mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-7 py-4 text-base font-semibold text-accent-foreground shadow-[0_16px_44px_-12px_oklch(0.78_0.165_70/0.55)] transition-all hover:-translate-y-0.5 hover:shadow-[0_22px_52px_-12px_oklch(0.78_0.165_70/0.7)] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-accent to-[oklch(0.7_0.18_55)] opacity-0 blur-xl transition-opacity group-hover:opacity-80"
          />
          {submitting ? f.submitting : f.submit}
          <ArrowUpRight
            size={18}
            className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </button>

        <div className="mt-5 flex items-center justify-center gap-2 text-[11px] text-muted-foreground">
          <ShieldCheck size={12} className="text-accent" />
          We respond within one business day. Your data stays with us.
        </div>
      </div>

      <style>{`
        .input {
          width: 100%;
          background: var(--background);
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 14px 16px;
          color: var(--foreground);
          font-size: 14px;
          transition: border-color 200ms, box-shadow 200ms, background 200ms;
        }
        .input::placeholder { color: var(--muted-foreground); opacity: 0.7; }
        .input:hover { border-color: var(--border-strong); }
        .input:focus {
          outline: none;
          border-color: var(--accent);
          box-shadow: 0 0 0 4px oklch(0.78 0.165 70 / 0.15);
        }
      `}</style>
    </form>
  );
}

function Field({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`block ${className ?? ""}`}>
      <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
        {label}
      </span>
      {children}
    </label>
  );
}
