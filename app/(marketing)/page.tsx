import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/sections/SectionHeading";
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
  IconHammer,
  IconDeviceDesktop,
  IconShoppingCart,
  IconTool,
  IconChartBar,
  IconCheck,
  IconX,
  IconArrowRight,
  IconBrandGoogle,
  IconBrandNextjs,
  IconBrandReact,
  IconBrandWindows,
  IconBrandAdobe,
  IconRobot,
} from "@tabler/icons-react";
import {
  TRUST_BAR,
  SERVICES,
  HOME_STANDARD_SERVICE_KEYS,
  HANDWERK_SPECIALTY,
  PROCESS_STEPS,
  TECH_STACK_WITH_BENEFIT,
  HOME_MINI_FAQ,
  PAGE_META,
  OHNE_UNS_ROWS,
  MIT_UNS_ROWS,
  SOCIAL_LINKS,
} from "@/lib/constants";
import { CursorLogo } from "@/components/ui/cursor-logo";
import { generateFaqSchema } from "@/lib/seo/schema";
import { TechCorners } from "@/components/ui/tech-corners";
import { ReferenzCard } from "@/components/sections/ReferenzenCarousel";
import { MobileSwipeGrid } from "@/components/sections/MobileSwipeGrid";
import { ProblemToSolutionScrollSection } from "@/components/sections/ProblemToSolutionScrollSection";
import { REFERENZEN } from "@/lib/data/referenzen";
import { CONTAINER_A, CONTAINER_A_STATIC, CONTAINER_B } from "@/lib/container-styles";
import { cn } from "@/lib/utils";

const ChatSection = dynamic(
  () => import("@/components/sections/chat-section").then((m) => ({ default: m.ChatSection })),
  { ssr: true }
);

export const metadata: Metadata = {
  title: PAGE_META.home.title,
  description: PAGE_META.home.description,
  alternates: { canonical: "/" },
};

/**
 * Icon-Map für die 4 Standard-Service-Cards in Sektion 02.
 * Identisch zu TECH_ICONS auf /leistungen – nur die 4 auf Home relevanten Keys.
 */
