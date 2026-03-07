import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TechCorners } from "@/components/ui/tech-corners";
import { TWO_PILLARS } from "@/lib/constants";
import { IconHammer, IconDeviceDesktop } from "@tabler/icons-react";

// V2 CHANGES (Empfehlung 3 — Card-System + Empfehlung 4 — Icon-Container):
//
// Icon Container:
//   ALT: bg-brand-navy shadow-[4px_4px_0_0_rgba(3,249,249,0.2)]
//   NEU: bg-white/[0.04] border border-white/10 → hover: border-brand-cyan/20
//   → Icon selbst in text-white/60 → text-brand-cyan on hover
//
// Card Hover (V2 Standard-Pattern highlight-Variante):
//   border-brand-cyan/30 bg-brand-navy/60 → hover:border-brand-cyan/30 card-hover-glow
//   Basis: border-white/10 (kein static ambient cyan auf border)
//
// List Bullet:
//   ALT: bg-brand-cyan (ambient cyan ohne interaction-kontext)
//   NEU: bg-white/40 (neutral, strukturell)
//
// TechCorners: BEHALTEN — Zwei-Welten-Karten = SIGNIFIKANT-Level (Haupt-Einstiegspunkte)
// Outline Button Second Card: entfernt border-brand-cyan, jetzt border-white/20

export function ZweiWeltenCardsV2() {
  return (
    <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:gap-12">
      {/* Handwerk */}
      <div
        data-animate="fade-left"
        className="group relative flex flex-col overflow-hidden border border-white bg-brand-navy/60 backdrop-blur-md p-6 sm:p-8 transition-all hover:border-brand-cyan/20 card-hover-glow"
      >
        <TechCorners pattern="diagonal" variant="cyan" size="lg" animate />

        {/* V2: Icon Container — bg-white/[0.04] border border-white/10 */}
        <div
          className="mb-6 flex h-12 w-12 items-center justify-center bg-white/10 border border-white group-hover:border-brand-cyan transition-colors"
          aria-hidden="true"
        >
          <IconHammer className="size-6 text-white/60 group-hover:text-brand-cyan transition-colors" stroke={1.5} />
        </div>

        <h3 className="text-2xl text-white mb-2">{TWO_PILLARS.handwerk.title}</h3>
        <p className="text-white/60 mb-6 leading-relaxed">{TWO_PILLARS.handwerk.description}</p>

        <ul className="space-y-3 mb-8 grow">
          {TWO_PILLARS.handwerk.features.map((f) => (
            <li key={f} className="flex items-center gap-3 text-sm text-white/80">
              {/* V2: bullet bg-white/40 statt bg-brand-cyan */}
              <span className="w-1.5 h-1.5 bg-white/40 shrink-0" />
              {f}
            </li>
          ))}
        </ul>

        <div className="space-y-3">
          <Button asChild className="w-full">
            <Link href={TWO_PILLARS.handwerk.cta.href}>{TWO_PILLARS.handwerk.cta.label}</Link>
          </Button>
          <p className="text-xs text-brand-navy-muted">
            <Link href="/ratgeber/digitalisierung-handwerk" className="hover:text-brand-cyan transition-colors">
              Ratgeber: Digitalisierung im Handwerk →
            </Link>
          </p>
        </div>
      </div>

      {/* General Tech */}
      <div
        data-animate="fade-right"
        className="group relative flex flex-col overflow-hidden border border-white bg-brand-navy/60 backdrop-blur-md p-6 sm:p-8 transition-all hover:border-brand-cyan/20 card-hover-glow"
      >
        <TechCorners pattern="diagonal" variant="cyan" size="lg" animate />

        {/* V2: Icon Container */}
        <div
          className="mb-6 flex h-12 w-12 items-center justify-center bg-white/10 border border-white group-hover:border-brand-cyan transition-colors"
          aria-hidden="true"
        >
          <IconDeviceDesktop className="size-6 text-white/60 group-hover:text-brand-cyan transition-colors" stroke={1.5} />
        </div>

        <h3 className="text-2xl text-white mb-2">{TWO_PILLARS.general.title}</h3>
        <p className="text-white/60 mb-6 leading-relaxed">{TWO_PILLARS.general.description}</p>

        <ul className="space-y-3 mb-8 grow">
          {TWO_PILLARS.general.features.map((f) => (
            <li key={f} className="flex items-center gap-3 text-sm text-white/80">
              <span className="w-1.5 h-1.5 bg-white/40 shrink-0" />
              {f}
            </li>
          ))}
        </ul>

        <div className="space-y-3">
          {/* V2: Outline button mit white/20 statt border-brand-cyan als static state */}
          <Button
            asChild
            variant="outline"
            className="w-full border-white text-white hover:border-brand-cyan hover:text-brand-cyan hover:bg-brand-cyan/5"
          >
            <Link href={TWO_PILLARS.general.cta.href}>{TWO_PILLARS.general.cta.label}</Link>
          </Button>
          <p className="text-xs text-brand-navy-muted">
            <Link href="/ratgeber/microsoft-365-fuer-handwerker" className="hover:text-brand-cyan transition-colors">
              Microsoft 365 für Ihren Betrieb →
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
