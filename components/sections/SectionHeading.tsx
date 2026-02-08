"use client";

import { cn } from "@/lib/utils";
import { BackdropNumber } from "@/components/ui/backdrop-number";
import { TechCorners } from "@/components/ui/tech-corners";

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

      {/* Content Container (z-index check) – w-fit so Tech Corners sit at title end */}
      <div className={cn("relative z-10 w-fit", align === "center" && "mx-auto")}>
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
        <div className={cn("relative w-fit inline-block", align === "center" && "mx-auto")}>
          <TechCorners pattern="diagonal" variant="cyan" size="lg" />
          <Tag
            className={cn(
              "block text-4xl md:text-5xl lg:text-6xl uppercase tracking-tight px-6 py-2 w-fit",
              light ? "text-brand-navy-foreground" : "text-foreground"
            )}
          >
            {title}
            {titleLine2 != null && titleLine2 !== "" && (
              <>
                <br />
                {titleLine2}
              </>
            )}
          </Tag>
        </div>
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
