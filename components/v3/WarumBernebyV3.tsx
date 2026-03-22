// V3 CHANGES (vs ueber-uns/page.tsx inline):
// - Grid + divide-*: gleiche Innenabstände, keine versetzten Top-Borders (Mobile)
// - Überschriften: gemeinsame Mindesthöhe → Fließtext startet auf einer Linie
// - Text zentriert; Überschrift im Kopf-Feld vertikal/horizontal zentriert (weniger „Leerraum“)
// - onLight: bei true → text-brand-navy (heller Hintergrund), bei false → text-white (dunkler Hintergrund)

import { cn } from "@/lib/utils";

interface WarumBernebyItem {
  point: string;
  detail: string;
}

interface WarumBernebyV3Props {
  items: readonly WarumBernebyItem[];
  /** Bei false (Standard): weiße Typo auf dunklem Hintergrund (wie Vision/Mission) */
  onLight?: boolean;
}

export function WarumBernebyV3({ items, onLight = false }: WarumBernebyV3Props) {
  const divideClass = onLight ? "divide-brand-navy/30" : "divide-white/10";
  const n = items.length;

  /** Volle Breite: z. B. 3 Garantien = 3 Spalten ab md, nicht 4 Spalten mit leerer rechts */
  const gridCols = cn(
    "grid grid-cols-1 gap-0",
    n === 3 && "md:grid-cols-3",
    n === 4 && "sm:grid-cols-2 lg:grid-cols-4",
    n === 2 && "sm:grid-cols-2",
    n === 1 && "max-w-xl mx-auto w-full"
  );

  const gridDividers = cn(
    "divide-y-4",
    n === 3 ? "md:divide-y-0 md:divide-x-4" : "sm:divide-y-0 sm:divide-x-4",
    divideClass
  );

  return (
    <div className={cn(gridCols, gridDividers)}>
      {items.map((item, i) => (
        <div
          key={item.point}
          data-animate="fade-up"
          data-animate-delay={String(i * 80)}
          className="flex min-h-0 min-w-0 flex-col items-center px-6 py-6 text-center sm:px-6 sm:py-8 lg:px-7"
        >
          {/* Einheitliche Kopfzeile: gleiche Mindesthöhe; Inhalt darin zentriert */}
          <div className="mb-2 flex min-h-[3.25rem] w-full items-center justify-center sm:min-h-[3.5rem]">
            <p
              className={cn(
                "font-bold uppercase tracking-tight text-base leading-snug",
                onLight ? "text-brand-navy" : "text-white"
              )}
            >
              {item.point}
            </p>
          </div>
          <p
            className={cn(
              "w-full max-w-prose text-sm leading-relaxed",
              onLight ? "text-brand-navy/70" : "text-white/70"
            )}
          >
            {item.detail}
          </p>
        </div>
      ))}
    </div>
  );
}
