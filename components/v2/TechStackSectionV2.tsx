// V2 CHANGES (System F — Data-Section mit Kundennutzen):
// Jede Technologie zeigt neben dem Namen eine einzeilige Nutzen-Aussage
// für den Kunden (Ü40 KMU-Inhaber). Layout: Icon + Name + Nutzen.
// TechCorners entfernt (System B: KEINS für TechStack-Chips).
// Cyan nur noch via hover-Effekt (System A).

import {
  IconBrandNextjs,
  IconBrandReact,
  IconBrandWindows,
  IconSearch,
  IconRobot,
  IconBrandAdobe,
} from "@tabler/icons-react";
import { CursorLogo } from "@/components/ui/cursor-logo";

// Nutzen-Aussagen pro Technologie (Dual-Layer: Technik + Kundennutzen)
const TECH_ITEMS = [
  {
    name: "Next.js",
    benefit: "Blitzschnelle Ladezeiten — Google honoriert das",
    Icon: IconBrandNextjs,
  },
  {
    name: "React",
    benefit: "Moderne Oberflächen, die auf jedem Gerät funktionieren",
    Icon: IconBrandReact,
  },
  {
    name: "Cursor",
    benefit: "Schnellere Entwicklung dank AI-Unterstützung im Code-Editor",
    Icon: CursorLogo,
  },
  {
    name: "Microsoft 365",
    benefit: "E-Mail und Büro sauber eingerichtet, kein IT-Chaos",
    Icon: IconBrandWindows,
  },
  {
    name: "Adobe",
    benefit: "Markenstarkes Design mit der Creative Cloud umgesetzt",
    Icon: IconBrandAdobe,
  },
  {
    name: "KI-Integration",
    benefit: "Automatisierungen, die Zeit sparen und Fehler reduzieren",
    Icon: IconRobot,
  },
] as const;

export function TechStackSectionV2() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 md:gap-4">
      {TECH_ITEMS.map((item, i) => {
        const Icon = item.Icon;
        return (
          <div
            key={item.name}
            data-animate="fade-up"
            data-animate-delay={String(i * 60)}
            // V2: kein TechCorners; hover zeigt Cyan-Border (Interaction-Signal)
            className="group relative overflow-hidden border border-white/10 bg-brand-navy/60 px-4 py-4 sm:px-5 sm:py-5 backdrop-blur-md transition-all hover:border-brand-cyan/30"
          >
            <div className="flex items-start gap-4">
              {/* Icon: Cyan nur static weil es ein Icon-Identifier ist, kein ambient decorator */}
              <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center bg-white/5 border border-white/10 group-hover:border-brand-cyan/20 transition-colors">
                <Icon className="size-4 text-white/60 group-hover:text-brand-cyan transition-colors" stroke={1.5} />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold uppercase tracking-wider text-white">
                  {item.name}
                </p>
                <p className="mt-1 text-[0.8125rem] leading-snug text-white/50">
                  {item.benefit}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
