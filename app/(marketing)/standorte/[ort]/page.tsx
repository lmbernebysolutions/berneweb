import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Hero } from "@/components/sections/Hero";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { TrustBar } from "@/components/sections/TrustBar";
import { ContactForm } from "@/components/sections/ContactForm";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { CtaSection } from "@/components/sections/CtaSection";
import { Button } from "@/components/ui/button";
import { SectionCard } from "@/components/ui/section-card";
import { TechCorners } from "@/components/ui/tech-corners";
import { IconMapPin, IconCheck, IconCurrencyEuro, IconStar } from "@tabler/icons-react";
import {
  getLocationBySlug,
  getAllLocationSlugs,
  getNearbyLocationSlugs,
} from "@/lib/data/locations";
import { generateLocalBusinessSchema } from "@/lib/seo/schema";
import { COMPANY, HANDWERK_STATS } from "@/lib/constants";

const BASE_URL = "https://berneby.de";

export async function generateStaticParams() {
  return getAllLocationSlugs().map((ort) => ({ ort }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ ort: string }>;
}): Promise<Metadata> {
  const { ort } = await params;
  const location = getLocationBySlug(ort);
  if (!location) return { title: "Standort nicht gefunden" };

  return {
    title: `Webdesign & IT-Service in ${location.name} | Berneby Solutions`,
    description: `Professionelle Websites, lokale SEO und IT-Service für ${location.name} und Umgebung. ${location.population.toLocaleString("de-DE")} Einwohner – wir bringen Ihren Betrieb auf Seite 1. Jetzt Erstgespräch vereinbaren.`,
    alternates: { canonical: `/standorte/${location.slug}` },
  };
}

const LOCATION_FEATURES = [
  {
    icon: "IconSearch",
    title: "Lokale SEO",
    description:
      "50+ Landingpages für maximale Sichtbarkeit bei Google. Wir sorgen dafür, dass Sie für Suchanfragen wie „Elektriker [Ort]“ oder „Website [Ort]“ gefunden werden.",
  },
  {
    icon: "IconPhone",
    title: "KI-Telefonassistent",
    description:
      "24/7 Anrufannahme, wenn Sie auf der Baustelle sind. Kein Kunde geht mehr verloren – auch in [Ort] und Umgebung.",
  },
  {
    icon: "IconCurrencyEuro",
    title: "Transparente Preise",
    description:
      "Festpreise ab 950 €. Kein Kleingedrucktes. Wir kommen zu Ihnen – kurze Wege aus Aue-Bad Schlema.",
  },
];

function buildLocationFeatures(ortName: string) {
  return LOCATION_FEATURES.map((f) => ({
    ...f,
    description: f.description.replace(/\[Ort\]/g, ortName),
  }));
}

