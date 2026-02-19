import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Referenzen – Webdesign & IT-Projekte aus dem Erzgebirge | Berneby Solutions",
  description:
    "Echte Projekte, echte Ergebnisse. Websites, E-Commerce und KI-Telefon für Handwerk, Gastronomie und KMU. Case Studies aus dem Erzgebirge.",
  alternates: { canonical: "/referenzen" },
};

export default function ReferenzenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
