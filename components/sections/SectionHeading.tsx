import { cn } from "@/lib/utils";
import { BackdropNumber } from "@/components/ui/backdrop-number";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  as?: "h1" | "h2" | "h3";
  light?: boolean;
  /** Optional overline text displayed above the heading */
  overline?: string;
  /** Massive background number for the section (e.g. "02") */
  number?: string;
}

export function SectionHeading({
  title,
  subtitle,
  align = "left",
  as: Tag = "h2",
  light = false,
  overline,
  number,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "relative mb-12 md:mb-24", // Increased margin for the huge number
        align === "center" && "text-center"
      )}
      data-animate="fade-up"
    >
      {/* Background Number Anchor */}
      {number && (
        <BackdropNumber
          number={number}
          className={cn(
            "-top-20 z-0 opacity-50",
            align === "center" ? "left-1/2 -translate-x-1/2" : "-left-10"
          )}
        />
      )}

      {/* Content Container (z-index check) */}
      <div className="relative z-10">
        {overline && (
          <div
            className={cn(
              "mb-3 text-sm font-bold uppercase tracking-[0.2em]",
              light ? "text-brand-cyan" : "text-brand-cyan",
              align === "center" && "mx-auto"
            )}
          >
            {overline}
          </div>
        )}
        <Tag
          className={cn(
            "text-4xl md:text-5xl lg:text-6xl uppercase tracking-tight",
            light ? "text-brand-navy-foreground" : "text-foreground"
          )}
        >
          {title}
        </Tag>
        {subtitle && (
          <p
            className={cn(
              "mt-6 text-lg md:text-xl font-medium leading-relaxed",
              light ? "text-white/60" : "text-muted-foreground",
              align === "center" && "mx-auto max-w-2xl"
            )}
          >
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
