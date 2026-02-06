import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { COMPANY } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Impressum",
  robots: { index: false },
};

export default function ImpressumPage() {
  return (
    <Section className="pt-28">
      <div className="prose prose-neutral mx-auto max-w-3xl">
        <h1>Impressum</h1>

        <h2>Angaben gemäß § 5 TMG</h2>
        <p>
          {COMPANY.legal}
          <br />
          Aue-Bad Schlema
          <br />
          Erzgebirgskreis, Sachsen
        </p>

        <h2>Vertreten durch</h2>
        <p>
          Lennard Meyer &amp; Daniel Hamburg
          <br />
          (Gesellschafter der GbR)
        </p>

        <h2>Kontakt</h2>
        <p>
          Telefon: {COMPANY.phoneDisplay}
          <br />
          E-Mail: {COMPANY.email}
        </p>

        <h2>Umsatzsteuer-ID</h2>
        <p>
          Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz:
          <br />
          [Wird nachgetragen]
        </p>

        <h2>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
        <p>
          Lennard Meyer
          <br />
          Aue-Bad Schlema
        </p>

        <h2>EU-Streitschlichtung</h2>
        <p>
          Die Europäische Kommission stellt eine Plattform zur
          Online-Streitbeilegung (OS) bereit. Unsere E-Mail-Adresse finden Sie
          oben im Impressum.
        </p>
        <p>
          Wir sind nicht bereit oder verpflichtet, an
          Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
          teilzunehmen.
        </p>
      </div>
    </Section>
  );
}
