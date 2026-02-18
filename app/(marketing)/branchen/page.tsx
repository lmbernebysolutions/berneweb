import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { CtaSection } from "@/components/sections/CtaSection";
import Link from "next/link";
import { IconArrowRight } from "@tabler/icons-react";
import { getAllBranchenSlugs, getBrancheBySlug } from "@/lib/data/branchen";
import { TechCorners } from "@/components/ui/tech-corners";

export const metadata: Metadata = {
  title: "Branchen – Website & Digitalisierung für Handwerk & KMU | Berneby Solutions",
  description:
    "Wir unterstützen Elektriker, Dachdecker, Sanitär, Maler, Tischler, KFZ-Werkstätten, Friseure, Gastronomie, Einzelhandel und Freiberufler im Erzgebirge mit Websites und lokaler SEO.",
  alternates: { canonical: "/branchen" },
};

export default function BranchenPage() {
  const slugs = getAllBranchenSlugs();
  const branchen = slugs
    .map((s) => getBrancheBySlug(s))
    .filter((b): b is NonNullable<typeof b> => b != null);

  return (
    <>
      <Section bg="transparent">
        <SectionHeading
          number="01"
          overline="Branchen"
          title="Website & Digitalisierung"
          titleLine2="für jede Branche"
          subtitle="Elektriker, Dachdecker, Sanitär, Maler, Tischler, KFZ-Werkstatt, Friseur, Gastronomie, Einzelhandel, Freiberufler – wir unterstützen Handwerk und KMU im Erzgebirge mit professionellen Websites, lokaler SEO und KI-Telefonassistent."
          align="left"
          light
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {branchen.map((b, i) => (
            <Link
              key={b.slug}
              href={`/branchen/${b.slug}`}
              data-animate="fade-up"
              data-animate-delay={String(i * 60)}
              className="group relative overflow-hidden border border-white/10 bg-brand-navy/60 p-6 backdrop-blur-md transition-all hover:border-brand-cyan/20 card-hover-glow block"
            >
              <TechCorners pattern="diagonal" variant="cyan" size="sm" />
              <div className="relative z-10 flex items-center justify-between">
                <span className="font-bold text-white group-hover:text-brand-cyan transition-colors">
                  {b.name}
                </span>
                <IconArrowRight className="size-4 shrink-0 text-white/40 group-hover:text-brand-cyan transition-colors" />
              </div>
              <p className="relative z-10 mt-2 text-sm text-white/60 line-clamp-2">
                {b.description}
              </p>
            </Link>
          ))}
        </div>
      </Section>

      <div className="w-full h-px bg-brand-cyan/20 shrink-0" role="presentation" aria-hidden="true" />

      <CtaSection
        headline="Ihre Branche nicht dabei?"
        subline="Wir unterstützen alle lokalen Betriebe im Erzgebirge. Kontaktieren Sie uns – wir finden eine Lösung."
        ctas={[
          { label: "Jetzt anfragen", href: "/kontakt" },
          { label: "Handwerks-Pakete", href: "/handwerk" },
        ]}
      />
    </>
  );
}
