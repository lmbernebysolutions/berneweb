# API Contract Audit (UI → `/api/*`)

Ziel: Alle vom Frontend erwarteten API-Endpunkte inventarisieren, damit Production Deploy nicht durch fehlende Routes bricht.

Stand: 2026-03-15

## Ergebnis (aktueller Stand)
- `app/api/*` Routes sind vorhanden:
  - `app/api/contact/route.ts` (POST)
  - `app/api/chat/route.ts` (POST + OPTIONS)
  - `app/api/health/route.ts` (GET)

## Gefundene UI-Aufrufe / Contracts

### `POST /api/contact`
- **Caller**: `components/sections/ContactForm.tsx`
- **Transport**: `fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(...) })`
- **Payload (JSON)**:
  - `name` (string, required)
  - `email` (string, required)
  - `phone` (string | undefined, optional)
  - `message` (string, required)
- **UI-Erwartung**:
  - `res.ok` → UI zeigt Success-State
  - sonst → Error-State
- **Must-Checks**:
  - Route existiert als `app/api/contact/route.ts` (ist vorhanden)
  - Validierung + Spam/Rate-limit Strategie (optional Upstash vorhanden)
  - Fehlercodes/Antwortformat sind konsistent (z.B. `{ success: boolean, ... }`), ohne sensitive Infos
  - **Secrets/Env**: `NOTION_API_TOKEN` + `NOTION_CONTACT_DATABASE_ID` müssen in Vercel gesetzt sein

### `POST /api/chat`
- **Caller**: `components/sections/chat-section.tsx`
- **Transport**: `DefaultChatTransport({ api: "/api/chat", body: { mode: "faq" } })` + `useChat(...)`
- **UI-Erwartung**:
  - Streaming/Submit Status (`submitted`, `streaming`)
  - Nachrichten werden als `parts` erwartet (Text-Parts werden extrahiert)
- **Must-Checks**:
  - Route existiert als `app/api/chat/route.ts` (ist vorhanden) und ist kompatibel mit `@ai-sdk/react` / `ai` Transport
  - Consent-Gating passt (UI blockt ohne Consent; server muss trotzdem robust sein)
  - Rate limit / abuse protection (Upstash deps vorhanden)
  - **Secrets/Env**:
    - optional `GOOGLE_GENERATIVE_AI_API_KEY` oder `GEMINI_API_KEY` (LLM aktiv)
    - optional `OPENAI_API_KEY` (Fallback-Modell)
    - optional `UPSTASH_REDIS_REST_URL` + `UPSTASH_REDIS_REST_TOKEN` (Rate-limit + Idempotency)
    - optional `VERCEL_URL` wird für restriktives CORS genutzt (Vercel setzt das i.d.R. selbst)

### `GET /api/health`
- **Caller**: nicht UI-gebunden (Monitoring / Liveness)
- **Route**: `app/api/health/route.ts`
- **Erwartung**: `200` + `{ status: "ok" }`

## Gap-Checkliste (zum Abarbeiten)
- Für jeden gefundenen Endpoint:
  - **Existenz**: Route vorhanden, Methods korrekt
  - **Validation**: Eingaben schema-validiert (z.B. zod ist vorhanden)
  - **Errors**: definierte Statuscodes + keine Secret-Leaks
  - **Observability**: Logging/Tracing in Vercel (ohne PII-Leaks)
  - **Security**: Rate limiting, CORS/Headers, CSRF-Überlegung (falls browser forms)

