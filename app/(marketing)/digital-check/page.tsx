import { Metadata } from "next";
import { CheckPageClient } from "./client-page";

export const metadata: Metadata = {
  title: "Kostenfreier Digital-Check für Handwerk & Dienstleistung",
  description:
    "Finde in 90 Sekunden heraus, wie viel Potenzial in deinem Betrieb steckt. Kostenlose Potenzialanalyse für kleine und mittelständische Unternehmen im Erzgebirge.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function DigitalCheckPage() {
  return <CheckPageClient />;
}
