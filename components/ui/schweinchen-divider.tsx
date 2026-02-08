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
        "pointer-events-none relative h-12 w-full md:h-16",
        className
      )}
      aria-hidden="true"
    >
      {/* Wellen auf Beam-Breite begrenzt (max-w-6xl wie restliche Inhalte) */}
      <div className="mx-auto max-w-6xl px-4 md:px-6 h-full overflow-hidden">
        <div
          className={cn(
            "relative h-full w-full overflow-hidden",
            flip && "rotate-180"
          )}
        >
          <svg
            viewBox="0 0 1200 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="schwein-wave-svg absolute inset-0 h-full w-full"
            preserveAspectRatio="none"
          >
            <path
              d="M0 80 C200 80 250 20 400 30 C550 40 580 60 700 50 C820 40 900 15 1000 25 C1100 35 1150 60 1200 50 L1200 80 Z"
              fill="rgba(3, 249, 249, 0.08)"
            />
            <path
              d="M0 70 C200 70 250 20 400 30 C550 40 580 55 700 45 C820 35 900 15 1000 25 C1100 35 1150 55 1200 45"
              stroke="rgba(3, 249, 249, 0.35)"
              strokeWidth="1.5"
              fill="none"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
