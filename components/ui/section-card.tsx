"use client";

import { cn } from "@/lib/utils";
import { TechCorners } from "@/components/ui/tech-corners";

/**
 * SectionCard – einheitliche Karten für Sektionen (V1 Design-System).
 * Immer TechCorners, keine manuellen Ecken. Feste Token pro Variante.
 *
 * Token-Matrix (V3):
 * - default:  border-white/10 + bg-white/[0.03], TechCorners diagonal md
 * - highlight: border-brand-cyan/30 + bg-brand-navy/60, TechCorners diagonal lg
 * - minimal:   border-white/10 + bg-transparent, TechCorners diagonal sm
 */
interface SectionCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "highlight" | "minimal";
  /** TechCorners pattern */
  cornersPattern?: "diagonal" | "all";
  /** Optional: group name for hover (e.g. "faq") */
  cornersGroupName?: string;
  /** Hover: show all 4 corners (diagonal only) */
  cornersHoverExpand?: boolean;
  /** Animate corners drawing on */
  cornersAnimate?: boolean;
}

const variantStyles = {
  default: {
    card: "border border-white/10 bg-white/[0.03]",
    cornersSize: "md" as const,
  },
  highlight: {
    card: "border border-brand-cyan/30 bg-brand-navy/60 backdrop-blur-md",
    cornersSize: "lg" as const,
  },
  minimal: {
    card: "border border-white/10 bg-transparent",
    cornersSize: "sm" as const,
  },
};

export function SectionCard({
  variant = "default",
  cornersPattern = "diagonal",
  cornersGroupName,
  cornersHoverExpand = true,
  cornersAnimate = false,
  className,
  children,
  ...props
}: SectionCardProps) {
  const styles = variantStyles[variant];
  return (
    <div
      className={cn("group relative overflow-hidden transition-all card-hover-glow", styles.card, className)}
      {...props}
    >
      <TechCorners
        pattern={cornersPattern}
        variant="cyan"
        size={styles.cornersSize}
        hoverExpand={cornersHoverExpand}
        groupName={cornersGroupName}
        animate={cornersAnimate}
      />
      {children}
    </div>
  );
}
