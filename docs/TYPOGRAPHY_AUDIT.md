# Typography Audit (Marketing vs Social/Export)

## What is now standardized

- Canonical typography source has been unified in `berneby-website/app/globals.css`.
- Marketing typography now uses semantic scale tokens:
  - `--type-size-micro`
  - `--type-size-body-sm`
  - `--type-size-body`
  - `--type-size-lead`
  - `--type-size-h3`
  - `--type-size-h2`
  - `--type-size-h1`
  - `--type-size-display`
- Semantic utility classes were added (`type-*`) and connected in core components:
  - `SectionHeading`
  - `Hero`
  - `Button`
  - `CtaSection`
  - `TrustBar` (label tier)
  - dense marketing page `standorte/[ort]` (key outliers normalized)
- Display letter spacing for marketing was restored to a wider profile:
  - `--type-tracking-display: 0.08em`
  - Hero and SectionHeading use tokenized `type-heading-*` spacing
  - Marketing display outliers were aligned to `0.08em` where applicable

## Non-negotiable constraints applied

- Section heading mobile size is capped by current baseline (no upsizing).
- Scale is mobile-first and tested conceptually for 320px minimum viewport behavior.
- Social/export typography remains separate by design.

## Remaining outliers (expected)

The following values still exist intentionally:

- `text-[11px]`: used in social/export routes and fixed-canvas assets.
- `text-[0.7rem]`: limited to social/export templates.
- `text-[0.9375rem]`: removed from marketing paths, remains only where export layout requires fixed sizing.

Marketing pages and shared marketing components now rely on `type-*` classes as the default path.

## Display tracking split (intentional)

- Marketing context uses `0.08em` display tracking to match the previous visual identity.
- Social/export context keeps fixed tracking values (`0.02em`, `0.04em`, `tracking-widest`, etc.) for canvas-specific legibility and composition.

## Best-practice baseline used

- Keep everyday usage to a small set of role-based sizes.
- Body text minimum at 16px for primary reading contexts.
- Heading line-height tighter than body; body line-height around 1.5.
- Prefer semantic token classes over arbitrary one-off values.
- Keep responsive behavior fluid via `clamp()` and protect small viewports first.

## 320px verification checklist

- No horizontal overflow for headline blocks in Hero and section headings.
- Heading wraps remain readable (no clipped words).
- Body and lead copy preserve readability and rhythm.
- Primary buttons keep tappable height and maintain label legibility.
