/**
 * Chat – Limits und Konfiguration für FAQ + Match-Chatbot.
 * Rate Limiting, Token- und Input-Limits, Timeout.
 */

/** Maximale Zeichen für User-Eingabe (vor Sendung kürzen). */
export const MAX_INPUT_CHARS = 4000;

/** Maximale Output-Tokens für LLM-Antworten (FAQ-Modus). */
export const MAX_OUTPUT_TOKENS = 2000;

/** Rate-Limit-Fenster (Upstash: "1 m" = 1 Minute). */
export const RATE_LIMIT_WINDOW = "1 m";

/** Maximale Requests pro Fenster pro IP. */
export const RATE_LIMIT_REQUESTS = 30;

/** Stream-Timeout in Millisekunden (60 s). Dokumentierte max. Laufzeit pro Anfrage. */
export const STREAM_TIMEOUT_MS = 60_000;

/** Idempotency-Key TTL in Sekunden (5 Min). */
export const IDEMPOTENCY_TTL_SECONDS = 300;

/** Maximale Anzahl Nachrichten pro Request (Konversationslängen-Limit). Nur die letzten N werden an den LLM übergeben. */
export const MAX_MESSAGES_PER_REQUEST = 50;

/** Mindestlänge User-Input (Zeichen) – kürzer = ignorieren/Fehler. */
export const MIN_INPUT_CHARS = 2;

/**
 * Exakter Satz, den das Modell antworten muss, wenn die Frage nicht aus der Wissensbasis
 * beantwortet werden kann. Wird im System-Prompt referenziert (Anti-Halluzination).
 */
export const FALLBACK_ANSWER_EXACT =
  "Dazu habe ich leider keine passende Antwort in unserer Wissensbasis. Stellen Sie gern eine andere Frage oder schauen Sie in unseren Ratgeber-Artikeln.";
