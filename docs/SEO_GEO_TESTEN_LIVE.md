# SEO & GEO testen (wenn die Seite auf Vercel live ist)

Kurz-Checkliste, um zu prüfen, ob die Seite gut indexiert wird und von Suchmaschinen bzw. AI-Systemen erkannt wird.

**Voraussetzung:** Live-URL (z. B. `https://berneby.de` oder `https://berneby-website.vercel.app`).

---

## 1. Technische Basis prüfen

| Check | URL / Tool | Was prüfen |
|-------|------------|------------|
| **Sitemap** | `https://[deine-domain]/sitemap.xml` | Alle wichtigen Seiten (Home, Handwerk, Tech, Ratgeber, Standorte, Branchen) sind gelistet. |
| **Robots** | `https://[deine-domain]/robots.txt` | Erlaubt Crawling, verweist auf `/sitemap.xml`. |
| **Meta & Titel** | Browser: Rechtsklick → „Seitenquelltext anzeigen“ oder DevTools | Pro Seite: `<title>`, `<meta name="description">`, `<link rel="canonical">` vorhanden und sinnvoll. |

---

## 2. SEO (Google & Co.)

- **Google Search Console** (wenn die Domain verbunden ist)
  - Sitemap einreichen: URL eingeben `https://[domain]/sitemap.xml` → „Senden“.
  - Nach einigen Tagen: „Abdeckung“ / „Seiten“ prüfen – wie viele Seiten sind indexiert?
- **Structured Data (Schema)**
  - [Google Rich Results Test](https://search.google.com/test/rich-results) – eine URL eingeben (z. B. Startseite oder eine Branchen-Seite mit FAQ).
  - Prüfen: Organization, FAQPage, LocalBusiness (Standorte) werden erkannt.
- **Lighthouse** (in Chrome: F12 → Tab „Lighthouse“)
  - „SEO“-Kategorie ausführen – Hinweise zu Meta, Überschriften, Links beheben.

---

## 3. GEO (AI-Suchmaschinen / Zitationen)

Ziel: Prüfen, ob die Seite von AI-Systemen gefunden und zitiert wird.

| System | So testen |
|--------|-----------|
| **Google AI Overviews** | In Google suchen: z. B. „Webdesign Erzgebirge“ oder „Website für Handwerker Erzgebirge“. Schauen, ob in der AI-Zusammenfassung (Overview) Berneby oder eure Inhalte vorkommen. |
| **ChatGPT** | Frage z. B.: „Welche Anbieter gibt es für Webdesign oder Websites für Handwerker im Erzgebirge?“ oder „Wer macht lokale SEO für Handwerker in Sachsen?“ – prüfen, ob Berneby Solutions genannt wird. |
| **Perplexity** | Gleiche oder ähnliche Fragen stellen – Antwort und Quellen prüfen. |
| **Claude / Gemini** | Ähnliche Fragen (Webdesign Erzgebirge, Handwerker-Website, lokale SEO) – schauen, ob die Seite als Quelle erscheint. |

**Hinweis:** GEO-Zitationen entstehen oft erst nach einiger Zeit und wenn die Seite verlinkt und thematisch relevant ist. Einmal testen reicht nicht – nach ein paar Wochen erneut prüfen.

---

## 4. Schnell-Checkliste (einmal nach Go-Live)

- [ ] `/[domain]/sitemap.xml` im Browser öffnen – Liste der URLs sichtbar?
- [ ] `/[domain]/robots.txt` öffnen – Verweis auf Sitemap vorhanden?
- [ ] 2–3 Seiten (Home, eine Standort-Seite, eine Branchen-Seite): Quelltext prüfen – Titel, Description, Canonical gesetzt?
- [ ] Google: „site:berneby.de“ (oder deine Domain) – werden Seiten angezeigt? (kann einige Tage dauern)
- [ ] Eine Frage in ChatGPT/Perplexity: „Webdesign Handwerker Erzgebirge“ – wird Berneby genannt?

Wenn diese Punkte passen, sind technische SEO und die Grundlage für GEO gelegt. Feintuning (mehr Backlinks, Inhalte, Zeit) verbessert Sichtbarkeit und Zitationen weiter.
