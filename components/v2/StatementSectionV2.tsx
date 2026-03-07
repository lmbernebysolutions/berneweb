// V2 CHANGES (Empfehlung 5 — Section Archetypes, System A):
//
// Statement-Section (Option A):
//   Kein Card-Wrapper. Reine Typografie + linke Akzentlinie.
//   Verwendet für Vision/Mission (Über-uns-Kontext) auf home-v2 als Preview.
//
// Regeln:
//   - border-l-4 border-white/20 als einzige strukturelle Stütze
//   - Kein bg-*, kein border-Box
//   - Überschrift: font-display uppercase tracking-tight
//   - Body: text-white/70 leading-relaxed
//   - System A: kein Cyan → der linke Balken ist white/20 (strukturell, nicht signal)

interface StatementItem {
  label: string;
  headline: string;
  body: string;
}

interface StatementSectionV2Props {
  items: StatementItem[];
}

export function StatementSectionV2({ items }: StatementSectionV2Props) {
  return (
    <div
      data-animate="fade-up"
      className="grid gap-10 sm:gap-14 md:grid-cols-2"
    >
      {items.map((item) => (
        <div key={item.label} className="pl-6 border-l-4 border-white">
          {/* Label — mono, tertiär */}
          <span className="block font-mono text-[10px] uppercase tracking-widest text-white/40 mb-3">
            {item.label}
          </span>

          {/* Headline — Display, primäre Botschaft */}
          <h3 className="font-display text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-white leading-tight mb-4">
            {item.headline}
          </h3>

          {/* Body */}
          <p className="text-base text-white/70 leading-relaxed">
            {item.body}
          </p>
        </div>
      ))}
    </div>
  );
}
