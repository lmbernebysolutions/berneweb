# Research-Prompt: Lücken beim Vercel AI Chatbot (Rate Limiting, Anti-Spam, DSGVO)

**Anwendung:** Diesen Prompt an deine Research-KI senden, um **konkrete Lösungen und Best Practices** für die fehlenden Teile zu finden, die der [Vercel AI Chatbot](https://github.com/vercel/ai-chatbot) und das Ökosystem (Vercel AI SDK, Next.js App Router) **nicht out-of-the-box** liefern.

---

## Ausgangslage

Wir setzen den **Vercel AI Chatbot** (bzw. [vercel/ai-chatbot](https://github.com/vercel/ai-chatbot)) als Basis für einen RAG-Chatbot auf einer Next.js-App-Router-Website ein. Der Chatbot ersetzt FAQ + „Ihr Match“-Wizard; Antworten kommen nur aus einer Wissensbasis (keine Halluzination).  

Laut bisheriger Recherche fehlen im Vercel-Setup:

- **Rate Limiting** – nicht eingebaut; „erweiterbar (Upstash/Redis Middleware)“
- **Anti-Spam / Token-Missbrauch** – keine klaren Vorgaben
- **DSGVO/Consent** – „Docs für Consent; integrierbar mit react-cookie-manager“, aber keine Schritt-für-Schritt-Integration

---

## Suchauftrag für die Research-KI

Recherchiere **spezifisch** zu folgenden Lücken. Pro Thema: **konkrete Implementierungen**, **offizielle oder weit verbreitete Libraries**, **Code-Beispiele** (Next.js App Router, TypeScript), und wo möglich **Vercel AI SDK / ai-chatbot**-kompatibel.

---

### 1. Rate Limiting für Vercel AI Chatbot / Next.js App Router

- **Was:** Request-Limits pro IP (oder pro User/Session), z. B. X Anfragen pro Minute/Stunde für die Chat-API-Route (z. B. `/api/chat`).
- **Fragen:**
  - Welche **Best Practices** und **Libraries** gibt es für Rate Limiting in Next.js (App Router)?
  - **Upstash Redis** (oder andere Redis-Anbieter) – gibt es fertige Pakete wie `@upstash/ratelimit` und **konkrete Integration** in Next.js Route Handlers / Server Actions?
  - **Vercel KV / Vercel Redis** – Nutzung für Rate Limiting mit dem AI Chatbot?
  - **Middleware vs. Route Handler:** Wo soll das Limit geprüft werden (Edge Middleware vs. in `route.ts`)? Vor- und Nachteile (z. B. IP in Edge zuverlässig?).
  - Gibt es **offizielle oder von Vercel empfohlene** Beispiele für Rate Limiting beim AI Chatbot oder AI SDK?
- **Erwartung:** Konkrete Libs (mit Links), kurze Code-Snippets oder Repo-Links (Next.js 14+ App Router), und Empfehlung: z. B. „30 Requests/Minute pro IP für `/api/chat` mit Upstash“.

---

### 2. Anti-Spam & Token-Missbrauch (Chat/LLM)

- **Was:** Schutz vor Spam (viele kurze Nachrichten), Token-Überlastung (extrem lange Inputs), Wiederholungs-Missbrauch (gleiche Frage in Schleife).
- **Fragen:**
  - **Token-Limits:** Wie begrenzt man **Eingabe-Token** (User-Nachricht) und **Ausgabe-Token** (Model-Response) in der Vercel AI SDK / OpenAI/Anthropic-Integration? Wo konfigurieren (z. B. `maxTokens`, `maxInputTokens`)?
  - **Spam-Erkennung:** Gibt es **Libraries oder Patterns** für Next.js/Node (z. B. gleiche Nachricht N-mal in X Sekunden, oder Blacklist von Phrasen)? Kommerziell nutzbar (MIT/Apache).
  - **Kostenkontrolle:** Best Practices, um **Runaway-Kosten** durch Missbrauch zu begrenzen (pro User/IP Limits, Circuit Breaker)?
  - Wird **Bot-Protection** (z. B. reine Bot-Requests erkennen) in Kombination mit Next.js oder Vercel empfohlen? Wenn ja, welche Dienste/Repos (z. B. reCAPTCHA, Turnstile, oder nur Rate Limit)?
- **Erwartung:** Konkrete Optionen (SDK-Parameter, Libs, Repos), kurze Empfehlung für „kleine Marketing-Website mit Chat“.

---

### 3. DSGVO & Cookie-Consent-Integration (Vercel AI Chatbot)

- **Was:** Chat nur aktivieren/anzeigen oder Chat-Requests nur erlauben, wenn der Nutzer **Cookie-Consent** (z. B. „Analyse“ oder „Notwendige“) erteilt hat. Best Practices für Datenschutz (Speicherdauer, Zweck, Logging).
- **Fragen:**
  - **react-cookie-manager** (oder ähnliche Consent-Banner): Wie prüft man **clientseitig** in einer Next.js-App, ob der User zugestimmt hat, **bevor** der Chat sichtbar ist oder eine Nachricht abgeschickt wird? (z. B. Cookie-Wert lesen, Context/Provider.)
  - **Serverseitig:** Soll die **API-Route** `/api/chat` Consent prüfen? Wenn ja: Wie (Cookie lesen in Route Handler)? Oder reicht „Chat-UI nur bei Consent anzeigen“ und keine personenbezogenen Logs?
  - **Logging & Speicherdauer:** Empfehlungen für **anonymisierte oder gar keine** Chat-Logs; **TTL** (z. B. 7 Tage); wo in Vercel (Edge, Serverless) speichern, wenn überhaupt?
  - Gibt es **offizielle Vercel- oder AI-SDK-Docs** zu Privacy/Compliance (EU/DSGVO) für den AI Chatbot?
- **Erwartung:** Klare Option A/B (nur UI-Gate vs. API-Gate), Code-Idee (z. B. `getConsent()` vor `useChat`), und Hinweise für Datenschutz-Seite (Zweck, Dauer, Rechtsgrundlage).

---

### 4. Optional: Weitere Lücken

- **Idempotency / Duplikate:** Verhindern, dass dieselbe Nachricht durch Doppelklick zweimal gesendet wird (Client oder API)?
- **Timeout / Lange Antworten:** Best Practice für **Streaming-Timeout** (z. B. Abbruch nach 60 s), damit keine hängenden Verbindungen.

Falls die Research-KI dazu schnell etwas Relevantes findet, 1–2 Sätze pro Punkt; sonst weglassen.

---

## Erwartetes Ergebnisformat

Pro Thema (1–4) bitte:

- **Kurze Antwort** (2–4 Sätze) mit Kernempfehlung
- **Konkrete Quellen:** Libs (npm, GitHub), Docs (Vercel, AI SDK, Upstash), Blogposts mit Code
- **Code-Snippet oder Repo-Link** (wenn vorhanden): z. B. „So bindest du @upstash/ratelimit in `app/api/chat/route.ts` ein“
- **Lücken bleiben:** Was bleibt trotzdem „selbst bauen“ (z. B. Spam-Heuristik)?

---

## Copy-Paste-Kernauftrag (für die Research-KI)

„Recherchiere die **Lücken beim Vercel AI Chatbot** (Next.js App Router, TypeScript) und liefere konkrete Implementierungsoptionen:

1. **Rate Limiting:** Best Practices und Libraries (z. B. Upstash Redis, @upstash/ratelimit) für die Chat-API-Route; wo einbauen (Middleware vs. route.ts), inkl. kurzer Code- oder Repo-Referenz.
2. **Anti-Spam & Token-Missbrauch:** Token-Limits in Vercel AI SDK/OpenAI; Spam-Erkennung/Cost-Control für Chat; empfohlene Libs oder Patterns (MIT/Apache).
3. **DSGVO & Cookie-Consent:** Integration mit Cookie-Consent (z. B. react-cookie-manager): Chat nur bei Consent anzeigen oder API prüfen; Logging/Speicherdauer/TTL; offizielle Privacy-Docs von Vercel/AI SDK.
4. Optional: Idempotency (Doppelklick), Streaming-Timeout.

Ziel: Kleine kommerzielle Marketing-Website (Berneby); konkrete, umsetzbare Empfehlungen mit Quellen und Code-Links.“

---

*Erstellt als Follow-up zur Chatbot-Repos-Recherche; Fokus auf Vercel AI Chatbot und Next.js App Router. Stand: Februar 2026.*
