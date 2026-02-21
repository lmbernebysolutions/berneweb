# Research-Prompt: Chatbot für FAQ + „Ihr Match“ (kommerziell nutzbare GitHub-Repos)

**Anwendung:** Diesen Prompt an deine Research-KI senden, um passende Open-Source- oder kommerziell nutzbare GitHub-Repositories zu finden.

---

## Kontext: Berneby-Website

- **Stack:** Next.js (App Router), React, TypeScript, pnpm
- **Design:** Dunkles Theme (brand-navy, brand-cyan, weiße Texte), TechCorners, SectionCard, kein „AI-Slop“
- **Relevante Sektionen heute:**
  - **FAQ:** `FaqAccordion` mit vordefinierten Fragen/Antworten (z. B. `HOME_MINI_FAQ`, `FAQ_ITEMS` aus `lib/constants.ts`)
  - **Ihr Match:** `MatchWizardSection` – Multi-Step-Wizard mit festen Fragen und regelbasierter Match-Logik (`lib/wizard-config.ts`), Ergebnis z. B. „Geselle“, „Meisterbetrieb“, „Marktführer“, „Digitaler Hausmeister“
- **Cookie-Management:** `react-cookie-manager` (CookieProviders), Kategorien: Notwendige, Analyse, Social, Werbung; DSGVO-konform
- **Ratgeber:** Statische Artikel in `lib/content/ratgeber.ts` (Topic Clusters, Pillar Pages) – Bot soll auf konkrete Ratgeber-Artikel verlinken können

---

## Zielvorhaben

**Eine gemeinsame Chatbot-Sektion** ersetzt die getrennten Bereiche „FAQ“ und „Ihr Match“:

1. **Zwei Modi im selben Chat:**
   - **FAQ-Modus:** Vorgeschlagene Fragen (die bisherigen FAQ-Fragen) + Möglichkeit für **offene Fragen** (Freitext).
   - **Ihr-Match-Modus:** Geführter Dialog mit spezifischen Fragen an den Kunden; am Ende sagt der Bot: **„Dieses Ergebnis habe ich für dich“** (z. B. Paket-Empfehlung + CTA).

2. **Technische Anforderungen:**
   - **Keine Halluzination:** Alle Antworten des Bots müssen aus einer **Wissensbasis** (Knowledge Base) kommen – RAG, Vector Search oder strikte Retrieval-only-Logik. Keine freie Generierung von Fakten.
   - **Einfaches UI:** Nur Chat (Nachrichtenverlauf + Eingabe). **Keine** Toolbar, **keine** Upload-Funktionen, **keine** zusätzlichen Plugins im sichtbaren UI.
   - **Design:** Deutlich an die bestehende Website anpassbar (Farben, Typo, TechCorners-ähnliche Ästhetik).
   - **Rate Limiting & Missbrauchsschutz:** Klare Vorgaben zu Request-Limits, Token-Limits, Spam-Erkennung – idealerweise im Repo dokumentiert oder implementiert.
   - **DSGVO:**  
     - Einbindung in das **Cookie-Management**: Bot/Chat nur aktiv oder sichtbar, wenn Nutzer z. B. „Notwendige“ oder „Analyse“ akzeptiert hat (je nachdem, ob Chat-Logs analysiert werden).  
     - Keine Halluzination = weniger Risiko falscher Aussagen; Transparenz über Verarbeitung (Datenschutz-Seite).  
     - Best Practices: Speicherdauer, Zweck, optional Opt-in für Analyse des Chats.
   - **Sprache/Thema:** Bot sprachlich an **Erzgebirge**-Theme anpassbar (lokaler Ton, ggf. Hinweise auf „Erzgebirgskreis“, „vor Ort“ etc.).
   - **Ratgeber-Anbindung:** Bot kann auf **spezifische Ratgeber-Inhalte** verweisen und Links zu `/ratgeber/[slug]` ausspielen („Weiterlesen: …“).

3. **Nutzung:** Eigene Website (Berneby Solutions), **kommerziell nutzbar** – daher Fokus auf Lizenzen wie MIT, Apache 2.0, BSD; GPL nur wenn klar abgrenzbar (z. B. nur Client-Komponenten).

---

## Suchauftrag für die Research-KI

Suche nach **kommerziell nutzbaren (z. B. MIT, Apache 2.0, BSD) GitHub-Repositories**, die folgende Anforderungen **möglichst gut abdecken**:

### Must-have (Priorität 1)

- **RAG / Knowledge-Base-only / No-Hallucination:**  
  Chatbot oder Framework, bei dem Antworten **ausschließlich** aus einer konfigurierbaren Wissensbasis (Dokumente, FAQ, Vektordatenbank) kommen. Keine freie Fakten-Generierung. Beispiele: RAG über Embeddings + Vector Store, strikte Retrieval-basierte Antworten, FAQ-Matching mit vordefinierten Antworten.
