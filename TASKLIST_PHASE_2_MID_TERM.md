# Phase 2: Mid-Term – Taskliste

**Zeitraum:** 2–6 Monate  
**Basis:** [IMPLEMENTATIONSPLAN_SEO_GEO.md](IMPLEMENTATIONSPLAN_SEO_GEO.md) § Phase 2

---

## Maßnahme 2.1: Topic Clusters & Pillar Pages

| ID | Titel | Beschreibung | Dateien | Abhängigkeiten | Erfolgsmetrik | Skills |
|----|-------|--------------|---------|----------------|--------------|--------|
| P2-2.1-T1 | lib/content/ratgeber.ts anlegen | Erstelle `berneby-website/lib/content/ratgeber.ts` mit Interface `RatgeberArticle` (slug, title, description, cluster, pillarSlug, content, relatedSlugs, datePublished, dateModified). Funktionen: `getArticleBySlug`, `getAllArticleSlugs`. | `lib/content/ratgeber.ts` | — | Interface + Funktionen exportiert | resonance-seo |
| P2-2.1-T2 | Ratgeber-Route app/(marketing)/ratgeber/[slug]/page.tsx | Erstelle dynamische Route mit `generateStaticParams`, `generateMetadata`. Nutze `getArticleBySlug`, `getAllArticleSlugs`. Canonical: `/ratgeber/[slug]`. | `app/(marketing)/ratgeber/[slug]/page.tsx` | P2-2.1-T1 | Route rendert Artikel | resonance-seo |
| P2-2.1-T3 | Ratgeber-Übersichtsseite app/(marketing)/ratgeber/page.tsx | Erstelle `app/(marketing)/ratgeber/page.tsx` als Übersicht aller Cluster/Pillar. Nutze SectionHeading, Card, CtaSection. | `app/(marketing)/ratgeber/page.tsx` | — | /ratgeber zeigt Übersicht | resonance-seo |
| P2-2.1-T4 | Cluster 1: Digitalisierung Handwerk – Pillar + 7 Cluster | In ratgeber.ts: Pillar `digitalisierung-handwerk` (~2.500 Wörter) + Cluster: website-fuer-handwerker, seo-fuer-handwerker, ki-telefonassistent-handwerk, google-business-profil-handwerker, online-terminbuchung-handwerk, handwerker-online-marketing, bewertungsmanagement-handwerker. Je ~1.500 Wörter. | `lib/content/ratgeber.ts` | P2-2.1-T1 | 8 Artikel im Cluster 1 | geo-content-optimizer |
| P2-2.1-T5 | Cluster 2: IT-Service KMU – Pillar + 5 Cluster | In ratgeber.ts: Pillar `it-service-kmu` + Cluster: microsoft-365-fuer-handwerker, digitaler-hausmeister-erklaert, ki-schulung-unternehmen, it-sicherheit-kleine-betriebe, cloud-loesungen-handwerk. | `lib/content/ratgeber.ts` | P2-2.1-T1 | 6 Artikel im Cluster 2 | geo-content-optimizer |
| P2-2.1-T6 | Cluster 3: KI im Handwerk – Pillar + 5 Cluster | In ratgeber.ts: Pillar `ki-im-handwerk` + Cluster: ki-telefonassistent-vergleich, chatgpt-fuer-handwerker, ki-schulung-eu-ai-act, automatisierung-handwerksbetrieb, ki-angebote-schreiben. | `lib/content/ratgeber.ts` | P2-2.1-T1 | 6 Artikel im Cluster 3 | geo-content-optimizer |
| P2-2.1-T7 | BreadcrumbNav Component (optional) | Erstelle `components/sections/breadcrumb-nav.tsx` für Ratgeber-Artikel. Nutze generateBreadcrumbSchema-Daten. | `components/sections/breadcrumb-nav.tsx` | P1-1.2-T1 | Breadcrumb sichtbar auf Ratgeber | — |
| P2-2.1-T8 | RelatedArticles Component | Erstelle `components/sections/related-articles.tsx` – Card-Liste aus relatedSlugs. Nutze in Ratgeber-Template. | `components/sections/related-articles.tsx` | P2-2.1-T2 | Verwandte Artikel angezeigt | — |
| P2-2.1-T9 | Sitemap um Ratgeber erweitern | In `app/sitemap.ts` getAllArticleSlugs() einbinden, Ratgeber-URLs mit changeFrequency "monthly", priority 0.7. | `app/sitemap.ts` | P2-2.1-T1, P1-1.1-T2 | Sitemap enthält Ratgeber-URLs | resonance-seo |

