# Env Vars Manifest (Vercel)

Ziel: zentrale Liste aller Umgebungsvariablen, inkl. Scope (server/client) und Environment (Production/Preview/Development).

Stand: 2026-03-15

## Regeln
- **Client-bundled**: Nur Variablen mit `NEXT_PUBLIC_` Prefix dürfen im Browser landen.
- **Server-only**: Alles andere muss ausschließlich in Server Runtime genutzt werden (Route Handlers, Server Components, etc.).
- **Vercel**: Variablen getrennt setzen für **Production**, **Preview**, **Development**.
- **Keine Secrets committen**: `.env.local` ist nur lokal; `.gitignore` ignoriert `.env*`.

## Inventar (aus `.env.local` + Code-Kontext)

### Notion (Kontaktformular / Lead Intake) — server-only
- `NOTION_API_TOKEN`
  - **Typ**: Secret
  - **Scope**: Server-only
  - **Zweck**: Auth für Notion API
- `NOTION_CONTACT_DATABASE_ID`
  - **Typ**: Identifier (trotzdem vertraulich behandeln)
  - **Scope**: Server-only
  - **Zweck**: Ziel-DB für Kontaktanfragen

### Google Analytics 4 — client
- `NEXT_PUBLIC_GA_MEASUREMENT_ID`
  - **Typ**: Public (nicht Secret)
  - **Scope**: Client
  - **Zweck**: GA4 Measurement ID
  - **Hinweis**: Muss mit Consent-/Cookie-Flow harmonieren

### KI-Chat (Gemini) — server-only
- `GOOGLE_GENERATIVE_AI_API_KEY` (oder)
- `GEMINI_API_KEY`
  - **Typ**: Secret
  - **Scope**: Server-only
  - **Zweck**: Auth für Gemini/Generative AI
  - **Hinweis**: Nur nötig, wenn `/api/chat` produktiv aktiv ist

### KI-Chat (OpenAI Fallback) — server-only
- `OPENAI_API_KEY`
  - **Typ**: Secret
  - **Scope**: Server-only
  - **Zweck**: Fallback-Modell in `app/api/chat/route.ts` (wenn kein Gemini Key gesetzt ist)

### Upstash Redis (Rate limiting / Abuse protection) — server-only
- `UPSTASH_REDIS_REST_URL`
  - **Typ**: Secret/Endpoint
  - **Scope**: Server-only
- `UPSTASH_REDIS_REST_TOKEN`
  - **Typ**: Secret
  - **Scope**: Server-only
  - **Hinweis**: Dependencies sind vorhanden (`@upstash/*`), Einsatz ist als Security/Abuse-Maßnahme naheliegend

### Build-time toggles (optional)
- `ANALYZE`
  - **Typ**: Build toggle
  - **Scope**: Build/CI
  - **Zweck**: Bundle analyzer aktivieren (`next.config.ts`)

### Platform (Vercel) — runtime
- `VERCEL_URL`
  - **Typ**: Platform-provided (kein Secret)
  - **Scope**: Server-only
  - **Zweck**: restriktives CORS Matching in `app/api/chat/route.ts`
  - **Hinweis**: Wird auf Vercel automatisch gesetzt; lokal ggf. leer

## Offene Punkte (zur Verifikation)
- Prüfen, ob es zusätzlich verwendete Env Vars gibt (z.B. in `lib/` oder geplanten `app/api/*` Routes).
- Pro Endpoint definieren:
  - Welche Variablen zwingend sind
  - Welche Defaults erlaubt sind
  - Wie “fail fast” aussehen soll (z.B. bei fehlendem Secret)

