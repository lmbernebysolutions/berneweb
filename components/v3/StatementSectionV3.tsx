// V3 CHANGES (vs StatementSectionV2):
// - border-l-4 border-white beibehalten (strukturell, kein Cyan)
// - onLight Prop: bei true → text-brand-navy/heading/body (für Über-uns hell-Abschnitte)
// - label-Text: bei onLight → text-brand-navy/30

interface StatementItem {
  label: string;
  headline: string;
  body: string;
}

interface StatementSectionV3Props {
  items: readonly StatementItem[];
  onLight?: boolean;
}

export function StatementSectionV3({ items, onLight = false }: StatementSectionV3Props) {
  return (
    <div
      data-animate="fade-up"
      className="grid gap-10 sm:gap-14 md:grid-cols-2"
    >
      {items.map((item) => (
        <div
          key={item.label}
          className={`pl-6 border-l-4 ${onLight ? "border-brand-navy/30" : "border-white/10"}`}
        >
          {/* Label — mono, tertiär */}
          <span
            className={`block font-mono text-[10px] uppercase tracking-widest mb-3 ${
              onLight ? "text-brand-navy/40" : "text-white/40"
            }`}
          >
            {item.label}
          </span>

          {/* Headline — Display, primäre Botschaft */}
          <h3
            className={`font-display text-2xl sm:text-3xl font-extrabold uppercase tracking-tight leading-tight mb-4 ${
              onLight ? "text-brand-navy" : "text-white"
            }`}
          >
            {item.headline}
          </h3>

          {/* Body */}
          <p
            className={`text-base leading-relaxed ${
              onLight ? "text-brand-navy/70" : "text-white/70"
            }`}
          >
            {item.body}
          </p>
        </div>
      ))}
    </div>
  );
}
