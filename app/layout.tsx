import type { Metadata } from "next";
import { Noto_Sans, JetBrains_Mono, Barlow } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollAnimator } from "@/components/ScrollAnimator";
import { GridBeams } from "@/components/layout/GridBeams";
import { COMPANY } from "@/lib/constants";
import "./globals.css";

const ORGANIZATION_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "LocalBusiness"],
      "@id": "https://berneby.de/#organization",
      name: COMPANY.name,
      legalName: COMPANY.legal,
      url: "https://berneby.de",
      logo: "https://berneby.de/B.svg",
      telephone: "+4915511960927",
      email: COMPANY.email,
      address: {
        "@type": "PostalAddress",
        addressLocality: COMPANY.location,
        addressRegion: COMPANY.state,
        addressCountry: "DE",
      },
      areaServed: {
        "@type": "AdministrativeArea",
        name: COMPANY.region,
      },
      founder: COMPANY.founders.map((f) => ({
        "@type": "Person",
        name: f.name,
        jobTitle: f.role === "Tech" ? "Tech & Entwicklung" : "Strategie & Kundenbeziehung",
      })),
      foundingDate: COMPANY.founded,
      dateModified: "2026-02-13",
      knowsAbout: [
        "Webdesign",
        "Suchmaschinenoptimierung",
        "KI-Integration",
        "IT-Support",
        "E-Commerce",
      ],
      sameAs: [],
    },
    {
      "@type": "WebSite",
      "@id": "https://berneby.de/#website",
      name: COMPANY.name,
      url: "https://berneby.de",
      publisher: { "@id": "https://berneby.de/#organization" },
      inLanguage: "de-DE",
      dateModified: "2026-02-13",
    },
  ],
};

const notoSans = Noto_Sans({
  variable: "--font-sans",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const barlow = Barlow({
  variable: "--font-display",
  subsets: ["latin", "latin-ext"],
  display: "swap",
  weight: ["700", "800", "900"],
});

export const metadata: Metadata = {
  title: {
    default: "Berneby Solutions – Ihr Digital-Partner im Erzgebirge",
    template: "%s | Berneby Solutions",
  },
  description:
    "Berneby Solutions macht lokale Betriebe im Erzgebirge online sichtbar und automatisiert das, was Zeit frisst. Webseiten, KI-Telefon, SEO – alles aus einer Hand.",
  metadataBase: new URL("https://berneby.de"),
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: "Berneby Solutions",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  themeColor: "#283569",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={`${notoSans.variable} ${jetbrainsMono.variable} ${barlow.variable}`} style={{ colorScheme: "dark" }}>
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_SCHEMA) }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-brand-cyan focus:text-brand-navy focus:p-4 focus:font-bold"
        >
          Zum Inhalt springen
        </a>
        <Header />
        <GridBeams />
        <main id="main-content" className="relative z-10">{children}</main>
        <Footer />
        <ScrollAnimator />
      </body>
    </html>
  );
}
