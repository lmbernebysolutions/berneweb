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
import { COMPANY, PAGE_META, FAQ_ITEMS } from "@/lib/constants";
import { SchweinDivider } from "@/components/ui/schweinchen-divider";
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
  {
    icon: IconMapPin,
    label: "Standort",
    value: `${COMPANY.location}, ${COMPANY.region}`,
    href: undefined,
    description: "Remote & vor Ort – wir kommen zu Ihnen",
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



      {/* 3. Contact Info + Form Grid */}
      <Section>
        <div className="grid gap-8 lg:grid-cols-5">
          {/* Left: Contact Info */}
          <div className="space-y-4 lg:col-span-2">
            {CONTACT_INFO.map((item, i) => (
              <div
                key={item.label}
                data-animate="fade-left"
                data-animate-delay={String(i * 80)}
                className="group relative overflow-hidden border border-white/10 bg-white/[0.03] transition-all hover:border-brand-cyan/50"
              >
                <TechCorners pattern="diagonal" variant="cyan" size="md" />

                <div className="p-5">
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
              </div>
            ))}

            {/* Opening hours card */}
            <div
              data-animate="fade-left"
              data-animate-delay="240"
              className="group relative border border-white/10 bg-white/[0.03] p-5 transition-all hover:border-brand-cyan/50"
            >
              <TechCorners pattern="diagonal" variant="cyan" size="md" />

              <div className="flex items-center gap-2.5 text-sm font-semibold">
                <IconClock className="size-4 text-brand-cyan" stroke={2} />
                <span className="uppercase tracking-wide">Erreichbarkeit</span>
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
              className="group relative border border-white/10 bg-white/[0.03] p-5 transition-all hover:border-brand-cyan/50"
            >
              <TechCorners pattern="diagonal" variant="cyan" size="md" />

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
                  href="/leistungen"
                  className="font-medium text-brand-cyan underline underline-offset-2 hover:text-brand-cyan/80"
                >
                  alle Leistungen
                </Link>{" "}
                an.
              </p>
            </div>
          </div>

          {/* Right: Form - industrialized */}
          <div data-animate="fade-right" className="lg:col-span-3">
            <div className="relative border border-white/10 bg-white/[0.03] p-6 md:p-8">
              {/* Tech corners */}
              <div className="absolute top-0 left-0 h-3 w-3 border-t-2 border-l-2 border-brand-cyan" />
              <div className="absolute top-0 right-0 h-3 w-3 border-t-2 border-r-2 border-brand-cyan" />
              <div className="absolute bottom-0 left-0 h-3 w-3 border-b-2 border-l-2 border-brand-cyan" />
              <div className="absolute bottom-0 right-0 h-3 w-3 border-b-2 border-r-2 border-brand-cyan" />

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
            </div>
          </div>
        </div>
      </Section>

      {/* 4. Trust Indicators - industrialized */}
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
              className="group relative flex items-center gap-3 border border-white/10 bg-white/[0.03] p-4 transition-all hover:border-brand-cyan/30"
            >
              <div className="absolute top-0 left-0 h-1.5 w-1.5 border-t border-l border-brand-cyan/40" />
              <div className="absolute bottom-0 right-0 h-1.5 w-1.5 border-b border-r border-brand-cyan/40" />

              <div className="flex h-8 w-8 items-center justify-center border border-brand-cyan/30 bg-brand-cyan/10">
                <item.icon className="size-4 shrink-0 text-brand-cyan" stroke={2} />
              </div>
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

      {/* 6. FAQ - with backdrop number */}
      <Section bg="alt" narrow>
        <SectionHeading
          overline="FAQ"
          title="Häufige Fragen zum Erstgespräch"
          align="center"
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
      </Section>

      <SchweinDivider />

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
