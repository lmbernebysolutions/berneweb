"use client";

import { cn } from "@/lib/utils";
import { BackdropNumber } from "@/components/ui/backdrop-number";

interface SectionHeadingProps {
  title: string;
  /** Optional second line (renders after <br />). Use for explicit line break, e.g. "Nur Lösungen." */
  titleLine2?: string;
  titleLine3?: string;
  /** If true, forces line breaks (titleLine2, titleLine3) on desktop as well */
  forceBreak?: boolean;
  subtitle?: string;
  align?: "left" | "center";
  as?: "h1" | "h2" | "h3";
  light?: boolean;
  /** V3: wenn true, optimiert Farben für brand-light Hintergrund */
  onLight?: boolean;
  /** Optional overline text displayed above the heading */
  overline?: string;
  /** Massive background number for the section (e.g. "02") */
  number?: string;
  /** Etwas kleinere Display-Typo nur auf sehr schmalen Viewports (ab sm wieder Standard-Stufe). */
  compactMobileTitle?: boolean;
}

export function SectionHeading({
  title,
  titleLine2,
  titleLine3,
  forceBreak,
  subtitle,
  align = "left",
  as: Tag = "h2",
  light = false,
  onLight = false,
  overline,
  number,
  compactMobileTitle = false,
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
        <div className={cn(align === "center" && "text-center", "pr-16 sm:pr-14 md:pr-16 max-[359px]:pr-0")}>
          <Tag
            className={cn(
              "relative inline-block font-display uppercase tracking-tight text-balance leading-[1.1] max-w-full max-[359px]:break-normal max-[359px]:[word-break:keep-all]",
              compactMobileTitle
                ? "text-3xl sm:text-4xl lg:text-5xl xl:text-6xl"
                : "text-4xl lg:text-5xl xl:text-6xl",
              onLight ? "text-brand-navy" : (light ? "text-brand-navy-foreground" : "text-foreground")
            )}
          >
            <span
              className={cn(
                "relative z-10 inline-block h-3 w-3 sm:h-4 sm:w-4 border-t-2 border-l-2 transition-colors mr-1 sm:mr-1.5 -mt-0.5 sm:-mt-1 align-top tech-corner-tl tech-corner-animate max-[359px]:h-[8px] max-[359px]:w-[8px] max-[359px]:mr-[6px] max-[359px]:-mt-[2px]",
                onLight ? "border-brand-navy/30" : "border-brand-cyan/40"
              )}
              aria-hidden="true"
            />
            {title}
            {titleLine2 != null && titleLine2 !== "" && (
              forceBreak ? (
                <>
                  <br />
                  {titleLine2}
                </>
              ) : (
                <>
                  <span className="md:hidden"><br /></span>
                  <span className="hidden md:inline"> </span>
                  {titleLine2}
                </>
              )
            )}
            {titleLine3 != null && titleLine3 !== "" && (
              forceBreak ? (
                <>
                  <br />
                  {titleLine3}
                </>
              ) : (
                <>
                  <span className="md:hidden"><br /></span>
                  <span className="hidden md:inline"> </span>
                  {titleLine3}
                </>
              )
            )}
            <span
              className={cn(
                "relative z-10 inline-block h-3 w-3 sm:h-4 sm:w-4 border-b-2 border-r-2 transition-colors ml-1 sm:ml-1.5 -mb-0.5 sm:-mb-1 align-bottom tech-corner-br tech-corner-animate max-[359px]:h-[8px] max-[359px]:w-[8px] max-[359px]:ml-[6px] max-[359px]:-mb-[2px]",
                onLight ? "border-brand-navy/30" : "border-brand-cyan/40"
              )}
              aria-hidden="true"
            />
          </Tag>
        </div>
        {subtitle && (
          <p
            className={cn(
              "mt-4 sm:mt-5 md:mt-6 text-base sm:text-lg md:text-xl font-medium leading-relaxed",
              onLight ? "text-brand-navy/60" : (light ? "text-white/60" : "text-muted-foreground"),
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
