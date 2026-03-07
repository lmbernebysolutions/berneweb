# Container-Audit – Vollständige Auflistung

**Zweck:** Vereinheitlichung aller Container (max. 3 Typen mit klarer Zuordnung von Umrandung, Hover, Hintergrund).  
**Stand:** Analyse aller Hauptseiten und Sektionen.

---

## 1. Hauptseiten und Sektionen mit allen Containern

### 1.1 Home (`app/(marketing)/page.tsx`)

| Sektion | Container / Element | Umrandung | Hover | Hintergrund | TechCorners |
|--------|---------------------|-----------|-------|-------------|-------------|
| 02 Zwei Welten | Handwerk-Karte | `border border-brand-cyan/30` | — | `bg-brand-navy/60 backdrop-blur-md` | diagonal, cyan, lg, animate |
| 02 Zwei Welten | General-Tech-Karte | `border border-white/10` | — | `bg-brand-navy/60 backdrop-blur-md` | — |
| 03 Ohne uns vs. Mit uns (Desktop) | Ohne-uns-Panel | `border-2 border-white/5` | `hover:border-white/10` | `bg-black/30 backdrop-blur-sm` | all, navy, lg |
| 03 Ohne uns vs. Mit uns (Desktop) | Mit-uns-Panel | `border-2 border-brand-cyan/30` | `hover:shadow-[0_0_60px_rgba(3,249,249,0.12)] hover:border-brand-cyan/50` | `bg-white/[0.03]` | all, cyan, lg, animate |
| 03 Ohne uns | Zeilen-Container | `border-l-2 border-white/10` | — | `bg-white/[0.02]` | — |
| 03 Mit uns | Zeilen-Container | `border-l-2 border-brand-cyan` | — | `bg-brand-cyan/10` | — |
| 04 Process | ProcessSteps Desktop-Karte | `border border-white/10` | `hover:border-brand-cyan/20` | `bg-white/[0.03]` | — |
| 04 Process | ProcessSteps Mobile-Zeile | `border border-white/10` | — | `bg-white/[0.03]` | — |
| 05 Testimonials | TestimonialCard | `border border-white/10` | — | `bg-white/[0.03]` | — |
| 05 Testimonials | Result-Badge (inner) | `border border-brand-warm/30` | — | `bg-brand-warm/5` | — |
| 05 Testimonials | Avatar (inner) | — | — | `bg-white/5 border border-white/15` | — |
| 05 | Bewertungen-Link (Button) | `border border-white/10` | `hover:border-brand-cyan/40 hover:bg-white/[0.06] hover:shadow-[0_0_10px_...]` | `bg-white/[0.03]` | — |
| 06 Tech-Stack | Tech-Chip | `border border-white/10` | `hover:border-brand-cyan/20` + card-hover-glow | `bg-brand-navy/60 backdrop-blur-md` | — |
| 07 Referenzen | ReferenzCard (von ReferenzenCarousel) | s. ReferenzenCarousel | s. ReferenzenCarousel | s. ReferenzenCarousel | s. ReferenzenCarousel |

---

### 1.2 Über uns (`app/ueber-uns/page.tsx`)

| Sektion | Container / Element | Umrandung | Hover | Hintergrund | TechCorners |
|--------|---------------------|-----------|-------|-------------|-------------|
| 02 Digitaler Präsenz | Zitat-Box | `border border-white/10` | — | `bg-brand-navy/60 backdrop-blur-md` | diagonal, cyan, lg |
| 02 | Icon-Container (Quote) | `border border-brand-cyan/30` | — | `bg-brand-cyan/10` | — |
| 03 Team | Social-Icon-Button | `border border-white/10` | `hover:border-brand-cyan/40 hover:bg-brand-cyan/5 hover:shadow-[0_0_8px_...]` | `bg-white/[0.03]` | diagonal, cyan, sm |
| 03 Team | TeamSection-Karte (navy) | `border border-white/10` | — | `bg-brand-navy/60 backdrop-blur-md` | — |
| 03 Team | Avatar (inner) | `border-2 border-white/20` | — | `bg-white/5` | — |
| 04 Vision/Mission | StatementSectionV3-Blöcke | `border-l-4 border-white` (dark) | — | kein eigener (transparent) | — |
| 06 Werte | FeatureGrid-Karten (light) | `border-brand-cyan/20` (light) | — | `bg-brand-navy/40 backdrop-blur-sm` | diagonal, cyan, lg |
| 07 Warum Berneby | WarumBernebyV3-Spalten | `border-t-4` / `border-l-4 border-white` | — | kein eigener | — |

