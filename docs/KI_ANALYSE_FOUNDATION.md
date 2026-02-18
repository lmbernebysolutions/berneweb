# KI-Analyse Foundation – Berneby Website

**Zweck:** Dieses Dokument gibt einer externen KI (Screenshot-Analyse) die nötige Code- und Design-Foundation, um Gesehenes mit der Implementierung abzugleichen und konkrete, dateibasierte Handlungsempfehlungen zu geben.

**Analyse-Workflows:** (1) **Struktur/Brand:** `KI_ANALYSE_PROMPT.md` – Einheitlichkeit, Design-System, Maskottchen. (2) **Erzgebirge:** Zuerst `ERZGEBIRGE_RESEARCH_PROMPT.md` (Research-KI) → dann `KI_ANALYSE_ERZGEBIRGE_PROMPT.md` (Analyse mit Research-Ergebnis + Screenshots + dieser Foundation).

---

## 1. Seiten und Routen (Screenshot ↔ Code)

| Route | Datei | Beschreibung |
|-------|--------|--------------|
| `/` | `app/(marketing)/page.tsx` | Homepage |
| `/ueber-uns` | `app/ueber-uns/page.tsx` | Über uns |
| `/handwerk` | `app/(marketing)/handwerk/page.tsx` | Handwerk |
| `/tech` | `app/(marketing)/tech/page.tsx` | Tech Solutions |
| `/kontakt` | `app/(marketing)/kontakt/page.tsx` | Kontakt |
| `/impressum` | `app/(marketing)/impressum/page.tsx` | Impressum |
| `/datenschutz` | `app/(marketing)/datenschutz/page.tsx` | Datenschutz |
| 404 | `app/not-found.tsx` | Nicht gefunden |
| 500 | `app/error.tsx` | Fehlerseite |
| Loading | `app/loading.tsx` | Ladezustand |

---

## 2. Sektionen pro Seite (Reihenfolge = Reihenfolge im Screenshot)

### Home (`app/(marketing)/page.tsx`)
1. **Hero** (keine Section-Nummer) – `Hero` + optional TrustBar
2. **TrustBar** – direkt nach Hero, keine Section
3. **02 – Einstieg** – „Zwei Welten. Eine Lösung.“ (Selection: Handwerk / Tech)
4. **03 – Vergleich** – „Ohne uns vs. Mit uns“ (ProblemSection / Vergleich)
5. **04 – Prozess** – ProcessSteps
6. **05 – Testimonials** – TestimonialGrid
7. **06 – Technologien** – „Womit wir arbeiten“, TECH_STACK-Grid
8. **07 – Referenzen** – „Vertrauen“, ReferenzenStrip (REFERENZEN_HOME)
9. **08 – Mini-FAQ** – FaqAccordion (HOME_MINI_FAQ), dann Trennlinie (volle Breite)
10. **CtaSection**

### Über uns (`app/ueber-uns/page.tsx`)
1. **Hero** – „Zwei Macher. Ein Ziel.“
2. **02 – Unser Versprechen** – Zitat-Karte (IconQuote)
3. **03 – Das Team** – TeamSection (TEAM, variant="navy")
4. **04 – Vision & Mission** – zwei Karten (Vision / Mission)
5. **05 – Timeline** – „Von der Idee zum Unternehmen“ (TIMELINE)
6. **06 – Werte** – FeatureGrid (VALUES, cols=4, light)
7. **07 – Warum Berneby** – 4 Karten nummeriert 01–04 (WARUM_BERNEBY)
8. **08 – FAQ** – FaqAccordion (FAQ_ITEMS gefiltert), dann Trennlinie (volle Breite)
9. **CtaSection**

### Handwerk (`app/(marketing)/handwerk/page.tsx`)
1. **Hero** – Handwerk-spezifisch
2. **TrustBar** – HANDWERK_STATS (ohne Section)
3. **02 – Das Problem** – ProblemSection (PAIN_POINTS)
4. **03 – Werkzeugkasten** – CraftToolboxGrid (CRAFT_MODULES)
5. **04 – Vertrauen** – ReferenzenStrip (REFERENZEN_BRANCHEN)
6. **05 – Garantien** – HANDWERK_GARANTIEN (3 Karten, IconCheck)
7. **06 – Flatrate** – „Der Digitale Hausmeister“ (10er Karte, 850 €, CTA)
8. **07 – Baustellentalk** – TestimonialGrid (HANDWERK_TESTIMONIALS)
9. **08 – Pakete & Preise** – PricingCards (CRAFT_PACKAGES), id="pakete"
10. **09 – Bauplan** – ProcessSteps (PROCESS_STEPS)
11. **10 – FAQ** – FaqAccordion (FAQ_ITEMS), dann Trennlinie (volle Breite)
12. **CtaSection**

