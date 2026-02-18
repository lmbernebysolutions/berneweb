import { cn } from "@/lib/utils";

interface SectionProps {
  children: React.ReactNode;
  bg?: "white" | "alt" | "dark" | "navy" | "transparent" | "subtle";
  narrow?: boolean;
  id?: string;
  className?: string;
}

const bgClasses: Record<NonNullable<SectionProps["bg"]>, string> = {
  white: "bg-background text-foreground",
  alt: "bg-section-alt text-foreground",
  dark: "bg-brand-navy text-brand-navy-foreground",
  navy: "bg-brand-navy text-brand-navy-foreground",
  transparent: "bg-transparent text-foreground",
  subtle: "bg-white/[0.015] text-foreground",
};

export function Section({
  children,
  bg = "white",
  narrow,
  id,
  className,
}: SectionProps) {
  const isSubtle = bg === "subtle";
  const sectionPadding = "py-20 md:py-28 lg:py-32";
  const contentWidth = narrow ? "max-w-3xl" : "max-w-6xl";
  const contentPadding = "px-4 md:px-6";

  return (
    <section
      id={id}
      className={cn(
        "relative",
        isSubtle ? "bg-transparent text-foreground" : cn(sectionPadding, bgClasses[bg]),
        className
      )}
    >
      {/* Subtle top accent on alt sections */}
      {bg === "alt" && (
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent"
          aria-hidden="true"
        />
      )}

      {/* Navy sections get noise texture */}
      {(bg === "navy" || bg === "dark") && (
        <div className="noise-overlay pointer-events-none absolute inset-0" aria-hidden="true" />
      )}

      {/* Subtle: Hintergrund füllt volle Beam-Breite (max-w-6xl); Inhalt mit Padding innen */}
      {isSubtle ? (
        <div className={cn("relative mx-auto", contentWidth)}>
          <div className="relative">
            <div className="absolute inset-0 bg-white/[0.015]" aria-hidden />
            <div className={cn("relative z-10", contentPadding, sectionPadding)}>
              {children}
            </div>
          </div>
        </div>
      ) : (
        <div
          className={cn(
            "relative mx-auto",
            contentPadding,
            contentWidth
          )}
        >
          {children}
        </div>
      )}
    </section>
  );
}
