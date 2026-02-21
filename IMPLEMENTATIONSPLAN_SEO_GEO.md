# SEO/GEO Implementationsplan – Berneby Solutions

**Erstellt:** 13. Februar 2026
**Basis:** MASTER_TRAFFIC_OPTIMIZATION_2025_2026.md, ergebnisse1-3.mdc
**Tech-Stack:** Next.js 16.1.6 · React 19.2.3 · Tailwind CSS 4 · TypeScript · App Router · Vercel
**Ziel:** Alle On-Site-Methoden mit ≥8/10 Bewertung implementieren

---

## Executive Summary

Berneby Solutions betreibt eine gut strukturierte Next.js-Website mit 5 Hauptseiten, hat aber **kritische SEO-Lücken**: Kein robots.txt, keine Sitemap, kein Schema Markup auf der Homepage/Tech-Seite, und keine programmatischen Seiten. Dieser Plan schließt alle Lücken in 3 Phasen und nutzt die 16 höchstbewerteten Methoden (≥8/10) aus dem Master-Dokument.

### Erwartete Ergebnisse

| Phase | Zeitraum | Traffic-Ziel | Indexed Pages |
|-------|----------|--------------|---------------|
| Phase 1 – Quick Wins | 0–4 Wochen | +15–30% CTR | 7 → 20+ |
| Phase 2 – Mid-Term | 2–6 Monate | +30–53% organisch | 20 → 80+ |
| Phase 3 – Long-Term | 6–12 Monate | +100–300% organisch | 80 → 350+ |

### Methoden-Übersicht (≥8/10 aus Master-Dokument)

| # | Methode | Bewertung | Phase | Impact |
|---|---------|-----------|-------|--------|
| 1 | Local SEO | 10/10 | 2+3 | 76–78% Conversion |
| 2 | GEO | 9/10 | 1 | 40% Sichtbarkeit |
| 3 | Schema Markup | 9/10 | 1 | 22–34% CTR |
| 4 | Topic Clusters | 9/10 | 2 | 30–53% Traffic |
| 5 | Content Freshness | 9/10 | 1+2 | 34% Traffic |
| 6 | FAQ Schema | 9/10 | 1 | 88% Voice Priority |
| 7 | URL Structure | 9/10 | 2 | 18–34% Traffic |
| 8 | Accessibility | 9/10 | 2 | 23–37% Traffic |
| 9 | E-E-A-T | 9/10 | 2 | 30% Top-3 |
| 10 | Internal Linking | 8/10 | 2 | 4× Traffic |
| 11 | Meta Tags | 8/10 | 1 | 10–30% CTR |
| 12 | Featured Snippets | 8/10 | 1 | 42.9–44% CTR |
| 13 | Core Web Vitals | 8/10 | 1 | 10–20% Conv. |
| 14 | Programmatic SEO | 8/10 | 3 | 850% Growth (Case) |
| 15 | robots.txt & Sitemap | 8/10 | 1 | Crawl/Indexing |
| 16 | Mobile-First | 8/10 | 1 | Table Stakes |

---

## Phase 1: Quick Wins (0–4 Wochen)

### 1.1 robots.txt & Sitemap

- **Bewertung**: 8/10
- **Impact**: Crawl Budget Optimierung, Indexing aller Seiten, AI-Crawler-Zugang
- **Status**: Fehlt komplett

**Technische Umsetzung:**

Neue Datei: `berneby-website/app/robots.ts`
```typescript
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/font-test/"],
      },
      // AI-Crawler explizit erlauben
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "anthropic-ai", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
    ],
    sitemap: "https://berneby.de/sitemap.xml",
  };
}
```

Neue Datei: `berneby-website/app/sitemap.ts`
```typescript
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://berneby.de";
  const now = new Date();

  return [
    { url: baseUrl, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${baseUrl}/handwerk`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/tech`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/ueber-uns`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/kontakt`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/impressum`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/datenschutz`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];
}
```

- **Components**: Keine neuen nötig
- **Dateien**: `app/robots.ts` (neu), `app/sitemap.ts` (neu)
- **Zeit**: 2h
- **Erfolgsmetrik**: `curl https://berneby.de/robots.txt` zeigt korrekte Regeln; `curl https://berneby.de/sitemap.xml` zeigt alle URLs; Google Search Console zeigt "Submitted and indexed"

---

### 1.2 Schema Markup – Organization, LocalBusiness, FAQ

- **Bewertung**: Schema 9/10, FAQ 9/10
- **Impact**: 22–34% CTR/Citation Lift, 88% Voice Search Priority, 45% höhere FAQ-CTR
- **Status**: Nur auf /ueber-uns (AboutPage) und teilweise /handwerk, /kontakt. **Fehlt auf Homepage und /tech.**

**Technische Umsetzung:**

#### A) Globales Organization + LocalBusiness Schema in `app/layout.tsx`

JSON-LD `<script>` im `<body>` einfügen:

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "LocalBusiness"],
      "@id": "https://berneby.de/#organization",
      "name": "Berneby Solutions",
      "legalName": "Berneby Solutions GbR",
      "url": "https://berneby.de",
      "logo": "https://berneby.de/B.svg",
      "telephone": "+4915511960927",
      "email": "info@berneby.de",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Aue-Bad Schlema",
        "addressRegion": "Sachsen",
        "addressCountry": "DE"
      },
      "areaServed": {
        "@type": "AdministrativeArea",
        "name": "Erzgebirgskreis"
      },
      "founder": [
        {
          "@type": "Person",
          "name": "Lennard Meyer",
          "jobTitle": "Tech & Entwicklung"
        },
        {
          "@type": "Person",
          "name": "Daniel Hamburg",
          "jobTitle": "Strategie & Kundenbeziehung"
        }
      ],
      "foundingDate": "2026",
      "knowsAbout": [
        "Webdesign",
        "Suchmaschinenoptimierung",
        "KI-Integration",
        "IT-Support",
        "E-Commerce"
      ],
      "sameAs": []
    },
    {
      "@type": "WebSite",
      "@id": "https://berneby.de/#website",
      "name": "Berneby Solutions",
      "url": "https://berneby.de",
      "publisher": { "@id": "https://berneby.de/#organization" },
      "inLanguage": "de-DE"
    }
  ]
}
```

#### B) FAQPage Schema auf jeder Seite mit FAQs

Neue Utility-Funktion in `lib/seo/schema.ts`:

```typescript
export function generateFaqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };
}
```

Einbinden auf:
- `app/(marketing)/page.tsx` → `HOME_MINI_FAQ` (3 FAQs)
- `app/(marketing)/handwerk/page.tsx` → Handwerk-FAQs aus `FAQ_ITEMS`
- `app/(marketing)/tech/page.tsx` → Tech-relevante FAQs aus `FAQ_ITEMS`

#### C) Service Schema auf `/handwerk` und `/tech`

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "provider": { "@id": "https://berneby.de/#organization" },
  "name": "Webseiten & Digitalisierung für Handwerker",
  "description": "Mehr Aufträge, weniger Aufwand: Handwerks-Pakete mit Website, KI-Telefonassistent und Google-Sichtbarkeit.",
  "areaServed": { "@type": "AdministrativeArea", "name": "Erzgebirgskreis" },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Handwerks-Pakete",
    "itemListElement": [
      {
        "@type": "Offer",
        "name": "Geselle",
        "price": "950",
        "priceCurrency": "EUR"
      },
      {
        "@type": "Offer",
        "name": "Meisterbetrieb",
        "price": "1950",
        "priceCurrency": "EUR"
      },
      {
        "@type": "Offer",
        "name": "Marktführer",
        "price": "2800",
        "priceCurrency": "EUR"
      }
    ]
  }
}
```