---

## Maßnahme 2.2: URL Structure & Site Architecture

| ID | Titel | Beschreibung | Dateien | Abhängigkeiten | Erfolgsmetrik | Skills |
|----|-------|--------------|---------|----------------|--------------|--------|
| P2-2.2-T1 | URL-Hierarchie dokumentieren | Alle Seiten ≤3 Klicks von Home. Keine neuen Seiten in Hauptnavigation. Prüfen: /ratgeber, /ratgeber/[slug] erreichbar. | — | P2-2.1-T2 | Dokumentation vorhanden | — |
| P2-2.2-T2 | Legal-URLs prüfen/angleichen | Footer verlinkt /impressum, /datenschutz. Aktuell: /legal/impressum, /legal/datenschutz. Entweder Seiten verschieben nach app/(marketing)/impressum/, datenschutz/ ODER Redirects in next.config. | `next.config.ts` oder App-Struktur | — | /impressum und /datenschutz erreichbar | — |

---

## Maßnahme 2.3: Internal Linking Strategie

| ID | Titel | Beschreibung | Dateien | Abhängigkeiten | Erfolgsmetrik | Skills |
|----|-------|--------------|---------|----------------|--------------|--------|
| P2-2.3-T1 | Home → Handwerk, Tech, Ratgeber | In `app/(marketing)/page.tsx` kontextuelle Links: "Pakete für Handwerker" → /handwerk, "Alle Tech-Leistungen" → /tech, "Ratgeber: Digitalisierung im Handwerk" → /ratgeber/digitalisierung-handwerk. | `app/(marketing)/page.tsx` | P2-2.1-T4 | 3+ interne Links von Home | resonance-seo |
| P2-2.3-T2 | Handwerk → Ratgeber-Cluster | In `app/(marketing)/handwerk/page.tsx` Links: "Wie lokale SEO funktioniert" → /ratgeber/seo-fuer-handwerker, "So funktioniert der KI-Telefonassistent" → /ratgeber/ki-telefonassistent-handwerk. | `app/(marketing)/handwerk/page.tsx` | P2-2.1-T4 | 2+ Links zu Ratgeber | resonance-seo |
| P2-2.3-T3 | Tech → Ratgeber-Cluster | In `app/(marketing)/tech/page.tsx` Link: "Microsoft 365 für Ihren Betrieb" → /ratgeber/microsoft-365-fuer-handwerker. | `app/(marketing)/tech/page.tsx` | P2-2.1-T5 | 1+ Link zu Ratgeber | resonance-seo |
| P2-2.3-T4 | Pillar → Handwerk + Cluster | In Pillar digitalisierung-handwerk: Links zu /handwerk, /ratgeber/website-fuer-handwerker, /ratgeber/seo-fuer-handwerker, /ratgeber/ki-telefonassistent-handwerk. | `lib/content/ratgeber.ts` oder Template | P2-2.1-T4 | Bidirektionale Links | resonance-seo |
| P2-2.3-T5 | Jede Ratgeber-Seite → Pillar + 2–3 Cluster + Kontakt | relatedSlugs + Pillar-Link + "Jetzt Erstgespräch vereinbaren" → /kontakt. RelatedArticles Component nutzen. | Ratgeber-Template, related-articles.tsx | P2-2.1-T8 | 3–8 interne Links pro Ratgeber | resonance-seo |

---

## Maßnahme 2.4: E-E-A-T Implementation

