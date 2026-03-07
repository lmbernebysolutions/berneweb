import Link from "next/link";
import { Button } from "@/components/ui/button";
import { IconCheck } from "@tabler/icons-react";

// V3 CHANGES (vs handwerk/page.tsx inline):
// - Blob entfernen (kein -right-20 -bottom-20 bg-brand-cyan/10 rounded-full blur-3xl)
// - Bullet-Glow entfernen (kein shadow-[0_0_10px_#03f9f9] auf Bullets)
// - Deko-Card Border: border-white/25 (statt border-brand-cyan)

const FLATRATE_FEATURES = [
  "10 Stunden Support inklusive",
  "Gültig für 12 Monate",
  "Web, Office, Design & Notfälle",
  "Express-Ticket bei Problemen",
] as const;

export function FlatrateCardV3() {
  return (
    <div className="grid md:grid-cols-2 gap-12 items-center border border-brand-cyan/30 bg-brand-cyan/5 p-8 md:p-12 relative overflow-hidden">
      {/* V3: Blob entfernt */}

      <div className="relative z-10">
        <div className="mb-6 inline-flex items-center border border-brand-warm bg-brand-warm px-4 py-1 text-xs font-bold text-brand-navy uppercase tracking-widest">
          Best Seller
        </div>
        <h2 className="text-3xl md:text-5xl font-black text-white uppercase leading-none mb-6">
          10er Karte<br />Support
        </h2>
        <ul className="space-y-4 mb-8">
          {FLATRATE_FEATURES.map((item) => (
            <li key={item} className="flex items-center gap-4 text-white text-lg">
              {/* V3: kein Bullet-Glow */}
              <div className="w-1.5 h-1.5 bg-brand-cyan" />
              {item}
            </li>
          ))}
        </ul>
        <div className="flex items-baseline gap-4 mb-8">
          <span className="text-4xl font-bold text-brand-warm">850 €</span>
          <span className="text-sm font-mono text-brand-navy-muted">netto / Paket</span>
        </div>
        <Button asChild size="lg" className="bg-brand-cyan text-brand-navy hover:bg-brand-cyan/90 w-full md:w-auto">
          <Link href="/kontakt">Karte sichern</Link>
        </Button>
      </div>

      <div className="relative z-10 hidden md:flex items-center justify-center">
        {/* V3: Deko-Card mit border-white/25 statt border-brand-cyan */}
        <div className="w-64 h-80 border-2 border-white/25 relative">
          <div className="absolute top-4 left-4 right-4 h-32 bg-white/5" />
          <div className="absolute bottom-4 left-4 right-4 h-2 bg-white/20" />
          <div className="absolute bottom-8 left-4 w-12 h-1 bg-white/10" />
          <div className="absolute bottom-8 left-18 w-12 h-1 bg-white/10" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[-15deg] border-4 border-white/25 p-4 bg-brand-navy text-white font-black text-4xl uppercase tracking-tighter">
            SOLD
          </div>
        </div>
      </div>
    </div>
  );
}
