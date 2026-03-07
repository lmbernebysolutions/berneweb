"use client";

// V2 CHANGES (System C + G):
// - "STATUS_OFFLINE" badge → entfernt (Ohne-Uns Panel)
// - "SYSTEM_ONLINE" badge → entfernt (Mit-Uns Panel)
// - "BOOST: ${item.gain}" → "↑ ${item.gain}" (kein Gaming-Vokabular)
// - "PROBLEM: ${item.risk}" → einfacher Risiko-Indicator mit Dash
// - animate-pulse Dot auf Mit-Uns-Reihe: entfernt (zu Gaming-artig)
// - Structurelle TechCorners auf dem Mit-Uns-Panel: BEHALTEN (semantisch: "selected" state)
// - TechCorners auf Ohne-Uns: entfernt (kein Signal-Wert auf dem "Problem"-Panel)

import { IconCheck, IconX } from "@tabler/icons-react";
import { TechCorners } from "@/components/ui/tech-corners";
import { OHNE_UNS_ROWS, MIT_UNS_ROWS } from "@/lib/constants";

export function ComparisonSectionV2() {
  return (
    <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:gap-12">
      {/* OHNE UNS — Problem-Panel */}
      <div
        className="group relative border-2 border-white/5 bg-black/30 p-6 sm:p-8 backdrop-blur-sm overflow-hidden transition-colors hover:border-white/10"
        data-animate="fade-left"
      >
        {/* V2: kein TechCorners auf dem Problem-Panel */}
        {/* Diagonal stripe: subtile "warning"-Textur bleibt, ist nicht Gaming-spezifisch */}
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.03) 10px, rgba(255,255,255,0.03) 20px)",
          }}
        />

        {/* V2: "STATUS_OFFLINE" Badge entfernt */}

        <div className="mb-10 flex items-center justify-between relative z-10">
          <h3 className="text-3xl font-bold uppercase tracking-tighter text-white/60">Ohne Uns</h3>
          <div className="flex h-10 w-10 items-center justify-center border-2 border-white/20 bg-white/5">
            <IconX className="size-6 text-white/40" stroke={3} />
          </div>
        </div>

        <div className="space-y-4 relative z-10">
          {OHNE_UNS_ROWS.map((item) => (
            <div key={item.label} className="border-l-2 border-white/10 bg-white/[0.02] p-4">
              <div className="flex justify-between font-mono text-[10px] uppercase tracking-widest text-white/30">
                <span>{item.label}</span>
                {/* V2: "PROBLEM: Hoch" → "— Hoch" (kein HUD-Vokabular) */}
                <span className="text-white/20">— {item.risk}</span>
              </div>
              <p className="mt-1 font-medium text-brand-navy-muted">{item.val}</p>
            </div>
          ))}
        </div>
      </div>

      {/* MIT UNS — Solution-Panel */}
      <div
        className="group relative border-2 border-brand-cyan/30 bg-brand-cyan/5 p-6 sm:p-8 backdrop-blur-sm shadow-[0_0_60px_rgba(3,249,249,0.15)] overflow-hidden transition-all hover:shadow-[0_0_80px_rgba(3,249,249,0.25)] hover:border-brand-cyan/50"
        data-animate="fade-right"
      >
        {/* V2: TechCorners BEHALTEN — semantisches "selected/active" Signal auf dem Mit-Uns-Panel ist gerechtfertigt */}
        <TechCorners pattern="all" variant="cyan" size="lg" animate />

        {/* Grid background: bleibt als subtile Strukturtextur */}
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(3,249,249,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(3,249,249,0.1) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />

        {/* V2: "SYSTEM_ONLINE" Badge entfernt */}

        <div className="mb-10 flex items-center justify-between relative z-10">
          <h3 className="text-3xl font-bold uppercase tracking-tighter text-brand-cyan drop-shadow-[0_0_10px_rgba(3,249,249,0.5)]">
            Mit Uns
          </h3>
          <div
            className="flex h-10 w-10 items-center justify-center border-2 border-brand-cyan bg-brand-cyan/20 shadow-[0_0_20px_rgba(3,249,249,0.4)]"
            aria-hidden="true"
          >
            <IconCheck className="size-6 text-brand-cyan" stroke={3} />
          </div>
        </div>

        <div className="space-y-4 relative z-10">
          {MIT_UNS_ROWS.map((item) => (
            <div key={item.label} className="relative border-l-2 border-brand-cyan bg-brand-cyan/10 p-4">
              <div className="flex justify-between font-mono text-[10px] uppercase tracking-widest text-brand-cyan">
                <span>{item.label}</span>
                {/* V2: "BOOST: +300%" → "↑ +300%" */}
                <span>↑ {item.gain}</span>
              </div>
              <p className="mt-1 font-bold text-white">{item.val}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
