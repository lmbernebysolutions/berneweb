# Phase 1: Quick Wins – Taskliste

**Zeitraum:** 0–4 Wochen  
**Basis:** [IMPLEMENTATIONSPLAN_SEO_GEO.md](IMPLEMENTATIONSPLAN_SEO_GEO.md) § Phase 1

---

## Maßnahme 1.1: robots.txt & Sitemap

| ID | Titel | Beschreibung | Dateien | Abhängigkeiten | Erfolgsmetrik | Skills |
|----|-------|--------------|---------|----------------|--------------|--------|
| P1-1.1-T1 | robots.ts erstellen | Erstelle `berneby-website/app/robots.ts` mit Next.js `MetadataRoute.Robots`. Regeln: `allow: "/"`, `disallow: ["/api/", "/font-test/"]`. AI-Crawler explizit erlauben: GPTBot, ChatGPT-User, PerplexityBot, ClaudeBot, anthropic-ai, Google-Extended. Sitemap-URL: `https://berneby.de/sitemap.xml`. | `app/robots.ts` | — | `curl https://berneby.de/robots.txt` zeigt korrekte Regeln | resonance-seo |
| P1-1.1-T2 | sitemap.ts erstellen | Erstelle `berneby-website/app/sitemap.ts` mit allen Hauptseiten. URLs: `/`, `/handwerk`, `/tech`, `/ueber-uns`, `/kontakt`, `/impressum`, `/datenschutz`. **Hinweis:** Aktuell liegen Legal-Seiten unter `app/(marketing)/legal/` → URLs sind `/legal/impressum`, `/legal/datenschutz`. Footer verlinkt auf `/impressum`, `/datenschutz`. Entweder: (a) Seiten nach `app/(marketing)/impressum/` und `datenschutz/` verschieben, oder (b) Sitemap mit tatsächlichen URLs `/legal/impressum`, `/legal/datenschutz` füllen und Footer-Links prüfen. | `app/sitemap.ts` | P1-1.1-T1 | `curl https://berneby.de/sitemap.xml` zeigt alle URLs | resonance-seo |

---

## Maßnahme 1.2: Schema Markup – Organization, LocalBusiness, FAQ, Service, Breadcrumb

| ID | Titel | Beschreibung | Dateien | Abhängigkeiten | Erfolgsmetrik | Skills |
|----|-------|--------------|---------|----------------|--------------|--------|
| P1-1.2-T1 | lib/seo/schema.ts anlegen | Erstelle `berneby-website/lib/seo/schema.ts` mit `generateFaqSchema(faqs)` und `generateBreadcrumbSchema(items)`. Typsicher, exportiert für page.tsx. | `lib/seo/schema.ts` | — | Datei existiert, Funktionen exportiert | resonance-seo |
| P1-1.2-T2 | Globales Organization + LocalBusiness + WebSite Schema in layout.tsx | Füge JSON-LD `<script type="application/ld+json">` im `<body>` von `app/layout.tsx` ein. Nutze COMPANY aus `lib/constants.ts` für name, legalName, phone, email, address, founders. IDs: `#organization`, `#website`. | `app/layout.tsx` | P1-1.2-T1 | Rich Results Test zeigt Organization, LocalBusiness, WebSite | resonance-seo, brand-guardian |
| P1-1.2-T3 | FAQPage Schema auf Home | In `app/(marketing)/page.tsx` FAQPage-Schema mit `HOME_MINI_FAQ` einbinden. Script im JSX oder via generateMetadata. | `app/(marketing)/page.tsx` | P1-1.2-T1 | Rich Results Test: FAQPage auf Home | resonance-seo |
| P1-1.2-T4 | FAQPage Schema auf Handwerk | In `app/(marketing)/handwerk/page.tsx` FAQPage-Schema mit Handwerk-relevanten FAQs aus `FAQ_ITEMS` einbinden. | `app/(marketing)/handwerk/page.tsx` | P1-1.2-T1 | Rich Results Test: FAQPage auf /handwerk | resonance-seo |
| P1-1.2-T5 | FAQPage Schema auf Tech | In `app/(marketing)/tech/page.tsx` FAQPage-Schema mit Tech-relevanten FAQs aus `FAQ_ITEMS` einbinden. | `app/(marketing)/tech/page.tsx` | P1-1.2-T1 | Rich Results Test: FAQPage auf /tech | resonance-seo |
| P1-1.2-T6 | Service Schema auf Handwerk | In `app/(marketing)/handwerk/page.tsx` Service-Schema mit CRAFT_PACKAGES (Geselle 950, Meisterbetrieb 1950, Marktführer 2800) einbinden. provider: `#organization`. | `app/(marketing)/handwerk/page.tsx` | P1-1.2-T2 | Schema.org Validator: Service gültig | resonance-seo |
| P1-1.2-T7 | Service Schema auf Tech | In `app/(marketing)/tech/page.tsx` Service-Schema für Tech-Leistungen einbinden (SERVICES aus constants). | `app/(marketing)/tech/page.tsx` | P1-1.2-T2 | Schema.org Validator: Service gültig | resonance-seo |
| P1-1.2-T8 | BreadcrumbList auf allen Unterseiten | Breadcrumb-Schema auf handwerk, tech, ueber-uns, kontakt, legal-Seiten. Nutze `generateBreadcrumbSchema()`. Items: Home → [Seite]. | Alle page.tsx (außer Home) | P1-1.2-T1 | BreadcrumbList auf jeder Unterseite | resonance-seo |

