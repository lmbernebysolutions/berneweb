# Abnahme- und Freigabeprozess: Chatbot (FAQ & Ihr Match)

## Go-Live-Kriterien

Vor Freigabe des Chatbots für den Produktiveinsatz sollten alle MUSS-Punkte der strukturierten Anforderungsliste (Implementierungsplan) als erfüllt oder nicht relevant bewertet sein. Insbesondere:

- Sicherheit: Validierung, Rate-Limiting, Fehlerbehandlung, CORS, Logging, keine sensiblen Daten in Responses
- Datenschutz: Rechtsgrundlagen, Datenschutzerklärung, Cookie-Consent, keine Verlaufs-Speicherung, AV/International
- Zuverlässigkeit: Timeout, Fallback, Konversationslimit, Idempotenz
- Nutzererlebnis: Hinweise, Disclaimer, Barrierefreiheit (A11y)
- Infrastruktur: Health-Check, Deployment/Secrets getrennt, Dokumentation
- Tests: Teststrategie umgesetzt, kritische Pfade getestet

## Verantwortliche

- **Freigabe technisch:** Technischer Owner (siehe CHATBOT_VERANTWORTUNG.md)
- **Freigabe fachlich:** Fachlicher Owner
- **Freigabe Datenschutz:** Bei datenschutzrelevanten Änderungen Einbindung der datenschutzverantwortlichen Stelle

## Ablauf

1. Checkliste (MUSS) durchgehen und Status dokumentieren
2. Offene Punkte schließen oder bewusste Ausnahmen dokumentieren
3. Technische und fachliche Freigabe einholen
4. Bei Re-Go-Live nach größeren Änderungen: gleiche Kriterien prüfen, ggf. verkürzte Checkliste

## Dokumentation

- Abnahme-Datum und Freigebende dokumentieren (z. B. in diesem Dokument oder in einer zentralen Freigabe-Liste)
- Bei Ausnahmen: Begründung und geplante Nachbesserung festhalten
