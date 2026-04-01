import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Visitenkarten A4 Vergleich",
  description: "Physischer Größenvergleich der Visitenkarten auf einem A4-Blatt.",
};

const CARD_BLEED_W_MM = 91; // 85 mm trim + 3 mm bleed links/rechts
const CARD_BLEED_H_MM = 61; // 55 mm trim + 3 mm bleed oben/unten
const CARD_TRIM_W_MM = 85;
const CARD_TRIM_H_MM = 55;
const SAFE_INSET_MM = 3;

function CardSizeDummy({ label }: { label: string }) {
  return (
    <div
      className="relative border border-[#2c3b76] bg-[#283569] shadow-[0_8px_24px_rgba(0,0,0,0.25)]"
      style={{ width: `${CARD_BLEED_W_MM}mm`, height: `${CARD_BLEED_H_MM}mm` }}
    >
      <div
        className="absolute border border-dashed border-white/55"
        style={{ inset: "3mm" }}
        aria-hidden
      />
      <div
        className="absolute border border-dashed border-[#03f9f9]/60"
        style={{ inset: `${3 + SAFE_INSET_MM}mm` }}
        aria-hidden
      />
      <div className="absolute left-[4mm] top-[4mm] font-mono text-[9px] uppercase tracking-[0.12em] text-white/80">
        {label}
      </div>
      <div className="absolute bottom-[4mm] right-[4mm] font-mono text-[8px] uppercase tracking-[0.1em] text-[#03f9f9]">
        91 x 61 mm (inkl. Beschnitt)
      </div>
    </div>
  );
}

export default function VisitenkartenA4VergleichPage() {
  return (
    <main className="min-h-screen bg-[#0b0f19] p-6 text-white md:p-10">
      <div className="mx-auto max-w-[1200px]">
        <h1 className="font-display text-[34px] font-extrabold uppercase tracking-[0.04em] text-[#03f9f9]">
          Visitenkarten auf A4 Vergleich
        </h1>
        <p className="mt-2 font-sans text-[16px] text-white/85">
          Diese Ansicht nutzt echte mm-Einheiten. Für korrekten Größenvergleich Browser-Zoom auf 100% stellen.
        </p>
        <p className="mt-1 font-mono text-[12px] uppercase tracking-[0.08em] text-white/60">
          A4: 210 x 297 mm · Karte: 91 x 61 mm inkl. 3 mm Beschnitt · Trim: 85 x 55 mm
        </p>

        <section className="mt-8 overflow-auto rounded-sm border border-white/20 bg-[#11182d] p-5">
          <div
            className="relative mx-auto bg-white"
            style={{
              width: "210mm",
              height: "297mm",
              boxShadow: "0 24px 80px rgba(0,0,0,0.35)",
            }}
          >
            <div className="absolute left-[10mm] top-[10mm] font-mono text-[10px] uppercase tracking-[0.1em] text-black/70">
              A4 Blatt (210 x 297 mm)
            </div>

            <div className="absolute left-[20mm] top-[24mm] flex gap-[8mm]">
              <CardSizeDummy label="Vorderseite Größe" />
              <CardSizeDummy label="Rückseite Größe" />
            </div>

            <div className="absolute left-[20mm] top-[95mm] font-mono text-[9px] uppercase tracking-[0.08em] text-black/70">
              Kalibrierung (soll auf echtem Lineal 100 mm messen)
            </div>
            <div className="absolute left-[20mm] top-[101mm] h-[0.6mm] bg-black" style={{ width: "100mm" }} />
            <div className="absolute left-[20mm] top-[103mm] font-mono text-[9px] text-black/75">0 mm</div>
            <div className="absolute left-[120mm] top-[103mm] -translate-x-full font-mono text-[9px] text-black/75">
              100 mm
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