---

### 1.3 Kontakt (`app/(marketing)/kontakt/page.tsx`)

| Sektion | Container / Element | Umrandung | Hover | Hintergrund | TechCorners |
|--------|---------------------|-----------|-------|-------------|-------------|
| Links Spalte | SectionCard (Schnellkontakt) | border white/10 (default) | card-hover-glow | `bg-white/[0.03]` | diagonal, cyan, sm |
| Links Spalte | SectionCard (Contact Info) | border white/10 | card-hover-glow | `bg-white/[0.03]` | — (nutzt SectionCard) |
| Links Spalte | SectionCard (Link-Hinweis) | border white/10 | card-hover-glow | `bg-white/[0.03]` | — |
| Links Spalte | Icon-Box (Kontakt) | `border border-brand-cyan/30` | — | `bg-brand-cyan/10` | — |
| Rechts | Gründer-Platzhalter | `border-2 border-white/20` | — | `bg-white/5` | — |
| Rechts | SectionCard (Formular) | border white/10 | card-hover-glow | `bg-white/[0.03]` | — |
| Unten | SectionCard (Map) | border white/10 | card-hover-glow | `bg-white/[0.03]` | diagonal, cyan, sm |
| Unten | SectionCard (Einzugsgebiet) | border white/10 | card-hover-glow | `bg-white/[0.03]` | — |
| Unten | Ort-Chip | `border border-brand-cyan/20` | — | `bg-brand-cyan/5` | — |
| Unten | SectionCard (Erreichbarkeit + Social) | border white/10 | card-hover-glow | `bg-white/[0.03]` | — |
| Unten | Social-Karte (2×2) | `border border-white/10` | `hover:border-brand-cyan/40 hover:bg-brand-cyan/5 hover:shadow-[...]` | `bg-white/[0.03]` | diagonal, cyan, sm |

---

### 1.4 Gemeinsame Komponenten (alle Seiten, die sie nutzen)

#### ProcessSteps (`components/sections/ProcessSteps.tsx`)

| Container | Umrandung | Hover | Hintergrund | TechCorners |
|-----------|-----------|-------|-------------|-------------|
| Desktop-Step-Karte | `border border-white/10` | `hover:border-brand-cyan/20` | `bg-white/[0.03]` | — |
| Step-Nummer-Box | `border border-white/25` | — | `bg-brand-navy` | — |
| Mobile-Step-Zeile | `border border-white/10` | — | `bg-white/[0.03]` | — |

#### TestimonialGrid (`components/sections/TestimonialGrid.tsx`)

| Container | Umrandung | Hover | Hintergrund | TechCorners |
|-----------|-----------|-------|-------------|-------------|
| TestimonialCard | `border border-white/10` | — | `bg-white/[0.03]` | — |
| Result-Badge | `border border-brand-warm/30` | — | `bg-brand-warm/5` | — |
| Avatar-Box | `border border-white/15` | — | `bg-white/5` | — |

#### FeatureGrid (`components/sections/FeatureGrid.tsx`)

| Container | Umrandung | Hover | Hintergrund | TechCorners |
|-----------|-----------|-------|-------------|-------------|
| FeatureCard (light) | `border border-brand-cyan/20` | — | `bg-brand-navy/40 backdrop-blur-sm` | diagonal, cyan, lg |
| FeatureCard (default) | `border border-border` | — | `bg-card` | diagonal, navy, lg |
| Icon-Box (light) | `border border-brand-cyan/30` | — | `bg-brand-navy` | — |

#### PricingCards (`components/sections/PricingCards.tsx`)

