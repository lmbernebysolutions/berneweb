# Screenshots für Referenzen (Case Studies)

Die Referenz-Karten auf `/referenzen` und auf der Home zeigen optional Screenshots in den Device-Mockups (Desktop-Browser + Smartphone). So richtest du die Bilder ein.

## 1. Ordner & Dateinamen

- **Ordner:** `public/referenzen/`
- **Namensschema:**
  - Desktop: `[referenz-id]-desktop.png` (oder `.jpg`, `.webp`)
  - Mobile: `[referenz-id]-phone.png` (oder `.jpg`, `.webp`)

- **Formate:** PNG (empfohlen), JPG/JPEG oder WebP – alle werden von Next.js Image unterstützt.

- **Seitenverhältnisse (ideal, damit nichts abgeschnitten wirkt):**
  - **Desktop:** **16∶9** (z. B. 1920×1080, 1440×810, 1280×720)
  - **Phone:** **9∶19** (z. B. 390×822, 414×874, 360×760 – Smartphone-Hochformat)
  - Abweichende Formate werden mit `object-cover` zugeschnitten (von oben sichtbar).

**Referenz-IDs** (aus `lib/data/referenzen.ts`):

| ID | Kunde |
|----|--------|
| `elektro-wagner` | Elektro Wagner GmbH |
| `cafe-erzgebirge` | Café Erzgebirge |
| `sanitaer-mueller` | Sanitär Müller |
| `holzwerkstatt-bergmann` | Holzwerkstatt Bergmann |

Beispiele:
- `public/referenzen/elektro-wagner-desktop.png`
- `public/referenzen/elektro-wagner-phone.png`

## 2. Screenshots erstellen

### Option A: Browser (manuell)

**Desktop:**
1. Website der Referenz in Chrome/Firefox öffnen (z.B. die Live-URL des Kunden).
2. Vollbild oder Fenster auf ca. 1280–1440 px Breite.
3. Screenshot:
   - **Mac:** `Cmd + Shift + 4` (Bereich) oder `Cmd + Shift + 5` (Fenster).
   - **Windows:** Snipping Tool / `Win + Shift + S`.
4. Datei speichern als `[id]-desktop.png` in `public/referenzen/`.

**Mobile:**
1. Chrome: **DevTools** (F12) → **Device Toolbar** (Strg+Shift+M) aktivieren.
2. Gerät wählen (z.B. iPhone 12, 390×844).
3. Seite neu laden, ggf. scrollen bis der obere Bereich gut aussieht.
4. Screenshot vom sichtbaren Bereich (Rechtsklick → „Screenshot aufnehmen“ in Chrome, oder System-Screenshot).
5. Speichern als `[id]-phone.png` in `public/referenzen/`.

### Option B: Online-Tool

- **[screenshot.guru](https://screenshot.guru)** oder **[screenshotone.com](https://screenshotone.com)**  
  URL eingeben → Desktop- und Mobile-Ansicht erzeugen → Bilder herunterladen und wie oben benennen und in `public/referenzen/` legen.

### Option C: Skript (Puppeteer/Playwright)

Wenn du viele Referenzen hast, kannst du ein kleines Node-Skript nutzen, das z.B. mit Puppeteer die URLs aus den Referenz-Daten aufruft und Desktop- und Mobile-Screenshots speichert. Bei Bedarf kann so ein Skript ergänzt werden.

## 3. In den Daten eintragen

In `lib/data/referenzen.ts` bei der jeweiligen Referenz die Pfade setzen:

```ts
{
  id: "elektro-wagner",
  // ...
  desktopImage: "/referenzen/elektro-wagner-desktop.png",
  phoneImage: "/referenzen/elektro-wagner-phone.png",
}
```

**Wichtig:** Der Pfad beginnt mit `/referenzen/` (so wird er aus `public/` ausgeliefert). Ohne Eintrag zeigen die Mockups den Platzhalter „Desktop-Screenshot hinzufügen“ / „Mobile-Screenshot hinzufügen“.

## 4. Empfohlene Maße & Seitenverhältnisse

- **Desktop:** Seitenverhältnis **16∶9**, Breite mind. ~1280 px.  
  Beispiele: 1920×1080, 1440×810, 1280×720.
- **Phone:** Seitenverhältnis **9∶19** (Hochformat).  
  Beispiele: 390×822, 414×874, 360×760.  
  Bei Screenshot-Tools: Viewport „iPhone“ oder z. B. 390×844 wählen – die Mockup-Komponente nutzt 9∶19 und schneidet bei Bedarf von oben.

Nach dem Speichern der Dateien und Eintrag in `referenzen.ts` erscheinen die Screenshots automatisch in den Referenz-Karten und auf der Home.
