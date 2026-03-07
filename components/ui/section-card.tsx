"use client";

import { cn } from "@/lib/utils";
import { TechCorners } from "@/components/ui/tech-corners";
import { CONTAINER_A, CONTAINER_B_STATIC } from "@/lib/container-styles";

/**
 * SectionCard – einheitliche Karten für Sektionen (V1 Design-System).
 * Nutzt Container-Typ A (default) und B (highlight).
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
    card: CONTAINER_A,
    cornersSize: "md" as const,
  },
  highlight: {
    card: CONTAINER_B_STATIC,
    cornersSize: "lg" as const,
  },
  minimal: {
    card: "border border-white/10 bg-transparent transition-all hover:border-brand-cyan/20 card-hover-glow",
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
      className={cn("group relative overflow-hidden", styles.card, className)}
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
