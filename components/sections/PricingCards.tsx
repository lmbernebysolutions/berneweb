"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { IconChevronDown } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { TechCorners } from "@/components/ui/tech-corners";
import { BLogo } from "@/components/brand/BLogo";

interface Package {
  name: string;
  price: string;
  unit: string;
  description: string;
  features: readonly string[];
  highlighted?: boolean;
  badge?: string;
}

interface ComparisonRow {
  label: string;
  inPackages: readonly string[];
}

interface PricingCardsProps {
  packages: readonly Package[];
  comparisonRows?: readonly ComparisonRow[];
}

export function PricingCards({ packages, comparisonRows }: PricingCardsProps) {
  return (
    <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-6 md:gap-5 min-w-0">
      {packages.map((pkg, i) => (
        <div
          key={pkg.name}
          data-animate="fade-up"
          data-animate-delay={String(i * 120)}
          className={cn(
            "group relative flex flex-col border p-3 sm:p-5 md:p-8 transition-colors min-w-0",
            "rounded-none",
            pkg.highlighted
              ? "bg-brand-navy border-brand-cyan shadow-[0_0_30px_rgba(3,249,249,0.1)] hover:shadow-[0_0_40px_rgba(3,249,249,0.15)]"
              : "bg-brand-navy/60 backdrop-blur-md border-white/10"
          )}
        >
          <TechCorners pattern="diagonal" variant="cyan" size="lg" hoverExpand />

          {pkg.badge && (
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 bg-brand-cyan px-1.5 py-0.5 text-[10px] font-bold text-brand-navy uppercase tracking-widest border border-brand-cyan md:text-xs md:px-2 md:py-0.5">
              <BLogo size={12} className="opacity-80 md:w-4 md:h-4" />
              {pkg.badge}
            </div>
          )}

          {/* Header: auf Mobile kürzer */}
          <div className="relative text-center mb-2 sm:mb-4 md:mb-8">
            <h3
              className={cn(
                "text-xs sm:text-lg md:text-2xl font-black uppercase tracking-widest leading-tight",
                pkg.highlighted ? "text-white" : "text-white"
              )}
            >
              {pkg.name}
            </h3>
            <p
              className={cn(
                "mt-1 sm:mt-2 text-[10px] sm:text-xs md:text-sm line-clamp-2 md:line-clamp-none",
                pkg.highlighted ? "text-brand-cyan/80" : "text-brand-navy-muted"
              )}
            >
              {pkg.description}
            </p>
          </div>

          {/* Price */}
          <div className="relative flex flex-col sm:flex-row items-baseline justify-center gap-0 sm:gap-1 mb-3 sm:mb-6 md:mb-8 border-y border-white/10 py-3 sm:py-4 md:py-6 bg-black/20">
            <span
              className={cn(
                "text-xl sm:text-3xl md:text-5xl font-black tracking-tighter",
                pkg.highlighted ? "text-brand-warm" : "text-white"
              )}
            >
              {pkg.price} €
            </span>
            <span className="text-[10px] sm:text-xs font-mono text-white/40 uppercase">
              {pkg.unit}
            </span>
          </div>

          {/* Mobile: ausklappbare Details (Features + Vergleich) */}
          <details className="relative md:hidden group/details">
            <summary className="list-none cursor-pointer flex items-center justify-center gap-1 py-1.5 text-[10px] font-bold uppercase tracking-widest text-brand-cyan/80 hover:text-brand-cyan [&::-webkit-details-marker]:hidden">
              <span>Details</span>
              <IconChevronDown className="size-3 transition-transform group-open/details:rotate-180" />
            </summary>
            <ul className="relative grow space-y-2 mb-3 mt-2">
              {pkg.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-[10px]">
                  <div className={cn("mt-1 w-1 h-1 shrink-0", pkg.highlighted ? "bg-brand-cyan" : "bg-white/30")} />
                  <span className="text-white/80 leading-snug">{feature}</span>
                </li>
              ))}
            </ul>
            {comparisonRows && comparisonRows.length > 0 && (
              <div className="relative mb-4 border-t border-white/10 pt-3">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-cyan/60 mb-2">Kernfeatures</p>
                <ul className="space-y-1.5">
                  {comparisonRows.map((row) => {
                    const included = row.inPackages.includes(pkg.name);
                    return (
                      <li key={row.label} className="flex items-center justify-between gap-2 text-[10px]">
                        <span className="text-white/70 truncate">{row.label}</span>
                        {included ? (
                          <span className="inline-flex h-4 w-4 shrink-0 items-center justify-center rounded border border-brand-cyan/50 bg-brand-cyan/10 text-brand-cyan text-[10px]">✓</span>
                        ) : (
                          <span className="text-white/30 text-[10px]">—</span>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </details>

          {/* Desktop: Features + Vergleich immer sichtbar */}
          <div className="hidden md:block relative grow">
            <ul className="space-y-4 mb-6">
              {pkg.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-sm">
                  <div className={cn("mt-1 w-1.5 h-1.5 shrink-0", pkg.highlighted ? "bg-brand-cyan" : "bg-white/30")} />
                  <span className="text-white/80 leading-snug">{feature}</span>
                </li>
              ))}
            </ul>
            {comparisonRows && comparisonRows.length > 0 && (
              <div className="border-t border-white/10 pt-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-cyan/60 mb-3">Kernfeatures im Vergleich</p>
                <ul className="space-y-2">
                  {comparisonRows.map((row) => {
                    const included = row.inPackages.includes(pkg.name);
                    return (
                      <li key={row.label} className="flex items-center justify-between gap-3 text-sm">
                        <span className="text-white/70">{row.label}</span>
                        {included ? (
                          <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded border border-brand-cyan/50 bg-brand-cyan/10 text-brand-cyan text-xs">✓</span>
                        ) : (
                          <span className="text-white/30 text-xs">—</span>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>

          <Button
            asChild
            variant={pkg.highlighted ? "default" : "outline"}
            size="sm"
            className={cn(
              "w-full uppercase tracking-widest font-bold text-[10px] sm:text-xs py-2 md:py-0 md:text-sm md:h-10 mt-auto",
              !pkg.highlighted && "border-white/20 text-white hover:bg-white/10"
            )}
          >
            <Link href="/kontakt">Paket wählen</Link>
          </Button>
        </div>
      ))}
    </div>
  );
}
