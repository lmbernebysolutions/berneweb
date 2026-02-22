import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import dynamic from "next/dynamic";
import { CtaSection } from "@/components/sections/CtaSection";

const TestimonialGrid = dynamic(
  () => import("@/components/sections/TestimonialGrid").then((m) => ({ default: m.TestimonialGrid })),
  { ssr: true }
);
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  IconArrowRight,
  IconHammer,
  IconDeviceDesktop,
  IconCheck,
  IconX,
  IconPhone,
  IconCurrencyEuro,
  IconStarFilled,
  IconBrandGoogle,
  IconBrandNextjs,
  IconBrandReact,
  IconShoppingBag,
  IconBrandWindows,
  IconRobot,
  IconSearch,
} from "@tabler/icons-react";
import {
  HOME_HERO,
  TRUST_BAR,
  PROBLEMS_SOLUTIONS,
  TWO_PILLARS,
  PROCESS_STEPS,
  COMPANY,
  TECH_STACK,
  HOME_MINI_FAQ,
  PAGE_META,
  OHNE_UNS_ROWS,
  MIT_UNS_ROWS,
  SOCIAL_LINKS,
} from "@/lib/constants";
import { generateFaqSchema } from "@/lib/seo/schema";
import { TechCorners } from "@/components/ui/tech-corners";
import { ReferenzCard } from "@/components/sections/ReferenzenCarousel";
import { MobileSwipeGrid } from "@/components/sections/MobileSwipeGrid";
import { ProblemToSolutionScrollSection } from "@/components/sections/ProblemToSolutionScrollSection";
import { REFERENZEN } from "@/lib/data/referenzen";
const ChatSection = dynamic(
  () => import("@/components/sections/chat-section").then((m) => ({ default: m.ChatSection })),
  { ssr: true }
);

export const metadata: Metadata = {
  title: PAGE_META.home.title,
  description: PAGE_META.home.description,
  alternates: { canonical: "/" },
};

const ICON_MAP: Record<string, React.ElementType> = {
  IconSearch,
  IconPhone,
  IconCurrencyEuro,
};