#### D) BreadcrumbList Schema auf allen Unterseiten

Neue Utility in `lib/seo/schema.ts`:

```typescript
export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": item.name,
      "item": item.url,
    })),
  };
}
```

- **Dateien**: `app/layout.tsx` (erweitern), `lib/seo/schema.ts` (neu), alle `page.tsx` (Schema einfügen)
- **Components**: Keine neuen nötig
- **Zeit**: 10h
- **Erfolgsmetrik**: [Google Rich Results Test](https://search.google.com/test/rich-results) zeigt gültige Schemas; [Schema.org Validator](https://validator.schema.org/) bestätigt Korrektheit

---

### 1.3 Meta Tags Optimierung

- **Bewertung**: 8/10
- **Impact**: 10–30% CTR Boost, ROI 24.5 (höchster aller Methoden)
- **Status**: Basis-Metadata vorhanden via `PAGE_META`, aber nicht SEO-optimiert

**Technische Umsetzung:**

`PAGE_META` in `lib/constants.ts` optimieren:

| Seite | Aktuell | Optimiert |
|-------|---------|-----------|
| Home `title` | "Berneby Solutions – Ihr Digital-Partner im Erzgebirge" | "Webdesign & IT-Service Erzgebirge \| Berneby Solutions" |
| Home `description` | "Berneby Solutions macht lokale Betriebe..." (95 Zeichen) | "Websites, KI-Telefon & lokale SEO für Handwerker im Erzgebirge. Ab 950 € – Festpreis, 4 Wochen bis Go-Live. Kostenloses Erstgespräch." (139 Zeichen) |
| Handwerk `title` | "Webseiten & Digitalisierung für Handwerker" | "Website für Handwerker ab 950 € \| Berneby Solutions Erzgebirge" |
| Handwerk `description` | "Mehr Aufträge, weniger Aufwand..." (95 Zeichen) | "Handwerker-Websites mit 50+ lokalen Landingpages, KI-Telefonassistent & Google Ads. Festpreis, 4 Wochen bis Go-Live. Jetzt Erstgespräch buchen." (148 Zeichen) |
| Tech `title` | *(kein PAGE_META vorhanden)* | "IT-Service & Webentwicklung Erzgebirge \| Berneby Solutions" |
| Tech `description` | *(kein PAGE_META vorhanden)* | "Webseiten, Online-Shops, Microsoft 365, KI-Schulung & IT-Support für KMU im Erzgebirge. Digitaler Hausmeister ab 850 €. Jetzt beraten lassen." (147 Zeichen) |
| Über uns `title` | "Über uns – Ein Team, ein Ziel" | "Über Berneby Solutions – Lennard Meyer & Daniel Hamburg \| Erzgebirge" |
| Kontakt `title` | "Kontakt – Sprechen Sie mit uns" | "Kontakt & Erstgespräch \| Berneby Solutions Erzgebirge" |

Zusätzlich in `app/layout.tsx` OpenGraph ergänzen:

```typescript
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
```

- **Dateien**: `lib/constants.ts` (PAGE_META erweitern), `app/layout.tsx` (OG ergänzen)
- **Zeit**: 4h (inkl. OG-Image erstellen)
- **Erfolgsmetrik**: Google Search Console CTR-Vergleich vorher/nachher nach 4 Wochen

---

### 1.4 GEO-Optimierung bestehender Inhalte

- **Bewertung**: 9/10
- **Impact**: 40% Sichtbarkeit in AI-Antworten, 2.8× höhere AI-Citation mit klaren Headings
- **Status**: Keine GEO-Optimierung vorhanden

**Technische Umsetzung (Content-Änderungen):**

Alle 9 Princeton-GEO-Methoden auf bestehende Seiten anwenden:

#### A) Statistiken einbauen (bester GEO-Boost: +37%)

Auf `/handwerk`:
> "Laut einer Studie von Google besuchen 76% der Nutzer, die lokal suchen, innerhalb von 24 Stunden ein Geschäft. Mit unseren 50+ lokalen Landingpages sorgen wir dafür, dass SIE gefunden werden."

Auf `/tech`:
> "53% des gesamten Website-Traffics kommt über organische Suche. Ohne professionelle SEO verschenken Sie mehr als die Hälfte Ihrer potenziellen Kunden."

#### B) Zitate ergänzen (+30%)

Auf `/ueber-uns`:
> "Wie die Deutsche Handwerks-Zeitung berichtet: 'SEO für Handwerker ist in Zeiten von KI wichtiger denn je.' Genau das ist unser Spezialgebiet."

#### C) Klare H2/H3-Hierarchie (2.8× Citation-Wahrscheinlichkeit)

Jede Seite prüfen: H1 → H2 → H3 konsistent, keine Sprünge.

#### D) Answer-First-Format

FAQ-Antworten in `constants.ts` mit direkter Antwort im ersten Satz beginnen (aktuell bereits gut).

#### E) Content-Freshness Signale

`dateModified` in Schema hinzufügen; "Stand: Februar 2026" auf relevanten Seiten.

- **Dateien**: Alle `page.tsx`, `lib/constants.ts` (FAQ-Texte ggf. anpassen)
- **Components**: Keine neuen nötig
- **Zeit**: 6h
- **Erfolgsmetrik**: AI-Citation-Test: "Was macht Berneby Solutions?" in ChatGPT, Perplexity, Gemini prüfen

---

### 1.5 Featured Snippets Optimierung

- **Bewertung**: 8/10
- **Impact**: 42.9–44% CTR (vs. 19.6% Position 1 ohne Snippet)
- **Status**: FAQ-Sektionen vorhanden, aber nicht snippet-optimiert

**Technische Umsetzung:**

#### A) FAQ-Antworten auf 40–60 Wörter optimieren

`FAQ_ITEMS` in `constants.ts` durchgehen:
- Jede Antwort auf 40–60 Wörter kürzen (aktuell teilweise zu lang)
- Erste Zeile = direkte Antwort
- Danach Kontext/Details

Beispiel:
```
Frage: "Was kostet eine Website bei Berneby Solutions?"
Antwort: "Unsere Webseiten starten bei 950 € für einen One-Pager. Mehrseitige Websites mit SEO beginnen bei 1.950 €. Alle Preise netto. Ein Erstgespräch ist immer kostenlos."
```

#### B) Tabellen für Vergleiche

Auf `/handwerk` eine Vergleichstabelle der Pakete als HTML `<table>` (nicht nur Cards):

| Feature | Geselle (950 €) | Meisterbetrieb (1.950 €) | Marktführer (2.800 €) |
|---------|-----|-----|-----|
| Professionelle Website | ✓ | ✓ | ✓ |
| 50+ Landingpages | — | ✓ | ✓ |
| KI-Telefonassistent | — | — | ✓ |

#### C) Nummerierte Listen für Prozesse

`PROCESS_STEPS` als `<ol>` mit Schema-Markup (HowTo) rendern.

- **Dateien**: `lib/constants.ts`, `app/(marketing)/handwerk/page.tsx`
- **Components**: Nutze bestehende `PricingCards`, ergänze Tabellen-Variante
- **Zeit**: 4h
- **Erfolgsmetrik**: Google SERP-Check für "website für handwerker kosten" – Snippet erscheint?

---

### 1.6 Core Web Vitals Check

- **Bewertung**: 8/10
- **Impact**: 10–20% Conversion Lift, 1s Delay = -7% bis -20% Conversion
- **Status**: Next.js 16 + Vercel = gute Basis, aber noch nicht gemessen

**Technische Umsetzung:**

#### A) Baseline-Messung

```bash
npx lighthouse https://berneby.de --output json --output html --chrome-flags="--headless"
```

Oder via PageSpeed Insights: `https://pagespeed.web.dev/analysis?url=https://berneby.de`

#### B) Optimierungen

1. **LCP** (<2.5s Ziel):
   - `next/image` für alle Bilder nutzen (WebP/AVIF automatisch)
   - Hero-Image mit `priority` laden
   - Font-Display: `swap` (bereits via `next/font` korrekt)

2. **INP** (<200ms Ziel):
   - Prüfe `ScrollAnimator` – kein Layout-Blocking?
   - Event-Handler in `ContactForm` optimieren
   - Keine Hydration-heavy Components in der initialen View

3. **CLS** (<0.1 Ziel):
   - Alle Images: `width`/`height` oder `aspect-ratio` setzen
   - `AnimatedMascot` SVG: Feste Dimensionen
   - Font-Loading: `next/font` mit `preload` (bereits vorhanden)

4. **Next.js Config** in `next.config.ts`:
   ```typescript
   const nextConfig = {
     images: {
       formats: ["image/avif", "image/webp"],
     },
     experimental: {
       optimizePackageImports: ["@tabler/icons-react"],
     },
   };
   ```

- **Dateien**: `next.config.ts`, diverse `page.tsx` und Components
- **Components**: Bestehende prüfen/optimieren
- **Zeit**: 6h
- **Erfolgsmetrik**: PageSpeed Insights Mobile ≥ 90, alle CWV "Good"

---

### 1.7 Mobile-First Audit

- **Bewertung**: 8/10
- **Impact**: Table Stakes – 60–70% Mobile Traffic
- **Status**: Tailwind CSS + responsive Components = gute Basis

**Technische Umsetzung:**

- Google Mobile-Friendly Test: `https://search.google.com/test/mobile-friendly?url=https://berneby.de`
- Tap-Target-Größen prüfen: Min. 48×48px
- Font-Größe: Min. 16px Body
- Kein horizontales Scrollen
- Testen auf iPhone SE (320px), iPhone 14 (390px), iPad (768px)

- **Dateien**: Diverse Components (Button, ContactForm, Header)
- **Zeit**: 3h
- **Erfolgsmetrik**: Google Mobile-Friendly Test = "Page is mobile-friendly"

---

### Phase 1 Zusammenfassung

| Maßnahme | Aufwand | Impact | Priorität |
|----------|---------|--------|-----------|
| 1.1 robots.txt & Sitemap | 2h | Indexing | Sofort |
| 1.2 Schema Markup | 10h | 22–34% CTR | Sofort |
| 1.3 Meta Tags | 4h | 10–30% CTR | Woche 1 |
| 1.4 GEO-Optimierung | 6h | 40% AI-Sichtbarkeit | Woche 1–2 |
| 1.5 Featured Snippets | 4h | 42.9% CTR | Woche 2 |
| 1.6 Core Web Vitals | 6h | 10–20% Conv. | Woche 2–3 |
| 1.7 Mobile-First | 3h | Table Stakes | Woche 3 |
| **Gesamt Phase 1** | **35h** | | **0–4 Wochen** |

---

## Phase 2: Mid-Term (2–6 Monate)

### 2.1 Topic Clusters & Pillar Pages

- **Bewertung**: 9/10
- **Impact**: 30–53% Traffic Lift, 2.5× längere Ranking-Retention, 107% Steigerung (HubSpot Case Study)
- **Status**: Keine Content-Strategie vorhanden

**Topic-Cluster-Architektur:**

#### Cluster 1: "Digitalisierung Handwerk" (Primär)

**Keyword-Daten (aus Research):**
- "seo fur handwerker" – Medium-High (500–1000/mo), Competition High → **Pillar**
- "website fur handwerker" – High (1000–3000/mo national) → **Cluster**
- "ki fur handwerker" – Medium (200–500/mo), Competition Low → **Cluster (Blue Ocean!)**
- "handwerker digitalisierung" – Medium (300–800/mo) → **Cluster**
- "google sichtbarkeit handwerker" – Low-Medium → **Cluster**

```
Pillar: /ratgeber/digitalisierung-handwerk
├── /ratgeber/website-fuer-handwerker
├── /ratgeber/seo-fuer-handwerker
├── /ratgeber/ki-telefonassistent-handwerk
├── /ratgeber/google-business-profil-handwerker
├── /ratgeber/online-terminbuchung-handwerk
├── /ratgeber/handwerker-online-marketing
└── /ratgeber/bewertungsmanagement-handwerker
```

**Pillar Page**: ~2.500 Wörter, Übersicht aller Digitalisierungs-Themen
**Cluster Pages**: Je ~1.500 Wörter, Deep-Dive zu einem Thema

#### Cluster 2: "IT-Service für KMU" (Sekundär)

**Keyword-Daten:**
- "it support kleine unternehmen" – Medium (300–600/mo) → **Pillar**
- "microsoft 365 einrichtung" – Medium (200–500/mo) → **Cluster**
- "digitaler hausmeister" – Very Low (Kategorie-Kreation!) → **Cluster**
- "it dienstleister erzgebirge" – Low (20–50/mo), Competition Very Low → **Cluster**

```
Pillar: /ratgeber/it-service-kmu
├── /ratgeber/microsoft-365-fuer-handwerker
├── /ratgeber/digitaler-hausmeister-erklaert
├── /ratgeber/ki-schulung-unternehmen
├── /ratgeber/it-sicherheit-kleine-betriebe
└── /ratgeber/cloud-loesungen-handwerk
```

#### Cluster 3: "KI im Handwerk" (Emerging – Blue Ocean!)

**Keyword-Daten (alle Low-Competition, Rising Demand):**
- "ki telefonassistent handwerker" – Low-Medium, **Very Low Competition**
- "automatisierung handwerksbetrieb" – Low
- "ki kompetenz schulung" – Medium (EU AI Act Demand)

```
Pillar: /ratgeber/ki-im-handwerk
├── /ratgeber/ki-telefonassistent-vergleich
├── /ratgeber/chatgpt-fuer-handwerker
├── /ratgeber/ki-schulung-eu-ai-act
├── /ratgeber/automatisierung-handwerksbetrieb
└── /ratgeber/ki-angebote-schreiben
```

**Technische Umsetzung:**

Neue Route: `app/(marketing)/ratgeber/[slug]/page.tsx`

```typescript
// app/(marketing)/ratgeber/[slug]/page.tsx
import { getArticleBySlug, getAllArticleSlugs } from "@/lib/content/ratgeber";

export async function generateStaticParams() {
  return getAllArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const article = getArticleBySlug(params.slug);
  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: `/ratgeber/${params.slug}` },
  };
}
```

Content-Datenstruktur: `lib/content/ratgeber.ts`
```typescript
export interface RatgeberArticle {
  slug: string;
  title: string;
  description: string;
  cluster: string;
  pillarSlug: string | null; // null = ist selbst Pillar
  content: string; // Markdown oder JSX
  relatedSlugs: string[];
  datePublished: string;
  dateModified: string;
}
```

- **Dateien**: `app/(marketing)/ratgeber/[slug]/page.tsx` (neu), `lib/content/ratgeber.ts` (neu), `app/sitemap.ts` (erweitern)
- **Components**: Nutze `SectionHeading`, `Card`, `CtaSection`, `FaqAccordion`
- **Neue Components** (falls nötig): `BreadcrumbNav`, `TableOfContents`, `RelatedArticles`
- **Zeit**: 40h (Struktur + erste 8–10 Artikel)
- **Erfolgsmetrik**: Google Search Console: 15–30% mehr Top-20-Keywords nach 3 Monaten

---

### 2.2 URL Structure & Site Architecture

- **Bewertung**: 9/10
- **Impact**: 18–34% Traffic, ≤3 Klicks Tiefe
- **Status**: Aktuell flach und sauber, aber keine dynamischen Routen

**Neue URL-Hierarchie:**

```
berneby.de/                          (Home)
berneby.de/handwerk                  (Handwerk – bestehend)
berneby.de/tech                      (Tech – bestehend)
berneby.de/ueber-uns                 (Über uns – bestehend)
berneby.de/kontakt                   (Kontakt – bestehend)
berneby.de/ratgeber/                 (Ratgeber-Übersicht – NEU)
berneby.de/ratgeber/[slug]           (Ratgeber-Artikel – NEU)
berneby.de/standorte/[ort]           (Location Pages – Phase 3)
berneby.de/branchen/[slug]           (Branchen Pages – Phase 3)
berneby.de/impressum                 (bestehend)
berneby.de/datenschutz               (bestehend)
```

Alle Seiten ≤3 Klicks von Home erreichbar. Neue Seiten nicht in Hauptnavigation.

- **Dateien**: File-System-Routing via App Router
- **Zeit**: 4h (Routing-Setup)
- **Erfolgsmetrik**: Screaming Frog Crawl zeigt max. 3 Klick-Tiefe

---

### 2.3 Internal Linking Strategie

- **Bewertung**: 8/10
- **Impact**: 4× Traffic mit 40–44 Links, 18–34% Traffic Lift, 2.7× AI-Citation bei bidirektional
- **Status**: Keine systematische interne Verlinkung

**Regeln:**

1. **Bidirektional**: Pillar ↔ Cluster immer in beide Richtungen
2. **Kontextuell**: Links innerhalb des Body-Texts, nicht nur Footer/Sidebar
3. **Deskriptiv**: Anchor-Text = Keyword (nicht "hier klicken")
4. **3–8 interne Links** pro Seite
5. **Hochautoritäts-Seiten** (Home, Handwerk) linken zu neuen Seiten

**Umsetzung:**

| Von (Seite) | Zu (Seite) | Anchor-Text |
|-------------|------------|-------------|
| Home | /handwerk | "Pakete für Handwerker" |
| Home | /tech | "Alle Tech-Leistungen" |
| Home | /ratgeber/digitalisierung-handwerk | "Ratgeber: Digitalisierung im Handwerk" |
| /handwerk | /ratgeber/seo-fuer-handwerker | "Wie lokale SEO funktioniert" |
| /handwerk | /ratgeber/ki-telefonassistent-handwerk | "So funktioniert der KI-Telefonassistent" |
| /tech | /ratgeber/microsoft-365-fuer-handwerker | "Microsoft 365 für Ihren Betrieb" |
| /ratgeber/digitalisierung-handwerk | /handwerk | "Unsere Handwerks-Pakete" |
| /ratgeber/digitalisierung-handwerk | /ratgeber/website-fuer-handwerker | "Website für Handwerker" |
| /ratgeber/digitalisierung-handwerk | /ratgeber/seo-fuer-handwerker | "SEO für Handwerker" |
| /ratgeber/digitalisierung-handwerk | /ratgeber/ki-telefonassistent-handwerk | "KI-Telefonassistent" |
| Jede Ratgeber-Seite | Pillar-Seite | → Immer zurück zum Pillar |
| Jede Ratgeber-Seite | 2–3 verwandte Cluster | → Lateral-Links |
| Jede Ratgeber-Seite | /kontakt | "Jetzt Erstgespräch vereinbaren" |

**Technische Umsetzung:**

`relatedSlugs` in jeder `RatgeberArticle` → automatisch "Verwandte Artikel" Section rendern.

- **Dateien**: Alle `page.tsx`, `lib/content/ratgeber.ts`
- **Components**: `RelatedArticles` (neu, einfache Card-Liste)
- **Zeit**: 8h (initiales Setup + Verlinkung aller bestehenden Seiten)
- **Erfolgsmetrik**: Google Search Console: Internal Links Report; Screaming Frog: Keine Orphan Pages

---

### 2.4 E-E-A-T Implementation

- **Bewertung**: 9/10
- **Impact**: 30% bessere Top-3 Chancen, 67% Traffic (Case Study), 28% Conversion
- **Status**: Team-Sektion vorhanden, aber keine E-E-A-T Signale

**Technische Umsetzung:**

#### A) Author Schema auf Ratgeber-Artikeln

```json
{
  "@type": "Article",
  "author": {
    "@type": "Person",
    "name": "Lennard Meyer",
    "jobTitle": "Full-Stack-Entwickler & Gründer, Berneby Solutions",
    "url": "https://berneby.de/ueber-uns"
  },
  "publisher": { "@id": "https://berneby.de/#organization" },
  "datePublished": "2026-02-13",
  "dateModified": "2026-02-13"
}
```

#### B) Trust-Signale auf jeder Seite

- "Seit 2026 im Erzgebirge" Badge (nutze `Badge` Component)
- Gründer-Fotos auf `/ueber-uns` (authentisch, nicht Stock)
- Konkreter Standort: "Aue-Bad Schlema, Erzgebirgskreis"
- Erfahrungsnachweise der Gründer

#### C) Transparenz

- Preise offen auf der Website (bereits vorhanden – gut!)
- Impressum vollständig (prüfen)
- Datenschutz aktuell (prüfen)

- **Dateien**: `app/ueber-uns/page.tsx`, `lib/seo/schema.ts`, Ratgeber-Template
- **Components**: Bestehende `TeamSection`, `Badge`
- **Zeit**: 6h
- **Erfolgsmetrik**: Google Search Quality Evaluator Guidelines: Seite zeigt klare Expertise, Autorität, Vertrauenswürdigkeit

---

### 2.5 Accessibility (WCAG 2.1 AA)

- **Bewertung**: 9/10
- **Impact**: 23–37% Traffic, 27% mehr Keyword Rankings, EAA seit Juni 2025 in Kraft
- **Status**: Skip-to-Content vorhanden, Rest ungeprüft

**Technische Umsetzung:**

#### A) Audit

```bash
npx axe-cli https://berneby.de --browser chrome
```

Oder: Chrome DevTools → Lighthouse → Accessibility

#### B) Häufigste Fixes

1. **Farbkontrast**: Alle Text-Farben gegen Hintergrund prüfen (WCAG 1.4.3: min. 4.5:1)
2. **Alt-Texte**: Alle `<img>` / `next/image` brauchen `alt`
3. **ARIA-Labels**: Interaktive Elemente (Buttons, Links, Accordion) richtig labeln
4. **Keyboard Navigation**: Tab-Reihenfolge logisch, Focus-Styles sichtbar
5. **Heading-Hierarchie**: H1 → H2 → H3 ohne Sprünge
6. **Formular-Labels**: `ContactForm` – alle Inputs mit `<label>` verbinden
7. **Link-Texte**: Nicht "hier klicken" → beschreibende Texte

#### C) Semantisches HTML

- `<main>`, `<nav>`, `<aside>`, `<footer>` korrekt nutzen (bereits in Layout)
- `<section>` mit `aria-labelledby` für Screen Reader
- `role="complementary"` für Sidebar-Elemente

- **Dateien**: Diverse Components (`Header`, `Footer`, `ContactForm`, `FaqAccordion`, etc.)
- **Zeit**: 12h
- **Erfolgsmetrik**: Lighthouse Accessibility Score ≥ 95; axe-core: 0 Critical Violations

---

### 2.6 Content Freshness Strategie

- **Bewertung**: 9/10
- **Impact**: 34% Traffic Lift, 43% höhere AI Visibility, 68% der AI-Citations < 12 Monate alt
- **Status**: Kein Update-Kalender

**Update-Kalender:**

| Frequenz | Seiten | Aktion |
|----------|--------|--------|
| Monatlich | /handwerk, /tech | Preise prüfen, Statistiken aktualisieren, `dateModified` |
| Alle 30–60 Tage | Ratgeber-Artikel | Fakten prüfen, "Stand: [Monat] 2026" aktualisieren |
| Quartalsweise | Home, Über uns | Trust-Zahlen aktualisieren, neue Referenzen |
| Bei Änderung | FAQ, Schema | Sofort aktualisieren |

**Technisch:**
- `dateModified` in allen Schema-Markups pflegen
- "Zuletzt aktualisiert: [Datum]" auf Ratgeber-Artikeln anzeigen
- Vercel ISR: `revalidate: 86400` (24h) für dynamische Seiten

- **Dateien**: Alle `page.tsx`, Content-Dateien
- **Zeit**: 2h Setup + 2h/Monat laufend
- **Erfolgsmetrik**: AI-Citation-Rate steigt; Search Console: Impressions steigen nach Updates

---

### Phase 2 Zusammenfassung

| Maßnahme | Aufwand | Impact | Priorität |
|----------|---------|--------|-----------|
| 2.1 Topic Clusters | 40h | 30–53% Traffic | Hoch |
| 2.2 URL Structure | 4h | 18–34% Traffic | Hoch |
| 2.3 Internal Linking | 8h | 4× Traffic | Hoch |
| 2.4 E-E-A-T | 6h | 30% Top-3 | Mittel |
| 2.5 Accessibility | 12h | 23–37% Traffic | Hoch |
| 2.6 Content Freshness | 2h + laufend | 34% Traffic | Mittel |
| **Gesamt Phase 2** | **72h** | | **2–6 Monate** |

---

## Phase 3: Long-Term (6–12 Monate)

### 3.1 Programmatic SEO – Location Pages

- **Bewertung**: Local SEO 10/10, Programmatic SEO 8/10
- **Impact**: 76–78% same-day Visit/offline Conversion, 30–50% Traffic für Multi-Location, 850% Growth (Case Study)
- **Status**: 6 Orte in `EINZUGSGEBIET_ORTE`, keine Location Pages

**Konzept:**

59 Orte im Erzgebirgskreis × 5 Leistungen = **295 Location Pages**

#### Leistungen pro Ort

1. "Webdesign in [Ort]"
2. "IT-Service in [Ort]"
3. "SEO & Online-Marketing in [Ort]"
4. "KI-Lösungen für Unternehmen in [Ort]"
5. "Online-Shop erstellen in [Ort]"

#### Priorisierung

**Welle 1 (Top 15 Städte, >8.000 Einwohner) – 75 Pages:**

| Stadt | Einwohner | Slug |
|-------|-----------|------|
| Aue-Bad Schlema | 18.870 | aue-bad-schlema |
| Annaberg-Buchholz | 18.815 | annaberg-buchholz |
| Marienberg | 16.139 | marienberg |
| Schwarzenberg | 15.475 | schwarzenberg |
| Schneeberg | 13.377 | schneeberg |
| Zwönitz | 11.358 | zwoenitz |
| Stollberg | 11.127 | stollberg |
| Oelsnitz | 10.954 | oelsnitz |
| Olbernhau | 9.953 | olbernhau |
| Zschopau | 8.760 | zschopau |
| Lauter-Bernsbach | 8.179 | lauter-bernsbach |
| Lößnitz | 7.557 | loessnitz |
| Lugau | 7.481 | lugau |
| Pockau-Lengefeld | 7.273 | pockau-lengefeld |
| Eibenstock | 6.795 | eibenstock |

**Welle 2 (Restliche 44 Orte) – 220 Pages:**
Alle weiteren Städte und Gemeinden des Erzgebirgskreises.

#### Technische Umsetzung

Neue Route: `app/(marketing)/standorte/[ort]/page.tsx`

```typescript
// app/(marketing)/standorte/[ort]/page.tsx
import { getLocationBySlug, getAllLocationSlugs } from "@/lib/data/locations";

export async function generateStaticParams() {
  return getAllLocationSlugs().map((ort) => ({ ort }));
}

export async function generateMetadata({ params }: { params: { ort: string } }) {
  const location = getLocationBySlug(params.ort);
  return {
    title: `Webdesign & IT-Service in ${location.name} | Berneby Solutions`,
    description: `Berneby Solutions – Ihr Partner für Webseiten, SEO, KI-Telefon & IT-Support in ${location.name}. Lokal im Erzgebirge, persönlicher Service. Erstgespräch kostenlos.`,
    alternates: { canonical: `/standorte/${params.ort}` },
  };
}
```

Datenstruktur: `lib/data/locations.ts` (TypeScript-Ready aus Research):

```typescript
export interface Municipality {
  name: string;
  slug: string;
  type: "stadt" | "gemeinde";
  population: number;
  // Unique Content pro Ort
  description: string;      // 2-3 Sätze über den Ort
  nearbyOrte: string[];      // Nachbarorte für Internal Linking
  besonderheiten: string[];  // Lokale Fakten (Wirtschaft, Sehenswürdigkeiten)
  entfernung: string;        // "15 km von Aue-Bad Schlema"
}
```

#### Content-Qualität (kritisch!)

Jede Location Page muss **einzigartigen Content** haben (min. 500 Wörter):

1. **Lokaler Bezug**: "In [Ort] mit seinen [X] Einwohnern..."
2. **Spezifische Fakten**: Wirtschaftsstruktur, Handwerksbetriebe, lokale Besonderheiten
3. **Entfernung**: "Nur [X] Minuten von unserem Büro in Aue-Bad Schlema"
4. **Relevante Services**: Was brauchen Betriebe in diesem Ort?
5. **Lokale Testimonials** (wenn vorhanden)
6. **CTA**: Kontaktformular, Telefonnummer

#### Schema pro Location Page

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Berneby Solutions – Webdesign in Annaberg-Buchholz",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Aue-Bad Schlema",
    "addressRegion": "Sachsen"
  },
  "areaServed": {
    "@type": "City",
    "name": "Annaberg-Buchholz"
  },
  "serviceArea": {
    "@type": "GeoCircle",
    "geoMidpoint": {
      "@type": "GeoCoordinates",
      "latitude": 50.5767,
      "longitude": 12.9996
    },
    "geoRadius": "30 km"
  }
}
```

#### Empfohlene GitHub Repos als Referenz

| Repo | Zweck | Relevanz |
|------|-------|----------|
| [ixartz/Next-js-Boilerplate](https://github.com/ixartz/Next-js-Boilerplate) (12.6k ★) | Production-Infrastruktur, Sitemap, i18n, Drizzle ORM | Architektur-Referenz |
| [agamm/pseo-next](https://github.com/agamm/pseo-next) (59 ★) | Purpose-built Programmatic SEO mit `/variant/[slug]` | Pattern-Referenz |
| [garmeeh/next-seo](https://github.com/garmeeh/next-seo) (8.3k ★) | JSON-LD Components (LocalBusinessJsonLd, FAQPageJsonLd) | **Library einsetzen** |
| [timlrx/tailwind-nextjs-starter-blog](https://github.com/timlrx/tailwind-nextjs-starter-blog) (10.4k ★) | MDX Content, Sitemap, Tags | Content-Referenz |

**Empfehlung:** `next-seo` als Dependency installieren für typsichere Schema-Components:

```bash
npm install next-seo
```

- **Dateien**: `app/(marketing)/standorte/[ort]/page.tsx` (neu), `lib/data/locations.ts` (neu), `app/sitemap.ts` (erweitern)
- **Components**: Nutze `Hero`, `TrustBar`, `ContactForm`, `FeatureGrid`, `CtaSection`. Ggf. neu: `LocationHero` (Variante von Hero mit Ortsnamen)
- **Zeit**: 60h (Welle 1: 40h, Welle 2: 20h mit Template)
- **Erfolgsmetrik**: Google Search Console: 150+ indexierte Location Pages; Ranking für "[service] [ort]" Queries

---

### 3.2 Programmatic SEO – Branchen Pages

- **Bewertung**: 8/10 (Programmatic SEO)
- **Impact**: 30–50% zusätzlicher Traffic
- **Status**: Branchenreferenzen vorhanden (`REFERENZEN_BRANCHEN`), keine dedizierten Seiten

**Konzept:**

10 Branchen × 5 Leistungen = **50 Branchen Pages**

#### Branchen

| Branche | Slug | Relevanz |
|---------|------|----------|
| Elektriker | elektriker | Sehr hoch |
| Dachdecker | dachdecker | Sehr hoch |
| Sanitär & Heizung | sanitaer-heizung | Sehr hoch |
| Maler & Lackierer | maler-lackierer | Hoch |
| Schreiner/Tischler | tischler | Hoch |
| KFZ-Werkstätten | kfz-werkstatt | Hoch |
| Friseure | friseur | Mittel |
| Gastronomie | gastronomie | Mittel |
| Einzelhandel | einzelhandel | Mittel |
| Freiberufler | freiberufler | Mittel |

#### URL-Muster

```
/branchen/elektriker          → "Website & Digitalisierung für Elektriker"
/branchen/dachdecker          → "Website & Digitalisierung für Dachdecker"
/branchen/sanitaer-heizung    → "Website & Digitalisierung für SHK-Betriebe"
```

#### Technische Umsetzung

Gleiche Architektur wie Location Pages:

```typescript
// app/(marketing)/branchen/[slug]/page.tsx
export async function generateStaticParams() {
  return getAllBranchenSlugs().map((slug) => ({ slug }));
}
```

Datenstruktur: `lib/data/branchen.ts`

```typescript
export interface Branche {
  name: string;
  slug: string;
  description: string;
  typischeProbleme: string[];    // Pain Points dieser Branche
  loesungen: string[];           // Berneby-Lösungen dafür
  suchbegriffe: string[];        // "Elektriker [Ort]", "Elektro Notdienst"
  preisRelevant: string;         // "Meisterbetrieb" oder "Marktführer"
  faqItems: { question: string; answer: string }[];
}
```

- **Dateien**: `app/(marketing)/branchen/[slug]/page.tsx` (neu), `lib/data/branchen.ts` (neu)
- **Components**: Nutze `Hero`, `ProblemSection`, `PricingCards`, `FaqAccordion`, `CtaSection`
- **Zeit**: 30h
- **Erfolgsmetrik**: Rankings für "website für [branche]" Queries

---

### 3.3 Erweiterte Sitemap-Strategie

**Sitemap-Index mit Sub-Sitemaps:**

`app/sitemap.ts` erweitern zu Index-Sitemap:

```typescript
import type { MetadataRoute } from "next";
import { getAllLocationSlugs } from "@/lib/data/locations";
import { getAllBranchenSlugs } from "@/lib/data/branchen";
import { getAllArticleSlugs } from "@/lib/content/ratgeber";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://berneby.de";
  const now = new Date();

  // Hauptseiten
  const mainPages = [
    { url: baseUrl, lastModified: now, changeFrequency: "weekly" as const, priority: 1.0 },
    { url: `${baseUrl}/handwerk`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${baseUrl}/tech`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${baseUrl}/ueber-uns`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${baseUrl}/kontakt`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${baseUrl}/impressum`, lastModified: now, changeFrequency: "yearly" as const, priority: 0.3 },
    { url: `${baseUrl}/datenschutz`, lastModified: now, changeFrequency: "yearly" as const, priority: 0.3 },
  ];

  // Ratgeber-Artikel
  const ratgeberPages = getAllArticleSlugs().map((slug) => ({
    url: `${baseUrl}/ratgeber/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Location Pages
  const locationPages = getAllLocationSlugs().map((ort) => ({
    url: `${baseUrl}/standorte/${ort}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // Branchen Pages
  const branchenPages = getAllBranchenSlugs().map((slug) => ({
    url: `${baseUrl}/branchen/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...mainPages, ...ratgeberPages, ...locationPages, ...branchenPages];
}
```

- **Zeit**: 4h
- **Erfolgsmetrik**: Google Search Console: Alle URLs submitted, Indexing-Rate > 80%

---

### Phase 3 Zusammenfassung

| Maßnahme | Aufwand | Impact | Priorität |
|----------|---------|--------|-----------|
| 3.1 Location Pages (295) | 60h | 76–78% Conv., 30–50% Traffic | Sehr hoch |
| 3.2 Branchen Pages (50) | 30h | 30–50% Traffic | Hoch |
| 3.3 Erweiterte Sitemap | 4h | Crawl/Index | Hoch |
| **Gesamt Phase 3** | **94h** | | **6–12 Monate** |

---

## Technische Architektur

### Neue File-Struktur

```
berneby-website/
├── app/
│   ├── (marketing)/
│   │   ├── page.tsx                           # Home (bestehend)
│   │   ├── handwerk/page.tsx                  # Handwerk (bestehend)
│   │   ├── tech/page.tsx                      # Tech (bestehend)
│   │   ├── kontakt/page.tsx                   # Kontakt (bestehend)
│   │   ├── legal/
│   │   │   ├── datenschutz/page.tsx           # (bestehend)
│   │   │   └── impressum/page.tsx             # (bestehend)
│   │   ├── ratgeber/                          # NEU (Phase 2)
│   │   │   ├── page.tsx                       # Ratgeber-Übersicht
│   │   │   └── [slug]/
│   │   │       └── page.tsx                   # Ratgeber-Artikel
│   │   ├── standorte/                         # NEU (Phase 3)
│   │   │   ├── page.tsx                       # Standorte-Übersicht (optional)
│   │   │   └── [ort]/
│   │   │       └── page.tsx                   # Location Page
│   │   └── branchen/                          # NEU (Phase 3)
│   │       ├── page.tsx                       # Branchen-Übersicht (optional)
│   │       └── [slug]/
│   │           └── page.tsx                   # Branchen Page
│   ├── ueber-uns/page.tsx                     # (bestehend)
│   ├── robots.ts                              # NEU (Phase 1)
│   ├── sitemap.ts                             # NEU (Phase 1, erweitert Phase 3)
│   └── layout.tsx                             # (bestehend, Schema ergänzen)
│
├── lib/
│   ├── constants.ts                           # (bestehend, erweitern)
│   ├── utils.ts                               # (bestehend)
│   ├── seo/                                   # NEU (Phase 1)
│   │   └── schema.ts                          # Schema-Generatoren
│   ├── content/                               # NEU (Phase 2)
│   │   └── ratgeber.ts                        # Ratgeber-Artikel-Daten
│   └── data/                                  # NEU (Phase 3)
│       ├── locations.ts                       # 59 Erzgebirgskreis-Orte
│       └── branchen.ts                        # 10 Branchen-Daten
│
├── components/
│   ├── sections/                              # (bestehend)
│   │   └── ... (bestehende Components)
│   └── templates/                             # NEU (Phase 2/3, falls nötig)
│       ├── RatgeberLayout.tsx                 # Ratgeber-Artikel-Template
│       └── LocationPage.tsx                   # Location-Page-Template
│
└── public/
    └── og-image.png                           # NEU (Phase 1)
```

### Schema.org Strategie (Komplett)

| Schema-Typ | Wo | Phase |
|------------|-----|-------|
| Organization + LocalBusiness | `app/layout.tsx` (global) | 1 |
| WebSite | `app/layout.tsx` (global) | 1 |
| FAQPage | Home, Handwerk, Tech, Ratgeber-Seiten | 1 |
| Service + Offer | /handwerk, /tech | 1 |
| BreadcrumbList | Alle Unterseiten | 1 |
| AboutPage + Person | /ueber-uns | 1 (erweitern) |
| ContactPage | /kontakt | 1 (erweitern) |
| Article + Person (Author) | /ratgeber/[slug] | 2 |
| LocalBusiness + ServiceArea | /standorte/[ort] | 3 |
| ProfessionalService | /branchen/[slug] | 3 |

### Content-Strategie (Gesamt)

| Content-Typ | Anzahl | Phase | Wörter pro Seite |
|-------------|--------|-------|------------------|
| Hauptseiten (bestehend) | 7 | 1 (optimieren) | 300–800 |
| Ratgeber-Pillar | 3 | 2 | 2.500+ |
| Ratgeber-Cluster | 15–20 | 2 | 1.500+ |
| Location Pages | 295 | 3 | 500+ (unique) |
| Branchen Pages | 50 | 3 | 800+ (unique) |
| **Gesamt** | **~370 Pages** | | |

---

## Keyword-Strategie (aus Research)

### Tier 1 – Höchste Priorität (Sofort umsetzen)

| Keyword | Cluster | Volume | Competition | Intent |
|---------|---------|--------|-------------|--------|
| `ki telefonassistent handwerker` | KI Handwerk | Low-Medium (steigend) | **Very Low** | Commercial |
| `ki fur handwerker` | KI Handwerk | Medium (200–500/mo) | Low | Informational |
| `webdesign [stadt] erzgebirge` | Lokal | Low pro Stadt | Low-Medium | Transactional |
| `seo fur handwerker` | SEO Handwerk | Medium-High (500–1000/mo) | High | Informational |
| `it dienstleister erzgebirge` | IT Support | Low (20–50/mo) | **Very Low** | Transactional |

### Tier 2 – Hohe Priorität (30 Tage)

| Keyword | Cluster | Volume | Competition | Intent |
|---------|---------|--------|-------------|--------|
| `website fur handwerker erzgebirge` | Webdesign | Medium | Medium | Commercial |
| `google sichtbarkeit handwerker` | SEO Handwerk | Low-Medium | Medium | Informational |
| `ki schulung sachsen` | KI Handwerk | Medium | Low | Commercial |
| `digitalisierung handwerk 2026` | KI Handwerk | Medium | Medium | Informational |
| `microsoft 365 einrichtung handwerker` | IT Support | Medium | Low | Commercial |

### Tier 3 – Mittelfristig (60 Tage)

| Keyword | Cluster | Volume | Competition | Intent |
|---------|---------|--------|-------------|--------|
| `handwerker online marketing` | SEO Handwerk | Medium | Medium-High | Informational |
| `automatisierung handwerksbetrieb` | KI Handwerk | Low | Low | Commercial |
| `it support kleine unternehmen sachsen` | IT Support | Medium | Medium | Commercial |
| `digitaler hausmeister` | IT Support | Very Low | **Very Low** | Commercial |

### GEO-Keywords (AI-Citation-Potenzial)

| Keyword | Format | AI-Potenzial | Empfohlenes Content-Format |
|---------|--------|-------------|---------------------------|
| `was kostet eine website fur handwerker` | Frage | Sehr hoch | FAQ + Preistabelle |
| `ki telefonassistent fur handwerker erklarung` | Definition | Sehr hoch | Ratgeber + Schema |
| `digitalisierung handwerk vorteile` | Liste | Hoch | Listicle + Statistiken |
| `seo fur handwerker tipps` | How-to | Hoch | Step-by-Step Guide |
| `webdesign kosten 2026` | Vergleich | Hoch | Tabelle + FAQ |

---

## Wettbewerbsanalyse (Erzgebirge)

### Direkte Wettbewerber

| Wettbewerber | Stärke | Schwäche | Berneby-Chance |
|-------------|--------|----------|----------------|
| webdesign-erzgebirge.com | Exact-Match-Domain, gutes Ranking | Kein KI, kein IT-Support | Breitere Servicepallette |
| webdesign-erz.de | Aggressive Preise (ab 199 €), City-Pages | Niedrigqualität, kein Schema | Qualität + Schema + GEO |
| Berris Media | Etabliert in Annaberg | Kein Handwerker-Fokus | Nische "Handwerk" |
| MSIS Design | KI-Positionierung | Chemnitz-basiert, nicht lokal | Echter Erzgebirge-Fokus |
| Computer-Erz | IT-Service + Webdesign | Veraltet, kein SEO | Moderner Stack + SEO |

### Blue-Ocean-Chancen (kein Wettbewerber bedient)

1. **KI-Telefonassistent für Handwerker** – Nur bundesweite Anbieter (fonio.ai, hallopetra.de), keiner lokal
2. **Topic Cluster "KI im Handwerk"** – Kein regionaler Wettbewerber hat Content dazu
3. **EU AI Act KI-Schulung** – Gesetzlich seit Feb. 2025 gefordert, Sachsen fördert es
4. **"Digitaler Hausmeister"** – Kategorie existiert nicht, kann von Berneby definiert werden

---

## Monitoring & Erfolgsmetriken

### KPIs pro Phase

#### Phase 1 (Woche 1–4)

| KPI | Ziel | Messung |
|-----|------|---------|
| Rich Snippets in Google | 5+ Seiten | Google Search Console |
| Indexed Pages | 7 → 20+ | `site:berneby.de` |
| CTR | +10–15% | Search Console |
| PageSpeed Mobile | ≥ 90 | PageSpeed Insights |
| Schema Valid | 100% | Rich Results Test |
| Accessibility Score | ≥ 90 | Lighthouse |

#### Phase 2 (Monat 2–6)

| KPI | Ziel | Messung |
|-----|------|---------|
| Organischer Traffic | +30% | Google Analytics / Search Console |
| Keyword Rankings Top 20 | +15–30% | Ahrefs / SEMrush |
| Ratgeber-Artikel indexiert | 15–20 | Search Console |
| Dwell Time | +40% | Analytics |
| AI Citations | 3+ | Manuell: ChatGPT, Perplexity, Gemini |

#### Phase 3 (Monat 6–12)

| KPI | Ziel | Messung |
|-----|------|---------|
| Organischer Traffic | +100–300% | Analytics |
| Indexed Pages | 300+ | Search Console |
| Location Page Rankings | Top 10 für "[service] [ort]" | SEMrush |
| AI Citations | 10+ Mentions | Manuelles Monitoring |
| Conversion Rate | +10–20% | Analytics |
| Neue Anfragen/Monat | +50% | CRM / Kontaktformular |

### Tools

| Tool | Zweck | Kosten |
|------|-------|--------|
| Google Search Console | Indexing, Rankings, CTR | Kostenlos |
| Google Analytics 4 | Traffic, Conversions | Kostenlos |
| PageSpeed Insights | Core Web Vitals | Kostenlos |
| Schema.org Validator | Schema-Prüfung | Kostenlos |
| Rich Results Test | Rich Snippets prüfen | Kostenlos |
| axe DevTools | Accessibility | Kostenlos (Basic) |
| Ahrefs Lite | Keywords, Backlinks | ~99 $/mo |
| AI-Suche manuell | GEO-Monitoring | Kostenlos |

---

## Risiken & Mitigationen

| Risiko | Wahrscheinlichkeit | Impact | Mitigation |
|--------|---------------------|--------|------------|
| **Duplicate Content (Programmatic SEO)** | Mittel | Hoch | Min. 500 Wörter unique Content pro Location Page; lokale Fakten, Entfernungen, Besonderheiten einbauen; Canonical Tags |
| **Schema Errors** | Gering | Mittel | Automatisierte Validation bei jedem Build; `generateFaqSchema()` als typsichere Utility |
| **CWV Degradation (mehr Seiten)** | Mittel | Mittel | ISR nutzen (`revalidate`); Image Optimization; Code Splitting per Route |
| **Google Penalty (Thin Content)** | Gering | Sehr hoch | Batch-Start mit 50–100 Pages; Qualitäts-Check vor Veröffentlichung; Monitoring der Indexing-Rate |
| **User-Verwirrung** | Gering | Mittel | Neue Seiten NICHT in Hauptnavigation; nur über Sitemap, Footer-Links, und interne Links erreichbar |
| **AI-Crawler blockiert** | Gering | Mittel | robots.txt regelmäßig prüfen; alle AI-Bots explizit erlauben |
| **Wettbewerber kopieren Strategie** | Mittel | Gering | First-Mover-Advantage nutzen; Content-Qualität als Moat |

---

## Priorisierung (Effort vs. Impact Matrix)

### High Impact, Low Effort → Sofort umsetzen

1. Schema Markup (FAQ, Organization, LocalBusiness) – 10h, 22–34% CTR
2. robots.txt + Sitemap – 2h, Indexing
3. Meta Tags Optimierung – 4h, 10–30% CTR
4. GEO Content (Statistiken, Zitate) – 6h, 40% AI-Sichtbarkeit

### High Impact, High Effort → Geplant priorisieren

1. Topic Clusters + Pillar Content – 40h, 30–53% Traffic
2. Location Pages (Programmatic SEO) – 60h, 76–78% Conversion
3. Accessibility WCAG Audit – 12h, 23–37% Traffic
4. Branchen Pages – 30h, 30–50% Traffic

### Medium Impact, Low Effort → Quick Wins

1. Breadcrumb Schema – 2h
2. OG-Image erstellen – 2h
3. Content Freshness (`dateModified`) – 2h
4. Mobile-First Audit – 3h

### Medium Impact, Medium Effort → Laufend

1. Internal Linking optimieren – 8h initial, laufend
2. E-E-A-T Signale – 6h
3. Featured Snippets – 4h
4. Core Web Vitals – 6h

---

## Nächste Schritte

1. **Approval**: Diesen Plan reviewen und priorisieren
2. **Phase 1 Start**: Woche 1 mit robots.txt + Sitemap + Schema Markup beginnen
3. **CWV Baseline**: PageSpeed Insights für aktuelle Performance messen
4. **Content-Planung**: Erste 3 Ratgeber-Artikel für Topic Cluster 1 planen
5. **Location-Daten**: 59 Erzgebirgskreis-Orte in `lib/data/locations.ts` erfassen
6. **next-seo evaluieren**: `npm install next-seo` und Integration testen
7. **Weekly Check-ins**: Jeden Freitag Review + nächste Woche planen

---

## Finale Checkliste

- [x] Alle Methoden mit ≥8/10 Bewertung aus Master-Dokument enthalten (16/16)
- [x] Phasen klar getrennt (Quick Wins, Mid-Term, Long-Term)
- [x] Programmatic SEO Repos recherchiert und empfohlen (4 Repos)
- [x] Nur vorhandene Components verwendet (neue begründet: BreadcrumbNav, RelatedArticles, LocationHero)
- [x] File-Struktur klar und Next.js 16 App Router konform
- [x] Schema.org Strategie vollständig (10 Schema-Typen)
- [x] Internal Linking Rules definiert
- [x] Monitoring & KPIs festgelegt (3 Phasen)
- [x] Risiken identifiziert und Mitigationen vorgeschlagen (7 Risiken)
- [x] Keyword-Research mit 5 Clustern und GEO-Keywords
- [x] Wettbewerbsanalyse mit Blue-Ocean-Chancen
- [x] 59 Erzgebirgskreis-Orte recherchiert (27 Städte + 32 Gemeinden)
- [x] Content-Strategie: ~370 Seiten geplant

---

## Gesamtaufwand

| Phase | Aufwand | Zeitraum |
|-------|---------|----------|
| Phase 1: Quick Wins | 35h | 0–4 Wochen |
| Phase 2: Mid-Term | 72h | 2–6 Monate |
| Phase 3: Long-Term | 94h | 6–12 Monate |
| **Gesamt** | **201h** | **12 Monate** |

---

*Erstellt: 13. Februar 2026 | Berneby Solutions SEO/GEO Implementationsplan*
*Quellen: MASTER_TRAFFIC_OPTIMIZATION_2025_2026.md, ergebnisse1-3.mdc, Keyword Research, Competitor Analysis, GitHub Repo Research*
