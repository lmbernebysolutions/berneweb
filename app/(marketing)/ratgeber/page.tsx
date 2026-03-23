import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { CtaSection } from "@/components/sections/CtaSection";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { IconArrowRight } from "@tabler/icons-react";
import { PAGE_META } from "@/lib/constants";
import { getClusterOverview } from "@/lib/content/ratgeber";
import { TechCorners } from "@/components/ui/tech-corners";
import { CONTAINER_A } from "@/lib/container-styles";

export const metadata: Metadata = {
  title: PAGE_META.ratgeber.title,
  description: PAGE_META.ratgeber.description,
  alternates: { canonical: "/ratgeber" },
};

const CLUSTER_LABELS: Record<string, string> = {
  "digitalisierung-handwerk": "Digitalisierung Handwerk",
  "it-service-kmu": "IT-Service KMU",
  "ki-im-handwerk": "KI im Handwerk",
};

export default function RatgeberPage() {
  const clusters = getClusterOverview();

  return (
    <>
      <Section bg="transparent" className="pt-24 sm:pt-28 md:pt-32">
        <SectionHeading
          number="01"
          overline="Ratgeber"
          title="IT & DIGITALISIERUNG"
          subtitle="Praxis-Leitfäden zu SEO, Website, KI-Telefonassistent, Microsoft 365 und mehr. Aus dem Erzgebirge – für Handwerker und KMU."
          align="left"
          light
          compactMobileTitle
        />
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {clusters.map((cluster, i) => (
            <div
              key={cluster.slug}
              data-animate="fade-up"
              data-animate-delay={String(i * 80)}
              className={`group relative overflow-hidden transition-all ${CONTAINER_A}`}
            >
              <TechCorners pattern="diagonal" variant="cyan" size="lg" animate />
              <div className="relative z-10 flex flex-col p-6">
                <h3 className="font-bold uppercase tracking-wide text-xl text-white">
                  {CLUSTER_LABELS[cluster.slug] ?? cluster.title}
                </h3>
                <p className="mt-2 text-sm text-white/60">
                  {cluster.articleCount} Artikel
                </p>
                <Button
                  asChild
                  variant="ghost"
                  className="mt-4 w-full justify-between text-white/70 hover:text-brand-cyan hover:bg-transparent px-0 uppercase tracking-widest text-xs"
                >
                  <Link href={`/ratgeber/${cluster.slug}`}>
                    Artikel lesen <IconArrowRight className="size-4" />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <div className="w-full h-px bg-brand-cyan/20 shrink-0" role="presentation" aria-hidden="true" />

      <CtaSection
        headline="Erstgespräch vereinbaren"
        subline="30 Minuten, unverbindlich – wir besprechen Ihre Digitalisierung."
        showRatgeberLink={false}
        ctas={[
          { label: "Termin sichern", href: "/kontakt" },
          { label: "Handwerks-Pakete", href: "/handwerk" },
        ]}
      />
    </>
  );
}
