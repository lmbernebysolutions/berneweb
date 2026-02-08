# Design-System – Berneby Website

Einheitliche Tokens für Karten, Ecken und Hintergründe. Vermeidet Mischung aus TechCorners vs. manuellen Ecken und unterschiedlichen Border-/BG-Werten.

---

## Token-Matrix (V3)

### Karten

| Token | Border | Hintergrund | Verwendung |
|-------|--------|-------------|------------|
| **default** | `border-white/10` | `bg-white/[0.03]` | Standard-Sektionen: FAQ-Items, Kontakt-Info, Trust-Bar, Form-Container, Footer-CTA |
| **highlight** | `border-brand-cyan/30` | `bg-brand-navy/60` (+ optional `backdrop-blur-md`) | Hervorgehobene Blöcke: Werkzeugkasten-Karten, Process-Step-Karten (optional), Mission-Box |

### Ecken

| Kontext | Komponente | Pattern | Size | Keine manuellen Ecken |
|---------|------------|---------|------|------------------------|
| Karten (Standard) | TechCorners | diagonal | md | ✓ |
| Karten (Highlight) | TechCorners | diagonal | lg | ✓ |
| Kleine Boxen (z. B. Hero-Mascot, Footer-CTA) | TechCorners | diagonal oder all | sm oder md | ✓ |
| Step-Nummern, kleine Badges | TechCorners | all | sm | ✓ |

**Regel:** Es werden nur noch **TechCorners** verwendet. Keine `h-1.5 w-1.5`, `h-2 w-2`, `h-3 w-3` etc. als manuelle Ecken-Divs.

---

## Komponenten

### SectionCard (V1)

Gemeinsame Karten-Komponente mit festen Tokens:

- **variant="default"** → `border-white/10`, `bg-white/[0.03]`, TechCorners diagonal md  
- **variant="highlight"** → `border-brand-cyan/30`, `bg-brand-navy/60`, TechCorners diagonal lg  
- **variant="minimal"** → `border-white/10`, `bg-transparent`, TechCorners diagonal sm  

Einsatz: Kontakt-Info-Karten, Öffnungszeiten, Link-Hinweis, Form-Wrapper, Footer-CTA, ggf. FAQ-Item-Wrapper.

### TechCorners (V2 überall)

Wo vorher manuelle Ecken genutzt wurden, wird nur noch TechCorners verwendet:

- **HeroMascot:** TechCorners pattern="all" oder diagonal, size="md"
- **Kontakt Form:** TechCorners pattern="all" size="md" (ersetzt 4× manuelle Ecken)
- **Footer CTA-Karte:** TechCorners pattern="diagonal" size="sm" (ersetzt 4× h-2 w-2)
- **Trust-Bar:** bereits TechCorners ✓

---

## Bestehende Sektionen – Zuordnung

| Sektion | Vorher | Nachher |
|---------|--------|---------|
| FAQ AccordionItem | border/bg + TechCorners | unverändert (bereits Token-konform) oder SectionCard als Wrapper |
| Kontakt Info / Öffnungszeiten / Link | div + TechCorners | SectionCard variant="default" |
| Kontakt Form-Container | div + 4× manuelle Ecken | SectionCard variant="default" + TechCorners |
| Trust-Bar | div + TechCorners | SectionCard variant="default" (eine Leiste) |
| Process Steps Karte | div + TechCorners | bleibt oder SectionCard variant="default" |
| CraftToolboxGrid Karten | border + TechCorners | SectionCard variant="highlight" optional |
| Hero Schweinchen-Box | 2× manuelle Ecken | TechCorners pattern="all" size="md" |
| Footer CTA | 4× manuelle Ecken | TechCorners (oder SectionCard minimal) |

---

## Empfehlung

- **Langfristig:** V1 (SectionCard) + V2 (TechCorners überall) durchgängig nutzen.
- **Neue Sektionen:** Immer SectionCard oder explizit TechCorners, keine neuen manuellen Ecken.
- **Migration:** Schrittweise bestehende Stellen auf SectionCard umstellen und alle manuellen Ecken durch TechCorners ersetzen.
