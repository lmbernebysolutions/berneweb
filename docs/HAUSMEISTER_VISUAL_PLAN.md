# Digitale-Hausmeister-Visualisierung – Plan

**Referenz:** `.cursor` (Rules/Skills), `branding.md` (Brand Identity Foundation)

## Ausgangslage

- Sektion „Der Digitale Hausmeister“ auf `/handwerk` und `/tech` nutzt eine **inline CSS-Platzhalter**-Darstellung: Rechteck mit „SOLD“-Text, keine echte Bild-/Icon-Asset.
- Ziel: **Feste, bessere Visualisierung** – wiederholbar, barrierefrei, 100 % Markenkonform.

## Anforderungen (branding.md)

- **Farben:** Brand Navy `#283569`, Brand Cyan `#03f9f9`, Brand Warm `#FFB547`.
- **Formen:** Harte Kanten, 0–4px Radius, Tech Corners, keine organischen Blobs.
- **Typo:** UPPERCASE für Headlines/Labels, Display-Font (Barlow/Syne), Monospace für Zahlen.
- **Motion:** Mechanical Easing, optional dezenter Cyan-Glow auf Stempel/Badge.
- **Accessibility:** `prefers-reduced-motion` beachten, Kontrast WCAG AA.

## Lösung

1. **Neue Komponente:** `components/sections/HausmeisterCardVisual.tsx`
   - Darstellung einer **10er-Karte** als grafisches Objekt (kein Foto): Kartenform mit Tech Corners, klare Bereiche (Titel, Barcode-ähnliche Linien, Stempel „SOLD“).
   - Reine CSS/SVG/React – keine externen Bilder.
   - Props optional für spätere Varianten (z. B. `className`).

2. **Stempel „SOLD“**
   - Deutlicher Badge/Stempel: Navy-Hintergrund, Cyan-Rahmen, UPPERCASE, fett.
   - Leichter Rotations-Offset (z. B. -12°) und optionaler Schatten/Glow laut branding.md.

3. **Integration**
   - Handwerk-Page und Tech-Page: bestehenden Inline-Block durch `<HausmeisterCardVisual />` ersetzen.
   - Keine Änderung an Copy, CTA oder Layout-Struktur der Sektion.

## Umsetzungs-Checkliste

- [x] Komponente anlegen, nur Markenfarben und -typografie nutzen.
- [x] Tech Corners (aus `@/components/ui/tech-corners`) oder äquivalente harte Ecken verwenden.
- [x] Handwerk-Page umstellen.
- [x] Tech-Page umstellen.
- [ ] Visuell gegen branding.md prüfen (Farben, Ecken, UPPERCASE, Glow).
