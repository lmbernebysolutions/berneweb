import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { CtaSection } from "@/components/sections/CtaSection";
import Link from "next/link";
import { IconArrowRight } from "@tabler/icons-react";
import { getAllLocationSlugs, getLocationBySlug } from "@/lib/data/locations";
import { getLocationContent } from "@/lib/content/standorte";
import { TechCorners } from "@/components/ui/tech-corners";
import { CONTAINER_A } from "@/lib/container-styles";
import { ROUTE_VISIBILITY } from "@/lib/route-visibility";

export const metadata: Metadata = {
  title: "Standorte – Webdesign & IT-Service im Erzgebirge | Berneby Solutions",
  description:
    "Webdesign, lokale SEO und IT-Service an fünf Kernstandorten: Aue-Bad Schlema, Schwarzenberg, Schneeberg, Stollberg und Annaberg-Buchholz.",
  alternates: { canonical: "/standorte" },
};

export default function StandortePage() {
  if (!ROUTE_VISIBILITY.standorte) {
    notFound();
  }

  const slugs = getAllLocationSlugs();
  const locations = slugs
    .map((s) => {
      const loc = getLocationBySlug(s);
      const content = getLocationContent(s);
      if (!loc || !content) return null;
      return { ...loc, localIntro: content.localIntro };
    })
    .filter((l): l is NonNullable<typeof l> => l != null)
    .sort((a, b) => a.entfernung - b.entfernung);

  return (
    <>
      <Section
        bg="subtle"
        className="pt-20 sm:pt-24 md:pt-24 lg:pt-24 min-[1920px]:pt-32"
        contentClassName="pt-4 sm:pt-5 md:pt-6 pb-12 sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32"
      >
        <SectionHeading
          as="h1"
          number="01"
          overline="Standorte"
          title="Webdesign & IT im"
          titleLine2="Erzgebirge"
          titleLine3="Fünf starke Hubs."
          subtitle="Statt austauschbarer Massen-Seiten fokussieren wir uns auf fünf Kernstandorte mit eigenem Inhalt – und betreuen Betriebe im gesamten Erzgebirgskreis von dort aus."
          align="left"
          light
          compactTitle
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 min-w-0">
          {locations.map((loc, i) => (
            <Link
              key={loc.slug}
              href={`/standorte/${loc.slug}`}
              data-animate="fade-up"
              data-animate-delay={String(i % 20 === 0 ? 0 : (i % 20) * 40)}
              className={`group relative overflow-hidden p-5 backdrop-blur-md transition-all block ${CONTAINER_A}`}
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
                {loc.localIntro}
              </p>
            </Link>
          ))}
        </div>
      </Section>

      <div className="w-full h-px bg-brand-cyan/20 shrink-0" role="presentation" aria-hidden="true" />

      <CtaSection
        headline="Ihr Ort nicht dabei?"
        subline="Die fünf Hubs decken das Erzgebirge ab – wir kommen auch zu Ihnen. Schreiben Sie uns kurz, wo Ihr Betrieb sitzt."
        ctas={[
          { label: "Jetzt anfragen", href: "/kontakt" },
          { label: "Handwerks-Pakete", href: "/handwerk" },
        ]}
      />
    </>
  );
}
