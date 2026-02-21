# Research-Prompt: Vollständige Anforderungen für einen sicheren, production-ready Chatbot

**Zweck:** Diesen Prompt an deine Research-KI geben. Sie soll **alle** Anforderungen auflisten und prüfen, die ein webbasierter Chatbot (FAQ/RAG, optional Wizard) erfüllen muss, um **sicher und produktionsreif** deployt zu werden. Keine spezifischen Beispiele, keine konkreten Produktnamen – nur **generische, vollständige Anforderungskategorien und Einzelanforderungen**.

---

## Auftrag an die Research-KI

Erstelle eine **vollständige, strukturierte Anforderungsliste** für einen **sicheren, production-ready Chatbot** auf einer öffentlichen Website. Der Bot kann FAQ-/RAG-Antworten und/oder einen konfigurierbaren Wizard (Match) anbieten. Die Liste soll:

- **Alle** relevanten Anforderungsbereiche abdecken (Sicherheit, Compliance, Betrieb, Nutzererlebnis, Infrastruktur).
- Pro Bereich **konkrete Einzelanforderungen** nennen, die vor einem Go-Live erfüllt oder zumindest geprüft sein müssen.
- **Generisch** formuliert sein: keine konkreten Technologien, Frameworks oder Produktnamen als Pflicht nennen – nur das **Was**, nicht das **Wie** mit spezifischen Beispielen.
- Als **Checkliste** nutzbar sein: jede Anforderung so formulieren, dass man sie mit „erfüllt / nicht erfüllt / nicht relevant“ bewerten kann.

---

## Erwartete Anforderungskategorien (vollständig abdecken)

Die Research-KI soll mindestens folgende Kategorien berücksichtigen und pro Kategorie alle denkbaren Einzelanforderungen auflisten:

### 1. Sicherheit

- Schutz vor Missbrauch und Angriffen auf die Chat-API.
- Begrenzung von Anfragen (pro Identifikator, pro Zeiteinheit).
- Begrenzung von Eingabe- und Ausgabelänge (Zeichen, Tokens).
- Schutz vor injizierbaren Inhalten (Prompt-Injection, schädliche Nutzereingaben).
- Sichere Verwaltung von API-Keys und Geheimnissen (keine Weitergabe an den Client, keine Logs).
- Schutz vor automatisierten Anfragen (Bot-Erkennung oder -Begrenzung).
- Erkennung und Unterbindung von Spam (Wiederholungen, Flut, sinnlose Eingaben).
- Sichere Verarbeitung von Datei-Uploads, falls der Bot welche akzeptiert.
- Absicherung gegen Denial-of-Service (Zeitlimits, Ressourcenlimits, Abbruch langer Streams).
- Sicherheitsrelevante HTTP-Header und CORS-Konfiguration für die Chat-API.
- Keine sensiblen Daten in Fehlermeldungen oder Logs an den Client.

### 2. Datenschutz und Compliance (insb. DSGVO/GDPR)

- Rechtmäßigkeit der Verarbeitung (Einwilligung, berechtigtes Interesse, Vertrag).
- Transparenz: Nutzer müssen vor Nutzung des Bots über Zweck, Umfang und Dauer der Verarbeitung informiert werden.
- Zweckbindung: Verarbeitung nur für den angegebenen Zweck (z. B. FAQ, Beratung).
- Datenminimierung: Nur erforderliche Daten erheben und verarbeiten; keine unnötige Speicherung von Konversationen.
- Speicherdauer: Definierte Aufbewahrungsfristen oder keine persistente Speicherung; automatische Löschung nach Frist.
- Betroffenenrechte: Auskunft, Berichtigung, Löschung, Widerspruch, Datenübertragbarkeit – technisch und organisatorisch umsetzbar.
- Verträge zur Auftragsverarbeitung (AV-Verträge) mit allen Drittanbietern, die personenbezogene Daten verarbeiten (z. B. LLM-Anbieter, Hosting, Rate-Limit-/Redis-Dienste).
- Datenschutzerklärung: Klare Angaben zu Chat-Funktion, verarbeiteten Daten, Empfängern, Dauer, Rechtsgrundlage, Betroffenenrechten.
- Cookie-/Consent-Integration: Chat nur anzeigen oder API nur nutzbar, wenn erforderliche Einwilligung vorliegt (falls Cookie-/Tracking-Relevanz).
- Anonymisierung oder Pseudonymisierung wo möglich; keine personenbezogenen Logs ohne Rechtsgrundlage.
- Internationale Datenübermittlungen: Rechtsgrundlage und geeignete Garantien (z. B. Standardvertragsklauseln), falls Daten außerhalb EU/EWR verarbeitet werden.
- Optional: Dokumentation (Verzeichnis der Verarbeitungstätigkeiten, technisch-organisatorische Maßnahmen) für den Chat-Betrieb.

### 3. Zuverlässigkeit und Stabilität

