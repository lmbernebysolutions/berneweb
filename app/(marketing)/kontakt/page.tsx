import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { ContactForm } from "@/components/sections/ContactForm";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import {
  IconPhone,
  IconMail,
  IconMapPin,
  IconClock,
  IconCheck,
} from "@tabler/icons-react";
import { COMPANY, PAGE_META, EINZUGSGEBIET_ORTE } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { SectionCard } from "@/components/ui/section-card";
import { Button } from "@/components/ui/button";
import { TechCorners } from "@/components/ui/tech-corners";
import Link from "next/link";

export const metadata: Metadata = {
  title: PAGE_META.kontakt.title,
  description: PAGE_META.kontakt.description,
  alternates: { canonical: "/kontakt" },
};

const CONTACT_INFO = [
  {
    icon: IconPhone,
    label: "Telefon",
    value: COMPANY.phoneDisplay,
    href: `tel:${COMPANY.phone}`,
    description: "Mo–Fr, 9–18 Uhr",
  },
  {
    icon: IconMail,
    label: "E-Mail",
    value: COMPANY.email,
    href: `mailto:${COMPANY.email}`,
    description: "Antwort innerhalb von 24h",
  },
];



export default function KontaktPage() {
  return (
    <>
      {/* 1. Hero */}
      <Hero
        headline="Sprechen Sie mit uns."
        accentText="mit uns"
        subline="Kostenloses Erstgespräch, unverbindlich – wir freuen uns auf Ihre Nachricht."
        variant="navy"
        compact
      />



      {/* Contact Info + Form Grid – keine Variant (nur 02 hat subtle) */}
      <Section bg="transparent">
        <div className="grid gap-8 lg:grid-cols-5 lg:items-stretch">
          {/* Left: Contact Info + Map + Städte */}
          <div className="flex flex-col gap-4 lg:col-span-2 lg:min-h-0">
            {/* Schnell-Kontakt: Jetzt anrufen */}
            <SectionCard
              variant="default"
              data-animate="fade-left"
              className="overflow-hidden p-0 shrink-0"
            >
              <TechCorners pattern="diagonal" variant="cyan" size="sm" />
              <div className="relative z-10 p-5">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-cyan/60">
                  Schnellkontakt
                </p>
                <Button
                  asChild
                  size="lg"
                  className="mt-3 w-full bg-brand-cyan text-brand-navy hover:bg-brand-cyan/90"
                >
                  <a href={`tel:${COMPANY.phone}`}>
                    <IconPhone className="mr-2 size-5" stroke={2} />
                    Jetzt anrufen
                  </a>
                </Button>
                <p className="mt-2 text-xs text-muted-foreground">
                  {COMPANY.phoneDisplay} · Mo–Fr, 9–18 Uhr
                </p>
              </div>
            </SectionCard>

            {CONTACT_INFO.map((item, i) => (
              <SectionCard
                key={item.label}
                variant="default"
                data-animate="fade-left"
                data-animate-delay={String(i * 80)}
                className="shrink-0 p-5"
              >
                <div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center border border-brand-cyan/30 bg-brand-cyan/10">
                      <item.icon className="size-5 text-brand-cyan" stroke={1.5} />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-cyan/60">
                        {item.label}
                      </p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="font-semibold transition-colors hover:text-brand-cyan"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="font-semibold">{item.value}</p>
                      )}
                    </div>
                  </div>
                  <p className="mt-2.5 text-xs text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </SectionCard>
            ))}

            {/* Link hint – flex-1: füllt Resthöhe für gleiche Spaltenhöhe */}
            <SectionCard
              variant="default"
              data-animate="fade-left"
              data-animate-delay="320"
              className="flex min-h-0 flex-1 flex-col p-5"
            >
              <p className="text-sm leading-relaxed text-muted-foreground">
                Nicht sicher, was Sie brauchen? Schauen Sie sich unsere{" "}
                <Link
                  href="/handwerk"
                  className="font-medium text-brand-cyan underline underline-offset-2 hover:text-brand-cyan/80"
                >
                  Handwerks-Pakete
                </Link>{" "}
                oder{" "}
                <Link
                  href="/tech"
                  className="font-medium text-brand-cyan underline underline-offset-2 hover:text-brand-cyan/80"
                >
                  alle Leistungen
                </Link>{" "}
                an.
              </p>
            </SectionCard>
          </div>

          {/* Right: Form – Höhe durch Formularinhalt */}
          <div data-animate="fade-right" className="flex lg:col-span-3">
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
        </div>

        {/* Ort-Elemente unter Form: Map, Einzugsgebiet, Erreichbarkeit – gleiche Breite wie oben */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Map */}
          <SectionCard
            variant="default"
            data-animate="fade-up"
            data-animate-delay="100"
            className="overflow-hidden p-0"
          >
            <TechCorners pattern="diagonal" variant="cyan" size="sm" />
            <div className="relative z-10">
              <div className="border-b border-white/10 px-4 py-3">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-cyan/60">
                  Standort
                </p>
                <p className="font-semibold">{COMPANY.location}, {COMPANY.region}</p>
              </div>
              <div className="relative h-[180px] w-full overflow-hidden">
                <iframe
                  title="Karte Aue-Bad Schlema"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=12.678%2C50.575%2C12.708%2C50.595&layer=mapnik&marker=50.585,12.693"
                  className="absolute inset-0 h-full w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <div className="p-3">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(COMPANY.location + " " + COMPANY.region)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-brand-cyan underline underline-offset-2 hover:text-brand-cyan/80"
                >
                  In Google Maps öffnen
                </a>
              </div>
            </div>
          </SectionCard>

          {/* Einzugsgebiet */}
          <SectionCard
            variant="default"
            data-animate="fade-up"
            data-animate-delay="150"
            className="p-5"
          >
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-cyan/60">
              Einzugsgebiet
            </p>
            <p className="mt-1 font-semibold">{COMPANY.location}</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {EINZUGSGEBIET_ORTE.map((ort) => (
                <li
                  key={ort}
                  className="border border-brand-cyan/20 bg-brand-cyan/5 px-2.5 py-1 text-xs font-medium uppercase tracking-wider text-brand-cyan"
                >
                  {ort}
                </li>
              ))}
            </ul>
          </SectionCard>

          {/* Erreichbarkeit */}
          <SectionCard
            variant="default"
            data-animate="fade-up"
            data-animate-delay="200"
            className="p-5"
          >
            <div className="flex items-center gap-2.5 text-sm font-semibold">
              <IconClock className="size-4 text-brand-cyan" stroke={2} />
              <span className="uppercase tracking-wide">Erreichbarkeit</span>
            </div>
            <div className="mt-3 space-y-1.5 text-sm text-muted-foreground">
              <p>Mo – Fr: 9:00 – 18:00 Uhr</p>
              <p>Sa – So: Nach Vereinbarung</p>
            </div>
          </SectionCard>
        </div>
      </Section>

      {/* Trust-Bar */}
      <Section bg="transparent" narrow>
        <SectionCard
          variant="default"
          data-animate="fade-up"
          className="flex flex-col sm:flex-row"
        >
          {[
            { icon: IconCheck, text: "Kostenlos & unverbindlich" },
            { icon: IconClock, text: "Antwort in 24 Stunden" },
            { icon: IconMapPin, text: "Persönlich aus dem Erzgebirge" },
          ].map((item, i) => (
            <div
              key={item.text}
              className={cn(
                "relative z-10 flex flex-1 items-center justify-center gap-3 px-6 py-5",
                i > 0 && "border-t border-white/10 sm:border-t-0 sm:border-l border-white/10"
              )}
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center border border-brand-cyan/30 bg-brand-cyan/10">
                <item.icon className="size-4 text-brand-cyan" stroke={2} />
              </div>
              <span className="text-sm font-semibold text-center">{item.text}</span>
            </div>
          ))}
        </SectionCard>
      </Section>

      {/* FAQ – Subtle nur im Beam; nur Trennlinie volle Breite */}
      <div className="relative">
        <div className="relative mx-auto max-w-6xl px-4 md:px-6 overflow-hidden">
          <div className="relative py-20 md:py-28 lg:py-32 bg-white/[0.015] overflow-hidden">
            <SectionHeading
              number="02"
              overline="FAQ"
              title="Häufige Fragen zum Erstgespräch"
              align="left"
              light
            />
            <FaqAccordion
              number="?"
              items={[
                {
                  question: "Kostet das Erstgespräch etwas?",
                  answer: "Nein. Das Erstgespräch ist zu 100% kostenlos and unverbindlich. Wir nutzen die 30 Minuten, um Ihr Anliegen zu verstehen und eine erste Einschätzung zu geben.",
                },
                {
                  question: "Wie schnell meldet ihr euch?",
                  answer: "Innerhalb von 24 Stunden – meistens deutlich schneller. Wenn Sie es eilig haben, rufen Sie uns direkt an.",
                },
                {
                  question: "Muss ich mich vorbereiten?",
                  answer: "Nein. Erzählen Sie uns einfach, wo der Schuh drückt. Wir stellen die richtigen Fragen.",
                },
              ]}
            />
          </div>
        </div>
        <div className="w-full h-px bg-brand-cyan/20 shrink-0" role="presentation" aria-hidden="true" />
      </div>

      {/* Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            mainEntity: {
              "@type": "Organization",
              name: COMPANY.name,
              telephone: COMPANY.phone,
              email: COMPANY.email,
              address: {
                "@type": "PostalAddress",
                addressLocality: COMPANY.location,
                addressRegion: COMPANY.state,
                addressCountry: "DE",
              },
            },
          }),
        }}
      />
    </>
  );
}