| Container | Umrandung | Hover | Hintergrund | TechCorners |
|-----------|-----------|-------|-------------|-------------|
| Karte hervorgehoben | `border border-brand-cyan` (implizit) | `hover:shadow-[0_0_40px_rgba(3,249,249,0.15)]` | `bg-brand-navy` | — |
| Karte normal | `border border-white/10` | — | `bg-brand-navy/60 backdrop-blur-md` | — |
| Badge (Bestseller) | `border border-brand-cyan` | — | `bg-brand-cyan` | — |
| Carousel-Nav-Button | `border border-brand-cyan/30` | `hover:bg-brand-cyan/10` | `bg-brand-cyan/5` | — |

#### ReferenzenCarousel / ReferenzCard (`components/sections/ReferenzenCarousel.tsx`)

| Container | Umrandung | Hover | Hintergrund | TechCorners |
|-----------|-----------|-------|-------------|-------------|
| ReferenzCard (Artikel) | `border border-brand-cyan/20` | `hover:border-brand-cyan/40 hover:shadow-[0_0_60px_...]` | `bg-brand-navy/40 backdrop-blur-md` | diagonal, cyan, lg, animate |
| Featured-Badge | `border-b border-x border-brand-cyan/40` | — | `bg-brand-cyan/10` | — |
| Mockup-Bereich | — | — | `bg-black/40` | — |
| BrowserMockup | `border border-white/15` | — | — | — |
| PhoneMockup | `border-2 border-white/15` | — | `bg-black` | — |
| Tag-Chip | `border border-brand-cyan/20` | — | `bg-brand-cyan/5` | — |
| ErgebnisBadge | `border border-brand-warm/30` | — | `bg-brand-warm/5` | — |
| Challenge-Box | `border border-white/5` | — | `bg-white/[0.03]` | — |
| Lösung-Box | `border border-brand-cyan/10` | — | `bg-brand-cyan/[0.03]` | — |
| Carousel-Prev/Next | `border border-brand-cyan/30` | `hover:border-brand-cyan hover:bg-brand-cyan/10 hover:shadow-[...]` | `bg-brand-cyan/5` | — |

#### ProblemToSolutionScrollSection (`components/sections/ProblemToSolutionScrollSection.tsx`)

| Container | Umrandung | Hover | Hintergrund | TechCorners |
|-----------|-----------|-------|-------------|-------------|
| Einzelkarte (Problem) | `border-2 border-white/5` | — | `bg-black/30` | all, navy, lg |
| Einzelkarte (Solution) | `border-2 border-brand-cyan/30` | `hover:shadow-[0_0_60px_...]` | `bg-white/[0.03]` | all, cyan, lg |
| Zeile Problem | `border-l-2 border-white/10` | — | `bg-white/[0.02]` | — |
| Zeile Solution | `border-l-2 border-brand-cyan` | — | `bg-brand-cyan/10` | — |

#### CraftToolboxGrid (`components/sections/CraftToolboxGrid.tsx`)

| Container | Umrandung | Hover | Hintergrund | TechCorners |
|-----------|-----------|-------|-------------|-------------|
| Modul-Karte | `border border-white/10` | `hover:bg-brand-navy/80` | `bg-brand-navy/60 backdrop-blur-md` | nur erste Karte: diagonal, cyan, lg |

#### FaqAccordion (`components/sections/FaqAccordion.tsx`)

| Container | Umrandung | Hover | Hintergrund | TechCorners |
|-----------|-----------|-------|-------------|-------------|
| AccordionItem | `border border-white/10` | — | `bg-white/[0.03]` | diagonal, cyan, md, hoverExpand |
| AccordionItem (open) | `data-[state=open]:border-brand-cyan/30` | — | `data-[state=open]:bg-brand-cyan/5` | + pattern all bei open |

#### ChatSection (`components/sections/chat-section.tsx`)

| Container | Umrandung | Hover | Hintergrund | TechCorners |
|-----------|-----------|-------|-------------|-------------|
| Chat-Container (variante) | `border border-white/10` | — | `bg-brand-navy/60 backdrop-blur-md` | diagonal, cyan, lg, animate |
| Chat-Container (andere) | `border border-white/10` | `hover:border-brand-cyan/20` + card-hover-glow | `bg-brand-navy/60 backdrop-blur-md` | diagonal, cyan, lg, animate |
| FAQ-Input (suggested) | `border border-white/10` | `hover:border-brand-cyan/30 hover:bg-brand-cyan/5` | `bg-white/[0.03]` | — |

