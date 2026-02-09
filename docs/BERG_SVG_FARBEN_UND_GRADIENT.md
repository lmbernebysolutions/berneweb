# Berg-SVG: Farbcodes & Gradient im Online-Editor

## Die 4 Layer (Klassen .s0 bis .s3)

| Layer | CSS-Klasse | Verwendung | Startfarbe (unten/dunkel) | Endfarbe (oben/hell) |
|-------|------------|------------|----------------------------|----------------------|
| **1** | `.s0` / `g1` | Erste Bergform | `#0d1f2d` | `#03f9f9` (Brand-Cyan) |
| **2** | `.s1` / `g2` | Zweite Bergform | `#0a1825` | `#03f9f9` (Brand-Cyan) |
| **3** | `.s2` / `g3` | Dritte Bergform | `#0d1f2d` | `#03f9f9` (Brand-Cyan) |
| **4** | `.s3` / `g4` | Vierte Bergform (Tiefe) | `#061218` | `#0d1f2d` (kein Cyan) |

### Farbcodes zum Kopieren

- **Brand-Cyan (Berneby):** `#03f9f9`
- **Dunkel 1:** `#0d1f2d`
- **Dunkel 2:** `#0a1825`
- **Dunkel 3 (am tiefsten):** `#061218`

---

## Gradient im Online-SVG-Editor anlegen

### Geeignete Editoren

- **Boxy SVG** (Chrome-App oder boxy-svg.com) – sehr gut für SVG
- **SVG-Edit** (svgedit.net) – im Browser, kostenlos
- **Figma** – Export als SVG, dann ggf. in einem Editor nachbearbeiten
- **Vectr** (vectr.com) – einfach, webbasiert

### So erstellst du den gewünschten Verlauf (unten dunkel → oben Cyan)

1. **Path/Form auswählen**  
   Die Berg-Pfade haben im Original die Klassen `s0`, `s1`, `s2`, `s3` und bekommen jeweils einen eigenen Gradient.

2. **Füllung auf Linearen Verlauf stellen**  
   - Fill / Füllung öffnen  
   - Statt „Solid color“ → **Linear gradient** (oder „Gradient“) wählen

3. **Farbstops setzen**  
   - **Stop 1 (offset 0 %):** dunkle Farbe (z. B. `#0d1f2d` oder `#061218`)  
   - **Stop 2 (offset 100 %):** helle Farbe (z. B. `#03f9f9` Cyan oder `#0d1f2d`)

4. **Richtung: von unten nach oben**  
   Damit der Berg „von unten dunkel, nach oben hell/Cyan“ wirkt:
   - **Boxy SVG:** Gradient-Linie von unten nach oben ziehen (Start unten, Ende oben).
   - **SVG-Edit:** Bei „Gradient“ die Linie bzw. Winkel so einstellen, dass unten die dunkle und oben die helle Farbe liegt (z. B. Winkel 90° oder 270°, je nach Editor).
   - **Allgemein:** Startpunkt des Gradients unten, Endpunkt oben (z. B. `y1="1" y2="0"` in SVG = unten → oben).

5. **Im SVG-Code (falls du manuell editierst)**  
   Ein typischer linearer Gradient sieht so aus:

   ```xml
   <linearGradient id="meinGradient" x1="0" x2="0" y1="1" y2="0" gradientUnits="objectBoundingBox">
     <stop offset="0" stop-color="#0d1f2d"/>
     <stop offset="1" stop-color="#03f9f9"/>
   </linearGradient>
   ```

   - `y1="1" y2="0"` = Verlauf von unten (1) nach oben (0).  
   - Füllung der Form: `fill="url(#meinGradient)"`.

### Wichtig: Keine Opacity-Maske für `<img>`-SVGs

Wenn das SVG als **Bild** eingebunden wird (`<img src="…">` oder Next.js `Image`), können **Masken** (`<mask>`) in manchen Browsern dazu führen, dass nichts angezeigt wird.  

**Tipp:** Den gewünschten „weichen“ oder gedämpften Look besser über die **Gradient-Farben** (z. B. etwas transparentere oder dunklere Cyan-Töne) steuern, nicht über eine zusätzliche Opacity-Maske.

---

## Kurz-Checkliste

- [ ] Layer 1–3: Gradient von Dunkel (`#0d1f2d` / `#0a1825`) zu Cyan (`#03f9f9`)
- [ ] Layer 4: Gradient von `#061218` zu `#0d1f2d` (nur Tiefe, kein Cyan)
- [ ] Gradient-Richtung: unten → oben
- [ ] Keine Maske verwenden, wenn das SVG als `<img>` genutzt wird
