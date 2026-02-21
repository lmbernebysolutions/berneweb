# Phase 3: Long-Term – Taskliste

**Zeitraum:** 6–12 Monate  
**Basis:** [IMPLEMENTATIONSPLAN_SEO_GEO.md](IMPLEMENTATIONSPLAN_SEO_GEO.md) § Phase 3

---

## Maßnahme 3.1: Programmatic SEO – Location Pages

| ID | Titel | Beschreibung | Dateien | Abhängigkeiten | Erfolgsmetrik | Skills |
|----|-------|--------------|---------|----------------|--------------|--------|
| P3-3.1-T1 | lib/data/locations.ts anlegen | Erstelle `berneby-website/lib/data/locations.ts` mit Interface `Municipality` (name, slug, type, population, description, nearbyOrte, besonderheiten, entfernung). Funktionen: `getLocationBySlug`, `getAllLocationSlugs`. | `lib/data/locations.ts` | — | Interface + Funktionen exportiert | resonance-seo |
| P3-3.1-T2 | 59 Erzgebirgskreis-Orte erfassen | Fülle locations.ts mit 59 Orten. Welle 1: Top 15 (Aue-Bad Schlema, Annaberg-Buchholz, Marienberg, etc.). Jeder Ort: unique description (2–3 Sätze), nearbyOrte, besonderheiten, entfernung. Nutze EINZUGSGEBIET_ORTE aus constants als Basis. | `lib/data/locations.ts` | P3-3.1-T1 | 59 Orte mit unique Content | geo-content-optimizer |
| P3-3.1-T3 | Standorte-Route app/(marketing)/standorte/[ort]/page.tsx | Erstelle dynamische Route mit generateStaticParams, generateMetadata. Title: "Webdesign & IT-Service in [Ort] \| Berneby Solutions". Description mit Ortsnamen. Canonical: /standorte/[ort]. | `app/(marketing)/standorte/[ort]/page.tsx` | P3-3.1-T1 | Route rendert Location Page | resonance-seo |
| P3-3.1-T4 | Location Page Template – min. 500 Wörter unique | Jede Location Page: Lokaler Bezug ("In [Ort] mit [X] Einwohnern..."), spezifische Fakten, Entfernung, Services, CTA. Nutze Hero, TrustBar, ContactForm, FeatureGrid, CtaSection. Optional: LocationHero-Variante. | `app/(marketing)/standorte/[ort]/page.tsx` | P3-3.1-T3 | Kein Thin Content, min. 500 Wörter | geo-content-optimizer |
| P3-3.1-T5 | LocalBusiness Schema pro Location Page | Schema: LocalBusiness mit areaServed (City), serviceArea (GeoCircle, 30 km). address: Aue-Bad Schlema. | `app/(marketing)/standorte/[ort]/page.tsx`, lib/seo/schema.ts | P1-1.2-T1 | LocalBusiness-Schema pro Ort | resonance-seo |
| P3-3.1-T6 | Internal Linking zwischen Location Pages | nearbyOrte → Links zu Nachbar-Orten. "Webdesign in [Nachbarort]" als Anchor. | Location Page Template | P3-3.1-T2 | Links zu nearbyOrte | resonance-seo |
| P3-3.1-T7 | Standorte-Übersichtsseite (optional) | `app/(marketing)/standorte/page.tsx` – Liste aller Orte, gruppiert oder als Karte. | `app/(marketing)/standorte/page.tsx` | — | /standorte zeigt Übersicht | — |

---

## Maßnahme 3.2: Programmatic SEO – Branchen Pages

