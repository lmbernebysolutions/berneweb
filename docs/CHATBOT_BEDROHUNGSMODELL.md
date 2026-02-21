# Bedrohungsmodell: Web-Chatbot (FAQ & Ihr Match)

Dokumentation der identifizierten Bedrohungsszenarien und betroffenen Komponenten für den Chatbot auf der Berneby-Website.

## Betroffene Komponenten

- **Chat-API** (`/api/chat`): Next.js Route Handler, verarbeitet FAQ- und Match-Anfragen
- **LLM-Dienste**: Google Gemini / OpenAI (extern)
- **Redis (Upstash)**: Rate-Limiting und optional Idempotenz
- **Wissensbasis**: FAQ-Einträge, Ratgeber-Links, Wizard-Konfiguration (Code/Repo)

## Bedrohungsszenarien

### Spam und Missbrauch

- **Szenario:** Massenhafte Anfragen von einer IP oder automatisierten Clients
- **Gegenmaßnahmen:** Rate-Limiting (Upstash) pro IP, Spam-Heuristik (identische Wiederholungen), Konversationslängen-Limit, Input-Längenlimit

### Prompt-Injection / Jailbreak

- **Szenario:** Nutzer versucht über die Eingabe, den System-Prompt zu überschreiben oder verbotene Ausgaben zu erzeugen
- **Gegenmaßnahmen:** Strikte Trennung von System-Prompt und User-Eingabe; User-Input nur als klar markierte Nutzernachricht; System-Prompt schränkt auf Wissensbasis ein; optional Post-Filter auf Antworten

### Injection in Backend

- **Gegenmaßnahmen:** Serverseitige Validierung (Schema), Normalisierung (NFKC, Steuerzeichen entfernen), keine Roh-Eingabe in Logs

### Denial-of-Service (DoS)

- **Gegenmaßnahmen:** Rate-Limiting, maximale Eingabe- und Nachrichtenlänge, Stream-Timeout (60 s), Begrenzung der Nachrichtenanzahl pro Request

### Datenleck

- **Gegenmaßnahmen:** API-Keys nur serverseitig; Fehlermeldungen ohne Stacktraces; Logging ohne personenbezogene oder nutzererzeugte Inhalte

### Bots / Automatisierte Massennutzung

- **Gegenmaßnahmen:** Rate-Limiting pro IP; optional erweiterte Bot-Erkennung (SOLLTE)

## Review

Dieses Dokument bei Änderungen an der Chat-Funktion oder angebundenen Diensten prüfen und aktualisieren.
