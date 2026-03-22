// V2 CHANGES (System F — Data-Section mit Kundennutzen):
// Jede Technologie zeigt neben dem Namen eine einzeilige Nutzen-Aussage
// für den Kunden (Ü40 KMU-Inhaber). Layout: Icon + Name + Nutzen.
// TechCorners entfernt (System B: KEINS für TechStack-Chips).
// Cyan nur noch via hover-Effekt (System A).

import {
  IconBrandNextjs,
  IconBrandReact,
  IconBrandWindows,
  IconRobot,
  IconBrandAdobe,
} from "@tabler/icons-react";
import { CursorLogo } from "@/components/ui/cursor-logo";

// Nutzen-Aussagen pro Technologie (Dual-Layer: Technik + Kundennutzen)
/** Inhalt 1:1 mit lib/constants TECH_STACK_WITH_BENEFIT */
const TECH_ITEMS = [
  {
    name: "Next.js",
    benefit: "Blitzschnelle Ladezeiten",
    Icon: IconBrandNextjs,
  },
  {
    name: "React",
    benefit: "Moderne, wartbare Oberflächen",
    Icon: IconBrandReact,
  },
  {
    name: "Cursor",
    benefit: "Schnellere Entwicklung mit AI-Unterstützung",
    Icon: CursorLogo,
  },
  {
    name: "Microsoft 365",
    benefit: "Office & E-Mail aus einer Hand",
    Icon: IconBrandWindows,
  },
  {
    name: "Adobe",
    benefit: "Markenstarkes Design in der Creative Cloud",
    Icon: IconBrandAdobe,
  },
  {
    name: "KI-Integration",
    benefit: "Telefon, Chat, Automatisierung",
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
              <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center bg-white/5 border border-white/10 group-hover:border-brand-cyan/20 transition-colors sm:h-11 sm:w-11">
                <Icon className="size-4 text-white/60 group-hover:text-brand-cyan transition-colors sm:size-5" stroke="1.5" />
              </div>
              <div className="min-w-0">
                <p className="text-base font-bold uppercase tracking-tight text-white sm:text-lg">
                  {item.name}
                </p>
                <p className="mt-1.5 text-sm leading-snug text-white/60 sm:text-base sm:leading-relaxed">
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
