import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/sections/SectionHeading";
import dynamic from "next/dynamic";
import { ContactForm } from "@/components/sections/ContactForm";
import {
  IconPhone,
  IconMail,
  IconMapPin,
  IconClock,
  IconCheck,
  IconBrandInstagram,
  IconBrandFacebook,
  IconBrandWhatsapp,
  IconBrandGoogle,
} from "@tabler/icons-react";

const FaqAccordion = dynamic(
  () => import("@/components/sections/FaqAccordion").then((m) => ({ default: m.FaqAccordion })),
  { ssr: true }
);
import { COMPANY, PAGE_META, EINZUGSGEBIET_ORTE, SOCIAL_LINKS } from "@/lib/constants";
import { generateFaqSchema, generateBreadcrumbSchema } from "@/lib/seo/schema";
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

const KONTAKT_SOCIAL_ICONS = {
  Instagram: IconBrandInstagram,
  Facebook: IconBrandFacebook,
  WhatsApp: IconBrandWhatsapp,
  Google: IconBrandGoogle,
} as const;

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
        bergVariant="kontakt"
        headline="Sprechen Sie mit uns"
        accentText="mit uns"
        subline="Kostenloses Erstgespräch, unverbindlich – wir freuen uns auf Ihre Nachricht. Persönlich, unkompliziert, verbindlich. Glück auf!"
        variant="navy"
        compact
      />
      {/* TrustBar-Linie: Berg steht darauf */}
      <div className="w-full border-t border-brand-cyan/20" aria-hidden="true" />

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
                          className="font-semibold transition-colors hover:text-brand-cyan break-all"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="font-semibold break-all">{item.value}</p>
                      )}
                    </div>
                  </div>
                  <p className="mt-2.5 text-xs text-muted-foreground break-words">
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

          {/* Erreichbarkeit + Social Media */}
          <SectionCard
            variant="default"
            data-animate="fade-up"
            data-animate-delay="200"
            className="p-5"
          >
            {/* Mobile: nebeneinander; sm+: übereinander */}
            <div className="flex flex-row gap-4 sm:flex-col sm:gap-0">
              {/* Öffnungszeiten */}
              <div className="flex-1 min-w-0 sm:flex-none flex flex-col items-center sm:items-start text-center sm:text-left">
                <div className="flex items-center gap-2.5 text-sm font-semibold">
                  <span className="uppercase tracking-wide">Erreichbarkeit</span>
                </div>
                <div className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                  <p>Mo – Fr: 9:00 – 18:00 Uhr</p>
                  <p>Sa – So: Nach Vereinbarung</p>
                </div>
              </div>

              {/* Trennlinie: vertikal auf Mobile, horizontal auf sm+ */}
              <div
                className="self-stretch w-px bg-white/10 sm:w-auto sm:h-px sm:self-auto sm:my-4"
                aria-hidden="true"
              />

              {/* Social Media Grid 2×2 */}
              <div className="grid grid-cols-2 gap-2 shrink-0 sm:shrink sm:w-full">
                {SOCIAL_LINKS.map((link) => {
                  const Icon = KONTAKT_SOCIAL_ICONS[link.label as keyof typeof KONTAKT_SOCIAL_ICONS];
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.ariaLabel}
                      className="group relative overflow-hidden border border-white/10 bg-white/[0.03] p-2 sm:p-3 flex flex-col items-center justify-center gap-1 sm:gap-1.5 transition-all hover:border-brand-cyan/40 hover:bg-brand-cyan/5 hover:shadow-[0_0_12px_rgba(3,249,249,0.1)] cursor-pointer"
                    >
                      <TechCorners pattern="diagonal" variant="cyan" size="sm" />
                      <Icon className="size-5 sm:size-7 text-brand-cyan relative z-10" stroke={1.5} />
                      <span className="text-[0.6rem] font-bold uppercase tracking-widest text-brand-navy-muted relative z-10 text-center leading-tight">
                        {link.label}
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>
          </SectionCard>
        </div>
      </Section>

      {/* FAQ – Subtle füllt bis zu den Beams; Inhalt mit Padding */}
      <Section bg="subtle">
        <SectionHeading
          number="02"
          overline="Fragen"
          title="HÄUFIGE"
          titleLine2="FRAGEN"
          subtitle="Alles, was Sie vor dem ersten Gespräch wissen müssen."
          align="left"
          light
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

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateFaqSchema([
            {
              question: "Kostet das Erstgespräch etwas?",
              answer:
                "Nein. Das Erstgespräch ist zu 100% kostenlos und unverbindlich. Wir nutzen die 30 Minuten, um Ihr Anliegen zu verstehen und eine erste Einschätzung zu geben.",
            },
            {
              question: "Wie schnell meldet ihr euch?",
              answer:
                "Innerhalb von 24 Stunden – meistens deutlich schneller. Wenn Sie es eilig haben, rufen Sie uns direkt an.",
            },
            {
              question: "Muss ich mich vorbereiten?",
              answer:
                "Nein. Erzählen Sie uns einfach, wo der Schuh drückt. Wir stellen die richtigen Fragen.",
            },
          ])),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Kontakt", url: "/kontakt" },
          ])),
        }}
      />
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