### Tech Solutions (`app/(marketing)/tech/page.tsx`)
1. **Hero** – Tech-spezifisch
2. **TrustBar** – TECH_STATS (ohne Section-Wrapper)
3. **02 – Mission** – MissionSection („Kein Bullshit. Nur Lösungen.“)
4. **03 – Services** – ServiceTabs / Katalog (id="leistungen"), CRAFT_MODULES-ähnliche Karten mit Schweinchen im Hintergrund
5. **04 – Retainer** – 10er Karte / Hausmeister-Angebot
6. **05 – Testimonials** – TestimonialGrid
7. **06 – Prozess** – ProcessSteps
8. **07 – Technologien** – TECH_STACK
9. **08 – Referenzen** – Case Studies / Referenzen
10. **09 – FAQ** – FaqAccordion, dann Trennlinie (volle Breite)
11. **CtaSection**

### Kontakt (`app/(marketing)/kontakt/page.tsx`)
1. **Hero** – „Sprechen Sie mit uns.“
2. **Section** – Grid: links (Schnellkontakt, Telefon, E-Mail, Erreichbarkeit, Link-Hinweis), rechts (ContactForm)
3. **Unter dem Grid** – 3 Karten: Map, Einzugsgebiet (EINZUGSGEBIET_ORTE), Erreichbarkeit
4. **Trust-Bar** – 3 Eigenschaften (Section bg="alt")
5. **02 – FAQ** – „Häufige Fragen zum Erstgespräch“, dann Trennlinie (volle Breite)
6. Schema.org Script

---

## 3. Design-System (Vergleich: Ist das im Screenshot konsistent?)

### Farben (globals.css / Tailwind)
- **Hintergrund (Body):** `#283569` (brand-navy) – `--background`, `--color-brand-navy`
- **Akzent:** `#03f9f9` (brand-cyan) – `--color-brand-cyan`
- **Text:** weiß / `white/80`, `white/60` für Muted
- **Karten-Border:** `border-white/10` (default) oder `border-brand-cyan/30` (highlight)
- **Karten-BG:** `bg-white/[0.03]` (default) oder `bg-brand-navy/60` (highlight)

### Section
- **Layout:** `Section` mit `bg="transparent"` (Standard auf Marketing-Seiten); Inhalt in `max-w-6xl mx-auto px-4 md:px-6`
- **Alternativen:** `bg="alt"` (z. B. Kontakt Trust-Bar), `narrow` → `max-w-3xl`

### SectionHeading
- **Props:** `number` (BackdropNumber, z. B. "02"), `overline`, `title`, `titleLine2?`, `subtitle?`, `align="left"|"center"`, `light` (für weiße Schrift auf Navy)
- **Einheitlich:** Alle Sektionen nutzen `align="left"` und `light` auf dunklem Hintergrund
- **TechCorners:** Um die Titelzeile(n) herum, `w-fit` – sollen nicht breiter als der Titeltext sein

### Karten / Blöcke
- **TechCorners:** Durchgehend `TechCorners` (pattern: `diagonal` oder `all`, variant: `cyan`, size: `sm`|`md`|`lg`)
- **SectionCard:** `variant="default"` oder `"highlight"` – siehe `components/ui/section-card.tsx`
- **Keine** manuellen Ecken-Divs (keine einzelnen `h-2 w-2` border-Ecken) – nur TechCorners-Komponente

### Typografie
- Headlines: uppercase, tracking-tight, große Schrift (text-4xl bis text-6xl)
- Overline: klein, uppercase, tracking, brand-cyan
- Body: text-white/80 oder text-muted-foreground

### BackdropNumber
- Große halbtransparente Zahl im Hintergrund jeder Sektion (z. B. "02", "03")
- **Muss** der Sektionsreihenfolge entsprechen (keine Lücken, keine Doppelungen pro Seite)

---

## 4. Maskottchen (Schweinchen) – aktuelle Verwendung

| Ort | Komponente / Datei | Beschreibung |
|-----|--------------------|--------------|
| **Header (Logo)** | `components/brand/Logo.tsx` | Schweinchen + Text „Berneby Solutions“ (Links oben) |
| **Hero (rechts)** | `components/sections/Hero.tsx` → `HeroMascot` | Schweinchen in Box mit TechCorners, Tooltip on Hover |
| **HeroMascot** | `components/sections/HeroMascot.tsx` | Zeigt `/Schweinchen.svg`, Tooltip „Unser Maskottchen – immer an Ihrer Seite“ |
| **Werkzeugkasten (Tech)** | `components/sections/CraftToolboxGrid.tsx` (Tech: Service-Karten) | Schweinchen dezent im Hintergrund jeder Service-Karte (`/Schweinchen.svg`) |
| **404** | `app/not-found.tsx` | Schweinchen mit Animation, „Das Schweinchen kann diese Seite nicht finden …“ |
| **500** | `app/error.tsx` | Schweinchen „in Panik“, Fehlermeldung |
| **Loading** | `app/loading.tsx` | Zwei Schweinchen mit Glow-Animation |
| **Hover-Easter-Egg** | `components/ui/hover-schweinchen.tsx` | Optional an Buttons (HoverSchweinchen) |
| **AnimatedMascot** | `components/brand/AnimatedMascot.tsx` | Varianten für Animationen (breathing, float, etc.) |
| **SchweinOutline** | `components/brand/SchweinOutline.tsx` | Outline-Variante des Maskottchens |

