import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { COMPANY } from "@/lib/constants";
import { generateBreadcrumbSchema } from "@/lib/seo/schema";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  robots: { index: true, follow: true },
  alternates: { canonical: "/datenschutz" },
};

export default function DatenschutzPage() {
  return (
    <Section className="pt-28">
      <div className="prose prose-neutral mx-auto max-w-3xl">
        <h1>Datenschutzerklärung</h1>

        <h2>1. Datenschutz auf einen Blick</h2>

        <h3>Allgemeine Hinweise</h3>
        <p>
          Die folgenden Hinweise geben einen einfachen Überblick darüber, was
          mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website
          besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie
          persönlich identifiziert werden können.
        </p>

        <h3>Datenerfassung auf dieser Website</h3>
        <p>
          <strong>
            Wer ist verantwortlich für die Datenerfassung auf dieser Website?
          </strong>
          <br />
          Die Datenverarbeitung auf dieser Website erfolgt durch den
          Websitebetreiber: {COMPANY.legal}, Aue-Bad Schlema. Kontakt:{" "}
          {COMPANY.email}, Tel.: {COMPANY.phoneDisplay}.
        </p>

        <h2>2. Hosting</h2>
        <p>
          Diese Website wird bei einem externen Dienstleister gehostet
          (Hoster). Die personenbezogenen Daten, die auf dieser Website erfasst
          werden, werden auf den Servern des Hosters gespeichert.
        </p>

        <h2>3. Allgemeine Hinweise und Pflichtinformationen</h2>

        <h3>Datenschutz</h3>
        <p>
          Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen
          Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten
          vertraulich und entsprechend den gesetzlichen
          Datenschutzvorschriften sowie dieser Datenschutzerklärung.
        </p>

        <h2>4. Datenerfassung auf dieser Website</h2>

        <h3>Cookies und Einwilligung</h3>
        <p>
          Wir holen Ihre Einwilligung für nicht notwendige Cookies über einen
          Cookie-Banner (technisch: react-cookie-manager) ein. Dabei können Sie
          zwischen folgenden Kategorien wählen:
        </p>
        <ul>
          <li>
            <strong>Notwendige Cookies:</strong> Erforderlich für den Betrieb der
            Website (z. B. Speicherung Ihrer Cookie-Präferenz). Diese sind
            immer aktiv.
          </li>
          <li>
            <strong>Analyse-Cookies:</strong> Dienen der Auswertung der
            Nutzung der Website (z. B. Google Analytics). Sie werden nur
            gesetzt, wenn Sie der Kategorie „Analyse“ zugestimmt haben.
          </li>
        </ul>
        <p>
          Die Speicherdauer Ihrer Einwilligung beträgt 12 Monate. Sie können
          Ihre Auswahl jederzeit über den Cookie-Button (Cookie-Einstellungen)
          auf der Website ändern oder widerrufen. Rechtsgrundlage für die
          Verarbeitung auf Basis Ihrer Einwilligung ist Art. 6 Abs. 1 lit. a
          DSGVO.
        </p>

        <h3>Kontaktformular</h3>
        <p>
          Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden
          Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort
          angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den
          Fall von Anschlussfragen bei uns gespeichert.
        </p>

        <h3>Google Analytics</h3>
        <p>
          Diese Website nutzt – <strong>nur bei Ihrer Einwilligung</strong> –
          Google Analytics (GA4), einen Webanalysedienst der Google Ireland
          Limited (bzw. Google LLC). Google Analytics verwendet Cookies, die
          eine Analyse der Nutzung der Website ermöglichen. Die erzeugten
          Informationen werden in der Regel an Server von Google (auch in den
          USA) übertragen.
        </p>
        <p>
          Wir haben die <strong>IP-Anonymisierung</strong> aktiviert. Ihre
          IP-Adresse wird von Google innerhalb der EU/EWR vor der
          Speicherung gekürzt; nur in Ausnahmefällen wird die volle IP an
          einen Server in den USA übermittelt und dort gekürzt. Die
          Rechtsgrundlage für die Nutzung von Google Analytics bei
          Einwilligung ist Art. 6 Abs. 1 lit. a DSGVO. Mit Google besteht
          eine Vereinbarung zur Auftragsverarbeitung (Art. 28 DSGVO); weitere
          Informationen zu Datenschutz und Vertragsklauseln finden Sie unter{" "}
          <a
            href="https://business.safety.google/adsprocessorterms/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Google Ads Data Processing Terms
          </a>{" "}
          bzw. in der{" "}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Datenschutzerklärung von Google
          </a>
          .
        </p>
        <p>
          Sie können Ihre Einwilligung jederzeit über die Cookie-Einstellungen
          auf dieser Website widerrufen. Zusätzlich können Sie die
          Erfassung durch Google Analytics per Browser-Add-on verhindern (
          <a
            href="https://tools.google.com/dlpage/gaoptout"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Google Analytics Opt-out Browser Add-on
          </a>
          ).
        </p>

        <div className="mt-8 rounded-lg border border-border bg-muted/50 p-6">
          <p className="text-sm text-muted-foreground">
            <strong>Hinweis:</strong> Diese Datenschutzerklärung wird
            regelmäßig geprüft. Für eine umfassend rechtssichere Anpassung
            empfehlen wir die Nutzung eines Generators wie{" "}
            <a
              href="https://www.e-recht24.de/muster-datenschutzerklaerung.html"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              e-Recht24
            </a>{" "}
            oder die Beratung durch eine Fachkanzlei.
          </p>
        </div>
      </div>
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
    </Section>
  );
}
