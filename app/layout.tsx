import type { Metadata } from "next";
import { Noto_Sans, JetBrains_Mono, Barlow } from "next/font/google";
import { CookieProviders } from "@/components/providers/CookieProviders";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollAnimator } from "@/components/ScrollAnimator";
import { BackToTop } from "@/components/ui/back-to-top";
import { GridBeams } from "@/components/layout/GridBeams";
import { COMPANY, SITE_URL } from "@/lib/constants";
import "./globals.css";

const ORGANIZATION_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "LocalBusiness"],
      "@id": `${SITE_URL}/#organization`,
      name: COMPANY.name,
      legalName: COMPANY.legal,
      url: SITE_URL,
      logo: `${SITE_URL}/B.svg`,
      image: `${SITE_URL}/og-image.png`,
      telephone: "+4915511960927",
      email: COMPANY.email,
      priceRange: "€€",
      areaServed: {
        "@type": "AdministrativeArea",
        name: COMPANY.region,
      },
      serviceArea: [
        { "@type": "City", name: "Aue-Bad Schlema" },
        { "@type": "City", name: "Bernsbach" },
        { "@type": "City", name: "Bärenstein" },
        { "@type": "City", name: "Crottendorf" },
        { "@type": "City", name: "Bockau" },
        { "@type": "City", name: "Breitenbrunn/Erzgebirge" },
        { "@type": "City", name: "Großolbersdorf" },
        { "@type": "City", name: "Gornsdorf" },
        { "@type": "City", name: "Auerbach/Vogtland" },
        { "@type": "City", name: "Annaberg-Buchholz" },
        { "@type": "City", name: "Eibenstock" },
        { "@type": "City", name: "Marienberg" },
        { "@type": "City", name: "Schwarzenberg/Erzgebirge" }
      ],
      founder: COMPANY.founders.map((f) => ({
        "@type": "Person",
        name: f.name,
        jobTitle: f.role.includes("Technische") ? "Tech & Entwicklung" : "Strategie & Kundenbeziehung",
      })),
      foundingDate: COMPANY.founded,
      description:
        "Berneby Solutions ist dein verlässlicher Digital-Partner für den regionalen Mittelstand im Erzgebirge. Wir machen Handwerks-, Dienstleistungs- und Handelsbetriebe online sichtbar und automatisieren zeitfressende Prozesse im Arbeitsalltag.",
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+4915511960927",
          contactType: "customer support",
          areaServed: "DE",
          availableLanguage: ["de"]
        },
        {
          "@type": "ContactPoint",
          contactType: "customer support",
          url: "https://wa.me/4915511960927",
          areaServed: "DE",
          availableLanguage: ["de"]
        }
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Leistungen",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "IT-Beratung" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Webdesign & Entwicklung" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "IT-Service & Support" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Prozessautomatisierung" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Lokale SEO & Sichtbarkeit" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "KI-Telefon" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Online-Marketing" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Social Media Betreuung" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "IT-Strategie & Beratung" } }
        ]
      },
      knowsAbout: [
        "Webdesign",
        "Suchmaschinenoptimierung",
        "KI-Integration",
        "IT-Support",
        "E-Commerce",
      ],
      sameAs: [
        "https://www.instagram.com/bernebysolutions",
        "https://www.facebook.com/bernebysolutions/",
        "https://wa.me/4915511960927"
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: COMPANY.name,
      url: SITE_URL,
      publisher: { "@id": `${SITE_URL}/#organization` },
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
  metadataBase: new URL(SITE_URL),
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
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    other: [
      { rel: "icon", url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { rel: "icon", url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
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
      <head>
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-QEVDGDCV9G" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-QEVDGDCV9G');`,
          }}
        />
      </head>
      <body className="font-sans antialiased relative overflow-x-hidden">
        <style
          dangerouslySetInnerHTML={{
            __html: "body{background-color:#283569;color:#fff}",
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_SCHEMA) }}
        />
        <CookieProviders>
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
          <BackToTop />
          <ScrollAnimator />
        </CookieProviders>
      </body>
    </html>
  );
}
