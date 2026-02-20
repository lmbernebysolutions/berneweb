"use client";

import { cn } from "@/lib/utils";
import { BackdropNumber } from "@/components/ui/backdrop-number";

interface SectionHeadingProps {
  title: string;
  /** Optional second line (renders after <br />). Use for explicit line break, e.g. "Nur Lösungen." */
  titleLine2?: string;
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
  titleLine2,
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
        "relative mb-8 sm:mb-12 md:mb-16 lg:mb-20 xl:mb-24", // Responsive margin
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
      <div className={cn("relative z-10", align === "center" && "mx-auto")}>
        {overline && (
          <div
            className={cn(
              "mb-2 sm:mb-3 text-xs sm:text-sm font-bold uppercase tracking-[0.2em]",
              light ? "text-brand-cyan" : "text-brand-cyan",
              align === "center" && "mx-auto"
            )}
          >
            {overline}
          </div>
        )}
        {/* TechCorners: TL absolut am Heading-Box-Rand, BR inline am Ende der Textzeile */}
        <div className={cn(align === "center" && "text-center")}>
          <Tag
            className={cn(
              "relative inline-block max-w-full font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl uppercase tracking-tight px-4 sm:px-6 py-1.5 sm:py-2 text-balance",
              light ? "text-brand-navy-foreground" : "text-foreground"
            )}
          >
            {/* Top-left corner: absolut positioniert am Heading-Box-Rand */}
            <span
              className="absolute top-0 left-0 h-4 w-4 border-t-2 border-l-2 border-brand-cyan/40 transition-colors z-10 tech-corner-tl tech-corner-animate"
              aria-hidden="true"
            />
            {title}
            {titleLine2 != null && titleLine2 !== "" && (
              <>
                <br />
                {titleLine2}
              </>
            )}
            {/* Bottom-right corner: näher am Text (ml-4) */}
            <span
              className="inline-block h-4 w-4 shrink-0 border-b-2 border-r-2 border-brand-cyan/40 transition-colors align-middle ml-1 mt-20 tech-corner-br tech-corner-animate"
              aria-hidden="true"
            />
          </Tag>
        </div>
        {subtitle && (
          <p
            className={cn(
              "mt-4 sm:mt-5 md:mt-6 text-base sm:text-lg md:text-xl font-medium leading-relaxed",
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
