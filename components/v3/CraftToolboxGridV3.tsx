"use client";

// V3 CHANGES (vs CraftToolboxGridV2):
// - Port von V2 (Dual-Layer-Naming bereits fertig)
// - TechCorners nur auf erster Card (Ankerpunkt-Hierarchie, wie V2)

import Link from "next/link";
import {
  IconMapPin,
  IconPhoneCall,
  IconStar,
  IconChartBar,
} from "@tabler/icons-react";
import { TechCorners } from "@/components/ui/tech-corners";
import { Button } from "@/components/ui/button";
import { IconArrowRight } from "@tabler/icons-react";

const CRAFT_ICON_MAP = {
  IconMapPin,
  IconPhoneCall,
  IconStar,
  IconChartBar,
} as const;

const CRAFT_V3_MODULES = [
  {
    brandLabel: "GEO-NET · STANDORT-NETZ",
    benefitHeadline: "LOKAL GEFUNDEN WERDEN",
    description:
      "50+ lokale Landingpages bringen Ihren Betrieb bei Google nach vorne — für jeden Ort, den Sie bedienen.",
    icon: "IconMapPin" as const,
  },
  {
    brandLabel: "KI-TELEFON 24/7",
    benefitHeadline: "KEIN ANRUF MEHR VERPASST",
    description:
      "Ein trainierter KI-Assistent nimmt Anrufe an, wenn Sie auf der Baustelle sind. Name, Anliegen, Rückruf — alles gesichert.",
    icon: "IconPhoneCall" as const,
  },
  {
    brandLabel: "REVIEW-RADAR",
    benefitHeadline: "MEHR 5-STERNE BEWERTUNGEN",
    description:
      "Automatisiertes System, das zufriedene Kunden gezielt um eine Bewertung bittet — weniger Aufwand, mehr Sterne.",
    icon: "IconStar" as const,
  },
  {
    brandLabel: "LIVE-DASHBOARD",
    benefitHeadline: "IMMER DEN ÜBERBLICK",
    description:
      "Echtzeit-Einblick in Website-Besucher, eingegangene Anrufe und aktuelle Bewertungen — alles auf einen Blick.",
    icon: "IconChartBar" as const,
  },
] as const;

export function CraftToolboxGridV3() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {CRAFT_V3_MODULES.map((module, i) => {
        const Icon = CRAFT_ICON_MAP[module.icon];
        const isFirst = i === 0;

        return (
          <div
            key={module.brandLabel}
            data-animate="fade-up"
            data-animate-delay={String(i * 80)}
            className="group relative flex flex-col border border-white/10 bg-brand-navy/60 backdrop-blur-md overflow-hidden transition-all hover:bg-brand-navy/80 hover:border-white/20"
          >
            {/* V3: TechCorners nur auf der ersten Karte */}
            {isFirst && (
              <TechCorners pattern="diagonal" variant="cyan" size="lg" />
            )}

            {/* Header: Icon + Brand-Label */}
            <div className="border-b border-white/5 p-6 flex items-center gap-4 relative z-10">
              {Icon && (
                <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-white/10 border border-white group-hover:border-brand-cyan transition-colors">
                  <Icon className="size-6 text-white/60 group-hover:text-brand-cyan transition-colors" stroke={1.5} />
                </div>
              )}
              <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">
                {module.brandLabel}
              </span>
            </div>

            {/* Body: Nutzen-Headline + Erklärung */}
            <div className="p-6 flex flex-col grow relative z-10">
              <h3 className="font-display text-xl font-extrabold uppercase tracking-tight text-white leading-tight mb-3">
                {module.benefitHeadline}
              </h3>
              <p className="text-[0.9375rem] leading-relaxed text-white/70">
                {module.description}
              </p>
            </div>

            {/* Footer: CTA */}
            <div className="mt-auto p-6 pt-0 relative z-10">
              <Button
                asChild
                variant="ghost"
                className="w-full justify-between text-brand-navy-muted hover:text-brand-cyan hover:bg-transparent px-0 uppercase tracking-widest text-xs"
              >
                <Link href="/kontakt">
                  Jetzt anfragen <IconArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
