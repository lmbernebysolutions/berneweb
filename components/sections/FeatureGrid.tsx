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
    <div className={cn("grid gap-5", colClasses[cols])}>
      {features.map((feature, i) => {
        const Icon = iconMap[feature.icon];
        return (
          <div
            key={feature.title}
            data-animate="fade-up"
            data-animate-delay={String(i * 80)}
            className={cn(
              "card-hover-glow group relative rounded-xl border p-7 md:p-8",
              light
                ? "border-white/10 bg-white/[0.04]"
                : "border-border bg-card"
            )}
          >
            {/* Decorative index */}
            <div
              className={cn(
                "pointer-events-none absolute top-4 right-4 text-xs font-bold select-none",
                light ? "text-white/10" : "text-border"
              )}
              aria-hidden="true"
            >
              {String(i + 1).padStart(2, "0")}
            </div>

            {Icon && (
              <div
                className={cn(
                  "mb-5 flex h-11 w-11 items-center justify-center rounded-xl transition-colors duration-300",
                  light
                    ? "bg-brand-cyan/10 group-hover:bg-brand-cyan/20"
                    : "bg-brand-navy/5 group-hover:bg-brand-navy/10"
                )}
              >
                <Icon
                  className={cn(
                    "size-5",
                    light ? "text-brand-cyan" : "text-brand-navy"
                  )}
                  stroke={1.5}
                />
              </div>
            )}

            <h3
              className={cn(
                "font-bold",
                light ? "text-white" : "text-foreground"
              )}
            >
              {feature.title}
            </h3>
            <p
              className={cn(
                "mt-2 text-[0.9375rem] leading-relaxed",
                light ? "text-white/60" : "text-muted-foreground"
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
