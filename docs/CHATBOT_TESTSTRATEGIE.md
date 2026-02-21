# Teststrategie: Chatbot (FAQ & Ihr Match)

Überblick über funktionale, nicht-funktionale, Sicherheits- und Datenschutz-Tests für den Chatbot.

## Funktionale Tests

- **FAQ-Modus:** Gültige Anfrage führt zu Stream- oder Fallback-Antwort; Format (UIMessage-Stream) wird eingehalten.
- **Match-Modus:** Gültiger Body (mode, wizardState, choice) führt zu JSON mit nächstem Schritt oder Match-Ergebnis.
- **RAG/FAQ:** Bei Stichwort aus Wissensbasis wird erwartete Antwort bzw. Fallback geliefert (ohne LLM: lokale FAQ-Suche).
- **Wizard:** Entscheidungspfade und Ergebnis-Mapping (z. B. Handwerk: orte + ki → passendes Paket) manuell oder automatisiert prüfen.

## Sicherheits- und Limit-Tests

- **Rate-Limiting:** Nach Überschreitung des Limits (pro IP) ist Response 429; keine Bypass über alternative Pfade.
- **Validierung:** Ungültiger Body (fehlende Pflichtfelder, zu viele Nachrichten, ungültige Typen) führt zu 400.
- **Längenlimits:** Eingabe unter MIN_INPUT_CHARS → 400; Eingabe über MAX_INPUT_CHARS wird gekürzt; zu viele Nachrichten → 400.
- **Spam:** Identische letzte Nutzernachrichten (Heuristik) → 429.
- **Idempotenz:** Gleicher idempotencyKey innerhalb TTL → 409 (wenn Redis konfiguriert).
- **Fehlerbehandlung:** LLM-Fehler/Timeout führen zu 500/504 mit generischer Meldung; keine Stacktraces oder internen Details in Response.
- **Secrets:** Keine API-Keys oder Tokens in Client-Bundle oder API-Response prüfen (Build/Static-Analyse).

## Datenschutz-Tests

- **Consent:** Chat-UI nur sichtbar/nutzbar bei Cookie-Entscheidung (manuell prüfen).
- **Logging:** Keine personenbezogenen Daten oder Nutzerinhalte in Logs (Review der Log-Aufrufe).
- **Speicherdauer:** Konfigurierte TTLs (z. B. Idempotenz) und Dokumentation abgleichen.

## Nicht-funktionale Tests

- **Timeout:** Stream-Abbruch nach STREAM_TIMEOUT_MS; Response 504 (ggf. mit Mock/Stub für LLM).
- **Fallback:** Bei fehlendem LLM-Key wird Fallback-Antwort aus Wissensbasis geliefert (ohne externen Aufruf).
- **Last/Performance:** Optional; maximale Last und Graceful Degradation definieren und bei Bedarf testen.

## Regression

- Bei Änderungen an Route, Prompts, Wissensbasis oder Wizard: relevante Tests ausführen; in CI einbinden wo möglich.
- Test- und Beispielumgebungen verwenden keine produktiven Daten oder Secrets; klare Trennung von Production.

## Abnahme

- Siehe CHATBOT_ABNAHME.md: Kriterien für Go-Live, Verantwortliche, Freigabeprozess.