#### SectionCard (`components/ui/section-card.tsx`)

| Variante | Umrandung | Hover | Hintergrund | TechCorners |
|----------|-----------|-------|-------------|-------------|
| default | `border border-white/10` | card-hover-glow | `bg-white/[0.03]` | diagonal, cyan, md |
| highlight | `border border-brand-cyan/30` | card-hover-glow | `bg-brand-navy/60 backdrop-blur-md` | diagonal, cyan, lg |
| minimal | `border border-white/10` | card-hover-glow | `bg-transparent` | diagonal, cyan, sm |

#### Header (`components/layout/Header.tsx`)

| Container | Umrandung | Hover | Hintergrund | TechCorners |
|-----------|-----------|-------|-------------|-------------|
| Nav-Link (aktiv) | `border-l-2 border-brand-cyan` | — | `bg-brand-cyan/5` | — |
| Nav-Link (inaktiv) | `border-transparent` | `hover:border-brand-cyan/50` | — | — |
| CTA-Icon (Mobile) | `border border-white/10` | `hover:border-brand-cyan/40 hover:bg-brand-cyan/5` | `bg-white/[0.03]` | — |

#### Footer (`components/layout/Footer.tsx`)

| Container | Umrandung | Hover | Hintergrund | TechCorners |
|-----------|-----------|-------|-------------|-------------|
| Social-Icon | `border border-white/10` | `hover:border-brand-cyan/40 hover:bg-white/[0.06]` | `bg-white/[0.03]` | — |
| CTA-Card | `border border-white/10` | — | `bg-white/[0.03]` | — |
| CTA-Button | `border border-brand-cyan/30` | `hover:border-brand-cyan hover:bg-brand-cyan/20 hover:shadow-[...]` | `bg-brand-cyan/10` | — |
| CTA-Card (rechts) | `border border-white/10` | `hover:border-brand-cyan/40 hover:bg-white/[0.06] hover:shadow-[...]` | `bg-white/[0.03]` | — |

#### StatementSectionV3 / WarumBernebyV3

| Container | Umrandung | Hover | Hintergrund | TechCorners |
|-----------|-----------|-------|-------------|-------------|
| Statement-Block | `border-l-4 border-white` (oder border-brand-navy/30 onLight) | — | keiner | — |
| WarumBerneby-Spalte | `border-t-4` / `border-l-4 border-white` (oder navy/30) | — | keiner | — |

---

### 1.5 Handwerk (`app/(marketing)/handwerk/page.tsx`)

| Sektion | Container / Element | Umrandung | Hover | Hintergrund | TechCorners |
|--------|---------------------|-----------|-------|-------------|-------------|
| 02 Problem | HandwerkProblemWithRevealSection-Karte | `border-2 border-white/5` | `hover:border-white/10` | `bg-black/30 backdrop-blur-sm` | all, navy, lg |
| 02 | Status-Badge (inner) | `border-b-2 border-l-2 border-white/10` | — | `bg-black/40` | — |
| 03 | CraftToolboxGrid (s. gemeinsame Komponenten) | — | — | — | — |
| 04 Pakete | PricingCards (s. gemeinsame Komponenten) | — | — | — | — |
| Weitere | ProcessSteps, TestimonialGrid, Garantien-Karten, ChatSection | wie in jew. Komponenten / Home | — | — | — |

### 1.6 Tech (`app/(marketing)/tech/page.tsx`)

| Sektion | Container / Element | Umrandung | Hover | Hintergrund | TechCorners |
|--------|---------------------|-----------|-------|-------------|-------------|
| 02 Mission | MissionSection | (in Komponente) | — | — | — |
| Leistungen | Service-Karten (Grid) | typ. border white/10 oder cyan | — | bg-brand-navy/60 etc. | TechCorners je nach Einsatz |
| ProcessSteps, TestimonialGrid, ChatSection | wie Home / gemeinsame Komponenten | — | — | — | — |

