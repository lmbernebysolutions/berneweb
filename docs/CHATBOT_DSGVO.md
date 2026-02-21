# Datenschutz und DSGVO: Chatbot (FAQ & Ihr Match)

## Rechtsgrundlagen und Zweck

- **Zweck:** Beantwortung von Anfragen (FAQ), Unterstützung bei Angebotsauswahl (Match). Vertragsvorbereitung / berechtigtes Interesse.
- **Rechtsgrundlagen:** Art. 6 Abs. 1 lit. b und f DSGVO (in Datenschutzseite dokumentiert).
- **Verzeichnis der Verarbeitungstätigkeiten:** Chat-Einsatz und Zwecke dort erfassen.

## Datenminimierung und Speicherung

- **Keine personenbezogenen Chat-Verläufe** gespeichert.
- Logs **ohne Nutzerinhalte** und ohne personenbezogene Daten.
- **Speicherdauer:** Definierte Frist für technische Logs (z. B. 7 Tage), in Datenschutzerklärung angegeben.

## Auftragsverarbeitung (AV-Verträge)

Mit allen Dienstleistern, die personenbezogene Daten verarbeiten könnten, AV-Verträge (Art. 28 DSGVO) prüfen:

- Vercel (Hosting)
- Upstash (Redis)
- Google (Gemini)
- OpenAI (Fallback)

Checkliste vor Go-Live und bei Anbieterwechsel dokumentieren.

## Internationale Datenübermittlung

- Bei LLM-Anbietern in Drittländern: Rechtsgrundlage und Garantien (z. B. Standardvertragsklauseln) prüfen; in Datenschutzerklärung erwähnen.

## TOMs (technisch-organisatorische Maßnahmen)

- **Vertraulichkeit:** Zugriff auf Secrets begrenzt, HTTPS, keine Keys im Client
- **Integrität:** Versionierte Konfiguration, Validierung der Eingaben
- **Verfügbarkeit:** Rate-Limiting, Timeouts, Fallback; Monitoring ohne personenbezogene Daten
- **Belastbarkeit:** Dokumentierte Verfahren (CHATBOT_BETRIEB.md), Sicherheitsupdates

## Betroffenenrechte

- Verfahren für Auskunft, Löschung etc. festlegen; Ansprechstelle (z. B. Impressum/Datenschutz) in Datenschutzerklärung verlinken.
