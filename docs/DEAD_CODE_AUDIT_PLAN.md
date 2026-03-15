# Dead Code Audit — Vorgehen (Next.js / TypeScript)

Ziel: Dead Code **vollständig identifizieren** und nur dann entfernen, wenn **zweifelsfrei unreferenziert/unerreichbar**. Es dürfen **keine** Funktionen/Design/Verhalten geändert werden.

Stand: 2026-03-15

## Was zählt als Dead Code?
- **Unreferenzierte Dateien**: nie importiert/nie als Entry Point erreichbar.
- **Unbenutzte Exports**: exportierte Funktionen/Komponenten/Constants, die nicht genutzt werden.
- **Unbenutzte Dependencies**: Packages in `package.json`, die in Runtime/Build nicht importiert werden.
- **Unreferenzierte Assets**: Dateien in `public/`, die nirgends referenziert werden (JSX/strings/meta).
- **Legacy/Parallel-Implementierungen**: z.B. `components/v2` vs `components/v3`, wenn nur eine Linie tatsächlich geroutet/benutzt wird.

## Root-Definition (Entry Points)
- App Router Roots:
  - `app/layout.tsx`
  - `app/**/page.tsx`
- Zusätzlich: dynamische Imports (z.B. `next/dynamic`) müssen als “roots” berücksichtigt werden (sonst false positives).

## Evidenz-Policy (Safety)
- **High confidence delete** nur wenn:
  - Tool-Report sagt “unused”, **und**
  - keine Referenzen via Code-Suche, **und**
  - kein dynamischer Import/Route-Entry/konventioneller Next Hook (Metadata, special files) betroffen.
- **Medium/Low**: nur inventarisieren, nicht entfernen.

## Empfohlene Tools (ohne Repo-Änderungen)
- **Knip** (primär): TS-aware unused files/exports/deps. Unterstützt Entry Points + path aliases.
- **depcheck** (optional): dependency unused check; kann False-Positives bei TS/Next haben → als Ergänzung.
- **ts-prune** (optional): unused exports; besonders hilfreich bei großen `lib/*`.
- **Asset scan**: `public/` vs Referenzen in `app/`, `components/`, `lib/` und in `metadata` (OG images, icons).

## Verifikation nach Removal (wenn Removal später gemacht wird)
- `pnpm lint` grün
- `pnpm build` grün
- Smoke-check: alle Seitenrouten rendern ohne Fehler
- Optional: Analyzer nur zum Messen (`ANALYZE=true`)

