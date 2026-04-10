import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import LocalizedLink from "../LocalizedLink";

interface ButtonLinkProps {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "md" | "lg";
  className?: string;
  withArrow?: boolean;
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
  withArrow = true,
}: ButtonLinkProps) {
  const base =
    "group relative inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 will-change-transform";

  const sizes = {
    md: "px-6 py-3.5 text-sm",
    lg: "px-7 py-4 text-base",
  } as const;

  const styles = {
    primary:
      "bg-accent text-accent-foreground shadow-[0_10px_36px_-12px_oklch(0.78_0.165_70/0.55)] hover:shadow-[0_18px_48px_-10px_oklch(0.78_0.165_70/0.75)] hover:-translate-y-0.5",
    secondary:
      "border border-border bg-surface text-foreground hover:border-border-strong hover:bg-surface-2",
    outline:
      "border border-accent/40 bg-accent/5 text-accent hover:border-accent/70 hover:bg-accent/10",
    ghost: "text-foreground hover:bg-surface",
  } as const;

  return (
    <LocalizedLink
      href={href}
      className={cn(base, sizes[size], styles[variant], className)}
    >
      {variant === "primary" && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-accent to-[oklch(0.72_0.18_55)] opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-70"
        />
      )}
      <span className="relative">{children}</span>
      {withArrow && (
        <ArrowUpRight
          size={size === "lg" ? 18 : 16}
          className="relative transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      )}
    </LocalizedLink>
  );
}
