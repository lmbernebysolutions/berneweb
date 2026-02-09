# Berg-SVG: Viewport & „Berge wachsen“-Animation

## 1. Viewport – alles sichtbar

Aktuell: `viewBox="-47 -20 500 500"` (Breite 500, Höhe 500, startet bei y = -20).

Damit **alles** (inkl. Inhalt oberhalb und unterhalb) sichtbar ist, den Viewport so erweitern, dass er die komplette Zeichenfläche umschließt:

- **Empfehlung:** `viewBox="-50 -80 560 700"`
  - Mehr Platz nach **oben** (y startet bei -80)
  - Mehr Platz nach **unten** (Höhe 700, die Paths gehen bis ca. 597)
  - Etwas mehr seitlich (Breite 560)

Wenn du im Editor siehst, dass oben/unten noch abgeschnitten ist, die Werte anpassen:
- **Oben mehr Platz:** ersten y-Wert kleiner machen (z. B. -120 statt -80).
- **Unten mehr Platz:** Höhe (letzter Wert) vergrößern (z. B. 720 statt 700).

---

## 2. „Berge wachsen“-Animation – was ich von dir brauche

Die Idee: Die **4 Ebenen** (Layer) erscheinen nacheinander von unten nach oben, als würden die Berge wachsen.

### Option A: Du schickst **4 einzelne SVGs** (eine pro Ebene)

**Pro Ebene eine SVG-Datei:**

1. **Inhalt:** Nur **ein** `<path>` (oder eine Gruppe) – genau die eine Bergform dieser Ebene.
2. **Gradient:** Der passende `<linearGradient>` für diese Ebene (g1, g2, g3 oder g4) in `<defs>`.
3. **viewBox:** In allen 4 SVGs **dieselbe** viewBox (z. B. die oben vorgeschlagene `-50 -80 560 700`), damit wir sie später übereinanderlegen können.
4. **Reihenfolge:** Am besten Dateinamen wie:
   - `berg-layer-1-hinten.svg` (am weitesten hinten / zuerst sichtbar)
   - `berg-layer-2.svg`
   - `berg-layer-3.svg`
   - `berg-layer-4-vorne.svg` (vorderste Ebene / zuletzt sichtbar)

**Was ich dann mache:**  
Die 4 SVGs im Hero übereinander einbinden und pro Ebene eine „Wachsen von unten“-Animation (z. B. `clip-path` oder `transform: scaleY(0)→scaleY(1)` mit `transform-origin: bottom`) mit versetzten Verzögerungen (z. B. 0s, 0.2s, 0.4s, 0.6s) auslösen.

---

### Option B: **Eine** SVG mit 4 erkennbaren Ebenen

Wenn du **eine** SVG behältst (wie jetzt), in der die 4 Ebenen schon als getrennte Gruppen/Paths drin sind:

- Jede Ebene muss per **Klasse oder ID** eindeutig sein (z. B. `.layer-1`, `.layer-2`, … oder `#layer1`, …).
- Dann müsste diese SVG **inline** im Code stehen (nicht als `<img src="…">`), damit ich die einzelnen Ebenen per CSS/JS animieren kann.

**Was ich dann mache:**  
SVG ins React inline einbauen und die 4 Ebenen nacheinander von unten nach oben „hochwachsen“ lassen (gleiche Animation wie oben, nur auf die Gruppen innerhalb der einen SVG angewendet).

---

### Kurz: Was ich brauche

| Option | Was du lieferst |
|--------|------------------|
| **A**  | 4 SVG-Dateien, je eine Ebene (1 Path + zugehöriger Gradient), **gleiche viewBox** in allen. |
| **B**  | 1 SVG, alle 4 Ebenen drin, jede Ebene mit **eindeutiger Klasse/ID** (z. B. `class="layer-1"` … `class="layer-4"`). |

Sag einfach, ob du Option A (4 SVGs) oder B (1 SVG mit Klassen) machst, dann passe ich den Viewport wie unter 1. an und setze die Animation um.