---

## Maßnahme 1.3: Meta Tags Optimierung

| ID | Titel | Beschreibung | Dateien | Abhängigkeiten | Erfolgsmetrik | Skills |
|----|-------|--------------|---------|----------------|--------------|--------|
| P1-1.3-T1 | PAGE_META in constants.ts erweitern | Erweitere `lib/constants.ts` PAGE_META: Home title "Webdesign & IT-Service Erzgebirge \| Berneby Solutions", description 139 Zeichen. Handwerk title "Website für Handwerker ab 950 € \| Berneby Solutions Erzgebirge", description 148 Zeichen. **Neu:** tech mit title "IT-Service & Webentwicklung Erzgebirge \| Berneby Solutions", description 147 Zeichen. ueberUns, kontakt gemäß Plan-Tabelle. | `lib/constants.ts` | — | PAGE_META.tech existiert, alle Werte gesetzt | resonance-seo |
| P1-1.3-T2 | Tech-Seite PAGE_META nutzen | In `app/(marketing)/tech/page.tsx` metadata von PAGE_META.tech statt Hardcode übernehmen. | `app/(marketing)/tech/page.tsx` | P1-1.3-T1 | Tech-Seite nutzt PAGE_META.tech | resonance-seo |
| P1-1.3-T3 | OpenGraph & Twitter in layout.tsx | In `app/layout.tsx` metadata erweitern: openGraph.images `[{ url: "/og-image.png", width: 1200, height: 630 }]`, twitter.card "summary_large_image", twitter.images. | `app/layout.tsx` | — | OG/Twitter Meta-Tags im HTML | resonance-seo |
| P1-1.3-T4 | OG-Image erstellen | Erstelle `public/og-image.png` 1200×630px. Brand-konform (brand-guardian). | `public/og-image.png` | — | Datei existiert, korrekte Dimensionen | brand-guardian |

---

## Maßnahme 1.4: GEO-Optimierung bestehender Inhalte

| ID | Titel | Beschreibung | Dateien | Abhängigkeiten | Erfolgsmetrik | Skills |
|----|-------|--------------|---------|----------------|--------------|--------|
| P1-1.4-T1 | Statistik auf Handwerk einbauen | Auf `app/(marketing)/handwerk/page.tsx` Text einfügen: "Laut einer Studie von Google besuchen 76% der Nutzer, die lokal suchen, innerhalb von 24 Stunden ein Geschäft. Mit unseren 50+ lokalen Landingpages sorgen wir dafür, dass SIE gefunden werden." | `app/(marketing)/handwerk/page.tsx` | — | Text sichtbar auf /handwerk | geo-content-optimizer |
| P1-1.4-T2 | Statistik auf Tech einbauen | Auf `app/(marketing)/tech/page.tsx` Text einfügen: "53% des gesamten Website-Traffics kommt über organische Suche. Ohne professionelle SEO verschenken Sie mehr als die Hälfte Ihrer potenziellen Kunden." | `app/(marketing)/tech/page.tsx` | — | Text sichtbar auf /tech | geo-content-optimizer |
| P1-1.4-T3 | Zitat auf Über-uns einbauen | Auf `app/ueber-uns/page.tsx` Zitat: "Wie die Deutsche Handwerks-Zeitung berichtet: 'SEO für Handwerker ist in Zeiten von KI wichtiger denn je.' Genau das ist unser Spezialgebiet." | `app/ueber-uns/page.tsx` | — | Zitat sichtbar auf /ueber-uns | geo-content-optimizer |
| P1-1.4-T4 | H2/H3-Hierarchie prüfen | Alle Seiten: H1 → H2 → H3 konsistent, keine Sprünge. SectionHeading, Hero, FaqAccordion prüfen. | Alle page.tsx, SectionHeading, Hero | — | Keine Heading-Sprünge | geo-content-optimizer |
| P1-1.4-T5 | Content-Freshness: dateModified in Schema | dateModified in Organization/Article-Schema wo relevant. "Stand: Februar 2026" auf relevanten Seiten. | layout.tsx, page.tsx, schema.ts | P1-1.2-T2 | dateModified in Schema | geo-content-optimizer |

