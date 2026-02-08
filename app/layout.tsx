import type { Metadata } from "next";
import { Noto_Sans, JetBrains_Mono } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollAnimator } from "@/components/ScrollAnimator";
import { GridBeams } from "@/components/layout/GridBeams";
import "./globals.css";

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
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={`${notoSans.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased">
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