- **Next.js oder React** integrierbar (App Router oder Pages, TypeScript erwünscht).
- **Einfaches Chat-UI:** Nachrichtenliste + Eingabefeld; **ohne** Toolbar, Datei-Upload-UI, Plugin-Leiste (oder diese klar entfernbar/deaktivierbar).
- **Rate Limiting / Anti-Spam / Token-Limits:** Entweder im Repo vorgesehen, dokumentiert oder leicht erweiterbar (z. B. Middleware, API-Route-Limits).

### Should-have (Priorität 2)

- **Zwei Modi oder erweiterbar:**  
  Entweder bereits Konzept für „FAQ-Modus“ (vorgeschlagene Fragen + Freitext) und „Wizard-/Match-Modus“ (geführte Fragen bis Ergebnis) – oder gut erweiterbar durch eigene Logik (z. B. Conversation Flows, Slots, oder feste Fragebögen).
- **DSGVO / Consent:** Dokumentation oder Hooks für Consent (z. B. Cookie-Banner-Integration), Speicherdauer, Zweckangabe.
- **Deutsche Sprache** unterstützt oder sprachneutral (eigene Texte/Prompts).

### Nice-to-have (Priorität 3)

- **Referenzen auf interne Links** (z. B. Ratgeber-URLs) in Antworten – entweder eingebaut oder durch Wissensbasis-Snippets steuerbar.
- **Lokales/Regional-Feeling** (z. B. Konfiguration für „Erzgebirge“, lokale Begriffe) – sprachlich anpassbar.
- **Bereits Styling/Theming** (z. B. CSS-Variablen, Tailwind) für Anpassung an dunkles Brand-Design.

### Was nicht gesucht wird

- Reine „Conversational Forms“ **ohne** Wissensbasis/RAG (z. B. nur Formular-Wizard ohne KI/Retrieval).
- Repos, die **ausschließlich** auf freie LLM-Antworten setzen ohne Retrieval/Knowledge Base (Halluzinationsrisiko).
- Nur WordPress-/PHP-Lösungen ohne React/Next.js-Integration.
- Repos mit **reiner GPL** ohne klare Nutzbarkeit in proprietärer kommerzieller Website (wenn unsicher, bitte mit Lizenzhinweis auflisten).

---

## Erwartetes Ergebnisformat (für die Research-KI)

Pro Repo bitte mindestens:

- **Name, GitHub-URL, Lizenz, Stars/Relevanz**
- **Kurzbeschreibung:** Was macht das Repo? (RAG, FAQ-Bot, Wizard, etc.)
- **Next.js/React:** Ja/Nein, ggf. mit Verweis auf Docs oder Beispiel (z. B. `examples/next-app`).
- **Knowledge-Base / No-Hallucination:** Wie wird sichergestellt, dass nur Wissensbasis-Inhalte ausgegeben werden?
- **Rate Limiting / Anti-Spam:** Vorhanden? Wo (Server, Edge, Middleware)?
- **DSGVO/Consent:** Erwähnung in Docs oder Code? Cookie/Consent-Integration?
- **UI:** Einfaches Chat (ohne Toolbar/Upload)? Anpassbarkeit (Theming)?
- **Zwei Modi (FAQ + Match-Wizard):** Direkt unterstützt oder gut erweiterbar?
- **Empfehlung:** Kurz begründen, warum das Repo für „Chatbot ersetzt FAQ + Ihr Match, Wissensbasis-only, DSGVO, Next.js“ geeignet ist oder wo Lücken bestehen.

---

## Suchbegriffe / Keywords (optional für die Research-KI)

- `RAG chatbot Next.js`
- `knowledge base chatbot no hallucination`
- `FAQ chatbot React vector search`
- `conversational AI retrieval-only`
- `Next.js chatbot rate limit`
- `GDPR chatbot consent`
- `open source chatbot MIT Apache`
- `conversational form wizard result`
- `chatbot cookie consent integration`

---

## Zusammenfassung für Copy-Paste (Kernauftrag)

**Kernauftrag:**  
„Suche kommerziell nutzbare (MIT/Apache/BSD) GitHub-Repositories für einen **Next.js Chatbot**, der (1) **nur aus einer Wissensbasis antwortet** (RAG/Retrieval, keine Halluzination), (2) ein **einfaches Chat-UI** ohne Toolbar/Upload hat, (3) **Rate Limiting und Anti-Spam** unterstützt oder erweiterbar ist, (4) **DSGVO-tauglich** (Cookie/Consent-Integration) ist und (5) idealerweise **zwei Modi** abbilden kann: FAQ (vorgeschlagene Fragen + offene Fragen) und einen geführten **Wizard-Modus** bis zu einem festen Ergebnis (‚Ihr Match‘). Ziel: Ersatz von FAQ-Accordion und Match-Wizard auf einer Marketing-Website mit einheitlicher Chat-Sektion.“

---

*Erstellt aus der Analyse der Berneby-Website (FAQ, MatchWizardSection, CookieProviders, Ratgeber, Design-System). Stand: Februar 2026.*
