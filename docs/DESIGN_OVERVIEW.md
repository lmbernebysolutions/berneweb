# Design-Übersicht

## Schriftarten

| Bereich | Schrift | Komponente / Stelle |
|--------|--------|----------------------|
| **Logo (Berneby)** | **Noto Sans** (Body) | `TextLogo` – `font-bold` / `font-normal`, keine Display-Schrift |
| **Header (Navigation)** | **Noto Sans** | `Header` – Links und „Erstgespräch“ nutzen die Body-Schrift |
| **Überschriften (Hero, Sektionen, CTA)** | **Barlow** (Display, Fallback Syne) | Klasse `.font-display` in Hero, SectionHeading, CtaSection |

## Typografie-SSoT (Marketing)

- Zentrale Quelle: `berneby-website/app/globals.css`
- Kanonische Scale: `--type-size-*` (micro, body-sm, body, lead, h3, h2, h1, display)
- Semantische Nutzung: `type-*` Utility-Klassen statt ad-hoc `text-[...]`-Werte
- Mobile Regel: Section-Heading auf kleinen Viewports nicht größer als aktueller Stand (~36px)

## Kontext-Trennung

- **Marketing-Website:** nutzt die kanonische Scale.
- **Social/Export-Seiten:** behalten separate, pixelgenaue Typografie für feste Canvas-/Print-Layouts.

---

## Hover Glow (`card-hover-glow`)

Leichter Cyan-Schatten beim Hover. Verwendet in:

| Seite / Komponente | Stelle |
|--------------------|--------|
| **globals.css** | Definition der Klasse |
| **Tech** | Service-Karten (Leistungen), Referenzen-Karten |
| **Home** | Tech-Stack-Kacheln, Ohne-uns-/Mit-uns-Karten |
| **Handwerk** | Garantien-Karten |
| **Über uns** | Timeline-Karten, Warum-Berneby-Karten |
| **SectionCard** | Alle Karten, die `variant` nutzen und die Klasse bekommen |
| **TeamSection** | Team-Karten (variant default) |

---

## Animated Corners (TechCorners mit `animate`)

Ecken zeichnen sich beim Scroll-Into-View ein. Verwendet in:

| Seite / Komponente | Stelle |
|--------------------|--------|
| **SectionHeading** | TechCorners neben jeder Sektions-Überschrift (scroll-getriggert) |
| **Home** | Zwei-Säulen-Karten (Handwerk/Tech), Ohne-uns/Mit-uns (Mit-uns-Karte), Tech-Stack-Kacheln |
| **Tech** | Service-Grid-Karten, Tech-Stack-Kacheln, Referenzen-Karten |
| **Über uns** | Vision-Karte, Mission-Karte, Warum-Berneby-Karten |

---

## Variant-Hintergründe (bg="subtle")

- **Section**: Bei `bg="subtle"` ist der helle Streifen **zwischen den Beams** (äußerer Container max-w-6xl ohne Padding, innerer Container mit px-4 md:px-6 und py-20 md:py-28 lg:py-32). So überlappt der Streifen die Beams nicht und hat die volle Sektionshöhe.
- **Home**: Nur Sektionen **04, 06, 08** haben variant. Sektion **08** (Mini-FAQ) nutzt denselben Inset-Aufbau und schließt mit Linie über der CTA ab.
- **Über uns**: **03** (Team), **05** (Timeline), **07** (Warum Berneby) haben variant.
- **Handwerk**: **07** und **09** variant, **08** und **10** nicht.
- **Kontakt**: Nur **02** (Trust-Bar „Kostenlos & unverbindlich“) hat variant; die Form-Sektion nicht.
