# Systemarchitektur: Chatbot (FAQ & Ihr Match)

Kurzbeschreibung der Komponenten, Schnittstellen und Datenflüsse des Web-Chatbots.

## Komponenten

- **Frontend (Next.js):** Chat-Section-Komponente mit zwei Modi (FAQ, Match). FAQ nutzt `useChat` (AI SDK React) mit `DefaultChatTransport`, API `/api/chat` mit `body: { mode: 'faq' }`. Match ist ein rein clientseitiger Wizard (Zustandsmaschine) mit Konfiguration aus `lib/wizard-config.ts`; keine LLM-Anfragen im Match-Modus.
- **Chat-API (`/api/chat`):** Next.js Route Handler (POST). Verarbeitet JSON-Body (mode, messages, optional idempotencyKey, für Match: wizardState, choice). FAQ: Validierung, Rate-Limiting, Spam-Check, optional Idempotenz (Redis), Aufruf LLM (Gemini oder OpenAI) mit Wissensbasis als System-Prompt, Streaming-Antwort. Match: rein regelbasierte Berechnung des nächsten Wizard-Schritts bzw. Ergebnisses, JSON-Response.
- **Wissensbasis:** FAQ-Einträge und Ratgeber-Links aus `lib/chat/knowledge.ts`; Wizard-Schritte und Match-Logik in `lib/wizard-config.ts` und `lib/chat/wizard-chat.ts`. Keine externe Vektor-Datenbank; RAG erfolgt über injizierten System-Prompt.
- **Externe Dienste:** Upstash Redis (Rate-Limiting, optional Idempotenz); Google Generative AI (Gemini) oder OpenAI (Fallback) für FAQ-Streaming.

## Datenfluss (FAQ)

1. Nutzer gibt Text ein oder wählt eine Vorschlagsfrage.
2. Client sendet POST `/api/chat` mit `body: { mode: 'faq', messages: [...] }`.
3. API: Rate-Limit (IP), Validierung (Schema), Längen- und Spam-Check, optional Idempotenz-Check.
4. API: Letzte Nutzernachricht aus `messages` extrahieren, normalisieren; bei vorhandenem LLM-Key: System-Prompt (FAQ + Ratgeber) + konvertierte Nachrichten an LLM, Stream-Antwort; sonst Fallback-Antwort aus lokaler FAQ-Suche.
5. Client empfängt Stream, zeigt Antwort im Chat an.

## Datenfluss (Match)

1. Nutzer wählt im Wizard eine Option (oder startet).
2. Client sendet POST `/api/chat` mit `body: { mode: 'match', wizardState, choice }` oder nutzt ausschließlich lokale Zustandsmaschine (getWizardChatState). Aktuell: Match wird clientseitig berechnet; die API-Route unterstützt Match ebenfalls per POST und gibt JSON zurück.
3. Kein LLM-Aufruf; keine personenbezogenen Daten an Dritte.

## Schnittstellen

- **POST /api/chat:** Body siehe Zod-Schema in `app/api/chat/route.ts` (mode, messages, wizardState, choice, idempotencyKey). Response: bei FAQ Stream (UIMessage-Format) oder JSON-Fehler; bei Match JSON (nächster Schritt oder Match-Ergebnis).
- **OPTIONS /api/chat:** CORS Preflight; restriktive CORS-Header (gleiche Origin bzw. konfigurierte Production-Origin).

## Sicherheits- und Limit-Konstanten

- Siehe `lib/chat/constants.ts`: MAX_INPUT_CHARS, MAX_OUTPUT_TOKENS, MAX_MESSAGES_PER_REQUEST, RATE_LIMIT_*, STREAM_TIMEOUT_MS, MIN_INPUT_CHARS, IDEMPOTENCY_TTL_SECONDS.
