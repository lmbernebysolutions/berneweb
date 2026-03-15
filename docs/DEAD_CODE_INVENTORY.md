# Dead Code Inventory (Knip + depcheck)

Stand: 2026-03-15

**Hinweis:** Die folgenden **Dateien wurden bereits entfernt** (Deployment-Ready Umsetzung):
- `lib/wizard-config.ts`, `lib/chat/wizard-chat.ts`, `scripts/export-slides.ts`
- `components/brand/Logo.tsx`, `components/layout/Container.tsx`
- `components/sections/MatchWizardSection.tsx`, `ReferenzenStrip.tsx`, `ServiceTabs.tsx`
- `components/ui/alert-dialog.tsx`, `badge.tsx`, `card.tsx`, `combobox.tsx`, `dropdown-menu.tsx`, `field.tsx`, `input-group.tsx`, `navigation-menu.tsx`, `select.tsx`, `separator.tsx`, `skeleton.tsx`, `tabs.tsx`, `tooltip.tsx`, `trust-badge.tsx`

Außerdem wurde die Dependency `@base-ui/react` entfernt (nur von combobox genutzt).

## High confidence (Knip: unused files) – ursprüngliche Liste

Knip reportet folgende Dateien als unreferenziert (bereits gelöscht, siehe oben):
- `lib/wizard-config.ts`
- `lib/chat/wizard-chat.ts`
- `scripts/export-slides.ts`
- `components/brand/Logo.tsx`
- `components/layout/Container.tsx`
- `components/sections/MatchWizardSection.tsx`
- `components/sections/ReferenzenStrip.tsx`
- `components/sections/ServiceTabs.tsx`
- `components/ui/alert-dialog.tsx`
- `components/ui/badge.tsx`
- `components/ui/card.tsx`
- `components/ui/combobox.tsx`
- `components/ui/dropdown-menu.tsx`
- `components/ui/field.tsx`
- `components/ui/input-group.tsx`
- `components/ui/navigation-menu.tsx`
- `components/ui/select.tsx`
- `components/ui/separator.tsx`
- `components/ui/skeleton.tsx`
- `components/ui/tabs.tsx`
- `components/ui/tooltip.tsx`
- `components/ui/trust-badge.tsx`

## Unused exports (Knip)

Knip hat zusätzlich einzelne unbenutzte Exports/Types gemeldet (Auszug, mit Datei):
- `components/ui/button.tsx`: `buttonVariants`, `ButtonProps`
- `lib/constants.ts`: `TECH_STACK`, `REFERENZEN_BRANCHEN`, `REFERENZEN_HOME`, `TECH_REFERENCES`, `LEISTUNGSGRID_TECH`, `UEBER_UNS_STATS`, `ANFAHRT`, `CONTACT_SUBJECTS`
- `lib/content/ratgeber.ts`: `getArticlesByCluster`, `getPillarArticles`
- `components/sections/ReferenzenCarousel.tsx`: `ReferenzenGrid`
- `lib/data/referenzen.ts`: `REFERENZEN_STATS`, type `ReferenzMetrik`
- `lib/container-styles.ts`: `CONTAINER_C`
- `components/ui/sheet.tsx`: `SheetClose`, `SheetHeader`, `SheetFooter`, `SheetDescription`

## Dependency signals

### depcheck: unused dependencies (paketweise)
- `@tailwindcss/typography`
- `shadcn`
- `tw-animate-css`

### depcheck: unused devDependencies
- `@tailwindcss/postcss`
- `tailwindcss`

### Knip: unused dependency / devDependency
- `@base-ui/react` (dependency)
- `playwright` (devDependency)

### Knip: unlisted
- `postcss` wird in `postcss.config.mjs` verwendet, ist aber nicht gelistet (unlisted dependency).

## Assets (public)

Manueller Befund (Directory Listing):
- `public/og-image.png` ist groß (~5.7MB) → keine Dead-Code-Aussage, aber Performance/Deploy-Risiko (prüfen, ob wirklich benötigt/optimiert).
- Weitere Dateien in `public/` existieren (Logos, Screenshot); “unused” muss über Referenzscan bestätigt werden.

