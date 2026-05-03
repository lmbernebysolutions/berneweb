import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { TrustBar } from "@/components/sections/TrustBar";
import { CraftToolboxGrid } from "@/components/sections/CraftToolboxGrid";
import { PricingCards } from "@/components/sections/PricingCards";
import dynamic from "next/dynamic";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { CtaSection } from "@/components/sections/CtaSection";
import { HausmeisterCardVisual } from "@/components/sections/HausmeisterCardVisual";

const ChatSection = dynamic(
  () => import("@/components/sections/chat-section").then((m) => ({ default: m.ChatSection })),
  { ssr: true }
);
const TestimonialGrid = dynamic(
  () => import("@/components/sections/TestimonialGrid").then((m) => ({ default: m.TestimonialGrid })),
  { ssr: true }
);
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { IconBrandGoogle } from "@tabler/icons-react";
import {
  CRAFT_PACKAGES,
  CRAFT_MODULES,
  PROCESS_STEPS,
  FAQ_ITEMS,
  PAGE_META,
  COMPANY,
  HANDWERK_STATS,
  HANDWERK_GARANTIEN,
  SOCIAL_LINKS,
  SITE_URL,
} from "@/lib/constants";
import { generateFaqSchema, generateBreadcrumbSchema, generateHowToSchema } from "@/lib/seo/schema";
import { HandwerkProblemWithRevealSection } from "@/components/sections/HandwerkProblemWithRevealSection";
import { WarumBernebyV3 } from "@/components/v3/WarumBernebyV3";
import { CONTAINER_A } from "@/lib/container-styles";
import { cn } from "@/lib/utils";

/**
 * Review-Sektion (Testimonials + Google-Link). Vorerst aus.
 * Bei `true`: Pakete wieder `number="08"` + `bg="transparent"`, Prozess `09` + `bg="subtle"`.
 */
const SHOW_HANDWERK_REVIEWS_SECTION = false;

export const metadata: Metadata = {
  title: PAGE_META.handwerk.title,
  description: PAGE_META.handwerk.description,
  alternates: { canonical: "/handwerk" },
};

const HANDWERK_TESTIMONIALS = [
  {
    name: "Markus W.",
    role: "Dachdecker, Marienberg",
    text: "Seit der neuen Website bekomme ich regelmäßig Anfragen aus der ganzen Region.",
    result: "5x mehr Anfragen in 8 Wochen",
  },
  {
    name: "Andreas B.",
    role: "Sanitärbetrieb, Stollberg",
    text: "Die KI-Telefonassistenz ist genial. Ich kann in Ruhe arbeiten. Absolute Empfehlung.",
    result: "Keine verpassten Anrufe mehr",
  },
  {
    name: "Thomas K.",
    role: "Elektrikermeister, Aue",
    text: "Professionell, schnell, unkompliziert. Genau so muss das sein. Weiter so!",
    result: "Website live in 10 Tagen",
  },
];

