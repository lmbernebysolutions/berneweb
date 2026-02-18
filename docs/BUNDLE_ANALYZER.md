# Bundle-Analyse (JavaScript)

Zur Prüfung von Bundle-Größen und ungenutztem JavaScript (v. a. für Lighthouse „Unused JavaScript“).

## Kurzfassung (Stand ~1,1 MB Client)

- **Größte Chunks:** React/Next-Core (4258e3df, 974, framework, 972, main) – zusammen ~685 KB, nicht per Dynamic Import reduzierbar.
- **Page-Chunks** sind bereits klein (Home ~9 KB, Handwerk ~8 KB, Tech ~12 KB); Next.js code-splittet automatisch.
- **Umsetzung:** `FaqAccordion` und `TestimonialGrid` werden per `next/dynamic` geladen (SSR bleibt an). Deren Client-JS liegt in eigenen Chunks und reduziert die initialen Page-Bundles.

## Ausführen

```bash
pnpm run analyze
```

Oder explizit mit Webpack (erforderlich, da Next.js 16 standardmäßig Turbopack nutzt):

```bash
ANALYZE=true next build --webpack
```

Nach dem Build liegen die Reports unter:

- **Client:** `.next/analyze/client.html`
- **Edge:** `.next/analyze/edge.html`

Im Browser öffnen und nach großen Chunks oder auffälligen Modulen suchen.

## Optionale Maßnahmen

- **Schwergewichtige, nicht above-the-fold Komponenten** können mit `next/dynamic` und `ssr: false` (oder ohne SSR) lazy-geladen werden, sofern der Report einen klaren Treiber zeigt.
- **Legacy JavaScript** (Lighthouse) ist oft in Dependencies; nur bei Bedarf nach Updates prüfen.

Die Icons sind bereits über `optimizePackageImports: ["@tabler/icons-react"]` in `next.config.ts` optimiert.
