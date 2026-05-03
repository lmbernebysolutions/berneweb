import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { CtaSection } from "@/components/sections/CtaSection";
import { HausmeisterCardVisual } from "@/components/sections/HausmeisterCardVisual";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
    IconDeviceDesktop,
    IconShoppingCart,
    IconBrush,
    IconTool,
    IconChartBar,
    IconShield,
    IconArrowRight,
    IconBrandGoogle,
    IconBrandNextjs,
    IconBrandReact,
    IconBrandWindows,
    IconRobot,
    IconBrandAdobe,
} from "@tabler/icons-react";
import { SERVICES, COMPANY, FAQ_ITEMS, PROCESS_STEPS, TECH_STACK_WITH_BENEFIT, TECH_STATS, TECH_TESTIMONIALS, PAGE_META, SOCIAL_LINKS, SITE_URL } from "@/lib/constants";
// Hinweis: Interner Konstantenschlüssel bleibt „TECH_*" für Kontinuität der Daten;
// die User-facing URL lautet seit 2025-Q2 /leistungen.
import dynamic from "next/dynamic";
import { generateFaqSchema, generateBreadcrumbSchema } from "@/lib/seo/schema";
import { TrustBar } from "@/components/sections/TrustBar";
import { MissionSection } from "@/components/sections/MissionSection";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { TechCorners } from "@/components/ui/tech-corners";
import { CONTAINER_A, CONTAINER_B } from "@/lib/container-styles";
import { cn } from "@/lib/utils";
import { CursorLogo } from "@/components/ui/cursor-logo";

const ChatSection = dynamic(
  () => import("@/components/sections/chat-section").then((m) => ({ default: m.ChatSection })),
  { ssr: true }
);
const TestimonialGrid = dynamic(
  () => import("@/components/sections/TestimonialGrid").then((m) => ({ default: m.TestimonialGrid })),
  { ssr: true }
);

export const metadata: Metadata = {
  title: PAGE_META.leistungen.title,
  description: PAGE_META.leistungen.description,
  alternates: { canonical: "/leistungen" },
};

const TECH_ICONS: Record<string, (typeof IconDeviceDesktop)> = {
    webseiten: IconDeviceDesktop,
    ecommerce: IconShoppingCart,
    design: IconBrush,
    office: IconTool,
    marketing: IconChartBar,
    wartung: IconShield,
};

