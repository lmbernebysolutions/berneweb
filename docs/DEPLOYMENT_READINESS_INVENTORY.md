# Deployment Readiness — Inventory (Vercel / Next.js App Router)

Stand: 2026-03-15

## App entry points (Roots)

### Root layout
- `app/layout.tsx`

### Pages (App Router)
- Marketing / Content:
  - `app/(marketing)/page.tsx`
  - `app/(marketing)/handwerk/page.tsx`
  - `app/(marketing)/tech/page.tsx`
  - `app/(marketing)/kontakt/page.tsx`
  - `app/(marketing)/impressum/page.tsx`
  - `app/(marketing)/datenschutz/page.tsx`
  - `app/(marketing)/referenzen/page.tsx` (+ `app/(marketing)/referenzen/layout.tsx`)
  - `app/(marketing)/ratgeber/page.tsx`
  - `app/(marketing)/ratgeber/[slug]/page.tsx`
  - `app/(marketing)/standorte/page.tsx`
  - `app/(marketing)/standorte/[ort]/page.tsx`
  - `app/(marketing)/branchen/page.tsx`
  - `app/(marketing)/branchen/[slug]/page.tsx`
  - `app/(marketing)/socials/page.tsx`
  - `app/(marketing)/socials-v2/page.tsx`
- Weitere:
  - `app/ueber-uns/page.tsx`
- Test-Routen (route group):
  - `app/(test)/home-v2/page.tsx`
  - `app/(test)/home-v3/page.tsx`
  - `app/(test)/handwerk-v3/page.tsx`
  - `app/(test)/referenzen-v3/page.tsx`
  - `app/(test)/ueber-uns-v3/page.tsx`

### API routes
- `app/api/health/route.ts`
- `app/api/contact/route.ts`
- `app/api/chat/route.ts`
- Tests (Vitest):
  - `app/api/health/route.test.ts`
  - `app/api/chat/route.test.ts`

### SEO special files (Next metadata routes)
- `app/robots.ts`
- `app/sitemap.ts`

## Build / runtime config
- `package.json` (Scripts: `build`, `start`, `lint`, `test`, `audit`, `deploy`, optional `analyze`)
- `next.config.ts` (Security headers + CSP, redirects, analyzer toggle)
- `tsconfig.json` (strict TS, path alias `@/*`)
- `postcss.config.mjs`
- `next-env.d.ts`

## Lint / test / quality
- `eslint.config.mjs` (Next core-web-vitals + TS rules)
- `vitest.config.ts`

## Dependency locks / package manager
- `pnpm-lock.yaml` (pnpm)
- `package-lock.json` (**existiert zusätzlich**; als Deploy-Hygiene-Risiko, weil zwei Lockfiles)
- `pnpm-workspace.yaml`

## Environment & secrets surface
- `.env.local` vorhanden und **enthält Secrets** (muss strikt lokal bleiben; Production über Vercel Env Vars).

## Assets / public
- `public/` enthält u.a. Logos und `og-image.png` (in Metadata referenziert).

