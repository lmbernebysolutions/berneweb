# Incident-Response: Chatbot-Sicherheitsvorfälle

## Erkennung

- **Quellen:** Logs (Rate-Limit-429, Spam-429, Timeout-504, Fehler-500), Monitoring, Meldungen
- **Relevante Ereignisse:** Hohe Fehlerraten, gehäufte Rate-Limit-/Spam-Treffer, Verdacht auf geleakte API-Keys, Missbrauch oder Angriffe

## Klassifizierung

- **Hoch:** Aktive Kompromittierung, Datenleck, massiver Missbrauch
- **Mittel:** Anhaltender Missbrauch, wiederholte Angriffsversuche
- **Niedrig:** Einzelne Auffälligkeiten

## Maßnahmen

1. **Sofort:** Schäden begrenzen (Key sperren, Rate-Limit verschärfen)
2. **Kurzfristig:** Ursache eingrenzen (Logs, Konfiguration)
3. **Mittelfristig:** Behebung (Key-Rotation, Fix), Dokumentation
4. **Kommunikation:** Bei datenschutzrelevanten Vorfällen gemäß DSGVO und Unternehmensrichtlinie

## Ansprechpartner

- Fachlicher/Technischer Owner: Siehe CHATBOT_VERANTWORTUNG.md
- IT-Sicherheit/Datenschutz: [interne Zuordnung]

## Lessons Learned

Nach Vorfall: Kurzdokumentation (Was? Maßnahmen? Prävention?) und ggf. Aktualisierung von Bedrohungsmodell und Runbooks.
