/**
 * SchweinDivider – Organische Wellenform inspiriert von der Schweinchen-Maskottchen-Silhouette.
 * Schafft einen sanften Kontrast zum brutalistischen Stil.
 * Die Kurve reflektiert die runden, lebendigen Formen des Maskottchens.
 */

import { cn } from "@/lib/utils";

interface SchweinDividerProps {
  flip?: boolean;
  className?: string;
}

export function SchweinDivider({ flip = false, className }: SchweinDividerProps) {
  return (
    <div
      className={cn(
        "pointer-events-none relative h-12 w-full overflow-hidden md:h-16",
        flip && "rotate-180",
        className
      )}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1200 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="none"
      >
        {/* Organic curve inspired by Schweinchen body silhouette */}
        <path
          d="M0 80 C200 80 250 20 400 30 C550 40 580 60 700 50 C820 40 900 15 1000 25 C1100 35 1150 60 1200 50 L1200 80 Z"
          fill="rgba(3, 249, 249, 0.03)"
        />
        {/* Thin accent line following the organic curve */}
        <path
          d="M0 70 C200 70 250 20 400 30 C550 40 580 55 700 45 C820 35 900 15 1000 25 C1100 35 1150 55 1200 45"
          stroke="rgba(3, 249, 249, 0.1)"
          strokeWidth="1"
          fill="none"
        />
      </svg>
    </div>
  );
}
