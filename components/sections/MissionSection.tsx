"use client";

import { SectionCard } from "@/components/ui/section-card";
import { IconDeviceDesktop, IconTool, IconHeart } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

/** Variante A: Drei Säulen (Webseiten | Support | Fair) – Text-Layout wie Vision & Mission, kein Karten-Container */
function MissionVariantA() {
  const pillars = [
    {
      icon: IconDeviceDesktop,
      title: "Webseiten & Shops",
      text: "Von der One-Page bis zum Shop – wir bauen, was Sie brauchen.",
    },
    {
      icon: IconTool,
      title: "Support auf Abruf",
      text: "Kein Festvertrag. Sie zahlen, wenn Sie uns brauchen.",
    },
    {
      icon: IconHeart,
      title: "Transparent & fair",
      text: "Feste Preise, klare Angebote. Kein Kleingedrucktes.",
    },
  ];
  return (
    <div
      className="grid grid-cols-1 gap-10 sm:gap-14 md:grid-cols-3 md:gap-0"
      data-animate="fade-up"
    >
      {pillars.map((p, i) => {
        const Icon = p.icon;
        return (
          <div
            key={p.title}
            className={cn(
              "flex flex-col items-center border-l-4 border-white/10 pl-6 text-center",
              /* Ab md: links kein Strich – nur zwei Trenner zwischen den drei Spalten */
              "md:border-l-0 md:pl-0 md:px-8 lg:px-10",
              i > 0 && "md:border-l-4 md:border-white/10"
            )}
          >
            <Icon className="mb-3 size-5 text-brand-cyan" stroke={1.5} aria-hidden="true" />
            <div className="mb-2 flex min-h-[3.25rem] w-full max-w-prose items-center justify-center sm:min-h-[4rem]">
              <h3 className="font-display text-xl font-extrabold uppercase tracking-tight text-white sm:text-2xl">
                {p.title}
              </h3>
            </div>
            <p className="max-w-prose text-sm leading-relaxed text-white/70">{p.text}</p>
          </div>
        );
      })}
    </div>
  );
}

/** Variante B: Zwei Spalten „Was wir tun“ / „Was wir nicht tun“ */
function MissionVariantB() {
  return (
    <SectionCard variant="highlight" className="p-6 md:p-8">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="relative z-10">
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-brand-cyan mb-3">
            Was wir tun
          </h3>
          <ul className="space-y-2 text-sm text-white/80">
            {[
              "Webseiten und Shops planen und umsetzen",
              "IT-Support und Beratung auf Abruf",
              "Klare Preise, keine versteckten Kosten",
              "Aus dem Erzgebirge, für die Region",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-cyan" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="relative z-10">
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-brand-cyan/80 mb-3">
            Was wir nicht tun
          </h3>
          <ul className="space-y-2 text-sm text-brand-navy-muted">
            {[
              "Keine langen Mindestlaufzeiten",
              "Kein generisches Bla-Bla",
              "Keine Festanstellung nötig",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full border border-white/30" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SectionCard>
  );
}

/** Variante C: Ein Statement + drei Check-Zeilen */
function MissionVariantC() {
  const points = [
    "Webseiten, Shops und IT-Support – alles aus einer Hand.",
    "Flexibel buchen, fair bezahlen. Kein Kleingedrucktes.",
    "Ihr digitaler Hausmeister im Erzgebirge.",
  ];
  return (
    <SectionCard variant="highlight" className="p-6 md:p-8">
      <p className="relative z-10 text-lg font-semibold leading-relaxed text-white md:text-xl">
        Wir lösen digitale Probleme. Ohne Systemhaus-Gebühren, ohne Wartezeiten.
      </p>
      <ul className="relative z-10 mt-6 space-y-3 border-t border-white/10 pt-6">
        {points.map((item, i) => (
          <li key={i} className="flex items-center gap-3 text-sm text-white/80">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded border border-brand-cyan/50 bg-brand-cyan/10 text-brand-cyan">
              ✓
            </span>
            {item}
          </li>
        ))}
      </ul>
    </SectionCard>
  );
}

export type MissionVariant = "a" | "b" | "c";

interface MissionSectionProps {
  variant?: MissionVariant;
}

export function MissionSection({ variant = "a" }: MissionSectionProps) {
  return (
    <>
      {variant === "a" && <MissionVariantA />}
      {variant === "b" && <MissionVariantB />}
      {variant === "c" && <MissionVariantC />}
    </>
  );
}
