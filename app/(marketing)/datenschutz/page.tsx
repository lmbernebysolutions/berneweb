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

        <h3>Kontaktformular</h3>
        <p>
          Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden
          Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort
          angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den
          Fall von Anschlussfragen bei uns gespeichert.
        </p>

        <h3>Google Analytics</h3>
        <p>
          Diese Website nutzt Google Analytics, einen Webanalysedienst der
          Google LLC. Google Analytics verwendet Cookies, die eine Analyse
          der Benutzung der Website durch Sie ermöglichen. Die durch das
          Cookie erzeugten Informationen werden in der Regel an einen Server
          von Google in den USA übertragen und dort gespeichert.
        </p>

        <div className="mt-8 rounded-lg border border-border bg-muted/50 p-6">
          <p className="text-sm text-muted-foreground">
            <strong>Hinweis:</strong> Diese Datenschutzerklärung ist ein
            Platzhalter. Für eine rechtssichere Version empfehlen wir die
            Nutzung eines Generators wie{" "}
            <a
              href="https://www.e-recht24.de/muster-datenschutzerklaerung.html"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              e-Recht24
            </a>{" "}
            oder der IT-Recht Kanzlei.
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
