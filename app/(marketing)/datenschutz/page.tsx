import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { COMPANY } from "@/lib/constants";
import { generateBreadcrumbSchema } from "@/lib/seo/schema";
import { TechCorners } from "@/components/ui/tech-corners";
import { cn } from "@/lib/utils";
import { CONTAINER_A_NO_GLOW, CONTAINER_B_STATIC } from "@/lib/container-styles";
import {
  IconShield,
  IconServer,
  IconCookie,
  IconMail,
  IconMap,
  IconRobot,
  IconChartBar,
  IconDatabase,
  IconUser,
  IconClock,
  IconCheck,
} from "@tabler/icons-react";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  robots: { index: true, follow: true },
  alternates: { canonical: "/datenschutz" },
};

// ─── Sub-components ─────────────────────────────────────────────────────────

function SectionCard({
  icon: Icon,
  label,
  number,
  children,
  variant = "default",
}: {
  icon: React.ElementType;
  label: string;
  number: string;
  children: React.ReactNode;
  variant?: "default" | "highlight";
}) {
  return (
    <div className={cn("relative overflow-hidden border p-6 sm:p-8", variant === "highlight" ? CONTAINER_B_STATIC : CONTAINER_A_NO_GLOW)}>
      <TechCorners pattern="diagonal" variant="cyan" size="md" />
      <div className="absolute top-0 right-0 border-b border-l border-brand-cyan/20 bg-brand-cyan/5 px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-widest text-brand-cyan/70">
        §{number}
      </div>
      <div className="flex items-center gap-3 mb-5">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center border border-brand-cyan/30 bg-brand-cyan/10">
          <Icon className="size-4.5 text-brand-cyan" stroke={1.5} />
        </div>
        <span className="font-mono text-xs uppercase tracking-widest text-brand-cyan/80">{label}</span>
      </div>
      <div className="space-y-3 text-sm leading-relaxed text-white/70">
        {children}
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start gap-0.5 sm:gap-3 border-l-2 border-brand-cyan/20 bg-white/[0.02] px-4 py-3">
      <span className="font-mono text-[0.6rem] uppercase tracking-widest text-white/40 shrink-0 sm:mt-0.5 sm:w-28">{label}</span>
      <span className="text-sm text-white/80">{value}</span>
    </div>
  );
}

