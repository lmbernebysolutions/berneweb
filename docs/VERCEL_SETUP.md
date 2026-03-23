# Vercel-Deployment — Setup-Checkliste

Damit die Berneby-Website auf Vercel genauso funktioniert wie lokal, musst du folgende Schritte erledigen.

---

## 1. Projekt mit GitHub verbinden

1. [vercel.com](https://vercel.com) → **Add New** → **Project**
2. **Import Git Repository** → `lmbernebysolutions/berneweb` auswählen (oder per GitHub verbinden)
3. **Root Directory:** Wenn das Repo nur den Website-Code enthält (Root = `berneby-website`-Inhalt), Root auf **`.`** lassen. Wenn das Repo ein übergeordnetes Verzeichnis ist und die App in einem Unterordner liegt, **Root Directory** auf `berneby-website` setzen (falls ihr das Repo so strukturiert habt).
4. **Framework Preset:** Next.js (wird automatisch erkannt)
5. **Build Command:** `pnpm run build` (oder `npm run build`, je nachdem was ihr im Repo nutzt)
6. **Output Directory:** leer lassen (Next.js Standard: `.next`)

---

## 2. Umgebungsvariablen (Environment Variables)

In Vercel: **Project → Settings → Environment Variables**. Alle Werte für **Production** (und optional Preview) setzen.

| Variable | Beschreibung | Pflicht |
|----------|--------------|--------|
| `GEMINI_API_KEY` | Google-Gemini-API-Key für den KI-Chat (alternativ siehe unten) | Für Chat mit LLM: ja |
| `GOOGLE_GENERATIVE_AI_API_KEY` | Alternative zu `GEMINI_API_KEY`; das Chat-API nutzt: `GOOGLE_GENERATIVE_AI_API_KEY ?? GEMINI_API_KEY` | Einer von beiden für Chat mit LLM |
| `NOTION_API_TOKEN` | Token für das Notion-Kontaktformular (Kontaktanfragen) | Für Kontaktformular: ja |
| `NOTION_CONTACT_DATABASE_ID` | Notion-Datenbank-ID für Kontakt-Einträge | Für Kontaktformular: ja |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Google Analytics 4 Measurement ID (z. B. `G-XXXXXXXXXX`) | Optional (Analytics) |
| `UPSTASH_REDIS_REST_URL` | Upstash Redis REST URL (Rate-Limiting für Chat) | Optional (Rate-Limit) |
| `UPSTASH_REDIS_REST_TOKEN` | Upstash Redis REST Token | Optional (Rate-Limit) |

**Wichtig:**

- **Niemals** API-Keys oder Tokens ins Repo committen. Nur in Vercel (oder anderem Secret-Manager) eintragen.
- Für den **KI-Chat** reicht entweder `GEMINI_API_KEY` oder `GOOGLE_GENERATIVE_AI_API_KEY`. Beide können gesetzt sein; das API nutzt zuerst `GOOGLE_GENERATIVE_AI_API_KEY`.
- Ohne **Upstash Redis** funktioniert die Seite; das Chat-Rate-Limiting ist dann in-memory (bei Serverless weniger zuverlässig). Für Produktion empfohlen: Upstash konfigurieren.

---

## 3. Build-Einstellungen prüfen

- **Node.js Version:** In Vercel unter **Settings → General** kannst du die Node-Version setzen (z. B. **20.x**). Das Projekt nutzt Next.js 16; Node 18+ ist nötig.
- **Package Manager:** Wenn im Repo `pnpm-lock.yaml` existiert, wählt Vercel in der Regel automatisch **pnpm**. Sonst unter **Settings → General** **Override** auf `pnpm install` setzen.

---

## 4. Nach dem ersten Deploy

1. **Domain:** Unter **Settings → Domains** deine Domain eintragen (z. B. `www.berneby.de`).
2. **Prüfen:** Startseite, Kontaktformular, Cookie-Banner, Chat (nach Cookie-Zustimmung „KI-Chat / Chatbot“) und Karte auf der Kontaktseite (nach „Alle akzeptieren“) testen.
3. **Fehlermeldungen:** Bei 500-Fehlern in **Vercel → Deployments → [Deploy] → Logs / Functions** nachsehen; oft fehlen dann Umgebungsvariablen (z. B. Gemini- oder Notion-Keys).

---

## 5. Kurz-Checkliste

- [ ] Vercel-Projekt mit GitHub-Repo `berneweb` verbunden
- [ ] Root Directory korrekt (`.` oder `berneby-website`)
- [ ] `GEMINI_API_KEY` oder `GOOGLE_GENERATIVE_AI_API_KEY` gesetzt (für Chat)
- [ ] `NOTION_API_TOKEN` und `NOTION_CONTACT_DATABASE_ID` gesetzt (für Kontaktformular)
- [ ] Optional: `NEXT_PUBLIC_GA_MEASUREMENT_ID`, `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`
- [ ] Build läuft durch (`pnpm run build` / `npm run build`)
- [ ] Domain konfiguriert und Website getestet
