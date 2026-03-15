# Deployment Readiness Checklist (Vercel)

Diese Checkliste ist absichtlich **ohne konkrete Code-Änderungsanweisungen** formuliert. Sie beschreibt nur, **was** geprüft werden muss und **wann** ein Punkt als “erledigt” gilt.

Stand: 2026-03-15

## Must (Blocker vor Production)

### Build ist deterministisch & reproduzierbar
- **Check**: `pnpm` ist die Source-of-truth für Install/Build.
- **Akzeptanzkriterium**: Ein frischer Install + `next build` läuft ohne Fehler auf einem sauberen System/CI.

### Lockfile-Hygiene (nur ein Paketmanager)
- **Check**: Es existieren mehrere Lockfiles (`pnpm-lock.yaml` und `package-lock.json`) in `berneby-website/`.
- **Akzeptanzkriterium**: Für Deploy/CI ist klar definiert, welches Lockfile gilt (und das andere ist nicht mehr Teil des Deploy-Flows).

### Secrets & Env Vars sind production-sicher
- **Check**: `.env.local` enthält Secrets; `.gitignore` ignoriert `.env*` (inkl. `.env.local`).
- **Akzeptanzkriterium**: Keine Secrets in Git/Artifacts; Production nutzt ausschließlich **Vercel Environment Variables** (Prod/Preview/Dev getrennt).

### API-Contract erfüllt (UI → `/api/*`)
- **Check**: UI referenziert `/api/contact` (Kontaktformular) und `/api/chat` (ChatSection); Routes existieren als `app/api/*`.
- **Akzeptanzkriterium**: Endpoints liefern definierte Statuscodes/Responses (inkl. Error Cases), sind robust gegen Spam/Abuse und laufen ohne fehlende Env Vars.

### Security Headers & CSP verifiziert
- **Check**: Security Headers + CSP werden via `next.config.ts` gesetzt.
- **Akzeptanzkriterium**: Header passen zu Vercel/Next Runtime, und CSP ist mit allen genutzten Third-Parties kompatibel.
- **Risk Flag**: CSP enthält `'unsafe-eval'` (prüfen, ob nur Dev nötig oder in Prod vermeidbar).

### Client/Server Secret Boundaries
- **Check**: Nur `NEXT_PUBLIC_*` darf in den Client; server-secrets dürfen nicht in client bundles auftauchen.
- **Akzeptanzkriterium**: Keine Secret-Env-Vars werden in Client Components/Browser ausgeliefert.

## Should (stark empfohlen vor Production)

### SEO & Crawlability (Next App Router)
- **Check**: `metadata` ist vorhanden (`app/layout.tsx`), OG image referenziert `/og-image.png`. `app/robots.ts` und `app/sitemap.ts` sind vorhanden.
- **Akzeptanzkriterium**: Alle wichtigen Seiten haben korrekte Title/Description/Canonical, OG/Twitter Cards funktionieren.
- **Checkliste-Punkte**:
  - `app/sitemap.ts` korrekt (enthält alle relevanten statischen + dynamischen URLs)
  - `app/robots.ts` korrekt (inkl. Disallow für `/api/` und Sitemap URL)
  - `not-found.tsx` / `error.tsx` / `loading.tsx` für UX/Robustheit (falls gewünscht)

### Consent & Tracking (GA / Cookies)
- **Check**: GA/Tracking hängt an `NEXT_PUBLIC_*` und Consent-Flows (Cookie preferences).
- **Akzeptanzkriterium**: Tracking wird nur gemäß Consent geladen; keine Requests vor Opt-in (falls so vorgesehen).

### Observability / Betrieb
- **Check**: Fehler sind in Vercel Logs nachvollziehbar; Production-Debugging ist möglich ohne Secrets zu leaken.
- **Akzeptanzkriterium**: Es gibt einen definierten “Debug-Pfad” (Logs, Alerts, optional Error Tracking).

### CI Quality Gates (mindestens)
- **Check**: Lint + Test + Build laufen automatisch (Vercel Checks oder GitHub Actions).
- **Akzeptanzkriterium**: Production deployt nur bei grünem `lint/test/build`.

### Dependency-Risiken / Audits
- **Check**: `pnpm audit --audit-level=high` ist verfügbar.
- **Akzeptanzkriterium**: Keine High/Critical Findings ohne Mitigation/Upgrade Plan.

## Nice-to-have (nach Production oder parallel)

### Performance Budget & Bundle-Review
- **Check**: Bundle analyzer ist vorbereitet (`ANALYZE=true`).
- **Akzeptanzkriterium**: Route- und Bundle-Größen sind nachvollziehbar; große Assets sind begründet/optimiert.

### E2E Smoke Tests
- **Check**: Playwright ist installiert.
- **Akzeptanzkriterium**: Mindestens 1–3 Smoke-Flows (Home → Kontakt → Formular UI, Tech/Handwerk, Datenschutz/Impressum) laufen in Preview.

