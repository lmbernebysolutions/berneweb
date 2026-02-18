import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { CtaSection } from "@/components/sections/CtaSection";
import Link from "next/link";
import { IconArrowRight } from "@tabler/icons-react";
import { getAllLocationSlugs, getLocationBySlug } from "@/lib/data/locations";
import { TechCorners } from "@/components/ui/tech-corners";

export const metadata: Metadata = {
  title: "Standorte – Webdesign & IT-Service im Erzgebirgskreis | Berneby Solutions",
  description:
    "Wir unterstützen Handwerker und Betriebe in 59 Orten im Erzgebirgskreis – von Aue-Bad Schlema bis Annaberg-Buchholz. Webdesign, lokale SEO, IT-Service.",
  alternates: { canonical: "/standorte" },
};

export default function StandortePage() {
  const slugs = getAllLocationSlugs();
  const locations = slugs
    .map((s) => getLocationBySlug(s))
    .filter((l): l is NonNullable<typeof l> => l != null)
    .sort((a, b) => a.entfernung - b.entfernung);

  return (
    <>
      <Section bg="transparent">
        <SectionHeading
          number="01"
          overline="Standorte"
          title="Webdesign & IT im Erzgebirgskreis"
          titleLine2="59 Orte. Eine Lösung."
          subtitle="Wir unterstützen Handwerker und KMU in allen Gemeinden und Städten des Erzgebirgskreises – mit professionellen Websites, lokaler SEO und IT-Service. Aus Aue-Bad Schlema für die ganze Region."
          align="left"
          light
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {locations.map((loc, i) => (
            <Link
              key={loc.slug}
              href={`/standorte/${loc.slug}`}
              data-animate="fade-up"
              data-animate-delay={String(i % 20 === 0 ? 0 : (i % 20) * 40)}
              className="group relative overflow-hidden border border-white/10 bg-brand-navy/60 p-5 backdrop-blur-md transition-all hover:border-brand-cyan/20 card-hover-glow block"
            >
              <TechCorners pattern="diagonal" variant="cyan" size="sm" />
              <div className="relative z-10 flex items-center justify-between">
                <div>
                  <span className="font-bold text-white group-hover:text-brand-cyan transition-colors">
                    {loc.name}
                  </span>
                  <span className="ml-2 text-sm text-brand-navy-muted">
                    {loc.population.toLocaleString("de-DE")} EW
                  </span>
                </div>
                <IconArrowRight className="size-4 shrink-0 text-white/40 group-hover:text-brand-cyan transition-colors" />
              </div>
              <p className="relative z-10 mt-2 text-xs text-brand-navy-muted line-clamp-2">
                {loc.description}
              </p>
            </Link>
          ))}
        </div>
      </Section>

      <div className="w-full h-px bg-brand-cyan/20 shrink-0" role="presentation" aria-hidden="true" />

      <CtaSection
        headline="Ihr Ort nicht dabei?"
        subline="Wir arbeiten im gesamten Erzgebirgskreis. Kontaktieren Sie uns – wir finden eine Lösung."
        ctas={[
          { label: "Jetzt anfragen", href: "/kontakt" },
          { label: "Handwerks-Pakete", href: "/handwerk" },
        ]}
      />
    </>
  );
}
