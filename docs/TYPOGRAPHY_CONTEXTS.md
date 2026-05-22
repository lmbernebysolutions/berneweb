# Typography Contexts

## Purpose

This document separates typography responsibilities to avoid mixing responsive website typography with fixed-canvas export typography.

## Context A: Marketing Website (Primary SSoT)

- Scope: all marketing pages and shared marketing components.
- Source of truth: `berneby-website/app/globals.css`.
- Canonical token scale: `--type-size-*`.
- Canonical utility classes: `type-*`.
- Rules:
  - Body text is at least 16px on mobile (`type-body`).
  - Section heading mobile size must not exceed current baseline (`type-heading-h2` starts at 2.25rem).
  - Responsive behavior must hold at 320px without horizontal overflow.
  - Avoid arbitrary `text-[...]` values for normal marketing content.

## Context B: Social and Export (Separate, Intentional)

- Scope: routes and components for social graphics, story layouts, and print/export output.
- Typographic values may be pixel-precise and canvas-specific by design.
- These pages can use fixed text sizes for predictable rendering.
- Rules:
  - Do not force marketing fluid tokens into fixed canvas templates.
  - Keep print/export values documented close to the feature/component.
  - If a value is reused across multiple export templates, centralize it inside that export domain.

## Decision Rule

When changing typography:

1. If content is read in a browser flow layout -> use Context A rules.
2. If output is a fixed asset or print target -> use Context B rules.