function RightCard({ icon: Icon, title, description }: { icon: React.ElementType; title: string; description: string }) {
  return (
    <div className={cn("relative flex flex-col gap-2 border p-4 overflow-hidden", CONTAINER_A_NO_GLOW)}>
      <TechCorners pattern="diagonal" variant="cyan" size="sm" />
      <div className="flex items-center gap-2">
        <Icon className="size-4 text-brand-cyan/60" stroke={1.5} />
        <span className="text-xs font-bold uppercase tracking-wider text-white/80">{title}</span>
      </div>
      <p className="text-xs text-white/50 leading-relaxed">{description}</p>
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function DatenschutzPage() {
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
              Datenschutz-
              <br className="sm:hidden" />
              <span className="hidden sm:inline"> </span>
              erklärung
            </h1>
          </div>
        </div>
        <div className="grid gap-6 lg:gap-8">

          {/* Verantwortlicher Card – Art. 13 DSGVO */}
          <SectionCard icon={IconUser} label="1. Verantwortlicher für die Datenverarbeitung" number="1" variant="highlight">
            <p>
              Wir, die {COMPANY.name}, legen größten Wert auf den Schutz Ihrer Daten. Verantwortlicher im Sinne der DSGVO ist:
            </p>
            <div className="grid gap-2 mt-4">
              <InfoRow label="Unternehmen" value={COMPANY.legal} />
              <InfoRow label="Adresse" value={`${COMPANY.streetAddress}, ${COMPANY.postalCode} ${COMPANY.location}`} />
              <InfoRow label="Vertreten durch" value={`${COMPANY.founders[0].name}, ${COMPANY.founders[1].name}`} />
              <InfoRow label="E-Mail" value={<a href={`mailto:${COMPANY.email}`} className="text-brand-cyan hover:underline">{COMPANY.email}</a>} />
              <InfoRow label="Telefon" value={<a href={`tel:${COMPANY.phone}`} className="text-brand-cyan hover:underline">{COMPANY.phoneDisplay}</a>} />
            </div>
            <p className="mt-4 text-white/60 text-xs">
              <strong className="text-white/80">Datenschutzbeauftragter:</strong> Ein Datenschutzbeauftragter ist gemäß § 38 BDSG nicht bestellt, da in unserem Unternehmen weniger als 20 Personen ständig mit der automatisierten Verarbeitung personenbezogener Daten befasst sind.
            </p>
          </SectionCard>

          {/* Überblick Verarbeitungen */}
          <div className={cn("relative overflow-hidden p-6 sm:p-8", CONTAINER_A_NO_GLOW)}>
            <TechCorners pattern="all" variant="cyan" size="md" />
            <div className="absolute top-0 right-0 border-b border-l border-brand-cyan/20 bg-brand-cyan/5 px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-widest text-brand-cyan/70">
              VERARBEITUNGSÜBERSICHT
            </div>
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center border border-brand-cyan/30 bg-brand-cyan/10">
                <IconDatabase className="size-4.5 text-brand-cyan" stroke={1.5} />
              </div>
              <span className="font-mono text-xs uppercase tracking-widest text-brand-cyan/80">Alle Verarbeitungstätigkeiten</span>
            </div>
            {/* Mobile: Karten-Layout */}
            <div className="sm:hidden space-y-2">
              {[
                { dienst: "Vercel Inc.", zweck: "Hosting & Serverinfrastruktur", rg: "Art. 6 I lit. f", drittland: "USA (SCCs)" },
                { dienst: "Notion Labs Inc.", zweck: "Kontaktformular-Einträge", rg: "Art. 6 I lit. b", drittland: "USA (SCCs)" },
                { dienst: "Google Analytics 4", zweck: "Reichweitenmessung (opt-in)", rg: "Art. 6 I lit. a", drittland: "USA (SCCs)" },
                { dienst: "Google Gemini AI", zweck: "KI-Chat-Assistent (opt-in)", rg: "Art. 6 I lit. a", drittland: "USA (SCCs)" },
                { dienst: "Upstash Redis", zweck: "Rate-Limiting (IP, 5 Min.)", rg: "Art. 6 I lit. f", drittland: "USA (SCCs)" },
                { dienst: "OpenStreetMap", zweck: "Kartenanzeige Kontaktseite", rg: "Art. 6 I lit. f", drittland: "— (EU)" },
              ].map((row) => (
                <div key={row.dienst} className="border border-white/5 bg-white/[0.02] p-3 space-y-1">
                  <p className="text-xs font-medium text-white/90">{row.dienst}</p>
                  <p className="text-xs text-white/50">{row.zweck}</p>
                  <div className="flex items-center gap-3 pt-1">
                    <span className="font-mono text-[0.6rem] text-brand-cyan/70">{row.rg}</span>
                    <span className="font-mono text-[0.6rem] text-white/40">{row.drittland}</span>
                  </div>
                </div>
              ))}
            </div>
            {/* Desktop: Tabelle */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left font-mono uppercase tracking-widest text-white/40 pb-3 pr-4">Dienst</th>
                    <th className="text-left font-mono uppercase tracking-widest text-white/40 pb-3 pr-4">Zweck</th>
                    <th className="text-left font-mono uppercase tracking-widest text-white/40 pb-3 pr-4">Rechtsgrundlage</th>
                    <th className="text-left font-mono uppercase tracking-widest text-white/40 pb-3">Drittland</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {[
                    { dienst: "Vercel Inc.", zweck: "Hosting & Serverinfrastruktur", rg: "Art. 6 I lit. f", drittland: "USA (SCCs)" },
                    { dienst: "Notion Labs Inc.", zweck: "Kontaktformular-Einträge", rg: "Art. 6 I lit. b", drittland: "USA (SCCs)" },
                    { dienst: "Google Analytics 4", zweck: "Reichweitenmessung (opt-in)", rg: "Art. 6 I lit. a", drittland: "USA (SCCs)" },
                    { dienst: "Google Gemini AI", zweck: "KI-Chat-Assistent (opt-in)", rg: "Art. 6 I lit. a", drittland: "USA (SCCs)" },
                    { dienst: "Upstash Redis", zweck: "Rate-Limiting (IP, 5 Min.)", rg: "Art. 6 I lit. f", drittland: "USA (SCCs)" },
                    { dienst: "OpenStreetMap", zweck: "Kartenanzeige Kontaktseite", rg: "Art. 6 I lit. f", drittland: "— (EU)" },
                  ].map((row) => (
                    <tr key={row.dienst}>
                      <td className="py-3 pr-4 font-medium text-white/80">{row.dienst}</td>
                      <td className="py-3 pr-4 text-white/50">{row.zweck}</td>
                      <td className="py-3 pr-4 font-mono text-brand-cyan/70">{row.rg}</td>
                      <td className="py-3 text-white/50">{row.drittland}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* ── 2. Hosting ─────────────────────────────────────────────── */}
          <SectionCard icon={IconServer} label="Hosting — Vercel Inc." number="2">
            <p>
              Diese Website wird bei <strong className="text-white/90">Vercel Inc.</strong> (340 S Lemon Ave #4133, Walnut, CA 91789, USA) gehostet.
              Beim Aufruf der Website werden automatisch Server-Logs erzeugt, die IP-Adressen, Zeitstempel, aufgerufene URLs und Browser-Informationen enthalten können.
            </p>
            <p>
              Mit Vercel besteht ein Auftragsverarbeitungsvertrag (Art. 28 DSGVO). Die Datenübertragung in die USA erfolgt auf Basis von
              Standardvertragsklauseln (Art. 46 Abs. 2 lit. c DSGVO). Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse
              an dem sicheren Betrieb der Website).
            </p>
            <div className="mt-2">
              <InfoRow label="Speicherfrist" value="Gemäß Vercel-Richtlinien (i.d.R. 30 Tage für Access-Logs)" />
              <InfoRow label="Mehr Infos" value={<a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-brand-cyan hover:underline">vercel.com/legal/privacy-policy</a>} />
            </div>
          </SectionCard>

          {/* ── 3. Cookies ─────────────────────────────────────────────── */}
          <SectionCard icon={IconCookie} label="Cookies & Einwilligung" number="3">
            <p>
              Wir setzen Cookies und vergleichbare Technologien ein. Nicht notwendige Cookies werden ausschließlich nach Ihrer ausdrücklichen
              Einwilligung gesetzt (Art. 6 Abs. 1 lit. a DSGVO). Die Einwilligung kann jederzeit über den Cookie-Einstellungs-Button
              auf der Website widerrufen werden.
            </p>
            <div className="grid gap-2 mt-4">
              <InfoRow
                label="Notwendig"
                value="Speicherung Ihrer Cookie-Präferenz – immer aktiv, keine Einwilligung erforderlich"
              />
              <InfoRow
                label="Analyse"
                value="Google Analytics 4 – nur aktiv nach Ihrer Einwilligung"
              />
              <InfoRow
                label="KI-Chat"
                value="Google Gemini (Chat) – nur aktiv nach Ihrer Einwilligung in der Kategorie „KI-Chat“"
              />
              <InfoRow
                label="Speicherdauer"
                value="Einwilligungspräferenz: 12 Monate"
              />
            </div>
          </SectionCard>

          {/* ── 4. Kontaktformular / Notion ─────────────────────────────── */}
          <SectionCard icon={IconMail} label="Kontaktformular — Notion" number="4">
            <p>
              Wenn Sie uns über das Kontaktformular schreiben, werden Ihre Angaben (Name, E-Mail-Adresse, optionale Telefonnummer, Nachrichtentext)
              in einer <strong className="text-white/90">Notion-Datenbank</strong> gespeichert (Notion Labs Inc., 2300 Harrison St, San Francisco, CA 94110, USA).
              Zweck ist die Bearbeitung Ihrer Anfrage und die Kontaktaufnahme.
            </p>
            <p>
              Mit Notion Labs Inc. besteht ein Auftragsverarbeitungsvertrag. Die Übertragung in die USA erfolgt auf Basis von
              Standardvertragsklauseln (Art. 46 DSGVO). Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Vertragsanbahnung).
            </p>
            <div className="mt-2">
              <InfoRow label="Speicherfrist" value="90 Tage nach Anfrage, sofern kein Vertragsverhältnis entsteht; bei Vertragsabschluss nach gesetzlichen Aufbewahrungsfristen (10 Jahre)" />
              <InfoRow label="Mehr Infos" value={<a href="https://www.notion.so/privacy" target="_blank" rel="noopener noreferrer" className="text-brand-cyan hover:underline">notion.so/privacy</a>} />
            </div>
          </SectionCard>

          {/* ── 5. Eingebettete Karte ────────────────────────────────────── */}
          <SectionCard icon={IconMap} label="OpenStreetMap (Kontaktseite)" number="5">
            <p>
              Auf der Kontaktseite ist eine Karte von <strong className="text-white/90">OpenStreetMap</strong> (betrieben von der OpenStreetMap Foundation, UK)
              eingebettet. Beim Laden der Karteninhalte werden Kartenkacheln und Ihre IP-Adresse an die Server von OpenStreetMap übertragen.
              Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Standortdarstellung). Eine Datenübertragung
              in Drittstaaten findet nicht statt.
            </p>
            <div className="mt-2">
              <InfoRow label="Mehr Infos" value={<a href="https://wiki.openstreetmap.org/wiki/Privacy_Policy" target="_blank" rel="noopener noreferrer" className="text-brand-cyan hover:underline">openstreetmap.org/privacy</a>} />
            </div>
          </SectionCard>

          {/* ── 6. KI-Chat ──────────────────────────────────────────────── */}
          <SectionCard icon={IconRobot} label="KI-Chat-Assistent — Google Gemini" number="6">
            <p>
              Auf dieser Website steht ein KI-gestützter Chat-Assistent zur Verfügung. <strong className="text-white/90">Wir setzen ausschließlich Google Gemini</strong> ein (Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland
              bzw. Google LLC, USA) – <strong className="text-white/90">kein OpenAI</strong> oder anderer KI-Anbieter für diesen Chat.
              Wenn Sie Freitext eingeben, wird dieser Text (ggf. einschließlich mehrerer Nachrichten in einer laufenden Unterhaltung) zur Erzeugung der Antwort an Google übermittelt. Bitte geben Sie keine Daten ein, deren Übermittlung Sie nicht wünschen; Freitext kann personenbezogene Inhalte enthalten.
            </p>
            <p>
              Der Chat wird <strong className="text-white/90">nur angezeigt und technisch genutzt, wenn Sie in den Cookie-Einstellungen der Kategorie „KI-Chat“ zugestimmt haben</strong>. Unser Server prüft diese Einwilligung vor jeder Chat-Anfrage; ohne Zustimmung findet keine Weiterleitung Ihrer Eingaben an Gemini statt.
            </p>
            <p>
              <strong className="text-white/90">Wir speichern keine Chat-Verläufe dauerhaft auf unseren Systemen.</strong> Rechtsgrundlage für die Nutzung von Gemini nach Einwilligung ist Art. 6 Abs. 1 lit. a DSGVO. Die Datenübertragung in die USA erfolgt auf Basis von Standardvertragsklauseln (Art. 46 DSGVO). Einzelheiten zur Verarbeitung durch Google entnehmen Sie der Datenschutzerklärung von Google.
            </p>
            <div className="mt-2">
              <InfoRow label="Speicherfrist" value="Keine dauerhafte Speicherung des Chat-Inhalts durch uns; technische Schutzmaßnahmen (z. B. Rate-Limit) siehe unten" />
              <InfoRow label="Mehr Infos" value={<a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-brand-cyan hover:underline">policies.google.com/privacy</a>} />
            </div>
          </SectionCard>

          {/* ── 7. Rate-Limiting / Upstash ──────────────────────────────── */}
          <SectionCard icon={IconDatabase} label="Rate-Limiting — Upstash Redis" number="7">
            <p>
              Zur Absicherung des Chat-Dienstes gegen Missbrauch und zum Schutz unserer Infrastruktur setzen wir <strong className="text-white/90">Upstash Redis</strong>
              {" "}(Upstash Inc., USA) für das Rate-Limiting ein. Dabei wird Ihre IP-Adresse für kurze Zeit (max. 5 Minuten) gespeichert,
              um die Anzahl der Anfragen pro Nutzer zu begrenzen.
            </p>
            <p>
              IP-Adressen stellen personenbezogene Daten dar. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an
              der Sicherheit des Dienstes). Mit Upstash besteht ein Auftragsverarbeitungsvertrag; die Datenübertragung in die USA erfolgt
              auf Basis von Standardvertragsklauseln.
            </p>
            <div className="mt-2">
              <InfoRow label="Speicherfrist" value="Max. 5 Minuten (automatisch gelöscht)" />
              <InfoRow label="Mehr Infos" value={<a href="https://upstash.com/static/privacy.pdf" target="_blank" rel="noopener noreferrer" className="text-brand-cyan hover:underline">upstash.com/privacy</a>} />
            </div>
          </SectionCard>

          {/* ── 8. Google Analytics ─────────────────────────────────────── */}
          <SectionCard icon={IconChartBar} label="Google Analytics 4 (GA4)" number="8">
            <p>
              Diese Website nutzt – <strong className="text-white/90">ausschließlich bei Ihrer ausdrücklichen Einwilligung</strong> – Google Analytics 4 (GA4),
              einen Webanalysedienst der Google Ireland Limited (Gordon House, Barrow Street, Dublin 4, Irland).
              GA4 verwendet Cookies, die eine Analyse der Nutzung der Website ermöglichen. Rechtsgrundlage ist Art. 6 Abs. 1 lit. a DSGVO.
            </p>
            <p>
              Wir haben die <strong className="text-white/90">IP-Anonymisierung</strong> aktiviert. Ihre IP-Adresse wird von Google innerhalb der EU/EWR vor der
              Speicherung gekürzt. Mit Google besteht ein Auftragsverarbeitungsvertrag (Art. 28 DSGVO). Die Datenübertragung in die USA
              erfolgt auf Basis von Standardvertragsklauseln.
            </p>
            <p>
              Sie können Ihre Einwilligung jederzeit über die Cookie-Einstellungen widerrufen. Zusätzlich können Sie die Erfassung per
              Browser-Add-on deaktivieren.
            </p>
            <div className="mt-2">
              <InfoRow label="Speicherfrist" value="Rohdaten: 26 Monate (Google-Standard); aggregierte Berichte: unbegrenzt" />
              <InfoRow label="Opt-out" value={<a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-brand-cyan hover:underline">Google Analytics Opt-out Add-on</a>} />
              <InfoRow label="Mehr Infos" value={<a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-brand-cyan hover:underline">policies.google.com/privacy</a>} />
            </div>
          </SectionCard>

          {/* ── 9. Betroffenenrechte ─────────────────────────────────────── */}
          <div className={cn("relative overflow-hidden p-6 sm:p-8", CONTAINER_B_STATIC)}>
            <TechCorners pattern="all" variant="cyan" size="md" animate />
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center border border-brand-cyan/30 bg-brand-cyan/10">
                <IconShield className="size-4.5 text-brand-cyan" stroke={1.5} />
              </div>
              <span className="font-mono text-xs uppercase tracking-widest text-brand-cyan/80">Ihre Rechte (Art. 15–21 DSGVO)</span>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <RightCard icon={IconCheck} title="Auskunft (Art. 15)" description="Sie haben das Recht, Auskunft über die von uns verarbeiteten personenbezogenen Daten zu erhalten." />
              <RightCard icon={IconCheck} title="Berichtigung (Art. 16)" description="Sie können jederzeit die Berichtigung unrichtiger personenbezogener Daten verlangen." />
              <RightCard icon={IconCheck} title="Löschung (Art. 17)" description="Sie können die Löschung Ihrer Daten verlangen, sofern keine Aufbewahrungspflicht entgegensteht." />
              <RightCard icon={IconCheck} title="Einschränkung (Art. 18)" description="Sie können die Einschränkung der Verarbeitung Ihrer Daten verlangen." />
              <RightCard icon={IconCheck} title="Datenübertragbarkeit (Art. 20)" description="Sie können Ihre Daten in einem maschinenlesbaren Format erhalten oder übertragen lassen." />
              <RightCard icon={IconCheck} title="Widerspruch (Art. 21)" description="Sie können der Verarbeitung auf Basis berechtigter Interessen jederzeit widersprechen." />
            </div>
            <div className="mt-6 border-t border-brand-cyan/20 pt-5 text-sm text-white/60">
              <p>
                Zur Ausübung Ihrer Rechte wenden Sie sich bitte per E-Mail an{" "}
                <a href={`mailto:${COMPANY.email}`} className="text-brand-cyan hover:underline">{COMPANY.email}</a>{" "}
                oder postalisch an die oben genannte Adresse. Wir bearbeiten Ihre Anfrage innerhalb von 30 Tagen.
              </p>
              <p className="mt-3">
                Sie haben zudem das Recht, sich bei der zuständigen Datenschutzaufsichtsbehörde zu beschweren. Zuständig ist der{" "}
                <a href="https://www.saechsdsb.de" target="_blank" rel="noopener noreferrer" className="text-brand-cyan hover:underline">
                  Sächsische Datenschutzbeauftragte (SächsDSB)
                </a>.
              </p>
            </div>
          </div>

          {/* ── 10. Speicherfristen ──────────────────────────────────────── */}
          <SectionCard icon={IconClock} label="Speicherfristen im Überblick" number="10">
            <div className="grid gap-2">
              <InfoRow label="Server-Logs" value="Ca. 30 Tage (Vercel)" />
              <InfoRow label="Cookie-Einwilligung" value="12 Monate" />
              <InfoRow label="Kontaktanfragen" value="90 Tage (kein Vertragsabschluss) / 10 Jahre (Vertragsabschluss)" />
              <InfoRow label="Chat-Inhalt" value="Keine dauerhafte Speicherung durch uns; Verarbeitung durch Google gemäß deren Richtlinien" />
              <InfoRow label="Rate-Limit IPs" value="Max. 5 Minuten" />
              <InfoRow label="GA4 Rohdaten" value="26 Monate (Google-Standard)" />
            </div>
          </SectionCard>

        </div>
      </Section>

      <div className="w-full h-px bg-brand-cyan/20 shrink-0 mt-16" role="presentation" aria-hidden="true" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Datenschutz", url: "/datenschutz" },
          ])),
        }}
      />
    </>
  );
}