### 1.7 Referenzen (`app/(marketing)/referenzen/page.tsx`)

| Sektion | Container / Element | Umrandung | Hover | Hintergrund | TechCorners |
|--------|---------------------|-----------|-------|-------------|-------------|
| 02 Filter | Tab (aktiv) | `border border-brand-cyan` | — | `bg-brand-cyan/10` | — |
| 02 Filter | Tab (inaktiv) | `border border-white/10` | `hover:border-brand-cyan/30 hover:text-white/70` | `bg-transparent` | — |
| 02 Leerzustand | Leer-Box | `border border-brand-cyan/10` | — | `bg-brand-cyan/5` | — |
| Carousel | ReferenzenCarousel (s. gemeinsame Komponenten) | — | — | — | — |

---

## 2. Vollständige Liste aller Varianten (Umrandung)

| # | Umrandung (Tailwind) | Verwendung |
|---|----------------------|------------|
| 1 | keine | Avatare (teilw.), innere Texte |
| 2 | `border border-white/10` | Standard-Karten, SectionCard default, ProcessSteps, Testimonial, Tech-Chips, Social, Footer-Cards, Chat-Input |
| 3 | `border border-white/15` | BrowserMockup, Avatar Testimonial, PhoneMockup |
| 4 | `border-2 border-white/5` | Ohne-uns-Panel, ProblemToSolution (Problem) |
| 5 | `border-2 border-white/15` | PhoneMockup |
| 6 | `border-2 border-white/20` | Icon-Box Ohne uns, Gründer-Platzhalter, Avatar Team |
| 7 | `border border-white/25` | Step-Nummer, border-l Subline ProcessSteps |
| 8 | `border border-brand-cyan/20` | ReferenzCard, Tech-Tags Referenz, Featured-Border, Mit-uns-Spalte (lg) |
| 9 | `border border-brand-cyan/30` | Handwerk-Karte Home, SectionCard highlight, Mit-uns-Panel, Faq open, Icon-Boxen Kontakt, Carousel-Buttons, Pricing-Nav |
| 10 | `border border-brand-cyan` (voll) | Pricing hervorgehoben, Badge Bestseller |
| 11 | `border-l-2 border-white/10` | Ohne-uns-Zeilen, Problem-Zeilen |
| 12 | `border-l-2 border-brand-cyan` | Mit-uns-Zeilen, Blockquote ReferenzCard |
| 13 | `border-l-4 border-white` | StatementSectionV3 (dark) |
| 14 | `border-l-4 border-brand-navy/30` | StatementSectionV3 (onLight), WarumBernebyV3 (onLight) |
| 15 | `border-t-4` / `border-l-4 border-white` | WarumBernebyV3 Trennstriche |
| 16 | `border border-brand-warm/30` | ErgebnisBadge, Result-Badge Testimonial, Dauer-Badge Referenz |
| 17 | `border border-brand-cyan/10` | Lösung-Box Referenz |
| 18 | `border border-brand-cyan/50` (nur Hover) | Mit-uns-Panel hover |
| 19 | `border-transparent` | Nav-Link inaktiv |
| 20 | `border-l-2 border-brand-cyan` (inner) | Blockquote Referenz |
| 21 | `border border-border` | FeatureCard default (hell) |
| 22 | `border border-brand-cyan/20` (light) | FeatureCard light |
| 23 | `border-y border-white/10` | Pricing inner, AccordionContent |
| 24 | `border-b border-white/10` | CraftToolbox Header, Map Header |
| 25 | `border border-brand-cyan/20` (Ort-Chip) | Einzugsgebiet Kontakt |

---

## 3. Vollständige Liste aller Hover-Varianten

