# Display-Schrift: Auswahl für Überschriften

Aktuell im Einsatz: **Bebas Neue**.  
Alle unten genannten Schriften sind mit `next/font/google` nutzbar und bilden einen klaren Kontrast zur Body-Schrift **Noto Sans**.

---

## Optionen (alphabetisch)

| Schriftart | Stil | Passt zu |
|------------|------|----------|
| **Archivo Black** | Sehr kräftig, plakativ | Starke Headlines, wenig Text in der Headline |
| **Barlow Condensed** | Eng, technisch, klar | Tech, Industrial, „System“-Gefühl |
| **Bebas Neue** *(aktuell)* | Condensed, Impact, Großbuchstaben | Plakativ, sehr prägnant |
| **Lexend** | Lesbar, modern, ruhig | Wenn Headlines trotzdem sehr gut lesbar sein sollen |
| **Manrope** | Geometrisch, sachlich | Clean Tech, nicht zu verspielt |
| **Orbitron** | Geometrisch, futuristisch | Starker Tech/Sci-Fi-Akzent |
| **Oswald** | Condensed, kräftig | Klassischer „Headline“-Look |
| **Outfit** | Leicht gerundet, modern | Freundlicher Tech, etwas weicher als Syne |
| **Plus Jakarta Sans** | Rund, professionell | Corporate, ein bisschen weicher als Syne |
| **Rajdhani** | Eng, technisch | Tech, Daten/UI-Feeling |
| **Space Grotesk** | Geometrisch, Tech | Sehr gut für Tech/Startup, ähnlich Syne |
| **Syne** *(aktuell)* | Geometrisch, modern, etwas charaktervoll | Eure jetzige Wahl, guter Allrounder |
| **Tektur** | Geometrisch, technisch | Sehr technisch, etwas „Code“-Vibe |

---

## Empfehlung für Berneby (Tech + Handwerk)

- **Bleibt charaktervoll, aber klarer als Syne:** **Space Grotesk** oder **Outfit**
- **Noch technischer/härter:** **Barlow Condensed**, **Rajdhani** oder **Tektur**
- **Stärkerer Kontrast (sehr plakativ):** **Bebas Neue** oder **Oswald**

Zum Wechseln reicht es, in `app/layout.tsx` die Google-Font-Importe und die `variable` für die Display-Schrift anzupassen; die Klasse `.font-display` in `globals.css` bleibt unverändert.
