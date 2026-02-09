import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { CtaSection } from "@/components/sections/CtaSection";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
    IconDeviceDesktop,
    IconDeviceLaptop,
    IconShoppingCart,
    IconBrush,
    IconTool,
    IconChartBar,
    IconShield,
    IconArrowRight,
} from "@tabler/icons-react";
import { SERVICES, COMPANY, FAQ_ITEMS, PROCESS_STEPS, TECH_STACK, TECH_STATS, TECH_TESTIMONIALS, TECH_REFERENCES } from "@/lib/constants";
import { TrustBar } from "@/components/sections/TrustBar";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { MissionSection } from "@/components/sections/MissionSection";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { TestimonialGrid } from "@/components/sections/TestimonialGrid";
import { TechCorners } from "@/components/ui/tech-corners";

export const metadata: Metadata = {
    title: "General Tech Solutions – Ihre externe IT-Abteilung im Erzgebirge",
    description: "Webseiten, Shops, Office-Makros und IT-Support auf Abruf. Berneby Solutions hilft KMU bei digitalen Problemen. Schnell und flexibel.",
    alternates: { canonical: "/tech" },
};

const TECH_ICONS: Record<string, (typeof IconDeviceDesktop)> = {
    webseiten: IconDeviceDesktop,
    ecommerce: IconShoppingCart,
    design: IconBrush,
    office: IconDeviceLaptop,
    marketing: IconChartBar,
    wartung: IconShield,
};

