# KI-gestütztes Wizard-Formular – Recherche & Empfehlungen

**Ziel:** Das klassische Kontaktformular durch einen **KI-gestützten Wizard** ersetzen, der Kunden führt und am Ende den **besten Match** (z. B. Handwerks-Paket, Digitaler Hausmeister, individuelles Angebot) ausspielt. Daraus einen **USP** für die Berneby-Website machen.

**Aktuelle Nutzung:** `ContactForm` wird verwendet auf:
- `/kontakt`
- `/standorte/[ort]` (z. B. `/standorte/aue-bad-schlema`)

---

## 1. Empfohlene GitHub-Repos & Lösungen

### A) **Conversational Form (SPACE10)** – Konversation statt Formular  
**Repo:** [space10-community/conversational-form](https://github.com/space10-community/conversational-form)  
**Stars:** ~3.8k | **Lizenz:** MIT

- **Was es ist:** Macht aus normalen Formularen ein **Chat-ähnliches Gespräch** (eine Frage nach der anderen).
- **Vorteile:** Sehr etabliert, gute Docs, Variablen aus vorherigen Fragen, frei stylbar.
- **Für Berneby:** Ideal, um „Welche Leistung?“ → „Welche Branche?“ → „Zeitrahmen?“ als Dialog zu führen. **Kein eingebautes „Best Match“** – das müsste man per eigener Logik am Ende aus den Antworten ableiten (z. B. Regeln: Handwerk + kleine Website → Geselle; + viele Orte → Meisterbetrieb; + KI-Telefon gewünscht → Marktführer).
- **React:** Wrapper [alexgurr/react-conversation-form](https://github.com/alexgurr/react-conversation-form) für einfache Integration in React/Next.js.

---

### B) **QuillForms** – Typeform-Alternative mit Logik & Next.js  
**Repo:** [quillforms/quillforms](https://github.com/quillforms/quillforms)  
**Stars:** ~600+ | **Lizenz:** GPL (WordPress-Plugin), React-Pakete nutzbar

- **Was es ist:** **Conversational Multi-Step-Form** (Typeform-Style), React + TypeScript, mit **Jump Logic** und **Conditional Blocks** (Fragen anzeigen/ausblenden je nach Antwort).
- **Vorteile:**
  - **Dynamic Blocks:** Blöcke zeigen/verstecken/hinzufügen per Bedingungen – perfekt für „nur relevante Fragen“ und verzweigte Pfade.
  - **Next.js:** Renderer nutzbar ohne WordPress: `@quillforms/renderer-core` + `@quillforms/react-renderer-utils` (siehe [get-started](https://github.com/quillforms/quillforms/blob/master/react-docs/get-started.md)).
  - **Personality Quiz / Ergebnis am Ende:** Konzept „am Ende ein Ergebnis anzeigen“ passt gut zu „Ihr bestes Match: Geselle / Meisterbetrieb / Marktführer / Digitaler Hausmeister“.
- **Für Berneby:** Wizard mit 4–6 Fragen (Branche, Ziel, Budget-Vorstellung, KI-Telefon ja/nein, …), Conditional Logic für Verzweigungen, **letzter Block = Ergebnis-Seite** mit empfohlenem Paket + CTA „Jetzt anfragen“ (dann klassisches Kurzformular oder Link zu Kontakt).

---

### C) **React Form Wizard (jonatankruszewski)** – Conditional Steps  
**Repo:** [jonatankruszewski/React-Form-Wizard](https://github.com/jonatankruszewski/React-Form-Wizard)  
**Stars:** wenige | **Lizenz:** prüfen

- **Was es ist:** Multi-Step-Wizard in React mit **bedingten Schritten** (Steps können übersprungen werden je nach Eingabe).
- **Vorteile:** Einfacher State, klare Schrittlogik, gut für „wenn Antwort A → Schritt 3, sonst Schritt 2“.
- **Für Berneby:** Kein Konversations-UI, aber solide Basis, wenn du den Wizard **selbst bauen** willst (eigene UI, eigene Match-Logik). „Best Match“ komplett in eigener Logik (z. B. Punktesystem oder Regeltabelle).

---

### D) **Form.io Conditional Wizard** – Enterprise-Formbuilder  
**Demo:** [Conditional Wizard Example](https://formio.github.io/formio.js/app/examples/conditionalwizard.html)  
**Repo:** [formio/formio.js](https://github.com/formio/formio.js)

- **Was es ist:** Formbuilder mit **Conditional Logic** – Seiten/Felder dynamisch je nach vorherigen Werten.
- **Vorteile:** Sehr mächtig, läuft client- und server-seitig.
- **Nachteil:** Stärker auf Form.io-Ökosystem/Backend ausgerichtet; für reine Next.js-Frontend-Lösung ggf. Overhead.

---

### E) **ChatBotKit – AI Forms (Next.js)**  
**Repo:** [chatbotkit/example-nextjs-ai-forms](https://github.com/chatbotkit/example-nextjs-ai-forms)  
**Stars:** ~14 | **Lizenz:** MIT

- **Was es ist:** Beispiel für **generative UI** mit ChatBotKit SDK – Formulare/UI werden per KI mitgeneriert.
- **Vorteile:** Echter **KI-Einsatz** (z. B. nächste Frage oder Empfehlung per LLM).
- **Nachteil:** Kleines Beispiel-Repo; KI-Integration müsste man selbst ausbauen (z. B. „Empfehle passendes Paket“ per API).

---

### F) **TalkFormAI / Formzy**  
- **TalkFormAI:** Formulare per **Chat** ausfüllen (konversationell).  
- **Formzy:** AI-enabled Form Builder (Formulare aus Prompts). Beide eher „Formular erstellen“ als „Kunde zum Match führen“ – können als Inspiration für Konversation + AI dienen.

---

## 2. Kombination „Wizard + Best Match“ (ohne fertige KI)

**Kernidee:**  
Wizard mit **fester oder bedingter Reihenfolge** (Conversational Form oder QuillForms) + **eigene Match-Logik** am Ende.

1. **Fragen definieren** (Beispiele):
   - Sind Sie eher Handwerksbetrieb oder brauchen Sie IT/Web ohne Handwerks-Fokus?
   - Was ist Ihr wichtigstes Ziel? (Sichtbarkeit, Anrufe nicht verpassen, Website, IT-Support)
   - Wie viele Orte/Regionen bedienen Sie? (ein Ort / mehrere / ganz Erzgebirge)
   - Soll ein KI-Telefonassistent Anrufe annehmen?
   - Brauchen Sie laufenden IT-Support (PC, Office, Website)?

2. **Match-Regeln** (Beispiele):
   - Handwerk + One-Page reicht + kein KI-Telefon → **Geselle (950 €)**
   - Handwerk + viele Orte + SEO → **Meisterbetrieb (1.950 €)**
   - Handwerk + KI-Telefon gewünscht → **Marktführer (2.800 €)**
   - Vor allem IT-Support / „digitaler Hausmeister“ → **10er-Karte (850 €)**
   - Mix / unsicher → **„Individuelles Angebot – wir melden uns“**

3. **Implementierung:**  
   Entweder **QuillForms** (Conditional Blocks + Ergebnis-Block) oder **Conversational Form** (React-Wrapper) + eigenes kleines Modul, das aus den gesammelten Antworten den Match berechnet und eine Ergebnis-Karte anzeigt („Ihr Match: …“ + CTA).

---

## 3. Echte KI-Unterstützung (USP „KI-gestützt“)

- **Option A – Nächste Frage / Texte:**  
  API-Aufruf (z. B. OpenAI/Anthropic) mit Kontext „bisherige Antworten“ → Modell schlägt nächste Frage oder kurzen Erklärungstext vor. UI bleibt Wizard (z. B. QuillForms oder eigene Steps).

- **Option B – Match per KI:**  
  Am Ende alle Antworten an ein Modell senden: „Empfiehl eines der Pakete: Geselle, Meisterbetrieb, Marktführer, Digitaler Hausmeister, Individuell“ + kurze Begründung. Ergebnis im Wizard anzeigen.

- **Option C – Voll konversationell:**  
  ChatBotKit oder eigener Chat-UI mit Backend: Nutzer chattet in natürlicher Sprache, am Ende kommt strukturierter Vorschlag (Paket + Kontakt-CTA). Aufwand höher, USP stärker.

---

## 4. Konkrete Empfehlung für Berneby

| Priorität | Lösung | Begründung |
|-----------|--------|------------|
| **1** | **QuillForms (Renderer in Next.js)** | Typeform-Feeling, Conditional Logic, Ergebnis-Block für „Ihr Match“, Next.js-tauglich ohne WordPress. Match-Logik erstmal regelbasiert; später KI für Begründung oder nächste Frage. |
| **2** | **Conversational Form + React-Wrapper** | Sehr etabliert, einfacher Einstieg, Konversation sofort. „Best Match“ als eigener letzter Schritt (eigenes React-Komponente), der aus Form-Daten berechnet wird. |
| **3** | **Eigener Wizard (React Form Wizard als Referenz)** | Maximale Kontrolle, 100 % an Berneby-Design anpassbar, Match-Logik und optional KI komplett in eurer Hand. Mehr Entwicklungsaufwand. |

**Pragmatischer Einstieg:**  
Mit **QuillForms Renderer** oder **Conversational Form** den Ablauf „ein paar Fragen → Ergebnis-Karte (bestes Paket) → CTA Kontakt“ umsetzen. „KI-gestützt“ zunächst als **regelbasierter intelligenter Assistent** kommunizieren; sobald eine API (z. B. für Begründung oder dynamische nächste Frage) integriert ist, als „KI-Wizard“ schärfer herausstellen.

---

## 5. Links (kurz)

- [SPACE10 Conversational Form](https://github.com/space10-community/conversational-form)  
- [React Conversation Form (Wrapper)](https://github.com/alexgurr/react-conversation-form)  
- [QuillForms](https://github.com/quillforms/quillforms) · [QuillForms React Get Started](https://github.com/quillforms/quillforms/blob/master/react-docs/get-started.md) · [Conditional Blocks](https://github.com/quillforms/quillforms/blob/master/react-docs/conditional-blocks-rendering.md)  
- [React Form Wizard (conditional)](https://github.com/jonatankruszewski/React-Form-Wizard)  
- [Form.io Conditional Wizard](https://formio.github.io/formio.js/app/examples/conditionalwizard.html)  
- [ChatBotKit example-nextjs-ai-forms](https://github.com/chatbotkit/example-nextjs-ai-forms)  

Wenn du möchtest, kann als Nächstes ein konkreter **Implementierungsplan** (z. B. QuillForms-Integration + Match-Regeln + Ersatz von `ContactForm` auf `/kontakt`) ausgearbeitet werden.