export default function Home() {
  return (
    <>
      {/* Mobile */}
      <div className="sm:hidden">
        <Hero
          bergVariant="home"
          headline="DEIN DIGITALER"
          headlineLine2="WERKZEUG-"
          headlineLine3="KASTEN"
          accentText={["WERKZEUG-", "KASTEN"]}
          subline="Wir digitalisieren das Erzgebirge. Handfest für Handwerker. Clever für alle anderen. Webseiten, KI-Telefon & IT-Support aus Aue."
          ctas={[
            { label: "Für Handwerker", href: "/handwerk", variant: "default" },
            { label: "Für Tech-Probleme", href: "/tech", variant: "outline" },
          ]}
          variant="navy"
        />
      </div>
      {/* Desktop */}
      <div className="hidden sm:block">
        <Hero
          bergVariant="home"
          headline="DEIN DIGITALER WERKZEUGKASTEN"
          accentText="WERKZEUGKASTEN"
          subline="Wir digitalisieren das Erzgebirge. Handfest für Handwerker. Clever für alle anderen. Webseiten, KI-Telefon & IT-Support aus Aue."
          ctas={[
            { label: "Für Handwerker", href: "/handwerk", variant: "default" },
            { label: "Für Tech-Probleme", href: "/tech", variant: "outline" },
          ]}
          variant="navy"
        />
      </div>

      <TrustBar items={TRUST_BAR} />

      {/* 02: SELECTION */}
      <Section bg="transparent">
        <SectionHeading
          number="02"
          overline="Einstieg"
          title="Zwei Welten. Eine Lösung."
          subtitle="Ob Handwerksbetrieb oder digitales Alltagsproblem – wählen Sie Ihren Bereich."
          align="left"
          light // Because background is navy (transparent on body)
        />
        <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:gap-12">
          {/* Handwerk */}
          <div
            data-animate="fade-left"
            className="group relative flex flex-col overflow-hidden border border-brand-cyan/30 bg-brand-navy/60 backdrop-blur-md p-6 sm:p-8 transition-colors"
          >
            {/* Tech Corners - 2→4 diagonal pattern */}
            <TechCorners pattern="diagonal" variant="cyan" size="lg" animate />

            <div className="mb-6 flex h-14 w-14 items-center justify-center bg-brand-navy shadow-[4px_4px_0_0_rgba(3,249,249,0.2)]" aria-hidden="true">
              <IconHammer className="size-8 text-brand-cyan" stroke={1.5} />
            </div>

            <h3 className="text-2xl text-white mb-2">{TWO_PILLARS.handwerk.title}</h3>
            <p className="text-blue-200 mb-6 leading-relaxed">
              {TWO_PILLARS.handwerk.description}
            </p>

            <ul className="space-y-3 mb-8 grow">
              {TWO_PILLARS.handwerk.features.map((f) => (
                <li key={f} className="flex items-center gap-3 text-sm text-white/80">
                  <span className="w-1.5 h-1.5 bg-brand-cyan" />
                  {f}
                </li>
              ))}
            </ul>

            <div className="space-y-3">
              <Button asChild className="w-full">
                <Link href={TWO_PILLARS.handwerk.cta.href}>
                  {TWO_PILLARS.handwerk.cta.label}
                </Link>
              </Button>
              <p className="text-xs text-brand-navy-muted">
                <Link href="/ratgeber/digitalisierung-handwerk" className="text-brand-cyan/80 hover:text-brand-cyan">
                  Ratgeber: Digitalisierung im Handwerk →
                </Link>
              </p>
            </div>
          </div>

          {/* General Tech */}
          <div
            data-animate="fade-right"
            className="group relative flex flex-col overflow-hidden border border-brand-cyan/30 bg-brand-navy/60 backdrop-blur-md p-6 sm:p-8 transition-colors"
          >
            {/* Tech Corners - 2→4 diagonal pattern */}
            <TechCorners pattern="diagonal" variant="cyan" size="lg" animate />

            <div className="mb-6 flex h-14 w-14 items-center justify-center bg-brand-navy shadow-[4px_4px_0_0_rgba(3,249,249,0.2)]" aria-hidden="true">
              <IconDeviceDesktop className="size-8 text-brand-cyan" stroke={1.5} />
            </div>

            <h3 className="text-2xl text-white mb-2">{TWO_PILLARS.general.title}</h3>
            <p className="text-blue-200 mb-6 leading-relaxed">
              {TWO_PILLARS.general.description}
            </p>

            <ul className="space-y-3 mb-8 grow">
              {TWO_PILLARS.general.features.map((f) => (
                <li key={f} className="flex items-center gap-3 text-sm text-white/80">
                  <span className="w-1.5 h-1.5 bg-brand-cyan" />
                  {f}
                </li>
              ))}
            </ul>

            <div className="space-y-3">
              <Button asChild variant="outline" className="w-full border-brand-cyan text-brand-cyan hover:bg-brand-cyan hover:text-brand-navy">
                <Link href={TWO_PILLARS.general.cta.href}>
                  {TWO_PILLARS.general.cta.label}
                </Link>
              </Button>
              <p className="text-xs text-brand-navy-muted">
                <Link href="/ratgeber/microsoft-365-fuer-handwerker" className="text-brand-cyan/80 hover:text-brand-cyan">
                  Microsoft 365 für Ihren Betrieb →
                </Link>
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* 03: COMPARISON */}
      <Section bg="subtle">
        <SectionHeading
          number="03"
          overline="Handwerk & Digital"
          title="Ohne uns vs. Mit uns"
          subtitle="Ein direkter Vergleich: was sich ändert, wenn wir Ihren digitalen Auftritt übernehmen."
          align="left"
          light
        />
        {/* Mobile: scroll-driven Problem → Solution morph */}
        <div className="md:hidden">
          <ProblemToSolutionScrollSection />
        </div>
        <div className="max-md:hidden grid gap-6 sm:gap-8 md:grid-cols-2 lg:gap-12">
          {/* Legacy System: Ohne Uns */}
          <div className="group relative border-2 border-white/5 bg-black/30 p-6 sm:p-8 backdrop-blur-sm overflow-hidden transition-colors hover:border-white/10" data-animate="fade-left">
            {/* Tech Corners - all 4 corners pattern */}
            <TechCorners pattern="all" variant="navy" size="lg" />

            {/* Diagonal stripe pattern for "warning" feel */}
            <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
              backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.03) 10px, rgba(255,255,255,0.03) 20px)'
            }} />

            {/* Corner Labels */}
            <div className="absolute top-0 right-0 border-b-2 border-l-2 border-white/10 bg-black/40 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-white/40 z-20">
              STATUS_OFFLINE
            </div>

            <div className="mb-10 flex items-center justify-between relative z-10">
              <h3 className="text-3xl font-bold uppercase tracking-tighter text-white/60">Ohne Uns</h3>
              <div className="flex h-10 w-10 items-center justify-center border-2 border-white/20 bg-white/5">
                <IconX className="size-6 text-white/40" stroke={3} />
              </div>
            </div>

            <div className="space-y-4 relative z-10">
              {OHNE_UNS_ROWS.map((item) => (
                <div key={item.label} className="border-l-2 border-white/10 bg-white/[0.02] p-4">
                  <div className="flex justify-between font-mono text-[10px] uppercase tracking-widest text-white/30">
                    <span>{item.label}</span>
                    <span className="text-white/20">PROBLEM: {item.risk}</span>
                  </div>
                  <p className="mt-1 font-medium text-brand-navy-muted">{item.val}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Optimized System: Mit Uns */}
          <div className="group relative border-2 border-brand-cyan/30 bg-brand-cyan/5 p-6 sm:p-8 backdrop-blur-sm shadow-[0_0_60px_rgba(3,249,249,0.15)] overflow-hidden transition-all hover:shadow-[0_0_80px_rgba(3,249,249,0.25)] hover:border-brand-cyan/50" data-animate="fade-right">
            {/* Tech Corners - all 4 corners pattern */}
            <TechCorners pattern="all" variant="cyan" size="lg" animate />

            {/* Animated grid background */}
            <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
              backgroundImage: 'linear-gradient(rgba(3,249,249,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(3,249,249,0.1) 1px, transparent 1px)',
              backgroundSize: '20px 20px'
            }} />

            {/* Corner Labels */}
            <div className="absolute top-0 right-0 border-b-2 border-l-2 border-brand-cyan/40 bg-brand-cyan/20 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-brand-cyan z-20 shadow-[0_0_10px_rgba(3,249,249,0.3)]">
              SYSTEM_ONLINE
            </div>

            <div className="mb-10 flex items-center justify-between relative z-10">
              <h3 className="text-3xl font-bold uppercase tracking-tighter text-brand-cyan drop-shadow-[0_0_10px_rgba(3,249,249,0.5)]">Mit Uns</h3>
              <div className="flex h-10 w-10 items-center justify-center border-2 border-brand-cyan bg-brand-cyan/20 shadow-[0_0_20px_rgba(3,249,249,0.4)]" aria-hidden="true">
                <IconCheck className="size-6 text-brand-cyan" stroke={3} />
              </div>
            </div>

            <div className="space-y-4 relative z-10">
              {MIT_UNS_ROWS.map((item) => (
                <div key={item.label} className="relative border-l-2 border-brand-cyan bg-brand-cyan/10 p-4">
                  <div className="flex justify-between font-mono text-[10px] uppercase tracking-widest text-brand-cyan">
                    <span>{item.label}</span>
                    <span className="flex items-center gap-1.5">
                      <div className="h-1.5 w-1.5 animate-pulse bg-brand-cyan rounded-full shadow-[0_0_6px_rgba(3,249,249,0.8)]" />
                      BOOST: {item.gain}
                    </span>
                  </div>
                  <p className="mt-1 font-bold text-white">{item.val}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* 04: PROCESS */}
      <Section bg="transparent">
        <SectionHeading
          number="04"
          overline="Prozess"
          title="In 5 Schritten zum Ziel"
          subtitle="Von der ersten Anfrage bis zur fertigen Website – strukturiert, verbindlich und ohne Überraschungen."
          align="left"
          light
        />
        <ProcessSteps steps={PROCESS_STEPS} />
      </Section>

      {/* 05: TESTIMONIALS */}
      <Section bg="subtle">
        <SectionHeading
          number="05"
          overline="Success Stories"
          title="Das sagt das Erzgebirge"
          subtitle="Echte Rückmeldungen von Betrieben aus der Region, die wir begleiten durften."
          align="left"
          light
        />
        <TestimonialGrid
          testimonials={[
            { name: "Anne-Karen Voigt", role: "Ergotherapie", text: "Professionelles, nettes Team – zügig und unkompliziert. Moderne, patientenfreundliche Website. Immer wieder gerne!", result: "Website für Praxis" },
            { name: "Sylvia Schirmer", role: "Arztpraxis", text: "Hervorragende Arbeit: moderne, intuitive und patientenfreundliche Website. Unkomplizierte Zusammenarbeit, Änderungen umgehend. Wärmstens weiterempfehlen!", result: "Website-Relaunch" },
          ]}
        />
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

      {/* 06: Partner / Technologien */}
      <Section bg="transparent">
        <SectionHeading
          number="06"
          overline="Tech & Werkzeuge"
          title="TECH - STACK"
          subtitle="Moderne Stacks, klare Ergebnisse."
          align="left"
          light
        />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 lg:gap-8">
          {TECH_STACK.map((item, i) => {
            const Icon = {
              "Next.js": IconBrandNextjs,
              "React": IconBrandReact,
              "Shopware": IconShoppingBag,
              "Microsoft 365": IconBrandWindows,
              "SEO & GEO": IconSearch,
              "KI-Integration": IconRobot,
            }[item] || IconDeviceDesktop;

            return (
              <div
                key={item}
                data-animate="fade-up"
                data-animate-delay={String(i * 60)}
                className="group relative overflow-hidden border border-white/10 bg-brand-navy/60 p-4 sm:p-5 backdrop-blur-md transition-all hover:border-brand-cyan/20 card-hover-glow"
              >
                <TechCorners pattern="diagonal" variant="cyan" size="md" animate />
                <div className="relative z-10 flex items-center justify-center gap-3">
                  <Icon className="size-5 text-brand-cyan shrink-0" stroke={1.5} />
                  <p className="text-sm font-bold uppercase tracking-wider text-white whitespace-nowrap">
                    {item}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      {/* 07: Referenzen – 1:1 wie /referenzen */}
      <Section bg="subtle">
        <SectionHeading
          number="07"
          overline="Case Studies"
          title="Projekte &"
          titleLine2="Ergebnisse"
          subtitle="Von der ersten Idee bis zur messbaren Wirkung – transparent und direkt."
          align="left"
          light
        />
        <MobileSwipeGrid gridClassName="grid gap-6 md:grid-cols-2" slideMinWidth="min-w-[90%] sm:min-w-[75%]">
          {REFERENZEN.slice(0, 2).map((ref) => (
            <ReferenzCard key={ref.id} referenz={ref} featured={false} compact />
          ))}
        </MobileSwipeGrid>
        <p className="mt-6 text-center">
          <Link
            href="/referenzen"
            className="text-sm font-mono uppercase tracking-widest text-brand-cyan hover:text-brand-cyan/80 transition-colors"
          >
            Alle Referenzen ansehen →
          </Link>
        </p>
      </Section>

      {/* 08: Chat – FAQ */}
      <ChatSection
        sectionNumber="08"
        overline="Fragen"
        title="Unser"
        titleLine2="Experte"
        subtitle="Unser KI-Chatbot antwortet sofort – stellen Sie Ihre Frage auf Basis unserer Wissensbasis."
        suggestedFaq={HOME_MINI_FAQ}
        sectionBg="transparent"
      />

      <div className="w-full h-px bg-brand-cyan/20 shrink-0" role="presentation" aria-hidden="true" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateFaqSchema(HOME_MINI_FAQ)),
        }}
      />

      {/* CTA Section */}
      <CtaSection
        headline="Bereit für das Upgrade?"
        subline="Lassen Sie uns Ihr Unternehmen auf das nächste Level heben."
        ctas={[
          { label: "Termin sichern", href: "/kontakt" },
        ]}
      />
    </>
  );
}
