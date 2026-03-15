# KI-Chat: Sicher & stabil – nur Website-Inhalte, keine Halluzinationen

Stand: 2026-03-15

## 1. Analyse des bisherigen Setups

### Aktueller Flow
- **API:** `app/api/chat/route.ts` (Next.js)
- **Modell:** Gemini 2.0 Flash (falls `GOOGLE_GENERATIVE_AI_API_KEY` / `GEMINI_API_KEY`), sonst GPT-4o-mini
- **Wissensbasis:** FAQ (HOME_MINI_FAQ + FAQ_ITEMS) + Ratgeber-Links (title, slug, description) aus `lib/chat/knowledge.ts`
- **Ohne LLM-Key:** Exaktes FAQ-Match (`matchFaqQuery`) oder generische Fallback-Antwort (kein Modellaufruf)
- **Mit LLM-Key:** Vollständiger Kontext (alle FAQ + Ratgeber) wird als **System-Prompt** an Gemini geschickt; Nutzerfrage in Messages

### Risiken (Halluzination)
- Der System-Prompt fordert zwar „Antworte ausschließlich auf Basis der folgenden Wissensbasis“, ist aber:
  - nicht strikt genug formuliert (kein klares „Wenn nicht im Kontext: nur Satz X“)
  - ohne explizites Verbot von Eigenwissen
- Das Modell kann bei unsicheren Themen trotzdem allgemeines Wissen oder Phantasie einstreuen.
- Es gibt keine Nachprüfung, ob die Antwort tatsächlich aus dem Kontext stammt.

---

## 2. Mögliche Lösungen (Recherche)

### A) Strikter System-Prompt (Prompt Engineering)
- **Regel:** „Antworte NUR mit Informationen aus dem folgenden Kontext. Nutze kein externes Wissen. Wenn die Antwort nicht im Kontext steht, antworte ausschließlich mit diesem Satz: [exakter Fallback-Satz].“
- **Kontext klar abgrenzen:** z. B. `--- BEGIN CONTEXT ---` / `--- END CONTEXT ---` und FAQ/Ratgeber klar beschriftet.
- **Quelle:** Best Practice RAG (z. B. Milvus, BuildRag): explizites „say I don’t know“ / ein einziger erlaubter Fallback-Satz reduziert Halluzinationen.

### B) FAQ-Match vor LLM (Deterministischer Pfad)
- **Idee:** Wenn `matchFaqQuery(userText)` einen Treffer liefert, **ohne LLM** genau diese FAQ-Antwort zurückgeben (wie bereits beim Betrieb ohne API-Key).
- **Vorteil:** Für alle getroffenen Fragen: 0 % Halluzination, geringere Latenz und Kosten.
- **Erweiterung:** Optional „weiches“ Match (z. B. Ähnlichkeit über Embeddings) nur für Anzeige; Antwort-Pfad bleibt bei starkem Match deterministisch.

### C) Temperature auf 0 setzen
- **Idee:** `temperature: 0` (oder sehr niedrig) bei `streamText`, damit das Modell weniger „kreativ“ und konsistenter antwortet.
- **Vorteil:** Weniger Zufallsantworten, bessere Reproduzierbarkeit.

### D) Grounding mit Google Search (nicht gewünscht)
- **Gemini:** Bietet „Grounding with Google Search“ (Web-Suche, Zitate). Das würde externe Quellen einbeziehen – hier explizit **nicht** gewollt, da nur Website-Inhalte erlaubt sind.

### E) RAG mit Vektor-Suche + striktem Prompt (später)
- **Idee:** Nur die Top-K passenden Chunks aus einer Vektordatenbank als Kontext übergeben, plus strikter Prompt „nur aus diesem Kontext antworten; sonst [Fallback-Satz]“.
- **Vorteil:** Weniger Kontext → weniger Risiko, dass das Modell „durchrauscht“ und Eigenwissen nutzt. Aufwand: Embeddings, Index, Retrieval.

### F) Zwei-Phasen-Check (optional, höherer Aufwand)
- **Idee:** Nach der Modell-Antwort prüfen, ob sie im Kontext begründet ist (z. B. zweiter LLM-Call „Ist diese Aussage im Kontext belegt?“ oder Heuristik). Bei „nein“ → Fallback-Satz anzeigen.
- **Nachteil:** Latenz und Kosten steigen.

---

## 3. Umgesetzte Maßnahmen (Code)

- **Strikter System-Prompt:** Ein einziger erlaubter Fallback-Satz; klare Anweisung „Nur aus dem Kontext; kein Eigenwissen“; Kontext in `--- FAQ ---` / `--- Ratgeber ---` mit klaren Bezeichnern.
- **FAQ-Match vor LLM:** Wenn ein FAQ-Match existiert, wird **ohne LLM** die getroffene FAQ-Antwort gestreamt (stabil, keine Halluzination für diese Fragen).
- **Temperature:** `temperature: 0` (bzw. vom Provider unterstützt) für Gemini/OpenAI bei `streamText`.
- **Konstante Fallback-Antwort:** Ein zentraler Satz in `lib/chat/constants.ts`, im Prompt referenziert und bei „kein LLM“ / kein Match genutzt.

---

## 4. Warum antwortet der Chat nur mit dem Fallback-Satz?

Wenn **immer** der Satz „Dazu habe ich leider keine passende Antwort…“ kommt, prüfen:

1. **API-Key gesetzt?** Ohne `GOOGLE_GENERATIVE_AI_API_KEY` oder `GEMINI_API_KEY` (in `.env.local` oder Vercel) wird das LLM nie aufgerufen. Dann gibt es nur FAQ-Match oder Fallback. → Key in der Umgebung setzen, Server/Dev neu starten.
2. **FAQ-Match:** Mit der erweiterten Logik (exakt/Teilstring + Wort-Überlappung) treffen mehr Formulierungen eine FAQ; nur bei echtem Nicht-Treffer und ohne API-Key kommt der Fallback.

## 5. Weitere Empfehlungen

- **Monitoring:** Logging von „Fallback verwendet“ vs. „LLM-Antwort“ (ohne Nutzerinhalte) für Stabilitäts-Analyse.
- **Später:** Bei wachsendem Content optional RAG mit Embeddings + striktem „nur aus Kontext“-Prompt und gleichem Fallback-Satz.
- **CSP/Netzwerk:** Bereits Rate-Limit, Idempotenz, Input-Normalisierung und CORS – beibehalten.
