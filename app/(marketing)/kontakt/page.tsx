import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { ContactForm } from "@/components/sections/ContactForm";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { CtaSection } from "@/components/sections/CtaSection";
import {
  IconPhone,
  IconMail,
  IconMapPin,
  IconClock,
  IconArrowRight,
  IconCheck,
} from "@tabler/icons-react";
import { COMPANY, PAGE_META, FAQ_ITEMS } from "@/lib/constants";
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
  {
    icon: IconMapPin,
    label: "Standort",
    value: `${COMPANY.location}, ${COMPANY.region}`,
    href: undefined,
    description: "Remote & vor Ort – wir kommen zu Ihnen",
  },
];

const PROCESS_QUICK = [
  { step: "01", text: "Nachricht senden" },
  { step: "02", text: "Wir melden uns innerhalb von 24h" },
  { step: "03", text: "Kostenloses Erstgespräch (30 Min.)" },
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

      {/* 2. Quick Process Steps */}
      <Section>
        <div className="mb-12 grid gap-4 sm:grid-cols-3 md:mb-16">
          {PROCESS_QUICK.map((item, i) => (
            <div
              key={item.step}
              data-animate="fade-up"
              data-animate-delay={String(i * 100)}
              className="flex items-center gap-4 rounded-xl border border-border bg-card p-5"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-navy text-sm font-extrabold text-brand-cyan">
                {item.step}
              </div>
              <p className="text-sm font-semibold">{item.text}</p>
            </div>
          ))}
        </div>

        {/* 3. Contact Info + Form Grid */}
        <div className="grid gap-8 lg:grid-cols-5">
          {/* Left: Contact Info */}
          <div className="space-y-4 lg:col-span-2">
            {CONTACT_INFO.map((item, i) => (
              <div
                key={item.label}
                data-animate="fade-left"
                data-animate-delay={String(i * 80)}
                className="card-hover overflow-hidden rounded-2xl border border-border bg-card"
              >
                <div className="p-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-cyan-muted">
                      <item.icon className="size-5 text-brand-navy" stroke={1.5} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
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
              </div>
            ))}

            {/* Opening hours card */}
            <div
              data-animate="fade-left"
              data-animate-delay="240"
              className="rounded-2xl border border-border bg-section-alt p-5"
            >
              <div className="flex items-center gap-2.5 text-sm font-semibold">
                <IconClock className="size-4 text-brand-cyan" stroke={2} />
                Erreichbarkeit
              </div>
              <div className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                <p>Mo – Fr: 9:00 – 18:00 Uhr</p>
                <p>Sa – So: Nach Vereinbarung</p>
              </div>
            </div>

            {/* Link hint card */}
            <div
              data-animate="fade-left"
              data-animate-delay="320"
              className="rounded-2xl border border-border bg-card p-5"
            >
              <p className="text-sm leading-relaxed text-muted-foreground">
                Nicht sicher, was Sie brauchen? Schauen Sie sich unsere{" "}
                <Link
                  href="/handwerk"
                  className="font-medium text-foreground underline underline-offset-2 hover:text-brand-cyan"
                >
                  Handwerks-Pakete
                </Link>{" "}
                oder{" "}
                <Link
                  href="/leistungen"
                  className="font-medium text-foreground underline underline-offset-2 hover:text-brand-cyan"
                >
                  alle Leistungen
                </Link>{" "}
                an.
              </p>
            </div>
          </div>

          {/* Right: Form */}
          <div data-animate="fade-right" className="lg:col-span-3">
            <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
              <h2 className="mb-1 text-xl font-extrabold">Nachricht schreiben</h2>
              <p className="mb-6 text-sm text-muted-foreground">
                Alle Felder mit * sind Pflichtfelder.
              </p>
              <ContactForm />
            </div>
          </div>
        </div>
      </Section>

      {/* 4. Trust Indicators */}
      <Section bg="alt" narrow>
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { icon: IconCheck, text: "Kostenlos & unverbindlich" },
            { icon: IconClock, text: "Antwort in 24 Stunden" },
            { icon: IconMapPin, text: "Persönlich aus dem Erzgebirge" },
          ].map((item, i) => (
            <div
              key={item.text}
              data-animate="fade-up"
              data-animate-delay={String(i * 100)}
              className="flex items-center gap-3 rounded-xl border border-border bg-card p-4"
            >
              <item.icon className="size-5 shrink-0 text-brand-cyan" stroke={2} />
              <span className="text-sm font-semibold">{item.text}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* 5. Standort */}
      <Section narrow>
        <SectionHeading
          overline="Standort"
          title="Aue-Bad Schlema – mitten im Erzgebirge"
          align="center"
        />
        <div data-animate="fade-up" className="text-center">
          <p className="mx-auto max-w-xl text-muted-foreground">
            Wir arbeiten digital und persönlich. Kurze Wege im gesamten
            Erzgebirgskreis – ob Annaberg-Buchholz, Stollberg, Aue oder Schwarzenberg.
            Wir kommen zu Ihnen.
          </p>
        </div>
      </Section>

      {/* 6. FAQ */}
      <Section bg="alt" narrow>
        <SectionHeading
          overline="FAQ"
          title="Häufige Fragen zum Erstgespräch"
          align="center"
        />
        <FaqAccordion
          items={[
            {
              question: "Kostet das Erstgespräch etwas?",
              answer: "Nein. Das Erstgespräch ist zu 100% kostenlos und unverbindlich. Wir nutzen die 30 Minuten, um Ihr Anliegen zu verstehen und eine erste Einschätzung zu geben.",
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
      </Section>

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
