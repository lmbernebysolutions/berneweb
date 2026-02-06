import { cn } from "@/lib/utils";

interface SectionProps {
  children: React.ReactNode;
  bg?: "white" | "alt" | "dark" | "navy" | "transparent";
  narrow?: boolean;
  id?: string;
  className?: string;
}

const bgClasses: Record<NonNullable<SectionProps["bg"]>, string> = {
  white: "bg-background text-foreground",
  alt: "bg-section-alt text-foreground",
  dark: "bg-brand-navy text-brand-navy-foreground",
  navy: "bg-brand-navy text-brand-navy-foreground",
  transparent: "bg-transparent text-foreground", // Let the global grid show
};

export function Section({
  children,
  bg = "white",
  narrow,
  id,
  className,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative py-20 md:py-28 lg:py-32",
        bgClasses[bg],
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

      <div
        className={cn(
          "relative mx-auto px-4 md:px-6",
          narrow ? "max-w-3xl" : "max-w-6xl"
        )}
      >
        {children}
      </div>
    </section>
  );
}