| # | Hover-Klassen | Verwendung |
|---|----------------|------------|
| 1 | — (kein Hover) | Viele Karten, Badges, innere Container |
| 2 | `hover:border-white/10` | Ohne-uns-Panel |
| 3 | `hover:border-brand-cyan/20` | ProcessSteps-Karte, ChatSection-Container |
| 4 | `hover:border-brand-cyan/40` | Social-Icons, Bewertungen-Link, Tech-Chips (card-hover-glow), Footer Social, Kontakt Social, Header CTA |
| 5 | `hover:border-brand-cyan/50` | Mit-uns-Panel |
| 6 | `hover:border-brand-cyan` (voll) | ReferenzenCarousel Prev/Next |
| 7 | `hover:bg-white/10` | Pricing-Button (nicht hervorgehoben) |
| 8 | `hover:bg-white/[0.06]` | Bewertungen-Link, Footer Social, Footer CTA-Card |
| 9 | `hover:bg-brand-navy/80` | CraftToolboxGrid-Karte |
| 10 | `hover:bg-brand-cyan/5` | Social-Icons, Kontakt Social, Chat-Input, Header CTA, ReferenzenCarousel Buttons |
| 11 | `hover:bg-brand-cyan/10` | ReferenzenCarousel Buttons, Pricing Carousel-Nav |
| 12 | `hover:shadow-[0_0_60px_rgba(3,249,249,0.12)]` bzw. `0.1` | Mit-uns-Panel, ReferenzCard, ProblemToSolution Solution |
| 13 | `hover:shadow-[0_0_40px_rgba(3,249,249,0.15)]` | Pricing hervorgehoben |
| 14 | `hover:shadow-[0_0_20px_rgba(3,249,249,0.15)]` | ReferenzenCarousel Buttons |
| 15 | `hover:shadow-[0_0_10px_...]` / `0_0_8px_...` | Bewertungen-Link, Über-uns Social, Footer CTA |
| 16 | `card-hover-glow` (global) | SectionCard, Tech-Chips, ChatSection, Mit-uns-Panel |
| 17 | `hover:border-brand-cyan/30` | Chat suggested FAQ |
| 18 | `hover:border-brand-navy/50` (Nav) | Header Nav-Link |
| 19 | `data-[state=open]:border-brand-cyan/30` | FaqAccordion Item |
| 20 | `hover:text-brand-cyan` | Links, CraftToolbox CTA |
| 21 | `hover:bg-brand-cyan hover:text-brand-navy` | Buttons (Outline) |
| 22 | `hover:border-white/40` | Carousel-Dots (inaktiv) |

---

## 4. Vollständige Liste aller Hintergrund-Varianten (Container)

| # | Hintergrund (Tailwind) | Verwendung |
|---|------------------------|------------|
| 1 | keiner (transparent) | StatementSectionV3, WarumBernebyV3, viele innere Flächen |
| 2 | `bg-white/[0.03]` | SectionCard default, ProcessSteps, TestimonialCard, Ohne-uns-Zeilen, Mit-uns-Panel, FaqAccordion, Footer/Header Social, Challenge-Box |
| 3 | `bg-white/[0.02]` | Ohne-uns-Zeilen, Problem-Zeilen |
| 4 | `bg-white/5` | Avatar Testimonial, Icon-Box Ohne uns, Gründer-Platzhalter, Avatar Team (navy) |
| 5 | `bg-white/15` (border) | — (nur Border) |
| 6 | `bg-brand-navy/60` (+ backdrop-blur) | Handwerk/General-Karte, Zitat Über-uns, TeamSection-Karte, ReferenzCard, ChatSection, CraftToolbox |
| 7 | `bg-brand-navy/40` | FeatureCard light, ReferenzCard |
| 8 | `bg-brand-navy` (voll) | Pricing hervorgehoben, Step-Nummer, FeatureCard Icon-Box (light) |
| 9 | `bg-black/30` | Ohne-uns-Panel, ProblemToSolution (Problem) |
| 10 | `bg-black/40` | ReferenzCard Mockup-Bereich |
| 11 | `bg-brand-cyan/10` | Icon-Quote Über-uns, Mit-uns-Zeilen, Featured-Badge, Lösung-Box, Kontakt Icon, Carousel-Buttons, Pricing-Nav |
| 12 | `bg-brand-cyan/5` | Tag-Chip Referenz, ErgebnisBadge (brand-warm/5 für Warm) |
| 13 | `bg-brand-cyan/[0.03]` | Lösung-Box Referenz |
| 14 | `bg-brand-warm/5` | ErgebnisBadge, Result-Badge Testimonial, Dauer-Badge |
| 15 | `bg-brand-warm/10` | Dauer-Badge Referenz |
| 16 | `bg-brand-cyan/20` (shadow, Icon) | Mit-uns Icon-Box |
| 17 | `bg-card` | FeatureCard default |
| 18 | `bg-border` | — (nur Border) |
| 19 | `bg-brand-cyan/5` (Faq open) | FaqAccordion Item open |
| 20 | `bg-brand-cyan` (Badge) | Bestseller Badge |
| 21 | `bg-brand-cyan/5` (Ort) | Einzugsgebiet-Chip Kontakt |

