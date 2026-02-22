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
import { MobileSwipeGrid } from "@/components/sections/MobileSwipeGrid";

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
import {
  IconArrowRight,
  IconCheck,
  IconStarFilled,
  IconBrandGoogle,
} from "@tabler/icons-react";
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
} from "@/lib/constants";
import { generateFaqSchema, generateBreadcrumbSchema, generateHowToSchema } from "@/lib/seo/schema";
import { HandwerkProblemWithRevealSection } from "@/components/sections/HandwerkProblemWithRevealSection";
import { TechCorners } from "@/components/ui/tech-corners";

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
        headline="AUFTRAG VOLL? BÜRO LEER"
        accentText="BÜRO LEER"
        subline="Wir digitalisieren das Erzgebirge. Handfest für Handwerker. Clever für alle anderen. Webseiten, KI-Telefon & IT-Support aus Aue."
        ctas={[
          { label: "Pakete ansehen", href: "#pakete", variant: "default" },
          { label: "Kostenlos beraten lassen", href: "/kontakt", variant: "outline" },
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
          subtitle="Laut Google besuchen 76% der Nutzer, die lokal suchen, innerhalb von 24 Stunden ein Geschäft. Mit unseren 50+ Landingpages sorgen wir dafür, dass SIE gefunden werden."
          align="left"
          light
        />
        <HandwerkProblemWithRevealSection />
        <p className="mt-6 text-sm text-white/60">
          <Link href="/ratgeber/seo-fuer-handwerker" className="text-brand-cyan hover:underline">
            Wie lokale SEO funktioniert
          </Link>
          {" · "}
          <Link href="/ratgeber/ki-telefonassistent-handwerk" className="text-brand-cyan hover:underline">
            So funktioniert der KI-Telefonassistent
          </Link>
        </p>
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

      {/* Garantien */}
      <Section bg="subtle">
        <SectionHeading
          number="05"
          overline="Handschlag ausm Erzgebirge"
          title="Garantien & Transparenz"
          subtitle="Festpreis, inkludierter Support, kein Kleingedrucktes."
          align="left"
          light
        />
        <MobileSwipeGrid gridClassName="grid gap-6 md:grid-cols-3 md:items-stretch" slideMinWidth="min-w-[88%] sm:min-w-[70%]">
          {HANDWERK_GARANTIEN.map((item, i) => (
            <div
              key={item.title}
              data-animate="fade-up"
              data-animate-delay={String(i * 80)}
              className="group relative flex flex-col overflow-hidden border border-white/10 bg-brand-navy/60 p-4 sm:p-6 backdrop-blur-md transition-all hover:border-brand-cyan/20 card-hover-glow h-full min-w-0 w-full"
            >
              <TechCorners pattern="diagonal" variant="cyan" size="lg" />
              <div className="relative z-10 flex flex-1 flex-col items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-brand-cyan/30 bg-brand-cyan/10" aria-hidden="true">
                  <IconCheck className="size-5 text-brand-cyan" stroke={2.5} />
                </div>
                <div className="min-h-[4.5rem] flex-1">
                  <h3 className="font-bold uppercase tracking-wider text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </MobileSwipeGrid>
      </Section>

      {/* 06: Flatrate – Der Digitale Hausmeister (Angebot) */}
      <Section bg="transparent">
        <SectionHeading
          number="06"
          overline="Flatrate"
          title="Der Digitale Hausmeister"
          subtitle="10 Stunden Tech-Support für 850 € – 12 Monate gültig. Ihr IT-Partner auf Abruf."
          align="left"
          light
        />
        <div className="grid md:grid-cols-2 gap-12 items-center border border-brand-cyan/30 bg-brand-cyan/5 p-8 md:p-12 relative overflow-hidden">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-brand-cyan/10 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

          <div className="relative z-10">
            <div className="mb-6 inline-flex items-center border border-brand-warm bg-brand-warm px-4 py-1 text-xs font-bold text-brand-navy uppercase tracking-widest">
              Best Seller
            </div>
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
            <div className="flex items-baseline gap-4 mb-8">
              <span className="text-4xl font-bold text-brand-warm">850 €</span>
              <span className="text-sm font-mono text-brand-navy-muted">netto / Paket</span>
            </div>
            <Button asChild size="lg" className="bg-brand-cyan text-brand-navy hover:bg-brand-cyan/90 w-full md:w-auto">
              <Link href="/kontakt">Karte sichern</Link>
            </Button>
          </div>

          <div className="relative z-10 hidden md:flex items-center justify-center">
            <div className="w-64 h-80 border-2 border-white/10 relative">
              <div className="absolute top-4 left-4 right-4 h-32 bg-white/5" />
              <div className="absolute bottom-4 left-4 right-4 h-2 bg-brand-cyan/50" />
              <div className="absolute bottom-8 left-4 w-12 h-1 bg-white/10" />
              <div className="absolute bottom-8 left-18 w-12 h-1 bg-white/10" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[-15deg] border-4 border-brand-cyan p-4 bg-brand-navy text-brand-cyan font-black text-4xl uppercase tracking-tighter">
                SOLD
              </div>
            </div>
          </div>
        </div>
      </Section>

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

        {/* Google-Profil – ein einziger Link, Peak-Trust-Moment */}
        <div className="mt-6 flex justify-center">
          <a
            href={SOCIAL_LINKS[3].href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={SOCIAL_LINKS[3].ariaLabel}
            className="group relative overflow-hidden border border-white/10 bg-white/[0.03] px-4 py-2.5 flex items-center gap-2.5 transition-all hover:border-brand-cyan/40 hover:bg-brand-cyan/5 hover:shadow-[0_0_10px_rgba(3,249,249,0.1)] cursor-pointer"
          >
            <TechCorners pattern="diagonal" variant="cyan" size="sm" />
            <IconBrandGoogle className="size-4 text-brand-cyan shrink-0 relative z-10" stroke={1.5} />
            <span className="text-xs font-semibold uppercase tracking-widest text-white relative z-10">
              Bewertungen ansehen
            </span>
          </a>
        </div>
      </Section>

      {/* 08: PRICING */}
      <Section id="pakete" bg="transparent">
        <SectionHeading
          number="08"
          overline="Investition"
          title="PAKETE"
          titleLine2="& PREISE"
          subtitle="Netto. Transparent. Ohne versteckte Kosten."
          align="left"
          light
        />
        <PricingCards
          packages={CRAFT_PACKAGES}
          comparisonRows={[
            { label: "Professionelle Website", inPackages: ["Geselle", "Meisterbetrieb", "Marktführer"] },
            { label: "50+ Landingpages", inPackages: ["Meisterbetrieb", "Marktführer"] },
            { label: "KI-Telefonassistent", inPackages: ["Marktführer"] },
          ]}
        />
      </Section>

      {/* 09: PROCESS */}
      <Section bg="subtle">
        <SectionHeading
          number="09"
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
        headline="Starten Sie das Upgrade"
        subline="Lassen Sie uns Ihren Betrieb digitalisieren. Jetzt Termin sichern."
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
            provider: { "@id": "https://berneby.de/#organization" },
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
                price: pkg.price.replace(/\./g, ""),
                priceCurrency: "EUR",
              })),
            },
          }),
        }}
      />
    </>
  );
}
