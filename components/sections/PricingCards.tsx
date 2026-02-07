"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { IconCheck, IconArrowRight } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { TechCorners } from "@/components/ui/tech-corners";

interface Package {
  name: string;
  price: string;
  unit: string;
  description: string;
  features: readonly string[];
  highlighted?: boolean;
  badge?: string;
}

interface PricingCardsProps {
  packages: readonly Package[];
}

export function PricingCards({ packages }: PricingCardsProps) {
  return (
    <div className="grid gap-6 md:grid-cols-3 md:gap-5">
      {packages.map((pkg, i) => (
        <div
          key={pkg.name}
          data-animate="fade-up"
          data-animate-delay={String(i * 120)}
          className={cn(
            "group relative flex flex-col border p-8 transition-colors",
            "rounded-none", // Brutalist
            pkg.highlighted
              ? "bg-brand-navy border-brand-cyan shadow-[0_0_30px_rgba(3,249,249,0.1)] hover:shadow-[0_0_40px_rgba(3,249,249,0.15)]"
              : "bg-brand-navy/60 backdrop-blur-md border-white/10"
          )}
        >
          {/* Tech Corners - 2→4 diagonal pattern */}
          <TechCorners
            pattern="diagonal"
            variant="cyan"
            size="lg"
            hoverExpand
          />

          {/* Badge */}
          {pkg.badge && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-cyan px-2 py-0.5 text-xs font-bold text-brand-navy uppercase tracking-widest border border-brand-cyan">
              {pkg.badge}
            </div>
          )}

          {/* Header */}
          <div className="relative text-center mb-8">
            <h3
              className={cn(
                "text-2xl font-black uppercase tracking-widest",
                pkg.highlighted ? "text-white" : "text-white"
              )}
            >
              {pkg.name}
            </h3>
            <p
              className={cn(
                "mt-2 text-sm",
                pkg.highlighted ? "text-brand-cyan/80" : "text-white/50"
              )}
            >
              {pkg.description}
            </p>
          </div>

          {/* Price */}
          <div className="relative flex items-baseline justify-center gap-1 mb-8 border-y border-white/10 py-6 bg-black/20">
            <span
              className={cn(
                "text-5xl font-black tracking-tighter",
                pkg.highlighted ? "text-brand-cyan" : "text-white"
              )}
            >
              {pkg.price} €
            </span>
            <span className="text-xs font-mono text-white/40 uppercase">
              {pkg.unit}
            </span>
          </div>

          {/* Features */}
          <ul className="relative grow space-y-4 mb-8">
            {pkg.features.map((feature) => (
              <li key={feature} className="flex items-start gap-3 text-sm">
                <div className={cn("mt-1 w-1.5 h-1.5 shrink-0", pkg.highlighted ? "bg-brand-cyan" : "bg-white/30")} />
                <span className="text-white/80 leading-snug">
                  {feature}
                </span>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <Button
            asChild
            variant={pkg.highlighted ? "default" : "outline"}
            className={cn(
              "w-full uppercase tracking-widest font-bold",
              !pkg.highlighted && "border-white/20 text-white hover:bg-white/10"
            )}
          >
            <Link href="/kontakt">
              Paket wählen
            </Link>
          </Button>
        </div>
      ))}
    </div>
  );
}
