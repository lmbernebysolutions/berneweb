# Analyse-Prompt: Mehr Erzgebirge in die Berneby-Website

**Ablauf (2 Schritte):**
1. **Zuerst:** Research-KI mit dem Prompt **„ERZGEBIRGE_RESEARCH_PROMPT.md“** ausführen → Ergebnis: strukturierte Liste „Essentielle Erzgebirgs-Zeichen“.
2. **Danach:** Dieser Prompt hier + Screenshots + **KI_ANALYSE_FOUNDATION.md** + **Recherche-Ergebnis** an die Analyse-KI → konkrete Einbau-Vorschläge pro Seite/Sektion.

---

**Voraussetzung:** Diese Analyse wird **erst nach** der Research-Phase durchgeführt. Du erhältst:
1. **Vollscreen-Screenshots** jeder relevanten Seite der Berneby-Website (Home, Über uns, Handwerk, Tech, Kontakt).
2. Die Datei **„KI_ANALYSE_FOUNDATION.md“** – Code- und Design-System-Übersicht (Seiten, Sektionen, Komponenten, Dateipfade, Farben).
3. Das **Recherche-Ergebnis** der Research-KI: **„Recherche-Ergebnis: Essentielle Erzgebirgs-Zeichen“** (aus dem ERZGEBIRGE_RESEARCH_PROMPT) – strukturierte Liste von Symbolen, Motiven, Farben, Sprache, Handwerk etc.

**Ziel:** Analysieren, **wo und wie** mehr Erzgebirge-Elemente in die Website eingebracht werden können – ohne das bestehende Design-System zu sprengen und ohne kitschig zu wirken. Alle Vorschläge müssen **umsetzbar** sein (mit Verweis auf Datei/Komponente oder klare kleine Erweiterung).

---

## Skills (optional, aber empfohlen)

Nutze Skills für Brand und Design, damit Vorschläge zur Marke passen:
- **brand-guardian** / **brand-identity** – Erzgebirge-Bezug muss zur Berneby-Marke (navy, cyan, Tech/Handwerk, „aus dem Erzgebirge“) passen.
- **web-design-reviewer** / **frontend-design** – Einschätzung, ob Einbauten visuell stimmig und nicht überladen sind.

---

## Deine Aufgaben

### 1) ABGLEICH: SCREENSHOTS ↔ RESEARCH-ERGEBNIS

- Vergleiche die **aktuellen Screenshots** mit der **Liste der Erzgebirgs-Zeichen** aus der Research.
- Wo wird die Region **bereits** sichtbar oder spürbar (Texte, Orte, Farben, Bilder)?
- Welche **starken** Erzgebirgs-Elemente aus der Research-Liste fehlen auf der Website bisher komplett oder sind nur schwach vertreten?

**Ausgabe:** Kurze Tabelle oder Liste: „Bereits genutzt“ vs. „Noch nicht / schwach genutzt“ (mit Verweis auf Research-Kategorie).

---

### 2) PRO SEITE: KONKRETE EINBAU-VORSCHLÄGE

Für **jede** Seite (Home, Über uns, Handwerk, Tech, Kontakt):

- **Sichtbare Sektionen** (laut Foundation: Hero, TrustBar, 02, 03, … bis CTA).
- Pro Sektion: **1–3 konkrete Vorschläge**, wie ein Erzgebirgs-Element aus der Research hier eingebaut werden kann.
  - **Was** genau (z. B. „Berg-Silhouette als dezenten Hero-Hintergrund“, „Glück auf“ im Subline, „Holz-Textur als Rahmen für die Karte“).
  - **Wo** (Seite + Sektion + möglichst **Datei/Komponente** laut Foundation, z. B. `app/(marketing)/page.tsx` – Hero, `components/sections/Hero.tsx`).
  - **Aus der Research:** Welches der recherchierten Zeichen nimmst du dafür (Name aus der Research-Liste)?
- Kurz begründen: **Warum** passt das hier und **warum** bleibt es im Rahmen des Design-Systems (Farben, TechCorners, keine Überladung).

**Ausgabe:** Pro Seite ein Block „Seite: [Name]“ mit Unterpunkten pro Sektion und den 1–3 Vorschlägen inkl. Datei/Component und Research-Verweis.

---

### 3) PRIORISIERTE HANDLUNGSEMPFEHLUNGEN

- **Top 10** konkrete Maßnahmen über alle Seiten:
  - Kurzbeschreibung (was einbauen, wo).
  - Datei und/oder Komponente.
  - Verweis auf Research-Eintrag (Kategorie + Name).
  - Grober Aufwand („klein“ / „mittel“ / „größer“, z. B. nur Text vs. neues Asset).
- Sortierung nach **Wirkung** (Erzgebirge sofort erkennbar) und **Machbarkeit** (kleine Änderung zuerst).

---

### 4) GRENZEN & TONALITÄT

- Was **nicht** gemacht werden sollte: Klischee-Überfrachtung, kitschige Weihnachts-Optik (wenn die Firma ganzjährig seriös wirken soll), geschützte Zeichen ohne Klärung.
- In 2–3 Sätzen: **Tonalität** – wie „Erzgebirge“ rüberkommen soll (z. B. „verwurzelt, modern, stolz, nicht folkloristisch“).

---

## Ausgabeformat (Gesamtstruktur)

1. **Abgleich** (Research ↔ aktueller Stand)  
2. **Pro Seite** (Home, Über uns, Handwerk, Tech, Kontakt) – Sektionen + Vorschläge mit Datei/Component und Research-Verweis  
3. **Top-10-Handlungsempfehlungen** (priorisiert, mit Aufwand)  
4. **Grenzen & Tonalität** (kurz)

Alle Empfehlungen **umsetzbar** halten: bestehende Komponenten (SectionCard, Hero, TechCorners, FaqAccordion, etc.) oder klare, kurze Beschreibung einer kleinen Erweiterung. Keine vagen Ratschläge.
