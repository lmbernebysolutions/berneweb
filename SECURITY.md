# Security – Berneby Website

Kurze Übersicht der umgesetzten Sicherheitsmaßnahmen und Regeln für zukünftige Änderungen.

## Security-Header

Die Anwendung setzt folgende HTTP-Response-Header (konfiguriert in `next.config.ts`):

| Header | Wert | Zweck |
|--------|------|--------|
| **X-Frame-Options** | `DENY` | Schutz vor Clickjacking (Seite darf nicht in iframes eingebettet werden). |
| **X-Content-Type-Options** | `nosniff` | Verhindert MIME-Sniffing. |
| **X-XSS-Protection** | `1; mode=block` | XSS-Filter des Browsers aktiviert. |
| **Referrer-Policy** | `strict-origin-when-cross-origin` | Begrenzt, welche Referrer-Informationen bei Querrequests gesendet werden. |
| **Permissions-Policy** | `geolocation=(), microphone=(), camera=()` | Deaktiviert Standort, Mikrofon und Kamera. |
| **Strict-Transport-Security** | `max-age=31536000; includeSubDomains; preload` | Erzwingt HTTPS (nur sinnvoll, wenn die Seite dauerhaft über HTTPS ausgeliefert wird, z. B. auf Vercel). |
| **Content-Security-Policy** | Siehe `next.config.ts` | CSP inkl. `frame-src` für OpenStreetMap auf der Kontaktseite. |

**Prüfung:** Nach Deploy z. B. [SecurityHeaders.com](https://securityheaders.com) oder Browser DevTools → Network → Response Headers.

---

## Externe Links

Alle Links mit `target="_blank"` **müssen** `rel="noopener noreferrer"` setzen (Schutz vor Tab-Napping und unnötiger Referrer-Weitergabe).

- Bei neuen externen Links immer `rel="noopener noreferrer"` ergänzen.
- Regelmäßig prüfen: z. B. `grep -r 'target="_blank"' --include='*.tsx' --include='*.ts' .` und sicherstellen, dass jeweils `rel="noopener noreferrer"` gesetzt ist.

---

## Kontaktformular / zukünftiger Backend-Endpoint

Sobald ein **echter** Endpoint für das Kontaktformular eingeführt wird, gelten folgende Regeln:

- **Validierung:** Server-seitige Validierung aller Eingaben (z. B. mit Zod): Längen und Formate für Name, E-Mail, Nachricht.
- **Rate-Limiting:** Begrenzung der Anfragen pro IP/Identifier (z. B. Vercel KV oder Upstash).
- **CSRF:** Next.js Server Actions bringen CSRF-Schutz; bei eigener API-Route: SameSite-Cookies oder Token berücksichtigen.
- **Keine PII in Logs:** Keine sensiblen Formulardaten (E-Mail, Nachrichtentext) in Server- oder Client-Logs; keine unnötige Weitergabe an Dritte.

---

## Abhängigkeiten

- **Audit:** `pnpm run audit` (bricht bei HIGH/CRITICAL ab). Optional: `pnpm run audit:fix`.
- Bekannte Schwachstellen in Dependencies sollten behoben oder dokumentiert werden; transitive Abhängigkeiten ggf. durch Updates der direkten Pakete bereinigen.

---

## Source Maps

In Production werden keine Browser-Source-Maps ausgeliefert (`productionBrowserSourceMaps: false` in `next.config.ts`), um Quellcode nicht preiszugeben.

---

## DSGVO / Cookie & Analytics

- **Cookie-Banner:** react-cookie-manager (CookieManager) im Root-Layout; Einwilligung nur bei Opt-in (Analytics optional).
- **Google Analytics:** GA4 wird nur geladen, wenn der Nutzer der Kategorie „Analyse“ zugestimmt hat; IP-Anonymisierung aktiv (`lib/ga.ts`). Umgebungsvariable: `NEXT_PUBLIC_GA_MEASUREMENT_ID`.
- **Datenschutzerklärung:** Enthält Abschnitte zu Cookies/Einwilligung, Google Analytics (nur bei Consent, IP-Anonymisierung, AVV-Verweis), Widerruf über Cookie-Einstellungen.

### DSGVO-Verifikation (nach Deploy)

- [ ] **Webbkoll:** [webbkoll.se](https://webbkoll.se) oder [webbkoll.de](https://webbkoll.de) – Bewertung grün (keine unnötigen Third-Party-Requests vor Consent).
- [ ] **Cookie-Banner:** Erscheint (ggf. nur in regulierten Regionen bei aktivierter Geolocation); Opt-out „Nur notwendige“ führt zu keinem GA-Load.
- [ ] **Opt-in:** „Alle akzeptieren“ oder nur „Analyse“ aktivieren → GA4 empfängt Hits; IP-Anonymisierung in GA-Konfiguration gesetzt.
- [ ] **Floating-Button:** Cookie-Einstellungen öffnen, Analyse deaktivieren, speichern → keine weiteren Analytics-Hits (Consent denied).
- [ ] **Datenschutzerklärung:** Enthält Cookiekit, GA nur bei Einwilligung, IP-Anonymisierung, AVV-Verweis, Widerspruchsmöglichkeit.
