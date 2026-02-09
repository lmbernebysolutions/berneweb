# Prompt: Berg-Silhouette aus B.svg ableiten (SVG-Skill)

**Zweck:** Ein professioneller, zusammenhängender SVG-Grafik für die Erzgebirge-Bergsilhouette erstellen, der den **Stil und die Formensprache** von `B.svg` (Berneby-Logo) übernimmt – nicht das B einfach nur einfügen, sondern eine **einheitliche Grafik** im selben Look.

---

## 1. Skill aktivieren

Bevor du mit der Grafik arbeitest, **aktiviere den SVG-Skill** (z. B. `moai-tool-svg` oder das Projekt-SVG-Skill):

- Nutze die Referenz für Path-Commands (M, L, C, Q, A, Z), viewBox, fill/stroke, `<defs>`, `<g>` und Transformationen.
- Halte dich an saubere SVG-Struktur (viewBox, preserveAspectRatio, currentColor wo sinnvoll).

---

## 2. Kontext & Eingabe

**Quelldatei:** `public/B.svg`

- **viewBox:** `0 0 15 48` (hochkant).
- **Inhalt:** Zwei Pfade (oberer und unterer Bogen des „B“), beide mit Kurven (C = cubic Bézier), klare Rundungen, kein Rechteck-Look.
- **Stil:** Fill `#03f9f9` (Cyan), keine Strokes in der Datei; die Form ist weich und kurvenbetont.
- **Transformation:** Die Pfade liegen in einer Gruppe mit `transform="matrix(1.3333333,0,0,-1.3333333,0,64)"` und `scale(0.1)` – also stark skaliert und Y gespiegelt.

**Wichtig:** Die **geometrischen Eigenschaften** des B (Kurvenradien, Proportionen, Fluss der Bézier-Kurven) sollen als **Design-Vorbild** dienen, um die Berglinie und optional integrierte B-Elemente stilistisch anzunähern.

---

## 3. Aufgabenstellung (Schritt für Schritt)

1. **B.svg analysieren**
   - Pfad-Daten (beide `d="..."`) und viewBox auslesen.
   - Kurvenverlauf verstehen: Wo sind C/Q, wo L, wie sind die Rundungen?
   - Optischen Charakter beschreiben: weich, technisch, organisch, etc.

2. **Berg-Silhouette entwerfen (Hauptgrafik)**
   - **Eine durchgehende Bergkette** über die volle Breite (z. B. viewBox `0 0 1440 200` oder ähnlich), keine Lücken, keine willkürlich eingefügten Fremdelemente.
   - Die **Konturlinie** der Berge (Berglinie) soll die **gleiche Formensprache** wie das B nutzen:
     - Weiche, mathematisch saubere Kurven (Bézier).
     - Keine eckigen Zacken; Rundungen ähnlich „organisch“ wie im B.
   - Die Berglinie kann aus **einem oder mehreren zusammenhängenden Pfaden** bestehen (z. B. ein geschlossener Pfad für Fläche + ein offener Pfad für die Kontur), aber optisch **eine** Silhouette ergeben.
   - Farben: `currentColor` bzw. im Kontext der Website Cyan; Opacity/Stärke so wählen, dass es dezent wirkt (z. B. Fill mit Gradient/Opacity, Kontur mit stroke und stroke-opacity).

3. **B-Logo optional integrieren**
   - Wenn das B in der Grafik vorkommt: Es soll **teil der Gesamtform** wirken (z. B. als leichte Erhebung in der Berglinie oder als dezentes Element in der Mitte), nicht als aufgeklebtes separates Logo.
   - Integration entweder:
     - durch **Nachzeichnen der Berglinie** so, dass sie an einer Stelle die B-Form aufnimmt, oder
     - durch **exakte Wiederverwendung** der B-Pfade mit passender Transformation (scale, rotate), sodass Übergänge zur Berglinie weich sind (gleiche Strichstärke/Opacity wie die Bergkontur).

4. **Technische Anforderungen**
   - Eine **einzige SVG-Datei**, die im Hero (unten) und im Footer (oben, gedreht) genutzt werden kann.
   - `preserveAspectRatio="none"` oder `xMidYMax meet` je nach gewünschtem Stretching.
   - Keine externen Ressourcen; Farben über `currentColor` oder feste Hex-Werte, die zum Brand (Cyan #03f9f9, Navy) passen.
   - Saubere Struktur: `<defs>` für Gradienten/IDs, klare `<g>`-Gruppen, ggf. `id="root"` oder Symbol für `<use>` wenn gewünscht.

---

## 4. Definition of Done

- [ ] SVG-Skill wurde vor der Erstellung der Grafik genutzt.
- [ ] B.svg wurde analysiert (Kurven, viewBox, Stil in 1–2 Sätzen beschrieben).
- [ ] Berg-Silhouette ist **durchgehend** (keine Lücke, keine abgeschnittene Linie).
- [ ] Berglinie nutzt **dieselbe Formensprache** wie das B (weiche Kurven, keine harten Zacken).
- [ ] Wenn B integriert ist: wirkt **einheitlich** mit der Bergform, nicht aufgesetzt.
- [ ] Eine Datei, produktionsreif (Hero/Footer), mit viewBox und Farben wie spezifiziert.

---

## 5. Was du vermeiden sollst

- **Nur B einfügen:** Das B nicht unverändert in die Ecke kleben; entweder stilistisch in die Berglinie überführen oder weich integrieren.
- **Vertikales B in der Berglinie:** Wenn B vorkommt, horizontal/landscape-orientiert einbinden (z. B. gedreht oder als Teil der Bergkontur), nicht als stehendes Logo mitten in der Silhouette.
- **Zwei getrennte Grafiken:** Keine „Berg links + B rechts“ als zwei unverbundene Teile; eine zusammenhängende Grafik.
- **Unvollständige Berglinie:** Der Rand des Berges (die Berglinie) muss über die gesamte Breite sichtbar und in einer einheitlichen Linie (oder geschlossenen Form) verlaufen – keine abgebrochenen oder falsch angebundenen Pfade.

---

## 6. Kurzfassung für den Agenten

**Role:** Du erstellst eine professionelle, zusammenhängende Erzgebirge-Bergsilhouette als SVG.

**Input:** `public/B.svg` (Pfade, viewBox, Kurvenstil).

**Task:** (1) B.svg mit dem SVG-Skill analysieren. (2) Eine vollständige Berg-Silhouette entwerfen, deren **Formensprache** (weiche Bézier-Kurven, Rundungen) dem B entspricht. (3) Optional das B so integrieren, dass es Teil einer **einen** Grafik ist. (4) Eine produktionsreife SVG-Datei ausliefern.

**Output:** Eine SVG-Datei (z. B. `public/icons/berg-silhouette-final.svg`), die im Hero und Footer genutzt werden kann, mit durchgehender Berglinie und, falls gewünscht, integriertem B im selben Stil.