**Asset:** Primäres SVG: `/public/Schweinchen.svg` (wird überall referenziert).

**Nicht verwendet (laut Code):** USP-PNGs – aktuell nur das SVG. PNGs können für spezielle Bereiche (z. B. Hero, Footer, Social) vorgeschlagen werden.

---

## 5. Wichtige Komponenten (Dateipfade)

| Komponente | Pfad | Kurzbeschreibung |
|------------|------|-------------------|
| Section | `components/layout/Section.tsx` | Wrapper: py, max-width, bg-Varianten |
| SectionHeading | `components/sections/SectionHeading.tsx` | Overline, Titel, BackdropNumber, TechCorners |
| SectionCard | `components/ui/section-card.tsx` | Karten mit default/highlight/minimal |
| TechCorners | `components/ui/tech-corners.tsx` | L-förmige Ecken (pattern, variant, size) |
| TrustBar | `components/sections/TrustBar.tsx` | Kennzahlen-Leiste (border-y, keine Section) |
| Hero | `components/sections/Hero.tsx` | Headline, Subline, CTAs, HeroMascot |
| ProcessSteps | `components/sections/ProcessSteps.tsx` | 01–05 Steps mit Karten, Linie mittig auf Zahlen |
| FaqAccordion | `components/sections/FaqAccordion.tsx` | Frage zentriert, Chevron rechts |
| ReferenzenStrip | `components/sections/ReferenzenStrip.tsx` | Branchen-Tags (statisch bei ≤4 Items) |
| CraftToolboxGrid | `components/sections/CraftToolboxGrid.tsx` | Katalog-Karten (Handwerk/Tech), Schweinchen im BG |
| TestimonialGrid | `components/sections/TestimonialGrid.tsx` | Bewertungen |
| CtaSection | `components/sections/CtaSection.tsx` | Abschluss-CTA vor Footer |
| GridBeams | `components/layout/GridBeams.tsx` | Hintergrund-Grid (Body) |
| Footer | `components/layout/Footer.tsx` | Links, Logo, rechtliches |
| Header | `components/layout/Header.tsx` | Nav (NAV_ITEMS), Logo |

---

## 6. Zentrale Daten (lib/constants.ts)

- **NAV_ITEMS** – Navigation (Home, Über uns, Handwerk, Tech Solutions, Kontakt)
- **COMPANY** – Name, Telefon, E-Mail, Standort, Region
- **TRUST_BAR**, **UEBER_UNS_STATS**, **HANDWERK_STATS** – Kennzahlen für TrustBar
- **REFERENZEN_HOME**, **REFERENZEN_BRANCHEN** – Branchen für ReferenzenStrip
- **TECH_STACK** – Technologien (Home, Tech)
- **CRAFT_MODULES** – Module für CraftToolboxGrid (Handwerk + Tech Katalog)
- **HANDWERK_GARANTIEN** – Garantien (Handwerk)
- **VALUES** – Werte (Über uns, FeatureGrid)
- **WARUM_BERNEBY** – „Der Unterschied“ (Über uns)
- **FAQ_ITEMS**, **HOME_MINI_FAQ** – FAQ-Inhalte
- **PROCESS_STEPS** – Schritte für ProcessSteps
- **EINZUGSGEBIET_ORTE** – Städte (Kontakt)
- **PAGE_META** – SEO (title, description) pro Seite

Änderungen an Inhalten → `lib/constants.ts`. Änderungen an Layout/Styling → jeweilige `page.tsx` oder Komponente.

---

## 7. Schnellzuordnung Screenshot → Code

- **„Große Zahl im Hintergrund“** → BackdropNumber in `SectionHeading` (prop `number`).
- **„L-Ecken an Überschrift/Karte“** → TechCorners in SectionHeading bzw. in der Karten-Komponente.
- **„Kennzahlen-Leiste mit Linien oben/unten“** → TrustBar (ohne Section).
- **„Branchen-Tags in einer Zeile“** → ReferenzenStrip, Daten: REFERENZEN_HOME / REFERENZEN_BRANCHEN.
- **„Horizontale Trennlinie (volle Breite) vor CTA“** → `h-px bg-brand-cyan/20` direkt unter der letzten FAQ-Sektion.
- **„Schweinchen im Hero / in Karten“** → HeroMascot, CraftToolboxGrid (Schweinchen.svg im Hintergrund).
- **„FAQ mit Frage + Chevron“** → FaqAccordion.
- **„Schritte 01–05 mit Linie“** → ProcessSteps.

---

## 8. Design-Dokumentation (Referenz)

- **DESIGN_SYSTEM.md** (Projektroot) – Token-Matrix (Karten, Ecken), SectionCard-Varianten, TechCorners-Regel.

Diese Foundation ermöglicht der KI, im Screenshot z. B. „Sektion 05 auf Home“ mit `app/(marketing)/page.tsx` und der Section „05: TESTIMONIALS“ zu verknüpfen und konkrete Datei- und Prop-Namen in Empfehlungen zu nennen.