| ID | Titel | Beschreibung | Dateien | Abhängigkeiten | Erfolgsmetrik | Skills |
|----|-------|--------------|---------|----------------|--------------|--------|
| P2-2.4-T1 | Article Schema mit Author auf Ratgeber | In Ratgeber-Template: Article-Schema mit author (Person: Lennard Meyer), publisher (#organization), datePublished, dateModified. | `app/(marketing)/ratgeber/[slug]/page.tsx`, lib/seo/schema.ts | P1-1.2-T1, P2-2.1-T2 | Article-Schema auf Ratgeber | resonance-seo |
| P2-2.4-T2 | Trust-Badge "Seit 2026 im Erzgebirge" | Badge-Component auf relevanten Seiten (Home, Handwerk, Tech, Über uns). Nutze bestehende Badge. | Diverse page.tsx | — | Badge sichtbar | brand-guardian |
| P2-2.4-T3 | Gründer-Fotos auf Über-uns | Authentische Fotos (nicht Stock) auf `app/ueber-uns/page.tsx`. TeamSection erweitern oder nutzen. | `app/ueber-uns/page.tsx` | — | Fotos vorhanden | brand-guardian |
| P2-2.4-T4 | Impressum & Datenschutz prüfen | Impressum vollständig, Datenschutz aktuell. Rechtliche Prüfung. | `app/(marketing)/legal/impressum/page.tsx`, datenschutz | — | Vollständig, aktuell | — |

---

## Maßnahme 2.5: Accessibility (WCAG 2.1 AA)

| ID | Titel | Beschreibung | Dateien | Abhängigkeiten | Erfolgsmetrik | Skills |
|----|-------|--------------|---------|----------------|--------------|--------|
| P2-2.5-T1 | axe-cli oder Lighthouse Audit | `npx axe-cli https://berneby.de --browser chrome` oder Lighthouse Accessibility. Critical Violations dokumentieren. | — | — | Audit-Report vorhanden | web-design-reviewer |
| P2-2.5-T2 | Farbkontrast prüfen | Alle Text-Farben gegen Hintergrund: min. 4.5:1 (WCAG 1.4.3). globals.css, Tailwind-Klassen. | `app/globals.css`, components | — | Kein Kontrast < 4.5:1 | ux-heuristics |
| P2-2.5-T3 | Alt-Texte für alle Images | next/image und img: aussagekräftige alt-Attribute. Dekorative: alt="". | Alle components mit Image | — | Alle Images mit alt | ux-heuristics |
| P2-2.5-T4 | ARIA-Labels für interaktive Elemente | Buttons, Links, Accordion (FaqAccordion): aria-label oder aria-labelledby. | Header, Footer, FaqAccordion, ContactForm | — | Interaktive Elemente gelabelt | ux-heuristics |
| P2-2.5-T5 | Keyboard Navigation & Focus | Tab-Reihenfolge logisch. Focus-Styles sichtbar (focus:ring, focus-visible). | globals.css, button, links | — | Vollständig per Tastatur bedienbar | ux-heuristics |
| P2-2.5-T6 | ContactForm Labels | Alle Inputs mit `<label>` verbunden. for/id oder aria-label. | `components/sections/ContactForm.tsx` | — | Jedes Input hat Label | ux-heuristics |
| P2-2.5-T7 | Section aria-labelledby | `<section>` mit aria-labelledby auf SectionHeading. | Section, SectionHeading | — | Sections für Screen Reader | ux-heuristics |

---

## Maßnahme 2.6: Content Freshness Strategie

| ID | Titel | Beschreibung | Dateien | Abhängigkeiten | Erfolgsmetrik | Skills |
|----|-------|--------------|---------|----------------|--------------|--------|
| P2-2.6-T1 | dateModified in Schema pflegen | Alle Schema-Markups (Organization, Article, FAQ): dateModified aktuell halten. | layout.tsx, schema.ts, page.tsx | P1-1.2-T2 | dateModified in allen Schemas | resonance-seo |
| P2-2.6-T2 | "Zuletzt aktualisiert" auf Ratgeber | Ratgeber-Template: "Stand: [Monat] 2026" oder "Zuletzt aktualisiert: [Datum]" anzeigen. | Ratgeber-Template | P2-2.1-T2 | Datum sichtbar | — |
| P2-2.6-T3 | Update-Kalender dokumentieren | Dokumentation: Monatlich handwerk/tech, 30–60 Tage Ratgeber, Quartalsweise Home/Über-uns. | Docs | — | Kalender dokumentiert | — |
| P2-2.6-T4 | ISR revalidate (optional) | Für dynamische Ratgeber-Seiten: revalidate: 86400 (24h) falls ISR genutzt. | page.tsx | — | Revalidation konfiguriert | — |

---

## Phase 2 Zusammenfassung

| Maßnahme | Tasks | Aufwand | Priorität |
|----------|-------|---------|-----------|
| 2.1 Topic Clusters | 9 | 40h | Hoch |
| 2.2 URL Structure | 2 | 4h | Hoch |
| 2.3 Internal Linking | 5 | 8h | Hoch |
| 2.4 E-E-A-T | 4 | 6h | Mittel |
| 2.5 Accessibility | 7 | 12h | Hoch |
| 2.6 Content Freshness | 4 | 2h + laufend | Mittel |
| **Gesamt** | **31** | **72h** | **2–6 Monate** |
