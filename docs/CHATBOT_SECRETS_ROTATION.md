# Rotationskonzept: Secrets für den Chatbot

## Verwendete Secrets

| Secret | Verwendung | Speicherort |
|--------|------------|-------------|
| GOOGLE_GENERATIVE_AI_API_KEY / GEMINI_API_KEY | Gemini-LLM (FAQ) | Vercel Environment Variables |
| OPENAI_API_KEY | Fallback-LLM (FAQ) | Vercel Environment Variables |
| UPSTASH_REDIS_REST_URL | Upstash Redis | Vercel Environment Variables |
| UPSTASH_REDIS_REST_TOKEN | Upstash Redis | Vercel Environment Variables |

Alle Keys nur serverseitig; nicht an Client, nicht im Klartext geloggt.

## Rotation

- **Intervall:** Mindestens jährlich; bei Verdacht sofort
- **Vorgehen:** Neuen Key beim Anbieter erzeugen, in Vercel unter gleichem Variablennamen eintragen, Deployment; alten Key beim Anbieter deaktivieren

## Sperrung bei Kompromittierung

1. Key im Anbieter-Dashboard deaktivieren
2. Neuen Key erzeugen und in Vercel setzen
3. Vorfall in CHATBOT_INCIDENT_RESPONSE.md dokumentieren
