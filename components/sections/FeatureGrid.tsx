"use client";

import {
  IconSearch,
  IconPhone,
  IconCurrencyEuro,
  IconMapPin,
  IconPhoneCall,
  IconStar,
  IconChartBar,
  IconHeart,
  IconTool,
  IconShield,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { TechCorners } from "@/components/ui/tech-corners";

const iconMap: Record<string, React.ElementType> = {
  IconSearch,
  IconPhone,
  IconCurrencyEuro,
  IconMapPin,
  IconPhoneCall,
  IconStar,
  IconChartBar,
  IconHeart,
  IconTool,
  IconShield,
};

interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface FeatureGridProps {
  features: readonly Feature[];
  cols?: 2 | 3 | 4;
  light?: boolean;
}

export function FeatureGrid({
  features,
  cols = 3,
  light = false,
}: FeatureGridProps) {
  const colClasses = {
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-2 lg:grid-cols-3",
    4: "sm:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <div className={cn("grid gap-6 md:gap-8", colClasses[cols])}>
      {features.map((feature, i) => {
        const Icon = iconMap[feature.icon];
        return (
          <div
            key={feature.title}
            data-animate="fade-up"
            data-animate-delay={String(i * 80)}
            className={cn(
              "group relative overflow-hidden border p-8 transition-all duration-300",
              light
                ? "border-brand-cyan/20 bg-brand-navy/40 backdrop-blur-sm"
                : "border-border bg-card"
            )}
          >
            {/* Tech Corners - 2→4 diagonal pattern */}
            <TechCorners
              pattern="diagonal"
              variant={light ? "cyan" : "navy"}
              size="lg"
            />

            {/* Decorative index */}
            <div
              className={cn(
                "pointer-events-none absolute top-4 right-6 font-mono text-sm font-bold select-none tracking-tighter opacity-10",
                light ? "text-brand-cyan" : "text-border"
              )}
              aria-hidden="true"
            >
              ID.{String(i + 1).padStart(2, "0")}
            </div>

            {Icon && (
              <div
                className={cn(
                  "mb-6 flex h-12 w-12 items-center justify-center border transition-all duration-300",
                  light
                    ? "border-brand-cyan/30 bg-brand-navy group-hover:border-brand-cyan"
                    : "border-brand-navy/10 bg-white group-hover:border-brand-navy"
                )}
              >
                <Icon
                  className={cn(
                    "size-6",
                    light ? "text-brand-cyan" : "text-brand-navy"
                  )}
                  stroke={1.5}
                />
              </div>
            )}

            <h3
              className={cn(
                "text-xl font-bold uppercase tracking-wide",
                light ? "text-white" : "text-foreground"
              )}
            >
              {feature.title}
            </h3>

            <p
              className={cn(
                "mt-4 text-[0.9375rem] leading-relaxed",
                light ? "text-blue-100/70" : "text-muted-foreground"
              )}
            >
              {feature.description}
            </p>
          </div>
        );
      })}
    </div>
  );
}
