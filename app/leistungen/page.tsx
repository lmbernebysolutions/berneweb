import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { ServiceTabs } from "@/components/sections/ServiceTabs";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { CtaSection } from "@/components/sections/CtaSection";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { IconToolsKitchen2, IconArrowRight, IconCheck } from "@tabler/icons-react";
import { SERVICES, CRAFT_MODULES, PAGE_META, FAQ_ITEMS } from "@/lib/constants";
import { SchweinDivider } from "@/components/ui/schweinchen-divider";

export const metadata: Metadata = {
  title: PAGE_META.leistungen.title,
  description: PAGE_META.leistungen.description,
  alternates: { canonical: "/leistungen" },
};

export default function LeistungenPage() {
  return (
    <>
      {/* 1. Hero (compact) */}
      <Hero
        headline="Alles aus einer Hand."
        accentText="einer Hand"
        subline="Von der Website über den Online-Shop bis zum KI-Assistenten – wir bauen, was Sie brauchen."
        variant="navy"
        compact
      />

      {/* 2. Service Tabs */}
      <Section>
        <SectionHeading
          overline="Leistungen"
          title="Unsere Leistungen im Überblick"
          subtitle="Wählen Sie den Bereich, der Sie interessiert."
          align="center"
        />
        <ServiceTabs categories={{ ...SERVICES }} />
      </Section>

      {/* 3. Digitaler Hausmeister – prominent */}
      <Section bg="navy">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <div data-animate="fade-left">
            <div className="mb-3 text-sm font-semibold uppercase tracking-[0.15em] text-brand-cyan">
              IT-Support
            </div>
            <h2 className="text-brand-navy-foreground">Der Digitale Hausmeister</h2>
            <p className="mt-4 text-lg leading-relaxed text-white/60">
              10 Stunden Tech-Support, flexibel einsetzbar. Wie ein Hausmeister –
              aber für Ihre IT. Rufen Sie an, wir kommen (digital).
            </p>
            <ul className="mt-6 space-y-3">
              {["Excel-Probleme lösen", "Website-Fragen klären", "Software einrichten", "12 Monate gültig"].map((f) => (
                <li key={f} className="flex items-center gap-2.5 text-sm text-white/70">
                  <IconCheck className="size-4 shrink-0 text-brand-cyan" stroke={2.5} />
                  {f}
                </li>
              ))}
            </ul>
            <Button asChild size="lg" className="group mt-8 cursor-pointer shadow-lg">
              <Link href="/kontakt">
                Stundenkarte anfragen
                <IconArrowRight className="ml-1 size-4 transition-transform group-hover:translate-x-1" stroke={2} />
              </Link>
            </Button>
          </div>

          <div data-animate="fade-right" className="flex items-center justify-center">
            <div className="relative">
              <div className="flex h-32 w-32 items-center justify-center border border-white/10 bg-white/[0.04] shadow-xl ring-1 ring-white/10 backdrop-blur-sm">
                <IconToolsKitchen2 className="size-16 text-brand-cyan" stroke={1} />
                {/* Tech corners */}
                <div className="absolute top-0 left-0 h-3 w-3 border-t-2 border-l-2 border-brand-cyan" />
                <div className="absolute bottom-0 right-0 h-3 w-3 border-b-2 border-r-2 border-brand-cyan" />
              </div>
              {/* Price badge */}
              <div className="absolute -right-4 -bottom-4 border border-brand-cyan/30 bg-brand-navy px-4 py-2 shadow-lg group">
                {/* Mini tech corners */}
                <div className="absolute -top-px -left-px h-2 w-2 border-t font-mono border-l border-brand-cyan" />
                <div className="text-2xl font-extrabold text-brand-cyan">850 &euro;</div>
                <div className="text-xs text-white/50">10 Stunden</div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* 4. Einzelmodule Accordion */}
      <Section narrow>
        <SectionHeading
          overline="Module"
          title="Einzelmodule"
          subtitle="Unsere spezialisierten Module – einzeln buchbar oder als Ergänzung zu Ihrem Paket."
          align="center"
        />
        <FaqAccordion
          items={CRAFT_MODULES.map((m) => ({
            question: `${m.name} – ${m.price} \u20AC`,
            answer: m.description,
          }))}
        />
      </Section>

      {/* 5. FAQ */}
      <Section bg="alt" narrow>
        <SectionHeading
          overline="FAQ"
          title="Häufige Fragen zu unseren Leistungen"
          align="center"
        />
        <FaqAccordion items={FAQ_ITEMS.slice(5, 10)} />
      </Section>

      <SchweinDivider />

      {/* 6. CTA */}
      <CtaSection
        headline="Nicht sicher, was Sie brauchen?"
        subline="Kein Problem – lassen Sie uns in einem kostenlosen Gespräch herausfinden, welche Lösung zu Ihrem Betrieb passt."
        ctas={[
          { label: "Kostenlos beraten lassen", href: "/kontakt" },
          { label: "Handwerks-Pakete ansehen", href: "/handwerk" },
        ]}
      />

      {/* Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Digitaler Hausmeister",
            description:
              "10er-Stundenkarte für flexiblen IT-Support. Excel-Probleme, Website-Fragen, Software-Setup – wir helfen.",
            provider: {
              "@type": "Organization",
              name: "Berneby Solutions",
            },
            offers: {
              "@type": "Offer",
              price: "850",
              priceCurrency: "EUR",
            },
            areaServed: {
              "@type": "AdministrativeArea",
              name: "Erzgebirgskreis",
            },
          }),
        }}
      />
    </>
  );
}
