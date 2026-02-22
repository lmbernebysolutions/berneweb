"use client";

import { cn } from "@/lib/utils";
import { BackdropNumber } from "@/components/ui/backdrop-number";

interface SectionHeadingProps {
  title: string;
  /** Optional second line (renders after <br />). Use for explicit line break, e.g. "Nur Lösungen." */
  titleLine2?: string;
  titleLine3?: string;
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
  titleLine3,
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
            align === "center" ? "left-1/2 -translate-x-1/2" : "left-2 sm:left-4 md:left-6"
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
        {/* TechCorners: Platz rechts reservieren; relative z-10 damit rechter Corner nicht unter dem Heading-Text liegt */}
        <div className={cn(align === "center" && "text-center", "pr-16 sm:pr-14 md:pr-16")}>
          <Tag
            className={cn(
              "relative inline font-display text-4xl lg:text-5xl xl:text-6xl uppercase tracking-tight text-balance leading-[1.1] max-w-full",
              light ? "text-brand-navy-foreground" : "text-foreground"
            )}
          >
            <span
              className="relative z-10 inline-block h-3 w-3 sm:h-4 sm:w-4 border-t-2 border-l-2 border-brand-cyan/40 transition-colors mr-1 sm:mr-1.5 -mt-0.5 sm:-mt-1 align-top tech-corner-tl tech-corner-animate"
              aria-hidden="true"
            />
            {title}
            {titleLine2 != null && titleLine2 !== "" && (
              <>
                <span className="md:hidden"><br /></span>
                <span className="hidden md:inline"> </span>
                {titleLine2}
              </>
            )}
            {titleLine3 != null && titleLine3 !== "" && (
              <>
                <span className="md:hidden"><br /></span>
                <span className="hidden md:inline"> </span>
                {titleLine3}
              </>
            )}
            <span
              className="relative z-10 inline-block h-3 w-3 sm:h-4 sm:w-4 border-b-2 border-r-2 border-brand-cyan/40 transition-colors ml-1 sm:ml-1.5 -mb-0.5 sm:-mb-1 align-bottom tech-corner-br tech-corner-animate"
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