export default function TechPage() {
    const serviceCategories = Object.entries(SERVICES);

    return (
        <>
            <Hero
                bergVariant="tech"
                headline="IHRE EXTERNE IT-ABTEILUNG."
                accentText="IT-ABTEILUNG."
                subline="Flexibel. Auf Abruf. Ohne Festanstellung. Von der neuen Webseite über Shops bis IT-Support – wir bauen und betreuen."
                ctas={[
                    { label: "Webseite anfragen", href: "/kontakt", variant: "default" },
                    { label: "Alle Leistungen", href: "#leistungen", variant: "outline" },
                ]}
                variant="cyan"
            />

            <TrustBar items={TECH_STATS} />

            {/* 02: Mission – Überschrift + Untertitel unverändert, Inhalt in 3 Varianten (a|b|c) */}
            <Section bg="transparent">
                <SectionHeading
                    number="02"
                    overline="Mission"
                    title="Kein Bullshit."
                    titleLine2="Nur Lösungen."
                    subtitle="Große Systemhäuser sind zu teuer, der Neffe vom Chef hat keine Zeit. Wir sind Ihr digitaler Hausmeister."
                    align="left"
                    light
                />
                <MissionSection variant="a" />
            </Section>

            {/* 03: Services Grid */}
            <Section id="leistungen" bg="subtle">
                <SectionHeading
                    number="03"
                    overline="Katalog"
                    title="Digitaler Werkzeugkasten"
                    align="left"
                    light
                />

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {serviceCategories.map(([key, category], i) => {
                        const Icon = TECH_ICONS[key] || IconTool;
                        return (
                            <div
                                key={key}
                                data-animate="fade-up"
                                data-animate-delay={String(i * 80)}
                                className="group relative flex flex-col border border-white/10 bg-brand-navy/60 backdrop-blur-md overflow-hidden transition-all hover:bg-brand-navy/80 card-hover-glow"
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
                                    {category.items.map((item) => (
                                        <div key={item.title} className="group/item relative">
                                            <TechCorners pattern="all" variant="cyan" size="sm" />
                                            <div className="flex justify-between items-baseline px-4 py-2 transition-colors group-hover/item:bg-brand-cyan/5">
                                                <h4 className="font-medium text-xs text-white/90 uppercase tracking-wider">{item.title}</h4>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-auto p-6 pt-0 relative z-10">
                                    <Button asChild variant="ghost" className="w-full justify-between text-white/50 hover:text-brand-cyan hover:bg-transparent px-0 uppercase tracking-widest text-xs">
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

            {/* 04: Retainer / Hausmeister Special */}
            <Section bg="transparent">
                <SectionHeading
                    number="04"
                    overline="Flatrate"
                    title="Der Digitale Hausmeister"
                    align="left"
                    light
                />
                <div className="grid md:grid-cols-2 gap-12 items-center border border-brand-cyan/30 bg-brand-cyan/5 backdrop-blur-xl bg-white/[0.03] p-8 md:p-12 relative overflow-hidden">
                    <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-brand-cyan/10 rounded-full blur-3xl pointer-events-none" />

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
                                "Express-Ticket bei Problemen"
                            ].map(item => (
                                <li key={item} className="flex items-center gap-4 text-white text-lg">
                                    <div className="w-1.5 h-1.5 bg-brand-cyan shadow-[0_0_10px_#03f9f9]" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <div className="flex items-baseline gap-4 mb-8">
                            <span className="text-4xl font-bold text-brand-warm">850 €</span>
                            <span className="text-sm font-mono text-white/50">netto / Paket</span>
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

            {/* 05: Testimonials */}
            <Section bg="subtle">
                <SectionHeading
                    number="05"
                    overline="Stimmen"
                    title="Das sagen unsere Kunden"
                    align="left"
                    light
                />
                <TestimonialGrid testimonials={[...TECH_TESTIMONIALS]} />
            </Section>

            {/* 06: Prozess */}
            <Section bg="transparent">
                <SectionHeading
                    number="06"
                    overline="Ablauf"
                    title="So arbeiten wir"
                    subtitle="Von der Anfrage bis zur Umsetzung – transparent und auf Augenhöhe."
                    align="left"
                    light
                />
                <ProcessSteps steps={PROCESS_STEPS} />
            </Section>

            {/* 07: Technologien */}
            <Section bg="subtle">
                <SectionHeading
                    number="07"
                    overline="Unser digitaler Werkzeugstollen"
                    title="Tech-Stack"
                    align="left"
                    light
                />
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6">
                    {TECH_STACK.map((item, i) => (
                        <div
                            key={item}
                            data-animate="fade-up"
                            data-animate-delay={String(i * 60)}
                            className="group relative overflow-hidden border border-white/10 bg-brand-navy/60 p-5 backdrop-blur-md transition-all hover:border-brand-cyan/20"
                        >
                            <TechCorners pattern="diagonal" variant="cyan" size="md" animate />
                            <p className="relative z-10 text-center text-sm font-bold uppercase tracking-wider text-white">
                                {item}
                            </p>
                        </div>
                    ))}
                </div>
            </Section>

            {/* 08: Referenzen / Case Studies */}
            <Section bg="transparent">
                <SectionHeading
                    number="08"
                    overline="Referenzen"
                    title="Projekte mit Ergebnis"
                    align="left"
                    light
                />
                <div className="grid gap-6 md:grid-cols-3">
                    {TECH_REFERENCES.map((ref, i) => (
                        <div
                            key={ref.title}
                            data-animate="fade-up"
                            data-animate-delay={String(i * 80)}
                            className="group relative flex flex-col overflow-hidden border border-white/10 bg-brand-navy/60 p-6 backdrop-blur-md transition-all hover:border-brand-cyan/20 card-hover-glow"
                        >
                            <TechCorners pattern="diagonal" variant="cyan" size="lg" animate />
                            <h3 className="relative z-10 text-lg font-bold uppercase tracking-wider text-white">
                                {ref.title}
                            </h3>
                            <p className="relative z-10 mt-2 text-sm leading-relaxed text-white/70">
                                {ref.description}
                            </p>
                            <div className="relative z-10 mt-4 inline-flex items-center gap-2 border border-brand-cyan/20 bg-brand-cyan/5 px-3 py-1.5">
                                <span className="text-xs font-bold uppercase tracking-wider text-brand-cyan">
                                    {ref.result}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </Section>

            {/* 09: FAQ – Subtle nur im Beam; Wave darin eingeschlossen; nur Trennlinie volle Breite */}
            <div className="relative">
                <div className="relative mx-auto max-w-6xl px-4 md:px-6 overflow-hidden">
                    <div className="relative py-20 md:py-28 lg:py-32 bg-white/[0.015] overflow-hidden">
                        <SectionHeading
                            number="09"
                            overline="Support"
                            title="Häufige Fragen"
                            align="left"
                            light
                        />
                        <FaqAccordion items={FAQ_ITEMS} />
                    </div>
                </div>
                <div className="w-full h-px bg-brand-cyan/20 shrink-0" role="presentation" aria-hidden="true" />
            </div>

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