export default async function StandortPage({
  params,
}: {
  params: Promise<{ ort: string }>;
}) {
  const { ort } = await params;
  const location = getLocationBySlug(ort);
  if (!location) notFound();

  const nearbySlugs = getNearbyLocationSlugs(location);
  const features = buildLocationFeatures(location.name);

  const localBusinessSchema = generateLocalBusinessSchema({
    name: "Berneby Solutions",
    description: `Webdesign, IT-Service und lokale SEO für ${location.name} und den Erzgebirgskreis.`,
    areaServed: location.name,
    serviceRadiusKm: 30,
    addressLocality: "Aue-Bad Schlema",
    addressRegion: "Sachsen",
  });

  return (
    <>
      <Hero
        bergVariant="standorte"
        headline="Webdesign & IT in"
        headlineLine2={`${location.name}.`}
        accentText={location.name}
        subline={`Wir unterstützen Handwerker und Betriebe in ${location.name} (${location.population.toLocaleString("de-DE")} Einwohner) mit professionellen Websites, lokaler SEO und IT-Service. Aus Aue-Bad Schlema – ${location.entfernung === 0 ? "direkt vor Ort" : `nur ${location.entfernung} km entfernt`}.`}
        ctas={[
          { label: "Jetzt Erstgespräch buchen", href: "#kontakt", variant: "default" },
          { label: "Handwerks-Pakete", href: "/handwerk", variant: "outline" },
        ]}
        variant="navy"
      />

      <TrustBar items={HANDWERK_STATS} />

      {/* 02: Lokaler Bezug – Karten-Layout wie Branchen/Hauptseiten */}
      <Section bg="transparent">
        <SectionHeading
          number="02"
          overline={`Standort ${location.name}`}
          title={`Webdesign & IT-Service für ${location.name}`}
          subtitle={`In ${location.name} mit ${location.population.toLocaleString("de-DE")} Einwohnern unterstützen wir Handwerker, Einzelhändler und KMU mit professionellen Websites und digitaler Sichtbarkeit.`}
          align="left"
          light
        />

        {/* Lead: Ortsbeschreibung */}
        <div
          data-animate="fade-up"
          className="relative overflow-hidden border border-white/10 bg-brand-navy/60 backdrop-blur-md p-8 md:p-10 mb-8 md:mb-12"
        >
          <TechCorners pattern="diagonal" variant="cyan" size="lg" />
          <p className="relative z-10 text-[0.9375rem] leading-relaxed text-white/85 md:text-base">
            {location.description}
          </p>
        </div>

        {/* Zwei Karten: Warum Berneby + Besonderheiten – rechte Karte vertikal zur linken zentriert */}
        <div className="grid gap-8 md:grid-cols-2 md:gap-12 items-center">
          <div
            data-animate="fade-left"
            className="group relative overflow-hidden border border-white/10 bg-brand-navy/60 backdrop-blur-md transition-all hover:border-brand-cyan/20 card-hover-glow"
          >
            <TechCorners pattern="diagonal" variant="cyan" size="lg" animate />
            <div className="relative z-10 p-8 md:p-10">
              <h3 className="text-xl font-bold text-white md:text-2xl">
                Warum Berneby Solutions in {location.name}?
              </h3>
              <p className="mt-4 text-[0.9375rem] leading-relaxed text-white/80">
                Wir bieten professionelle Websites, 50+ lokale Landingpages für maximale Sichtbarkeit
                bei Google, KI-Telefonassistent für 24/7 Anrufannahme und IT-Service aus einer Hand.
                Festpreis, 4 Wochen bis Go-Live, 12 Monate Support inklusive. Für Betriebe in{" "}
                {location.name} und Umgebung – Handwerk, Einzelhandel, Gastronomie, Dienstleister.
                {location.entfernung === 0 && " Wir sitzen in Aue-Bad Schlema – kurze Wege, persönliche Beratung vor Ort."}
              </p>
            </div>
          </div>

          <div
            data-animate="fade-right"
            className="group relative overflow-hidden border border-white/10 bg-brand-navy/60 backdrop-blur-md transition-all hover:border-brand-cyan/20 card-hover-glow flex flex-col items-center justify-center"
          >
            <TechCorners pattern="diagonal" variant="cyan" size="lg" animate />
            <div className="relative z-10 p-5 md:p-6 w-full flex flex-col items-center text-center">
              <h3 className="text-base font-bold text-white md:text-lg uppercase tracking-wide">
                Besonderheiten von {location.name}
              </h3>
              <div className="mt-3 flex flex-wrap gap-1.5 justify-center">
                {location.besonderheiten.map((b) => (
                  <span
                    key={b}
                    className="inline-flex items-center gap-1 rounded border border-brand-cyan/30 bg-brand-cyan/5 px-2.5 py-1 text-xs font-medium text-brand-cyan"
                  >
                    <IconStar className="size-3 shrink-0" stroke={2} />
                    {b}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Leistungen für [Ort] – volle Breite */}
        <div
          data-animate="fade-up"
          className="group relative mt-8 md:mt-12 overflow-hidden border border-brand-cyan/30 bg-brand-navy/60 backdrop-blur-md transition-all hover:border-brand-cyan/40 card-hover-glow"
        >
          <TechCorners pattern="diagonal" variant="cyan" size="lg" animate />
          <div className="relative z-10 p-8 md:p-10">
            <div className="mb-3 flex h-12 w-12 items-center justify-center border border-brand-cyan/30 bg-brand-cyan/10" aria-hidden="true">
              <IconCurrencyEuro className="size-6 text-brand-cyan" stroke={2} />
            </div>
            <h3 className="text-xl font-bold text-white md:text-2xl">
              Unsere Leistungen für {location.name}
            </h3>
            <p className="mt-4 text-[0.9375rem] leading-relaxed text-white/80">
              Wir bieten professionelle Websites ab 950 €, Mehrseiter mit 50+ Landingpages ab 1.950 €
              und den KI-Telefonassistenten für 24/7 Anrufannahme. Alle Pakete mit Festpreis, 4
              Wochen bis Go-Live und 12 Monate Support. Für Handwerker in {location.name} und
              Umgebung – Elektriker, Dachdecker, Sanitär, Maler, Tischler und mehr. Auch IT-Service:
              Microsoft 365, Digitaler Hausmeister (10 Stunden für 850 €), KI-Schulung.
            </p>
            <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/70">
              <li className="flex items-center gap-2">
                <IconCheck className="size-4 shrink-0 text-brand-cyan" stroke={2.5} />
                Festpreis bis Abnahme
              </li>
              <li className="flex items-center gap-2">
                <IconCheck className="size-4 shrink-0 text-brand-cyan" stroke={2.5} />
                12 Monate Support inklusive
              </li>
              <li className="flex items-center gap-2">
                <IconCheck className="size-4 shrink-0 text-brand-cyan" stroke={2.5} />
                Kostenloses Erstgespräch
              </li>
            </ul>
          </div>
        </div>

        {/* Umgebung + CTA */}
        <div className="mt-8 md:mt-12 grid gap-6 sm:gap-8 md:grid-cols-2 md:gap-12 min-w-0">
          {nearbySlugs.length > 0 && (
            <div
              data-animate="fade-left"
              className="group relative overflow-hidden border border-white/10 bg-brand-navy/60 backdrop-blur-md p-8 md:p-10 transition-all hover:border-brand-cyan/20 card-hover-glow"
            >
              <TechCorners pattern="diagonal" variant="cyan" size="lg" animate />
              <div className="relative z-10">
                <h3 className="text-lg font-bold text-white">
                  Webdesign in der Umgebung
                </h3>
                <p className="mt-3 text-sm text-white/80 leading-relaxed">
                  Wir unterstützen auch Betriebe in den Nachbarorten. Webdesign in{" "}
                  {nearbySlugs.slice(0, 5).map((slug, i) => {
                    const loc = getLocationBySlug(slug);
                    if (!loc) return null;
                    return (
                      <span key={slug}>
                        {i > 0 && ", "}
                        <Link
                          href={`/standorte/${slug}`}
                          className="text-brand-cyan hover:underline"
                        >
                          {loc.name}
                        </Link>
                      </span>
                    );
                  })}{" "}
                  – gleiche Qualität, kurze Wege.
                </p>
              </div>
            </div>
          )}

          <div
            data-animate="fade-right"
            className={`group relative overflow-hidden border border-brand-cyan/30 bg-brand-cyan/5 backdrop-blur-md p-5 sm:p-6 md:p-10 transition-all hover:border-brand-cyan/40 card-hover-glow min-w-0 ${nearbySlugs.length === 0 ? "md:col-span-2" : ""}`}
          >
            <TechCorners pattern="diagonal" variant="cyan" size="lg" animate />
            <div className="relative z-10 flex flex-col sm:flex-row sm:items-start gap-4 min-w-0">
              <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center border border-brand-cyan/30 bg-brand-cyan/10" aria-hidden="true">
                <IconMapPin className="size-5 sm:size-6 text-brand-cyan" stroke={2} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-bold text-white text-sm sm:text-base">
                  {location.entfernung === 0
                    ? "Sitz von Berneby Solutions – wir sind vor Ort."
                    : `Nur ${location.entfernung} km von Aue-Bad Schlema.`}
                </p>
                <p className="text-xs sm:text-sm text-white/70 mt-1">
                  Kostenloses Erstgespräch, 30 Minuten, unverbindlich.
                </p>
                <Button asChild size="lg" className="mt-4 w-full sm:w-auto bg-brand-cyan text-brand-navy hover:bg-brand-cyan/90 text-center text-sm sm:text-base">
                  <Link href="#kontakt">Erstgespräch vereinbaren</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Services */}
      <Section bg="subtle">
        <SectionHeading
          number="03"
          overline="Leistungen"
          title="Was wir für Sie tun"
          subtitle="Websites, lokale SEO, KI-Telefon – alles aus einer Hand."
          align="left"
          light
        />
        <FeatureGrid features={features} cols={3} light />
      </Section>

      {/* Kontakt */}
      <Section id="kontakt" bg="transparent">
        <SectionHeading
          number="04"
          overline="Kontakt"
          title="Erstgespräch vereinbaren"
          subtitle="Kostenlos, unverbindlich – wir melden uns innerhalb von 24 Stunden."
          align="left"
          light
        />
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <p className="text-white/80 mb-6">
              Sie haben Fragen zu Webdesign, IT-Service oder unseren Handwerks-Paketen für{" "}
              {location.name}? Schreiben Sie uns – wir antworten innerhalb von 24 Stunden.
            </p>
            <div className="space-y-4">
              <p className="text-sm text-white/60">
                Telefon:{" "}
                <a href={`tel:${COMPANY.phone}`} className="text-brand-cyan hover:underline">
                  {COMPANY.phoneDisplay}
                </a>
              </p>
              <p className="text-sm text-white/60">
                E-Mail:{" "}
                <a href={`mailto:${COMPANY.email}`} className="text-brand-cyan hover:underline">
                  {COMPANY.email}
                </a>
              </p>
            </div>
          </div>
          <SectionCard variant="default" className="flex-1 p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-extrabold uppercase tracking-wide">Nachricht schreiben</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Alle Felder mit * sind Pflichtfelder.
                </p>
              </div>
              <div className="hidden font-mono text-[0.6rem] text-brand-cyan/30 uppercase tracking-widest sm:block">
                FORM.SYS
              </div>
            </div>
            <ContactForm />
          </SectionCard>
        </div>
      </Section>

      <div className="w-full h-px bg-brand-cyan/20 shrink-0" role="presentation" aria-hidden="true" />

      <CtaSection
        headline="Bereit für das Upgrade?"
        subline={`Lassen Sie uns über Ihre Digitalisierung in ${location.name} sprechen.`}
        ctas={[
          { label: "Jetzt Termin vereinbaren", href: "/kontakt" },
          { label: `Anrufen: ${COMPANY.phoneDisplay}`, href: `tel:${COMPANY.phone}` },
        ]}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />
    </>
  );
}
