# Betriebsdokumentation: Chatbot (FAQ & Ihr Match)

Standard-Operationen, Wartung und Verhalten bei Ausfällen.

## Umgebungen

- **Entwicklung:** Lokal (z. B. `pnpm dev`); `.env.local` mit Test-Keys, kein produktives Redis erforderlich (Rate-Limit und Idempotenz dann deaktiviert).
- **Produktion:** Vercel; Umgebungsvariablen in Vercel gesetzt (Gemini/OpenAI, Upstash). Keine gemeinsame Nutzung von Secrets zwischen Umgebungen.

## Wartung

- **Abhängigkeiten:** Regelmäßig `pnpm update`, `pnpm audit`; Sicherheitsupdates zeitnah einspielen.
- **Wissensbasis / Prompts:** Änderungen an FAQ, Ratgeber-Links und Wizard-Konfiguration über Code (Git); siehe CHATBOT_PROMPT_WISSENSBASIS.md für Freigabe und Versionierung.
- **Konfiguration:** Limits und Timeouts in `lib/chat/constants.ts`; bei Anpassung Build und ggf. Tests ausführen.

## Verhalten bei Ausfällen

- **LLM nicht erreichbar:** API liefert Fallback-Antwort aus lokaler FAQ-Suche (oder generische Meldung); Nutzer erhält eine Antwort ohne Stream. Kein Totalausfall.
- **Redis (Upstash) nicht erreichbar:** Rate-Limiting und Idempotenz greifen nicht (Route fährt ohne Redis weiter). Optional: Monitoring/Alarm bei Redis-Fehlern; bei anhaltendem Ausfall Abwägung, ob temporär Drosselung auf App-Ebene nötig ist.
- **Timeout (60 s):** Stream wird abgebrochen; Nutzer erhält 504 und verständliche Fehlermeldung. Kein manueller Eingriff nötig; bei gehäuften Timeouts Konfiguration (STREAM_TIMEOUT_MS) oder LLM-Anbieter prüfen.

## Rollback

- **Code/Feature:** Über Vercel auf vorheriges Deployment zurücksetzen (Dashboard oder CLI). Git-Tags/Releases für Nachvollziehbarkeit nutzen.
- **Konfiguration/Secrets:** Alte Werte in Vercel wiederherstellen und erneut deployen.

## Monitoring und Logs

- Strukturierte Logs (ohne personenbezogene Daten): Ereignisse wie `rate_limit`, `spam`, `timeout`, `error`, `validation_error` (siehe Route). Über Vercel Logs oder angebundenes Monitoring sichtbar; Alarmierung bei Bedarf konfigurieren.
- Keine Chat-Inhalte und keine IP in Logs; nur technische Kennzeichen (z. B. „ip: present“) wo nötig.

## Backup

- Wissensbasis und Wizard-Konfiguration liegen im Git-Repository; Backup durch normale Repository-Backups bzw. Hosting (z. B. GitHub). Keine separate Chat-spezifische Persistenz, die gesichert werden müsste.