- Fehlerbehandlung: Alle Fehler abfangen; keine unhandled Exceptions; definiertes Verhalten bei API-Fehlern, Timeouts, Abbruch.
- Timeouts: Maximale Laufzeit pro Anfrage und pro Stream; automatischer Abbruch und saubere Antwort an den Client.
- Begrenzung der Konversationslänge (Anzahl Nachrichten, Gesamt-Tokens), um Ressourcen und Kosten zu begrenzen.
- Graceful Degradation: Verhalten, wenn der LLM-Dienst nicht erreichbar ist (Fallback-Antwort, Hinweis, keine leere oder abstürzende Antwort).
- Idempotenz: Doppelte Anfragen (z. B. Doppelklick) führen nicht zu doppelter Abrechnung oder doppelter Aktion.
- Keine Blockierung des Event-Loops; asynchrone Verarbeitung und Streams ohne Blocking.
- Stabile API-Response-Formate (z. B. einheitliches Stream-Format), damit der Client nicht bei kleinen Änderungen bricht.

### 4. Kosten- und Ressourcenkontrolle

- Obergrenzen für Token-Nutzung pro Anfrage und optional pro Nutzer/Session/Zeitraum.
- Kostenüberwachung und Alerts bei Anbietern (LLM, Infrastruktur), um Runaway-Kosten zu vermeiden.
- Begrenzung der Anzahl gleichzeitiger oder pro Zeiteinheit verarbeiteter Anfragen (Rate Limiting).
- Optional: Trennung nach Nutzertyp oder Kontext (z. B. anonym vs. angemeldet), um Limits differenziert zu setzen.

### 5. Nutzererlebnis und Moderation

- Klare Hinweise bei Fehlern (Rate Limit, Timeout, Dienst nicht erreichbar) ohne technische Details preiszugeben.
- Angemessene Ladezeiten und Streaming, damit der Nutzer Fortschritt sieht.
- Optional: Inhaltsfilter oder Moderation, um unerwünschte oder rechtswidrige Nutzereingaben oder Bot-Ausgaben zu begrenzen.
- Barrierefreiheit: Chat-Oberfläche und Fehlermeldungen zugänglich (z. B. ARIA, Fokus, Tastatur).
- Keine irreführenden oder als Mensch getarnten Bot-Antworten (z. B. Kennzeichnung als Assistent/KI).

### 6. Infrastruktur und Deployment

- Umgebungsvariablen und Geheimnisse nur serverseitig und über sichere Kanäle; keine Hardcodierung von Keys.
- Trennung von Entwicklung, Staging und Produktion (eigene Keys, Limits, ggf. eigene Dienste).
- Sichere Übertragung (HTTPS) für alle Chat-API-Aufrufe.
- Skalierbarkeit: Verhalten unter Last; keine zustandsabhängigen Single Points of Failure, sofern vermeidbar.
- Health- oder Readiness-Checks für die Chat-Funktion oder abhängige Dienste, falls im Betrieb genutzt.
- Logging und Monitoring: Fehler, Rate-Limit-Überschreitungen und kritische Ereignisse erfassbar, ohne personenbezogene Daten unnötig zu loggen.
- Reproduzierbares und versioniertes Deployment (z. B. über CI/CD), damit der Chat-Stand klar zugeordnet werden kann.

### 7. Inhalt und Rechtliches

- Inhaltliche Grenzen: Bot antwortet nur in definiertem Rahmen (z. B. Wissensbasis, Themenbereich); keine Haftung für fehlerhafte oder veraltete Aussagen.
- Impressum und Datenschutz verlinkt; Hinweis auf automatisierte Kommunikation/KI, wo vorgeschrieben.
- Keine Werbung oder Aussagen, die mit geltendem Recht (z. B. UWG, Heilmittelwerbung) in Konflikt stehen, sofern der Bot dafür genutzt wird.
- Urheberrecht und Lizenzierung: Nutzung von LLMs und Trainingsdaten rechtlich geklärt; keine Verletzung von Rechten Dritter durch Bot-Antworten.

### 8. Testing und Qualitätssicherung

- Tests für kritische Pfade: Rate Limiting, Fehlerbehandlung, Timeout, Fallback, Längenlimits.
- Tests für sichere Konfiguration: keine Keys in Client-Bundle, keine sensiblen Daten in Responses.
- Optional: Lasttests, um Grenzen und Verhalten unter Last zu kennen.
- Keine produktiven Daten oder Keys in Test- oder Beispiel-Code.

---

## Erwartetes Ergebnisformat

Die Research-KI soll ausgeben:

1. **Strukturierte Anforderungsliste**  
   Pro Kategorie (1–8) eine nummerierte Liste von Einzelanforderungen in prüfbarer Form („Der Chat-API-Endpunkt …“, „Es muss …“, „Es darf nicht …“).

2. **Vollständigkeit**  
   Kein relevanter Bereich für einen sicheren, production-ready Bot soll fehlen; fehlende Punkte sollen ergänzt werden.

3. **Priorisierung (optional)**  
   Kurz kennzeichnen, welche Anforderungen für einen minimal sicheren Go-Live zwingend sind und welche für eine spätere Phase empfohlen werden.

4. **Abgrenzung**  
   Kurz festhalten, was ausdrücklich **nicht** in den Scope gehört (z. B. reine Marketing-Inhalte, Design-Vorgaben), damit die Liste fokussiert bleibt.

---

## Hinweis

Der Prompt enthält **keine spezifischen Beispiele** (keine konkreten Libraries, keine Produktnamen, keine Code-Snippets). Die Research-KI soll **nur** die vollständige, generische Anforderungsliste liefern. Konkrete Umsetzungslösungen können in einem **folgenden** Schritt (separater Prompt oder Recherche) erarbeitet werden.
