// V3 CHANGES (vs TechStackSectionV2):
// - TechCorners nur auf erster Card (Ankerpunkt-Hierarchie)
// - Kundennutzen unter Tech-Name (bereits in V2 vorhanden)

import {
  IconBrandNextjs,
  IconBrandReact,
  IconBrandWindows,
  IconRobot,
  IconBrandAdobe,
} from "@tabler/icons-react";
import { TechCorners } from "@/components/ui/tech-corners";
import { CursorLogo } from "@/components/ui/cursor-logo";

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

export function TechStackSectionV3() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 md:gap-4">
      {TECH_ITEMS.map((item, i) => {
        const Icon = item.Icon;
        const isFirst = i === 0;
        return (
          <div
            key={item.name}
            data-animate="fade-up"
            data-animate-delay={String(i * 60)}
            className="group relative overflow-hidden border border-white/10 bg-brand-navy/60 px-4 py-4 sm:px-5 sm:py-5 backdrop-blur-md transition-all hover:border-brand-cyan/30"
          >
            {/* V3: TechCorners nur auf der ersten Card */}
            {isFirst && (
              <TechCorners pattern="diagonal" variant="cyan" size="sm" />
            )}
            <div className="flex items-start gap-4">
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
