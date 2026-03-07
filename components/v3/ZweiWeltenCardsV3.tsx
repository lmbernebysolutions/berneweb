import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TechCorners } from "@/components/ui/tech-corners";
import { TWO_PILLARS } from "@/lib/constants";
import { IconHammer, IconDeviceDesktop } from "@tabler/icons-react";

// V3 CHANGES (vs ZweiWeltenCardsV2):
// - TechCorners NUR auf Handwerk-Card (semantisch: Handwerk = Kernzielgruppe)
// - General-Card: ohne TechCorners

export function ZweiWeltenCardsV3() {
  return (
    <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:gap-12">
      {/* Handwerk — V3: TechCorners behalten */}
      <div
        data-animate="fade-left"
        className="group relative flex flex-col overflow-hidden border border-white bg-brand-navy/60 backdrop-blur-md p-6 sm:p-8 transition-all hover:border-brand-cyan/20 card-hover-glow"
      >
        <TechCorners pattern="diagonal" variant="cyan" size="lg" animate />

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

      {/* General Tech — V3: keine TechCorners */}
      <div
        data-animate="fade-right"
        className="group relative flex flex-col overflow-hidden border border-white bg-brand-navy/60 backdrop-blur-md p-6 sm:p-8 transition-all hover:border-brand-cyan/20 card-hover-glow"
      >
        {/* V3: keine TechCorners auf General-Card */}

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
