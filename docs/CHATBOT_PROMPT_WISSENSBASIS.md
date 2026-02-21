# Prompt- und Wissensbasis-Governance: Chatbot (FAQ & Ihr Match)

Richtlinien für die Erstellung, Änderung und Qualitätssicherung von System-Prompts, FAQ-Inhalten und Wizard-Definitionen.

## System-Prompts (FAQ-Modus)

- **Ort:** System-Prompt wird in `app/api/chat/route.ts` aus FAQ-Einträgen und Ratgeber-Links zusammengesetzt.
- **Inhaltliche Vorgaben:** Antwort nur auf Basis der Wissensbasis; keine Erfindungen; bei Themen außerhalb des Angebots (Handwerk, Web, IT, Erzgebirge) auf Kontakt/Impressum verweisen.
- **Änderungen:** Jede Änderung an der Logik oder den Bausteinen des System-Prompts über Git; Code-Review (mindestens Vier-Augen-Prinzip) vor Merge. Änderungen in Commit-Message oder Changelog kurz beschreiben.

## Wissensbasis (FAQ, Ratgeber)

- **Quellen:** FAQ-Einträge und Ratgeber-Links kommen aus `lib/chat/knowledge.ts` bzw. den zugrundeliegenden Datenquellen (z. B. `lib/constants.ts`, Ratgeber-Metadaten).
- **Qualität:** Nur freigegebene, fachlich geprüfte Inhalte; keine Rechte Dritter verletzen (Urheberrecht, Marken).
- **Aktualisierung:** Regelmäßige Prüfung auf Aktualität; veraltete Einträge anpassen oder entfernen. Änderungen versioniert über Git; bei größeren inhaltlichen Anpassungen fachliche Freigabe.

## Wizard (Ihr Match)

- **Konfiguration:** Schritte, Fragen, Optionen und Match-Logik in `lib/wizard-config.ts` und `lib/chat/wizard-chat.ts`.
- **Änderungen:** Änderungen an Fragen, Optionen oder Entscheidungslogik über Git; Review vor Merge. Nutzerführung und Ergebnisqualität bei Änderungen prüfen (manuell oder per Test).

## Versionierung und Rollback

- Alle Änderungen an Prompts, Wissensbasis und Wizard über Git; Tags/Releases für Produktion. Bei fehlerhaften Inhalten: Rollback durch Revert oder vorherigen Stand wiederherstellen und neu deployen.

## Modellwechsel (LLM)

- Auswahl und Wechsel des LLM (z. B. Gemini, OpenAI, anderes Modell) in Absprache mit technischem Owner; Tests (Antwortqualität, Latenz, Kosten) vor Umstellung; Secrets und Env-Variablen anpassen, Dokumentation (z. B. CHATBOT_ARCHITEKTUR.md, CHATBOT_DSGVO.md) aktualisieren.
