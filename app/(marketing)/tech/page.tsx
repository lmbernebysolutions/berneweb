import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { CtaSection } from "@/components/sections/CtaSection";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
    IconDeviceDesktop,
    IconShoppingCart,
    IconBrush,
    IconTool,
    IconPhone,
    IconCheck,
    IconArrowRight,
} from "@tabler/icons-react";
import { SERVICES, COMPANY, FAQ_ITEMS } from "@/lib/constants";
import { SchweinDivider } from "@/components/ui/schweinchen-divider";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { TechCorners } from "@/components/ui/tech-corners";

export const metadata: Metadata = {
    title: "General Tech Solutions – Ihre externe IT-Abteilung im Erzgebirge",
    description: "Webseiten, Shops, Office-Makros und IT-Support auf Abruf. Berneby Solutions hilft KMU bei digitalen Problemen. Schnell und flexibel.",
    alternates: { canonical: "/tech" },
};

const TECH_ICONS: Record<string, any> = {
    webseiten: IconDeviceDesktop,
    ecommerce: IconShoppingCart,
    design: IconBrush,
    office: IconTool,
    marketing: IconDeviceDesktop,
    wartung: IconCheck,
};

export default function TechPage() {
    const serviceCategories = Object.entries(SERVICES);

    return (
        <>
            <Hero
                headline="IHRE EXTERNE IT-ABTEILUNG."
                accentText="IT-ABTEILUNG."
                subline="Flexibel. Auf Abruf. Ohne Festanstellung. Wir lösen Ihre digitalen Probleme – vom veralteten Shop bis zum Excel-Chaos."
                ctas={[
                    { label: "Problem melden", href: "/kontakt", variant: "default" },
                    { label: "Alle Leistungen", href: "#leistungen", variant: "outline" },
                ]}
                variant="cyan"
            />

            {/* 02: Intro Promise */}
            <Section bg="transparent">
                <SectionHeading
                    number="02"
                    overline="Mission"
                    title="Kein Bullshit. Nur Lösungen."
                    subtitle="Große Systemhäuser sind zu teuer, der Neffe vom Chef hat keine Zeit. Wir sind Ihr digitaler Hausmeister."
                    align="left"
                    light
                />
            </Section>

            {/* 03: Services Grid */}
            <Section id="leistungen" bg="transparent">
                <SectionHeading
                    number="03"
                    overline="Katalog"
                    title="Digitaler Werkzeugkasten"
                    align="left"
                    light
                />

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {serviceCategories.map(([key, category]) => {
                        const Icon = TECH_ICONS[key] || IconTool;
                        return (
                            <div key={key} className="group relative flex flex-col border border-white/10 bg-brand-navy/60 backdrop-blur-md overflow-hidden transition-all hover:border-brand-cyan hover:bg-brand-navy/80">
                                <TechCorners pattern="diagonal" variant="cyan" size="lg" />

                                <div className="absolute top-0 right-0 p-4 opacity-10">
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
                                                <span className="text-[10px] font-mono text-brand-cyan">
                                                    {item.price.includes("Monat") ? item.price : `€ ${item.price}`}
                                                </span>
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
                <div className="grid md:grid-cols-2 gap-12 items-center border border-brand-cyan/30 bg-brand-cyan/5 p-8 md:p-12 relative overflow-hidden">
                    <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-brand-cyan/10 rounded-full blur-3xl pointer-events-none" />

                    <div className="relative z-10">
                        <div className="mb-6 inline-flex items-center border border-brand-cyan bg-brand-cyan/20 px-4 py-1 text-xs font-bold text-brand-cyan uppercase tracking-widest">
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
                            <span className="text-4xl font-bold text-brand-cyan">850 €</span>
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


            {/* 05: FAQ */}
            <Section bg="transparent">
                <SectionHeading
                    number="05"
                    overline="Support"
                    title="Häufige Fragen"
                    align="left"
                    light
                />
                <FaqAccordion items={FAQ_ITEMS} />
            </Section>

            <SchweinDivider />

            <CtaSection
                headline="Welches Problem dürfen wir lösen?"
                subline="Egal ob Excel-Makro oder kompletter Shop-Umzug. Wir machen das."
                ctas={[
                    { label: "Anfrage senden", href: "/kontakt" },
                    { label: `Anrufen: ${COMPANY.phoneDisplay}`, href: `tel:${COMPANY.phone}` },
                ]}
            />
        </>
    );
}