---

## Maßnahme 1.5: Featured Snippets Optimierung

| ID | Titel | Beschreibung | Dateien | Abhängigkeiten | Erfolgsmetrik | Skills |
|----|-------|--------------|---------|----------------|--------------|--------|
| P1-1.5-T1 | FAQ_ITEMS auf 40–60 Wörter optimieren | In `lib/constants.ts` jede FAQ-Antwort: 40–60 Wörter, erste Zeile = direkte Antwort. | `lib/constants.ts` | — | Alle FAQ-Antworten 40–60 Wörter | resonance-seo |
| P1-1.5-T2 | Paket-Vergleichstabelle auf Handwerk | Auf `app/(marketing)/handwerk/page.tsx` HTML `<table>` mit CRAFT_PACKAGES: Feature-Spalten (Geselle, Meisterbetrieb, Marktführer), Zeilen z.B. Professionelle Website, 50+ Landingpages, KI-Telefonassistent. | `app/(marketing)/handwerk/page.tsx` | — | Tabelle semantisch, sichtbar | resonance-seo |
| P1-1.5-T3 | PROCESS_STEPS als HowTo Schema | ProcessSteps-Component oder page.tsx: PROCESS_STEPS als `<ol>` mit HowTo-Schema rendern. | `components/sections/ProcessSteps.tsx` oder page.tsx | P1-1.2-T1 | HowTo-Schema auf Seiten mit Prozess | resonance-seo |

---

## Maßnahme 1.6: Core Web Vitals Check

| ID | Titel | Beschreibung | Dateien | Abhängigkeiten | Erfolgsmetrik | Skills |
|----|-------|--------------|---------|----------------|--------------|--------|
| P1-1.6-T1 | Baseline messen | PageSpeed Insights oder `npx lighthouse https://berneby.de` ausführen. LCP, INP, CLS dokumentieren. | — | — | Baseline-Werte dokumentiert | — |
| P1-1.6-T2 | next.config.ts Image-Optimierung | In `next.config.ts`: images.formats `["image/avif", "image/webp"]`, experimental.optimizePackageImports `["@tabler/icons-react"]`. | `next.config.ts` | — | Config gesetzt | — |
| P1-1.6-T3 | Hero-Image mit priority | Hero-Component: next/image mit `priority` für Above-the-fold-Bilder. | `components/sections/Hero.tsx` | — | priority auf Hero-Image | — |
| P1-1.6-T4 | Images: width/height oder aspect-ratio | Alle next/image und img: width/height oder aspect-ratio setzen. AnimatedMascot: feste Dimensionen. | Diverse components | — | Kein CLS durch Images | — |
| P1-1.6-T5 | ScrollAnimator & ContactForm prüfen | Prüfen: ScrollAnimator blockiert nicht Layout. ContactForm Event-Handler nicht hydration-heavy. | ScrollAnimator.tsx, ContactForm | — | INP < 200ms | — |

---

## Maßnahme 1.7: Mobile-First Audit

| ID | Titel | Beschreibung | Dateien | Abhängigkeiten | Erfolgsmetrik | Skills |
|----|-------|--------------|---------|----------------|--------------|--------|
| P1-1.7-T1 | Mobile-Friendly Test | Google Mobile-Friendly Test: https://search.google.com/test/mobile-friendly?url=https://berneby.de | — | — | "Page is mobile-friendly" | — |
| P1-1.7-T2 | Tap-Targets min. 48×48px | Button, ContactForm, Header-Links: min. 48×48px tappable. | `components/ui/button.tsx`, ContactForm, Header | — | Alle interaktiven Elemente ≥48px | ux-heuristics |
| P1-1.7-T3 | Body-Font min. 16px | Body-Text mindestens 16px. globals.css prüfen. | `app/globals.css` | — | Kein Text < 16px | ux-heuristics |
| P1-1.7-T4 | Responsive Breakpoints testen | Testen auf 320px (iPhone SE), 390px (iPhone 14), 768px (iPad). Kein horizontales Scrollen. | — | — | Kein Overflow auf allen Breakpoints | — |

---

## Phase 1 Zusammenfassung

| Maßnahme | Tasks | Aufwand | Priorität |
|----------|-------|---------|-----------|
| 1.1 robots.txt & Sitemap | 2 | 2h | Sofort |
| 1.2 Schema Markup | 8 | 10h | Sofort |
| 1.3 Meta Tags | 4 | 4h | Woche 1 |
| 1.4 GEO-Optimierung | 5 | 6h | Woche 1–2 |
| 1.5 Featured Snippets | 3 | 4h | Woche 2 |
| 1.6 Core Web Vitals | 5 | 6h | Woche 2–3 |
| 1.7 Mobile-First | 4 | 3h | Woche 3 |
| **Gesamt** | **31** | **35h** | **0–4 Wochen** |
