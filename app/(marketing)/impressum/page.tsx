import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { COMPANY } from "@/lib/constants";
import { generateBreadcrumbSchema } from "@/lib/seo/schema";
import { TechCorners } from "@/components/ui/tech-corners";
import {
  IconBuilding,
  IconPhone,
  IconMail,
  IconMapPin,
  IconUser,
  IconScale,
  IconAlertCircle,
  IconExternalLink,
} from "@tabler/icons-react";

export const metadata: Metadata = {
  title: "Impressum",
  robots: { index: true, follow: true },
  alternates: { canonical: "/impressum" },
};

// ─── Sub-components ──────────────────────────────────────────────────────────

function ImpressumCard({
  icon: Icon,
  label,
  tag,
  children,
  variant = "default",
}: {
  icon: React.ElementType;
  label: string;
  tag: string;
  children: React.ReactNode;
  variant?: "default" | "highlight";
}) {
  return (
    <div
      className={`relative overflow-hidden border p-6 sm:p-8 ${
        variant === "highlight"
          ? "border-brand-cyan/40 bg-brand-cyan/5"
          : "border-white/10 bg-white/[0.03]"
      }`}
    >
      <TechCorners pattern="diagonal" variant="cyan" size="md" />
      <div className="absolute top-0 right-0 border-b border-l border-brand-cyan/20 bg-brand-cyan/5 px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-widest text-brand-cyan/70">
        {tag}
      </div>
      <div className="flex items-center gap-3 mb-5">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center border border-brand-cyan/30 bg-brand-cyan/10">
          <Icon className="size-4.5 text-brand-cyan" stroke={1.5} />
        </div>
        <span className="font-mono text-xs uppercase tracking-widest text-brand-cyan/80">{label}</span>
      </div>
      <div className="space-y-2 text-sm leading-relaxed text-white/70">
        {children}
      </div>
    </div>
  );
}

function DataRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start gap-0.5 sm:gap-3 border-l-2 border-brand-cyan/20 bg-white/[0.02] px-4 py-3">
      <span className="font-mono text-[0.6rem] uppercase tracking-widest text-white/40 shrink-0 sm:mt-0.5 sm:w-32">{label}</span>
      <span className="text-sm text-white/80">{value}</span>
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function ImpressumPage() {
  return (
    <>
      <Section bg="transparent" className="pt-24">
        {/* ── Hero ───────────────────────────────────────────────────────── */}
        <div className="mb-8">
          <div className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-brand-cyan">
            Rechtliches
          </div>
          <div className="relative w-fit">
            <TechCorners pattern="diagonal" variant="cyan" size="lg" animate />
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-white leading-tight px-5 py-2">
              Impressum
            </h1>
          </div>
          <p className="mt-3 font-mono text-[0.7rem] uppercase tracking-widest text-white/40">
            Angaben gemäß § 5 TMG / § 5 DDG
          </p>
        </div>
        <div className="grid gap-6 lg:gap-8">

          {/* Unternehmen */}
          <ImpressumCard icon={IconBuilding} label="Unternehmen" tag="§ 5 TMG" variant="highlight">
            <div className="grid gap-2">
              <DataRow label="Firma" value={COMPANY.legal} />
              <DataRow label="Rechtsform" value="Gesellschaft bürgerlichen Rechts (GbR)" />
              <DataRow label="Straße" value={COMPANY.streetAddress} />
              <DataRow
                label="Ort"
                value={`${COMPANY.postalCode} ${COMPANY.location}`}
              />
              <DataRow
                label="Region"
                value={`${COMPANY.region}, ${COMPANY.state}, ${COMPANY.country}`}
              />
            </div>
          </ImpressumCard>

          {/* Gesellschafter */}
          <ImpressumCard icon={IconUser} label="Vertreten durch" tag="GbR-GESELLSCHAFTER">
            <div className="grid gap-2">
              {COMPANY.founders.map((f) => (
                <DataRow
                  key={f.name}
                  label={f.role}
                  value={`${f.name} (${f.share})`}
                />
              ))}
            </div>
          </ImpressumCard>

          {/* Kontakt */}
          <ImpressumCard icon={IconPhone} label="Kontakt" tag="ERREICHBARKEIT">
            <div className="grid gap-2">
              <DataRow
                label="Telefon"
                value={
                  <a
                    href={`tel:${COMPANY.phone}`}
                    className="text-brand-cyan hover:underline"
                  >
                    {COMPANY.phoneDisplay}
                  </a>
                }
              />
              <DataRow
                label="E-Mail"
                value={
                  <a
                    href={`mailto:${COMPANY.email}`}
                    className="text-brand-cyan hover:underline"
                  >
                    {COMPANY.email}
                  </a>
                }
              />
              <DataRow
                label="Adresse"
                value={
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(COMPANY.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-cyan hover:underline inline-flex items-center gap-1"
                  >
                    {COMPANY.address}
                    <IconExternalLink className="size-3" />
                  </a>
                }
              />
            </div>
          </ImpressumCard>

          {/* Umsatzsteuer */}
          <ImpressumCard icon={IconScale} label="Umsatzsteuer" tag="§ 19 USTG">
            <p>
              Wir wenden die <strong className="text-white/90">Kleinunternehmerregelung gemäß § 19 UStG</strong> an.
              Es wird daher keine Umsatzsteuer-Identifikationsnummer geführt und keine Umsatzsteuer ausgewiesen.
            </p>
          </ImpressumCard>

          {/* Verantwortlich für den Inhalt */}
          <ImpressumCard icon={IconMail} label="Inhaltlich verantwortlich" tag="§ 55 ABS. 2 MSTV">
            <div className="grid gap-2">
              <DataRow label="Person" value="Lennard Meyer" />
              <DataRow label="Anschrift" value={`${COMPANY.streetAddress}, ${COMPANY.postalCode} ${COMPANY.location}`} />
            </div>
          </ImpressumCard>

          {/* Standort */}
          <ImpressumCard icon={IconMapPin} label="Unternehmensstandort" tag="LOCATION">
            <div className="grid gap-2">
              <DataRow label="Stadt" value={COMPANY.location} />
              <DataRow label="Landkreis" value={COMPANY.region} />
              <DataRow label="Bundesland" value={COMPANY.state} />
              <DataRow label="Gegründet" value={COMPANY.founded} />
            </div>
          </ImpressumCard>

          {/* EU-Streitschlichtung */}
          <ImpressumCard icon={IconAlertCircle} label="EU-Streitschlichtung" tag="ODR-VO / VSBG">
            <p>
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:
            </p>
            <div className="mt-3">
              <DataRow
                label="OS-Plattform"
                value={
                  <a
                    href="https://ec.europa.eu/consumers/odr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-cyan hover:underline inline-flex items-center gap-1"
                  >
                    ec.europa.eu/consumers/odr
                    <IconExternalLink className="size-3" />
                  </a>
                }
              />
              <DataRow label="Unsere E-Mail" value={COMPANY.email} />
            </div>
            <p className="mt-4 text-white/50 text-xs">
              Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
              Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </ImpressumCard>

          {/* Haftungshinweis */}
          <div className="relative overflow-hidden border border-white/10 bg-white/[0.02] p-6 sm:p-8">
            <TechCorners pattern="diagonal" variant="cyan" size="sm" />
            <div className="absolute top-0 right-0 border-b border-l border-brand-cyan/20 bg-brand-cyan/5 px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-widest text-brand-cyan/70">
              HAFTUNGSAUSSCHLUSS
            </div>
            <p className="font-mono text-[0.65rem] uppercase tracking-widest text-brand-cyan/60 mb-4">
              Haftung für Inhalte & Links
            </p>
            <div className="space-y-3 text-xs text-white/50 leading-relaxed">
              <p>
                Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte
                können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten
                nach den allgemeinen Gesetzen verantwortlich.
              </p>
              <p>
                Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Für die Inhalte der
                verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber verantwortlich. Bei Bekanntwerden von Rechtsverletzungen
                werden wir derartige Links umgehend entfernen.
              </p>
            </div>
          </div>

        </div>
      </Section>

      <div
        className="w-full h-px bg-brand-cyan/20 shrink-0 mt-16"
        role="presentation"
        aria-hidden="true"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateBreadcrumbSchema([
              { name: "Home", url: "/" },
              { name: "Impressum", url: "/impressum" },
            ])
          ),
        }}
      />
    </>
  );
}
