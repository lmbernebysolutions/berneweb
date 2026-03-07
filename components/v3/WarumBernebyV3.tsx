// V3 CHANGES (vs ueber-uns/page.tsx inline):
// - Horizontales Layout mit border-l-4 wie StatementSectionV3 (gleiche Farbe + Dicke)
// - onLight: bei true → text-brand-navy (heller Hintergrund), bei false → text-white (dunkler Hintergrund)
// - Texte und Überschriften wie zuvor linksbündig (nicht zentriert)

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
  const borderClass = onLight ? "border-brand-navy/30" : "border-white";
  return (
    <div className="flex flex-col sm:flex-row">
      {items.map((item, i) => (
        <div
          key={item.point}
          data-animate="fade-up"
          data-animate-delay={String(i * 80)}
          className={`flex-1 py-6 px-6 sm:py-8 ${
            i === 0
              ? ""
              : `border-t-4 sm:border-t-0 sm:border-l-4 sm:pl-6 ${borderClass}`
          }`}
        >
          <p
            className={`font-bold uppercase tracking-tight text-base mb-2 ${
              onLight ? "text-brand-navy" : "text-white"
            }`}
          >
            {item.point}
          </p>
          <p
            className={`text-sm leading-relaxed ${
              onLight ? "text-brand-navy/70" : "text-white/70"
            }`}
          >
            {item.detail}
          </p>
        </div>
      ))}
    </div>
  );
}