---

## 5. TechCorners-Vorkommen (vollständig)

| Komponente / Ort | Pattern | Variant | Size | Animate | HoverExpand |
|------------------|---------|---------|------|---------|-------------|
| Home: Handwerk-Karte | diagonal | cyan | lg | ✓ | — |
| Home: Ohne-uns-Panel | all | navy | lg | — | — |
| Home: Mit-uns-Panel | all | cyan | lg | ✓ | — |
| Home: Tech-Chips | — | — | — | — | — |
| Über-uns: Zitat-Box | diagonal | cyan | lg | — | — |
| Über-uns: Social-Button | diagonal | cyan | sm | — | — |
| Kontakt: SectionCards (teilw.) | diagonal | cyan | sm | — | — |
| Kontakt: Social-Karten | diagonal | cyan | sm | — | — |
| ProcessSteps | — | — | — | — | — |
| TestimonialGrid | — | — | — | — | — |
| FeatureGrid (light) | diagonal | cyan | lg | — | — |
| FeatureGrid (default) | diagonal | navy | lg | — | — |
| ReferenzCard | diagonal | cyan | lg | ✓ | — |
| ProblemToSolution | all | navy/cyan | lg | — | — |
| CraftToolboxGrid | diagonal (nur 1. Karte) | cyan | lg | — | — |
| FaqAccordion | diagonal + all when open | cyan | md | — | ✓ |
| ChatSection | diagonal | cyan | lg | ✓ | — |
| SectionCard | diagonal | cyan | md/lg/sm | optional | ✓ |

---

## 6. Zusammenfassung für Vereinheitlichung

- **Umrandung:** Es gibt über 25 verschiedene Border-Varianten (weiß/cyan/warm, 1px/2px/4px, border-l/border-t/border).
- **Hover:** Über 20 verschiedene Hover-Kombinationen (Border-Wechsel, Glow, Hintergrund-Aufhellung).
- **Hintergrund:** Über 20 Varianten (transparent, white/[0.02]–[0.03], brand-navy/40–60, black/30–40, cyan/5–10, warm/5–10, card).
- **TechCorners:** Unterschiedlich pro Komponente (diagonal vs. all, cyan vs. navy, lg/md/sm, animate, hoverExpand).

**Empfehlung für max. 3 Container-Typen:**

1. **Typ A – Neutral/Dezent:**  
   Border `border border-white/10`, Hintergrund `bg-white/[0.03]`, Hover optional `hover:border-brand-cyan/20` oder card-hover-glow.  
   Für: Standard-Karten, Listen, Social-Icons, ProcessSteps, Testimonial, Faq, SectionCard default.

2. **Typ B – Akzent/Cyan:**  
   Border `border border-brand-cyan/30` (oder /20), Hintergrund `bg-brand-navy/60` (oder /40), Hover `hover:border-brand-cyan/40` + leichter Glow.  
   Für: Hervorgehobene Karten (Handwerk, ReferenzCard, Mit-uns-Panel, ChatSection, SectionCard highlight).

3. **Typ C – Ohne Kartenrahmen / Struktur:**  
   Nur strukturelle Linien (z. B. `border-l-4 border-white`) oder gar keine Umrandung, Hintergrund transparent.  
   Für: StatementSectionV3, WarumBernebyV3, reine Textblöcke.

Damit können alle bestehenden Container einer der drei Typen zugeordnet und schrittweise auf die einheitlichen Tokens umgestellt werden.