const HOME_SERVICE_ICONS = {
  webseiten: IconDeviceDesktop,
  ecommerce: IconShoppingCart,
  office: IconTool,
  marketing: IconChartBar,
} as const satisfies Record<(typeof HOME_STANDARD_SERVICE_KEYS)[number], typeof IconDeviceDesktop>;

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
          subline="Webseiten, Online-Shops, IT-Support, Marketing und KI-Telefon\naus einer Hand für KMU im Erzgebirge."
          ctas={[
            { label: "Erstgespräch sichern", mobileLabel: "Erstgespräch", href: "/kontakt", variant: "default" },
            { label: "Alle Leistungen", href: "/leistungen", variant: "outline" },
          ]}
          audiencePill={{
            label: "Handwerksbetrieb? Spezielle Pakete für dich",
            mobileLabel: "Für Handwerk: Spezialpakete",
            href: "/handwerk",
          }}
          variant="navy"
        />
      </div>
      {/* Desktop */}
      <div className="hidden sm:block">
        <Hero
          bergVariant="home"
          headline="DEIN DIGITALER WERKZEUGKASTEN"
          accentText="WERKZEUGKASTEN"
          subline="Webseiten, Online-Shops, IT-Support, Marketing und KI-Telefon\naus einer Hand für KMU im Erzgebirge."
          ctas={[
            { label: "Erstgespräch sichern", href: "/kontakt", variant: "default" },
            { label: "Alle Leistungen", href: "/leistungen", variant: "outline" },
          ]}
          audiencePill={{
            label: "Handwerksbetrieb? Spezielle Pakete für dich",
            mobileLabel: "Für Handwerk: Spezialpakete",
            href: "/handwerk",
          }}
          variant="navy"
        />
      </div>

      <TrustBar items={TRUST_BAR} />

      {/* 02: STANDARD-LEISTUNGEN (2×2) + HANDWERK-SPEZIALFALL */}
      <Section bg="transparent">
        <SectionHeading
          number="02"
          overline="Katalog"
          title="Digitales Werkzeug-Set"
          subtitle="Unsere Standard-Leistungen – für KMU aller Branchen im Erzgebirge."
          align="left"
          light
        />

        <div className="grid gap-6 md:grid-cols-2">
          {HOME_STANDARD_SERVICE_KEYS.map((key, i) => {
            const category = SERVICES[key];
            const Icon = HOME_SERVICE_ICONS[key];
            const visibleItems = category.items.filter(
              (item) => item.title !== "Digitaler Hausmeister"
            );
            return (
              <div
                key={key}
                data-animate="fade-up"
                data-animate-delay={String(i * 80)}
                className={cn(
                  "group relative flex flex-col overflow-hidden",
                  CONTAINER_B
                )}
              >
                <TechCorners pattern="diagonal" variant="cyan" size="lg" animate />

                <div className="absolute top-0 right-0 p-4 opacity-10" aria-hidden="true">
                  <Icon className="size-24 text-white" />
                </div>

                <div className="border-b border-white/5 p-6 flex items-center gap-4 relative z-10">
                  <div className="flex h-12 w-12 items-center justify-center bg-brand-cyan/10 text-brand-cyan">
                    <Icon className="size-6" />
                  </div>
                  <h3 className="font-bold text-lg text-white uppercase tracking-wider">{category.title}</h3>
                </div>
                <div className="p-6 flex flex-col grow gap-4 relative z-10">
                  {visibleItems.map((item) => (
                    <div key={item.title} className="group/item relative">
                      <TechCorners pattern="all" variant="cyan" size="sm" />
                      <div className="flex justify-between items-baseline px-4 py-2 transition-colors group-hover/item:bg-brand-cyan/5">
                        <h4 className="font-medium text-xs text-white/90 uppercase tracking-wider">{item.title}</h4>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-auto p-6 pt-0 relative z-10">
                  <Button asChild variant="ghost" className="w-full justify-between text-brand-navy-muted hover:text-brand-cyan hover:bg-transparent px-0 uppercase tracking-widest text-xs">
                    <Link href="/kontakt">
                      Jetzt anfragen <IconArrowRight className="size-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/leistungen"
            className="text-sm font-mono uppercase tracking-widest text-brand-cyan hover:text-brand-cyan/80 transition-colors"
          >
            Alle Leistungen ansehen →
          </Link>
        </div>

        {/* Spezialfall Handwerk – visuell deutlich abgesetzt */}
        <div
          data-animate="fade-up"
          className={cn(
            "group relative mt-8 md:mt-10 overflow-hidden p-6 sm:p-8 md:p-10",
            CONTAINER_B
          )}
        >
          <TechCorners pattern="diagonal" variant="cyan" size="lg" animate />

          <div className="relative z-10 grid gap-6 md:grid-cols-[1fr_auto] md:items-end lg:gap-10">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand-cyan">
                {HANDWERK_SPECIALTY.eyebrow}
              </p>
              <h3 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tighter text-white leading-[1.05]">
                {HANDWERK_SPECIALTY.title}
              </h3>
              <p className="mt-4 text-base text-blue-200 leading-relaxed">
                {HANDWERK_SPECIALTY.description}
              </p>
              <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                {HANDWERK_SPECIALTY.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2.5 text-sm text-white/85">
                    <span className="mt-2 size-1.5 shrink-0 bg-brand-cyan shadow-[0_0_6px_rgba(3,249,249,0.8)]" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:pb-1 flex flex-col items-center justify-center gap-5 sm:gap-6 md:gap-7 pt-2 sm:pt-4">
              <div className="hidden md:block opacity-[0.06] pointer-events-none" aria-hidden="true">
                <IconHammer className="size-36 text-white" stroke={1} />
              </div>
              <Button asChild size="lg">
                <Link href={HANDWERK_SPECIALTY.cta.href}>
                  <span className="inline min-[840px]:hidden">Handwerks-Pakete</span>
                  <span className="hidden min-[840px]:inline">{HANDWERK_SPECIALTY.cta.label}</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* 03: COMPARISON */}
      <Section bg="subtle">
        <SectionHeading
          number="03"
          overline="Systemwechsel"
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
          <div className={cn("relative p-6 sm:p-8 backdrop-blur-sm overflow-hidden", CONTAINER_A_STATIC)} data-animate="fade-left">

            <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
              backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.03) 10px, rgba(255,255,255,0.03) 20px)'
            }} />

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
                    <span className="text-white/20">— {item.risk}</span>
                  </div>
                  <p className="mt-1 font-medium text-brand-navy-muted">{item.val}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Optimized System: Mit Uns */}
          <div className={cn("group relative p-6 sm:p-8 backdrop-blur-sm overflow-hidden", CONTAINER_B)} data-animate="fade-right">
            <TechCorners pattern="diagonal" variant="cyan" size="lg" animate />

            <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)',
              backgroundSize: '20px 20px'
            }} />

            <div className="mb-10 flex items-center justify-between relative z-10">
              <h3 className="text-3xl font-bold uppercase tracking-tighter text-brand-cyan">Mit Uns</h3>
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
                      ↑ {item.gain}
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
          overline="Erfolgsgeschichten"
          title="Das sagt das Erzgebirge"
          subtitle="Echte Rückmeldungen von Betrieben aus der Region, die wir begleiten durften."
          align="left"
          light
        />
        <TestimonialGrid
          testimonials={[
            { name: "Anne-Karen Voigt", role: "Ergotherapie", text: "Junges, motiviertes Team – professionell und zügig. Unkompliziert, Änderungen sofort umgesetzt. Patienten loben die neue Website. Weiterempfehlen, gerne wieder!", result: "Website für Praxis" },
            { name: "Sylvia Schirmer", role: "Arztpraxis", text: "Hervorragende Arbeit: moderne, intuitive und patientenfreundliche Website. Unkomplizierte Zusammenarbeit, Änderungen umgehend. Wärmstens weiterempfehlen!", result: "Website-Relaunch" },
          ]}
        />
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

      {/* 06: Partner / Technologien */}
      <Section bg="transparent">
        <SectionHeading
          number="06"
          overline="Werkzeuge"
          title="Technik-Set"
          subtitle="Moderne Technik, klare Ergebnisse."
          align="left"
          light
        />
        {/* Layout 1:1 wie Sektion Technik-Set auf /leistungen (Grid, Padding, Typo) */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6">
          {TECH_STACK_WITH_BENEFIT.map((item, i) => {
            const Icon = {
              "Next.js": IconBrandNextjs,
              "React": IconBrandReact,
              "Cursor": CursorLogo,
              "Microsoft 365": IconBrandWindows,
              "Adobe": IconBrandAdobe,
              "KI-Integration": IconRobot,
            }[item.name] || IconDeviceDesktop;

            return (
              <div
                key={item.name}
                data-animate="fade-up"
                data-animate-delay={String(i * 60)}
                className={cn(
                  "group relative overflow-hidden p-4 sm:p-5 backdrop-blur-md",
                  CONTAINER_A
                )}
              >
                <div className="relative z-10 flex flex-col gap-2">
                  <div className="flex flex-col items-center justify-center gap-2 text-center sm:flex-row sm:gap-3">
                    <Icon className="size-5 shrink-0 text-brand-cyan sm:size-6" stroke="1.5" />
                    <p className="text-base font-bold uppercase tracking-tight text-white sm:text-lg">
                      {item.name}
                    </p>
                  </div>
                  <p className="text-center text-sm leading-relaxed text-white/70 sm:text-base">
                    {item.benefit}
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
          overline="Fallstudien"
          title="Projekte &"
          titleLine2="Ergebnisse"
          subtitle="Von der ersten Idee bis zur messbaren Wirkung – transparent und direkt."
          align="left"
          light
        />
        <div className="md:max-w-4xl lg:max-w-5xl md:mx-auto">
          <div className="md:hidden">
            <MobileSwipeGrid gridClassName="grid gap-6" slideMinWidth="min-w-[90%] sm:min-w-[75%]">
              {REFERENZEN.slice(0, 2).map((ref) => (
                <ReferenzCard key={ref.id} referenz={ref} featured={false} compact />
              ))}
            </MobileSwipeGrid>
          </div>
          <div className="hidden md:grid md:grid-cols-2 md:gap-6">
            {REFERENZEN.slice(0, 2).map((ref) => (
              <ReferenzCard key={ref.id} referenz={ref} featured={false} compact />
            ))}
          </div>
        </div>
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
        subline="Lass uns dein Unternehmen auf das nächste Level heben."
        ctas={[
          { label: "Termin sichern", href: "/kontakt" },
        ]}
      />
    </>
  );
}