export default function TechPage() {
    return (
        <>
            {/* Mobile: Hyphen raus, "ABTEILUNG" auf eigener Zeile — nie mid-word Split */}
            <div className="sm:hidden">
                <Hero
                    bergVariant="tech"
                    headline="DEINE EXTERNE IT"
                    headlineLine2="ABTEILUNG"
                    accentText={["ABTEILUNG"]}
                    ultraNarrowHeadlineLines={["DEINE", "EXTERNE IT", "ABTEILUNG"]}
                    subline="Flexibel. Auf Abruf. Ohne Festanstellung. Von der neuen Webseite über Shops bis IT-Support – wir bauen und betreuen."
                    ctas={[
                        { label: "Webseite anfragen", href: "/kontakt", variant: "default" },
                        { label: "Alle Leistungen", href: "#leistungen", variant: "outline" },
                    ]}
                    variant="cyan"
                />
            </div>
            {/* Desktop/Tablet: unverändert mit "IT-ABTEILUNG" als Einheit */}
            <div className="hidden sm:block">
                <Hero
                    bergVariant="tech"
                    headline="DEINE EXTERNE IT-ABTEILUNG"
                    accentText={["IT-ABTEILUNG", "ABTEILUNG"]}
                    subline="Flexibel. Auf Abruf. Ohne Festanstellung. Von der neuen Webseite über Shops bis IT-Support – wir bauen und betreuen."
                    ctas={[
                        { label: "Webseite anfragen", href: "/kontakt", variant: "default" },
                        { label: "Alle Leistungen", href: "#leistungen", variant: "outline" },
                    ]}
                    variant="cyan"
                />
            </div>

            <TrustBar items={TECH_STATS} />

            {/* 02: Mission – GEO-Statistik in Subtitle integriert */}
            <Section bg="transparent">
                <SectionHeading
                    number="02"
                    overline="Mission"
                    title="Kein Bullshit."
                    titleLine2="Nur Lösungen."
                    subtitle="Große Systemhäuser sind zu teuer, der Neffe vom Chef hat keine Zeit. Wir sind dein digitaler Hausmeister."
                    align="left"
                    light
                />
                <MissionSection variant="a" />
                <nav aria-label="Weiterfuehrende Links Leistungen" className="mt-8 text-sm text-white/60">
                    <Link href="/ratgeber/microsoft-365-fuer-handwerker" className="text-brand-cyan hover:underline">
                        Microsoft 365 für Ihren Betrieb
                    </Link>
                    {" · "}
                    <Link href="/standorte" className="text-brand-cyan hover:underline">
                        Alle Standorte im Erzgebirge
                    </Link>
                    {" · "}
                    <Link href="/standorte/annaberg-buchholz" className="text-brand-cyan hover:underline">
                        Webdesign in Annaberg-Buchholz
                    </Link>
                    {" · "}
                    <Link href="/branchen" className="text-brand-cyan hover:underline">
                        Lösungen nach Branche
                    </Link>
                    {" · "}
                    <Link href="/branchen/sanitaer-heizung" className="text-brand-cyan hover:underline">
                        Lösung für Sanitär & Heizung
                    </Link>
                </nav>
            </Section>

            {/* 03: Services Grid */}
            <Section id="leistungen" bg="subtle">
                <SectionHeading
                    number="03"
                    overline="Katalog"
                    title="DIGITALER"
                    titleLine2="WERKZEUG-"
                    titleLine3="KASTEN"
                    subtitle="Von der Webseite über Shop-Systeme bis zum digitalen Hausmeister – unser Katalog für deinen Erfolg."
                    align="left"
                    light
                />

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {Object.entries(SERVICES).map(([key, category], i) => {
                        const Icon = TECH_ICONS[key] || IconTool;
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
            </Section>

            {/* 04: Chat – FAQ (Tech) */}
            <ChatSection
                sectionNumber="04"
                overline="Fragen"
                title="Unser"
                titleLine2="Experte"
                subtitle="Unser KI-Chatbot antwortet sofort – stellen Sie Ihre Frage auf Basis unserer Wissensbasis."
                suggestedFaq={FAQ_ITEMS}
                sectionBg="transparent"
            />

            {/* 05: Retainer / Hausmeister Special */}
            <Section bg="subtle">
                <SectionHeading
                    number="05"
                    overline="Flatrate"
                    title="Der Digitale Hausmeister"
                    subtitle="10 Stunden Tech-Support – flexibel einsetzbar für Web, Office und Notfälle. Details klären wir im Erstgespräch."
                    align="left"
                    light
                />
                <div className="grid md:grid-cols-2 gap-12 items-center border border-brand-cyan/30 bg-brand-cyan/5 backdrop-blur-xl bg-white/[0.03] p-8 md:p-12 relative overflow-hidden">
                    <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-brand-cyan/10 rounded-full blur-3xl pointer-events-none" />

                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-5xl font-black text-white uppercase leading-none mb-6">
                            10er Karte<br />Support
                        </h2>
                        <ul className="space-y-4 mb-8">
                            {[
                                "10 Stunden Support inklusive",
                                "Gültig für 12 Monate",
                                "Web, Office, Design & Notfälle",
                                "Express-Ticket bei Problemen"
                            ].map(item => (
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

            {/* 06: Testimonials */}
            <Section bg="transparent">
                <SectionHeading
                    number="06"
                    overline="Stimmen"
                    title="Das sagen unsere Kunden"
                    subtitle="Echte Erfahrungen von Betrieben, die wir digital unterstützen dürfen."
                    align="left"
                    light
                />
                <TestimonialGrid testimonials={[...TECH_TESTIMONIALS]} />
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

            {/* 07: Prozess */}
            <Section bg="subtle">
                <SectionHeading
                    number="07"
                    overline="Ablauf"
                    title="SO ARBEITEN"
                    titleLine2="WIR"
                    subtitle="Von der Anfrage bis zur Umsetzung – transparent und auf Augenhöhe."
                    align="left"
                    light
                />
                <ProcessSteps steps={PROCESS_STEPS} />
            </Section>

            {/* 08: Technologien */}
            <Section bg="transparent">
                <SectionHeading
                    number="08"
                    overline="Werkzeuge"
                    title="Technik-Set"
                    subtitle="Moderne Technik, klare Ergebnisse."
                    align="left"
                    light
                />
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

            <div className="w-full h-px bg-brand-cyan/20 shrink-0" role="presentation" aria-hidden="true" />

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
                        { name: "Leistungen", url: "/leistungen" },
                    ])),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Service",
                        provider: { "@id": `${SITE_URL}/#organization` },
                        name: "IT-Service & Webentwicklung Erzgebirge",
                        description:
                            "Webseiten, Online-Shops, Microsoft 365, KI-Schulung & IT-Support für KMU im Erzgebirge. Details und Umfang klären wir im Erstgespräch.",
                        areaServed: { "@type": "AdministrativeArea", name: "Erzgebirgskreis" },
                        hasOfferCatalog: {
                            "@type": "OfferCatalog",
                            name: "Tech-Leistungen",
                            itemListElement: [
                                {
                                    "@type": "Offer",
                                    itemOffered: { "@type": "Service", name: "One-Pager" },
                                    url: `${SITE_URL}/kontakt`,
                                },
                                {
                                    "@type": "Offer",
                                    itemOffered: { "@type": "Service", name: "Mehrseitige Website" },
                                    url: `${SITE_URL}/kontakt`,
                                },
                                {
                                    "@type": "Offer",
                                    itemOffered: { "@type": "Service", name: "Digitaler Hausmeister" },
                                    url: `${SITE_URL}/kontakt`,
                                },
                            ],
                        },
                    }),
                }}
            />

            <CtaSection
                headline="Wie können wir helfen?"
                subline="Egal ob neue Webseite, Shop oder IT-Support. Wir machen das."
                ctas={[
                    { label: "Anfrage senden", href: "/kontakt" },
                    { label: `Anrufen: ${COMPANY.phoneDisplay}`, href: `tel:${COMPANY.phone}` },
                ]}
            />
        </>
    );
}
