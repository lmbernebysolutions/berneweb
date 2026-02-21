# Verantwortlichkeiten und Governance: Chatbot (FAQ & Ihr Match)

Rollen und Verantwortlichkeiten für den Betrieb, die Freigabe und die inhaltliche/technische Pflege des Chatbots.

## Owner und Verantwortung

- **Fachlicher Owner:** [Name/Stelle eintragen] – Verantwortung für inhaltliche Richtigkeit der Wissensbasis (FAQ, Ratgeber-Bezug), Nutzerhinweise und Grenzen des Bots.
- **Technischer Owner:** [Name/Stelle eintragen] – Verantwortung für API, Sicherheit, Infrastruktur, Deployment und technische Limits.
- **Datenschutz / Compliance:** [Name/Stelle eintragen] – Prüfung und Aktualisierung der Datenschutzangaben, Verzeichnis der Verarbeitungstätigkeiten, Betroffenenrechte.

## Aufgaben

- **Betrieb:** Überwachung von Logs und Fehlern, Reaktion auf Vorfälle (siehe CHATBOT_INCIDENT_RESPONSE.md), Wartung von Abhängigkeiten und Secrets (siehe CHATBOT_SECRETS_ROTATION.md).
- **Inhalt:** Pflege und Freigabe von FAQ-Inhalten, Ratgeber-Referenzen und Wizard-Texte (siehe CHATBOT_PROMPT_WISSENSBASIS.md).
- **Sicherheit:** Umsetzung und Review von Sicherheitsmaßnahmen (Rate-Limit, Validierung, Logging), Aktualisierung des Bedrohungsmodells (CHATBOT_BEDROHUNGSMODELL.md).

## Freigabeprozesse

- **Neue Features / wesentliche Änderungen am Chat:** Technische und ggf. fachliche Freigabe vor Rollout; bei datenschutzrelevanten Änderungen Einbindung Datenschutz.
- **Go-Live / Re-Go-Live:** Checkliste MUSS-Anforderungen (siehe Implementierungsplan) abgehakt; Freigabe durch technischen und fachlichen Owner.
- **Änderungen an Prompts und Wissensbasis:** Siehe CHATBOT_PROMPT_WISSENSBASIS.md (Review, Versionierung).

## Vertretung

- Vertretungsregelung für fachlichen und technischen Owner intern festlegen und hier oder in einem zentralen Dokument referenzieren.
