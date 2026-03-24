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
      address: {
        "@type": "PostalAddress",
        streetAddress: COMPANY.streetAddress,
        addressLocality: COMPANY.location,
        postalCode: COMPANY.postalCode,
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
        jobTitle: f.role.includes("Technische") ? "Tech & Entwicklung" : "Strategie & Kundenbeziehung",
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