export default function HandwerkPage() {
  return (
    <>
      <Hero
        bergVariant="handwerk"
        headline="AUFTRÄGE VOLL? BÜRO LEER?"
        accentText="BÜRO LEER?"
        subline="Digital-Partner für Handwerker im Erzgebirge. Website, lokale\nLandingpages, KI-Telefon – handfest, transparent, aus einer Hand."
        ctas={[
          { label: "Projekt anfragen", href: "/kontakt", variant: "default" },
          { label: "Pakete ansehen", href: "#pakete", variant: "outline" },
        ]}
        variant="navy"
      />

      <TrustBar items={HANDWERK_STATS} />

      {/* 02: PROBLEM – 76%-Statistik im Subtitle, Karten ausgeglichen */}
      <Section bg="transparent">
        <SectionHeading
          number="02"
          overline="Das Problem"
          title="Risiko: Stillstand"
          subtitle="Laut Google besuchen 76% der Nutzer, die lokal suchen, innerhalb von 24 Stunden ein Geschäft. Mit unseren 50+ Landingpages sorgen wir dafür, dass du gefunden wirst."
          align="left"
          light
        />
        <HandwerkProblemWithRevealSection />
        <nav aria-label="Weiterfuehrende Links Handwerk" className="mt-6 text-sm text-white/60">
          <Link href="/ratgeber/seo-fuer-handwerker" className="text-brand-cyan hover:underline">
            Wie lokale SEO funktioniert
          </Link>
          {" · "}
          <Link href="/ratgeber/ki-telefonassistent-handwerk" className="text-brand-cyan hover:underline">
            So funktioniert der KI-Telefonassistent
          </Link>
          {" · "}
          <Link href="/standorte" className="text-brand-cyan hover:underline">
            Alle Standorte im Erzgebirge
          </Link>
          {" · "}
          <Link href="/standorte/aue-bad-schlema" className="text-brand-cyan hover:underline">
            Standort Aue-Bad Schlema (Aue)
          </Link>
          {" · "}
          <Link href="/branchen" className="text-brand-cyan hover:underline">
            Alle Branchen-Lösungen
          </Link>
          {" · "}
          <Link href="/branchen/elektriker" className="text-brand-cyan hover:underline">
            Branchen-Seite Elektriker
          </Link>
        </nav>
      </Section>

      {/* 03: MODULES */}
      <Section bg="subtle">
        <SectionHeading
          number="03"
          overline="Ihr Werkzeugkasten"
          title="Digitales Rüsten"
          subtitle="Alles, was Ihr Betrieb digital braucht – in einem verständlichen Paket zusammengefasst."
          align="left"
          light
        />
        <CraftToolboxGrid modules={CRAFT_MODULES} />
      </Section>

      {/* 04: Chat – FAQ (Handwerk) */}
      <ChatSection
        sectionNumber="04"
        overline="Fragen"
        title="Unser"
        titleLine2="Experte"
        subtitle="Unser KI-Chatbot antwortet sofort – stellen Sie Ihre Frage auf Basis unserer Wissensbasis."
        suggestedFaq={FAQ_ITEMS}
        sectionBg="transparent"
      />

      {/* Garantien – Text-Sektion wie Vision & Mission (keine Karten) */}
      <Section bg="subtle">
        <SectionHeading
          number="05"
          overline="Handschlag ausm Erzgebirge"
          title="Garantien & Transparenz"
          subtitle="Festpreis, inkludierter Support, kein Kleingedrucktes."
          align="left"
          light
        />
        <WarumBernebyV3
          items={HANDWERK_GARANTIEN.map((item) => ({
            point: item.title,
            detail: item.description,
          }))}
        />
      </Section>

      {/* 06: Flatrate – Der Digitale Hausmeister (Angebot) */}
      <Section bg="transparent">
        <SectionHeading
          number="06"
          overline="Flatrate"
          title="Der Digitale Hausmeister"
          subtitle="10 Stunden Tech-Support – 12 Monate gültig. Ihr IT-Partner auf Abruf."
          align="left"
          light
        />
        <div className="grid md:grid-cols-2 gap-12 items-center border border-brand-cyan/30 bg-brand-cyan/5 p-8 md:p-12 relative overflow-hidden">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-brand-cyan/10 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-black text-white uppercase leading-none mb-6">
              10er Karte<br />Support
            </h2>
            <ul className="space-y-4 mb-8">
              {[
                "10 Stunden Support inklusive",
                "Gültig für 12 Monate",
                "Web, Office, Design & Notfälle",
                "Express-Ticket bei Problemen",
              ].map((item) => (
                <li key={item} className="flex items-center gap-4 text-white text-lg">
                  <div className="w-1.5 h-1.5 bg-brand-cyan shadow-[0_0_10px_#03f9f9]" />
                  {item}
                </li>
              ))}
            </ul>
            <Button asChild size="lg" className="w-full md:w-auto">
              <Link href="/kontakt">Erstgespräch</Link>
            </Button>
          </div>

          <div className="relative z-10 hidden md:flex items-center justify-center">
            <HausmeisterCardVisual />
          </div>
        </div>
      </Section>

      {SHOW_HANDWERK_REVIEWS_SECTION ? (
        <>
          {/* 07: TESTIMONIALS */}
          <Section bg="subtle">
            <SectionHeading
              number="07"
              overline="Baustellentalk"
              title="Handwerker"
              titleLine2="vertrauen"
              titleLine3="uns"
              subtitle="Was Betriebe aus dem Erzgebirge über die Zusammenarbeit mit uns sagen."
              align="left"
              light
            />
            <TestimonialGrid testimonials={HANDWERK_TESTIMONIALS} />

            <div className="mt-6 flex justify-center">
              <a
                href={SOCIAL_LINKS[3].href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={SOCIAL_LINKS[3].ariaLabel}
                className={cn(
                  "group relative overflow-hidden px-4 py-2.5 flex items-center gap-2.5 cursor-pointer",
                  CONTAINER_A
                )}
              >
                <IconBrandGoogle className="size-4 text-brand-cyan shrink-0 relative z-10" stroke={1.5} />
                <span className="text-xs font-semibold uppercase tracking-widest text-white relative z-10">
                  Bewertungen ansehen
                </span>
              </a>
            </div>
          </Section>
        </>
      ) : null}

      {/* 07: PRICING (ohne Review-Sektion: vorher 08; bg subtle für Wechsel nach 06 transparent) */}
      <Section id="pakete" bg="subtle">
        <SectionHeading
          number="07"
          overline="Investition"
          title="PAKETE"
          titleLine2="& LÖSUNGEN"
          subtitle="Transparente Leistungen – konkretes Angebot im persönlichen Gespräch."
          align="left"
          light
        />
        <PricingCards
          hidePrices
          packages={CRAFT_PACKAGES}
          comparisonRows={[
            { label: "Professionelle Website", inPackages: ["STARTKLAR", "SICHTBAR", "PARTNER"] },
            { label: "50+ Landingpages", inPackages: ["SICHTBAR", "PARTNER"] },
            { label: "KI-Telefonassistent", inPackages: ["PARTNER"] },
          ]}
        />
      </Section>

      {/* 08: PROCESS (ohne Reviews: vorher 09; bg transparent für Wechsel nach Pakete subtle) */}
      <Section bg="transparent">
        <SectionHeading
          number="08"
          overline="Ihr Bauplan"
          title="In 4 Wochen fertig"
          subtitle="Klarer Ablauf, verbindlicher Zeitplan – von der Anfrage bis zur fertigen Website."
          align="left"
          light
        />
        <ProcessSteps steps={PROCESS_STEPS} />
      </Section>

      <div className="w-full h-px bg-brand-cyan/20 shrink-0" role="presentation" aria-hidden="true" />

      {/* CTA */}
      <CtaSection
        headline="Starte dein Upgrade"
        subline="Lass uns deinen Betrieb digitalisieren. Jetzt Termin sichern."
        ctas={[
          { label: "Jetzt Termin vereinbaren", href: "/kontakt" },
          { label: `Anrufen: ${COMPANY.phoneDisplay}`, href: `tel:${COMPANY.phone}` },
        ]}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateFaqSchema(FAQ_ITEMS)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Handwerk", url: "/handwerk" },
          ])),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateHowToSchema(
              PROCESS_STEPS.map((s) => ({ step: s.step, title: s.title, description: s.description })),
              "In 5 Schritten zum Ziel – Berneby Solutions"
            )
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            provider: { "@id": `${SITE_URL}/#organization` },
            name: "Webseiten & Digitalisierung für Handwerker",
            description:
              "Mehr Aufträge, weniger Aufwand: Handwerks-Pakete mit Website, KI-Telefonassistent und Google-Sichtbarkeit.",
            areaServed: { "@type": "AdministrativeArea", name: "Erzgebirgskreis" },
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "Handwerks-Pakete",
              itemListElement: CRAFT_PACKAGES.map((pkg) => ({
                "@type": "Offer",
                name: pkg.name,
                description: pkg.description,
                url: `${SITE_URL}/kontakt`,
              })),
            },
          }),
        }}
      />
    </>
  );
}
