# URL-Struktur & Site Architecture

**Phase 2 – P2-2.2-T1**  
Basis: TASKLIST_PHASE_2_MID_TERM.md

## Hierarchie

Alle Seiten sind **≤ 3 Klicks** von der Homepage erreichbar:

| Ebene | Klick | Beispiele |
|-------|-------|-----------|
| 0 | Home | `/` |
| 1 | Hauptseiten | `/handwerk`, `/tech`, `/ueber-uns`, `/kontakt`, `/ratgeber` |
| 2 | Ratgeber-Artikel | `/ratgeber/[slug]` |
| 2 | Legal | `/impressum`, `/datenschutz` |

## Navigation

- **Hauptnavigation:** Home, Über uns, Handwerk, Tech Solutions, Kontakt
- **Ratgeber:** Nicht in Hauptnavigation (per Task-Vorgabe). Erreichbar über Footer, interne Links von Home/Handwerk/Tech.
- **Footer:** Leistungen, Unternehmen (inkl. Ratgeber), Legal (Impressum, Datenschutz)

## Erreichbarkeit

| Route | Erreichbar von |
|-------|----------------|
| `/ratgeber` | Footer, Home (Handwerk-Karte), interne Links |
| `/ratgeber/[slug]` | Ratgeber-Übersicht, RelatedArticles, interne Links |

## Legal-URLs

- `/impressum` – Impressum
- `/datenschutz` – Datenschutzerklärung
- Footer verlinkt beide korrekt.
