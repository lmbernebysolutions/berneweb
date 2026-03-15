# Dead Code Hotspots (Startpunkte)

Stand: 2026-03-15

Ziel: eine pragmatische “wo zuerst schauen”-Liste, bevor man irgendetwas löscht.

## Hotspots aus Tool-Evidenz (Knip)

### UI-Komponenten, die aktuell als unreferenziert gelten
- `components/ui/*` (siehe `docs/DEAD_CODE_INVENTORY.md`), u.a.:
  - `alert-dialog.tsx`, `badge.tsx`, `card.tsx`, `combobox.tsx`, `dropdown-menu.tsx`, `field.tsx`, `input-group.tsx`, `navigation-menu.tsx`, `select.tsx`, `separator.tsx`, `skeleton.tsx`, `tabs.tsx`, `tooltip.tsx`, `trust-badge.tsx`

### Sections / Brand / Layout, die als unreferenziert gelten
- `components/sections/MatchWizardSection.tsx`
- `components/sections/ReferenzenStrip.tsx`
- `components/sections/ServiceTabs.tsx`
- `components/brand/Logo.tsx`
- `components/layout/Container.tsx`

### Chat “Wizard” Artefakte
- `lib/wizard-config.ts`
- `lib/chat/wizard-chat.ts`

### Scripts
- `scripts/export-slides.ts`

## Hotspots aus Struktur/Varianten (manuell zu verifizieren)

### Parallel-Versionen
- `components/v2/` vs `components/v3/`
  - häufig entstehen hier “stranded” Komponenten, wenn nur eine Variante geroutet ist.

### Test-Routes (nicht Production)
- `app/(test)/*`
  - prüfen, ob bewusst als Playground behalten oder als Dead Code/Preview-only betrachtet.

## Asset Hotspots (public/)
- Sehr große oder selten genutzte Assets (z.B. große Screenshots) sind Kandidaten für:
  - Entfernen, wenn unreferenziert
  - oder Optimierung/Alternative Delivery, wenn benötigt

## Kriterien, um “dead” zu bestätigen
- **Kein** Import/kein dynamischer Import, keine Route-Entrypoint-Referenz.
- Nicht über Konventionen “magisch” eingebunden (Next special files, shadcn patterns, MDX pipeline etc.).
- Tool-Report + mindestens eine unabhängige Referenzprüfung.

