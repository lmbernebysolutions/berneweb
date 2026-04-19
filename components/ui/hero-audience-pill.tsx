"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { IconHammer, IconArrowRight } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

interface HeroAudiencePillProps {
  href: string;
  /** Label (Desktop). Knapp und aktiv formuliert. */
  label: string;
  /** Optionales kürzeres Label für sehr kleine Viewports. */
  mobileLabel?: string;
  /** Icon auf der Pill – default: Hammer (Handwerk). */
  icon?: ReactNode;
  className?: string;
}

/**
 * Kompakte Audience-Pill für den Hero. Dient als Sekundär-Signal
 * („Spezialfall Handwerk → Pakete ansehen"), ohne die Haupt-CTAs zu verwässern.
 * Positioniert zwischen Subline und CTAs.
 */
export function HeroAudiencePill({
  href,
  label,
  mobileLabel,
  icon,
  className,
}: HeroAudiencePillProps) {
  const resolvedIcon = icon ?? (
    <IconHammer className="size-3.5 text-brand-cyan" stroke={1.75} aria-hidden="true" />
  );

  return (
    <Link
      href={href}
      className={cn(
        "group relative inline-flex items-center gap-2.5 self-start",
        "border border-brand-cyan/30 bg-brand-cyan/[0.06] backdrop-blur-sm",
        "px-3 py-1.5 sm:px-4 sm:py-2",
        "text-[0.7rem] sm:text-xs font-semibold uppercase tracking-[0.14em] text-white/90",
        "transition-all duration-200",
        "hover:border-brand-cyan/60 hover:bg-brand-cyan/10 hover:text-white",
        "hover:shadow-[0_0_18px_rgba(3,249,249,0.15)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan/60 focus-visible:ring-offset-0",
        className
      )}
    >
      <span className="flex size-5 shrink-0 items-center justify-center bg-brand-cyan/10">
        {resolvedIcon}
      </span>
      <span className="sm:hidden">{mobileLabel ?? label}</span>
      <span className="hidden sm:inline">{label}</span>
      <IconArrowRight
        className="size-3.5 -translate-x-0.5 text-brand-cyan transition-transform duration-200 group-hover:translate-x-0.5"
        stroke={2}
        aria-hidden="true"
      />
    </Link>
  );
}
