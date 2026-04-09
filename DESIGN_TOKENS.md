# Apple Design Tokens

This document defines the canonical design tokens for typography, interaction, and theming.
All UI styles should consume these tokens instead of hardcoded values.

## Typography

- Font family
  - `--font-display`
  - `--font-body`
- Font size
  - `--type-fs-micro`
  - `--type-fs-label`
  - `--type-fs-caption`
  - `--type-fs-body`
  - `--type-fs-body-lg`
  - `--type-fs-title`
  - `--type-fs-title-lg`
  - `--type-fs-hero`
  - `--type-fs-markdown-h1` to `--type-fs-markdown-h6`
  - `--type-fs-code-inline`
  - `--type-fs-code-block`
- Line height
  - `--type-lh-tight`
  - `--type-lh-heading`
  - `--type-lh-body`
  - `--type-lh-relaxed`
- Letter spacing
  - `--type-tracking-display`
  - `--type-tracking-body`
  - `--type-tracking-label`
- Font weight
  - `--type-w-regular`
  - `--type-w-medium`
  - `--type-w-semibold`
  - `--type-w-bold`

## Interaction and Motion

- Timing
  - `--motion-instant`
  - `--motion-fast`
  - `--motion-standard`
  - `--motion-slow`
- Hover state
  - `--state-hover-translate-y`
  - `--state-hover-opacity`
- Elevation
  - `--elev-soft`
  - `--elev-strong`
  - `--elev-nav`
- Theme transition whitelist
  - `--theme-transition`

## Readability and Surfaces

- Text roles
  - `--color-text`
  - `--text-secondary`
  - `--text-tertiary`
  - `--block-title`
- Glass surfaces
  - `--glass-bg`
  - `--glass-bg-strong`
  - `--glass-border`
  - `--glass-highlight`

## Token Rules

- Do not hardcode `font-size`, `font-weight`, `letter-spacing`, or interaction timing in component styles.
- Prefer semantic text color tokens over ad-hoc color opacity.
- Use `--theme-transition` for global theme switches to avoid abrupt changes.
- Keep interactive feedback subtle and consistent (shared hover translation and elevation tokens).

## QA Checklist

- Typography scale is consistent across home, projects, skills, experience, and detail pages.
- Dark and light theme text contrast remains readable on glass surfaces.
- Hover and focus feedback is consistent between cards, links, chips, and nav controls.
- Markdown content uses typography tokens for headings and code.
- No new hardcoded typography values are introduced in `.module.scss` files.
