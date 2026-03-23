import { IconArrowDown } from "@tabler/icons-react";

export function FacebookCoverContent() {
  return (
    <>
      {/* Value Proposition */}
      <div className="w-full">
        {/* Safe-Zone: left/right = 220px, Beams: left/right = 132px -> Headline startet bewusst bei ~132px (Beam-Overlap wie im Home-Hero) */}
        <h1 className="ml-[-88px] font-display text-[120px] font-extrabold uppercase leading-[0.9] tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.25)] max-w-[1320px]">
          MEHR AUFTRAEGE.
          <br />
          <span className="text-brand-cyan">WENIGER STRESS.</span>
        </h1>
      </div>

      {/* Job-to-be-done */}
      <p className="mt-5 max-w-[1040px] border-l-2 border-white/25 pl-6 text-[36px] font-medium leading-relaxed text-blue-100">
        Webseiten, SEO und KI-Telefon fangen Anfragen sauber ab, damit du wieder Zeit fürs Kerngeschäft hast.
      </p>

      {/* Trust signal */}
      <div className="mt-8 inline-flex w-fit items-center border border-brand-cyan/35 bg-brand-cyan/10 px-5 py-2">
        <span className="font-mono text-[15px] font-bold uppercase tracking-[0.16em] text-brand-cyan">
          Partner fuer den regionalen Mittelstand im Erzgebirge
        </span>
      </div>

      {/* Directional cue (no fake CTA) */}
      <div className="mt-auto flex w-full items-end justify-center">
        <div className="flex items-center gap-3 border-b border-brand-cyan/35 pb-2">
          <span className="font-mono text-[14px] font-semibold uppercase tracking-[0.14em] text-brand-navy-muted">
            Nachricht senden unter dem Cover
          </span>
          <IconArrowDown className="size-5 text-brand-cyan" stroke={2.5} />
        </div>
      </div>
    </>
  );
}
