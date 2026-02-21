# Abgrenzung und Scope: Chatbot (FAQ & Ihr Match)

Was ausdrücklich nicht zum aktuellen Scope des Chatbots gehört und bei späterer Einführung zu beachten ist.

## Keine Admin- oder Konfigurations-Oberflächen

- Es existieren **keine** separaten Administrations-Oberflächen für den Chat (keine UI zur Konfiguration der Wissensbasis, des Wizards oder der Logs).
- Konfiguration erfolgt ausschließlich über **Code und Repository** (Konstanten, Wizard-Config, Wissensbasis-Dateien). Zugriff auf Änderungen ist über die Zugriffskontrolle auf das Repo geregelt.
- **Sicherheitsanforderung 1.2, 1.18, 1.19:** Auth/Authz und Rollenmodell für Admin-UI sind damit nicht anwendbar; die Abgrenzung ist hier dokumentiert. Sollte später eine Admin-UI eingeführt werden, sind Authentifizierung und rollenbasierte Zugriffskontrolle zu implementieren.

## Kein Datei-Upload

- Der Chatbot **akzeptiert keine Datei-Uploads** (weder für FAQ noch für Match).
- **Sicherheitsanforderungen 1.10, 1.11:** Typen-Whitelist, Größenbeschränkung, Malware-Scan und sichere Ablage entfallen im aktuellen Scope. Bei **späterer** Einführung von Uploads sind diese Anforderungen umzusetzen (Whitelist, Max-Größe, Scan, keine direkte Ausführung).

## Keine spezifischen Beispiele im Plan

- Der Implementierungsplan und die Anforderungsliste enthalten keine konkreten Produktnamen, Code-Snippets oder Kampagnen; konkrete UI-Designs und Marketing-Strategie liegen außerhalb des technischen MUSS-Plans.