| ID | Titel | Beschreibung | Dateien | Abhängigkeiten | Erfolgsmetrik | Skills |
|----|-------|--------------|---------|----------------|--------------|--------|
| P3-3.2-T1 | lib/data/branchen.ts anlegen | Erstelle `berneby-website/lib/data/branchen.ts` mit Interface `Branche` (name, slug, description, typischeProbleme, loesungen, suchbegriffe, preisRelevant, faqItems). Funktionen: `getBrancheBySlug`, `getAllBranchenSlugs`. | `lib/data/branchen.ts` | — | Interface + Funktionen exportiert | resonance-seo |
| P3-3.2-T2 | 10 Branchen erfassen | Fülle branchen.ts: Elektriker, Dachdecker, Sanitär & Heizung, Maler & Lackierer, Tischler, KFZ-Werkstatt, Friseur, Gastronomie, Einzelhandel, Freiberufler. Nutze REFERENZEN_BRANCHEN aus constants. Jede: description, typischeProbleme, loesungen, faqItems. | `lib/data/branchen.ts` | P3-3.2-T1 | 10 Branchen mit unique Content | geo-content-optimizer |
| P3-3.2-T3 | Branchen-Route app/(marketing)/branchen/[slug]/page.tsx | Erstelle dynamische Route mit generateStaticParams, generateMetadata. Title: "Website & Digitalisierung für [Branche] \| Berneby Solutions". | `app/(marketing)/branchen/[slug]/page.tsx` | P3-3.2-T1 | Route rendert Branchen Page | resonance-seo |
| P3-3.2-T4 | Branchen Page Template | Nutze Hero, ProblemSection (typischeProbleme), PricingCards (CRAFT_PACKAGES), FaqAccordion (faqItems), CtaSection. Min. 800 Wörter unique pro Branche. | `app/(marketing)/branchen/[slug]/page.tsx` | P3-3.2-T3 | Template mit allen Sections | — |
| P3-3.2-T5 | ProfessionalService Schema (optional) | Schema für Branchen-Seiten. provider: #organization. | branchen page, schema.ts | P1-1.2-T1 | Schema auf Branchen | resonance-seo |
| P3-3.2-T6 | Branchen-Übersichtsseite (optional) | `app/(marketing)/branchen/page.tsx` – Liste aller Branchen. | `app/(marketing)/branchen/page.tsx` | — | /branchen zeigt Übersicht | — |

---

## Maßnahme 3.3: Erweiterte Sitemap-Strategie

| ID | Titel | Beschreibung | Dateien | Abhängigkeiten | Erfolgsmetrik | Skills |
|----|-------|--------------|---------|----------------|--------------|--------|
| P3-3.3-T1 | Sitemap um Location Pages erweitern | In `app/sitemap.ts` getAllLocationSlugs() einbinden. URLs: /standorte/[ort]. changeFrequency "monthly", priority 0.6. | `app/sitemap.ts` | P3-3.1-T1, P1-1.1-T2 | Sitemap enthält Standorte | resonance-seo |
| P3-3.3-T2 | Sitemap um Branchen Pages erweitern | In `app/sitemap.ts` getAllBranchenSlugs() einbinden. URLs: /branchen/[slug]. changeFrequency "monthly", priority 0.6. | `app/sitemap.ts` | P3-3.2-T1, P1-1.1-T2 | Sitemap enthält Branchen | resonance-seo |
| P3-3.3-T3 | Sitemap-Struktur prüfen | Alle Bereiche: mainPages, ratgeberPages, locationPages, branchenPages. Next.js MetadataRoute.Sitemap unterstützt bis 50.000 URLs. Bei 50+ Ratgeber, 295 Standorte, 50 Branchen: ggf. Sitemap-Index. | `app/sitemap.ts` | P2-2.1-T9, P3-3.3-T1, P3-3.3-T2 | Alle URLs in Sitemap | resonance-seo |

---

## Phase 3 Zusammenfassung

| Maßnahme | Tasks | Aufwand | Priorität |
|----------|-------|---------|-----------|
| 3.1 Location Pages | 7 | 60h | Sehr hoch |
| 3.2 Branchen Pages | 6 | 30h | Hoch |
| 3.3 Erweiterte Sitemap | 3 | 4h | Hoch |
| **Gesamt** | **16** | **94h** | **6–12 Monate** |

---

## Hinweise

- **Duplicate Content vermeiden:** Jede Location Page min. 500 Wörter unique Content. Lokale Fakten, Entfernungen, Besonderheiten.
- **next-seo evaluieren:** Optional `npm install next-seo` für typsichere Schema-Components (LocalBusinessJsonLd, FAQPageJsonLd).
- **Referenz-Repos:** agamm/pseo-next (Programmatic SEO Pattern), garmeeh/next-seo (Schema Library).
