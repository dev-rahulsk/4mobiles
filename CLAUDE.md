# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

This is the **4Mobiles** website — a Dutch mobile phone repair shop (Naaldwijk/Westland). The site is a single-page marketing/landing page built from a Claude Design prototype (see `project/` for the original HTML prototype).

## Commands

All commands run from the `app/` directory:

```bash
cd app
npm run dev      # dev server (Vite)
npm run build    # tsc + vite build → app/dist/
npm run preview  # preview the production build
```

No linter or test suite is configured.

## Architecture

### Two-folder layout

- `project/` — original Claude Design HTML/JSX prototype files. **Reference only** — the source of truth for visual design decisions, not production code.
- `app/` — the production Vite + React + TypeScript implementation.

### App structure

- `app/src/App.tsx` — root component. Defines the two CSS custom properties (`--accent: #7AB827`, `--accent-dark`) that cascade everywhere via `document.documentElement.style`. Renders all page sections in order.
- `app/src/index.css` — the entire stylesheet in a single file using design tokens (CSS variables). All component-level styling lives here, not in component files.
- `app/src/components/` — one file per page section (no sub-folders). Components receive `accent` as a prop where they need the brand color inline (not via CSS var).
- `app/src/assets/frames_no_bg/` — 115 PNG frames of the phone animation (named `frame_00001.png` … `frame_00115.png`), imported via `import.meta.glob`.

### Responsive hero strategy

There are **two separate hero components**:
- `Hero.tsx` — desktop hero with a `PhoneIllustration` SVG (`Phone3D.tsx`) and a repair-finder UI. Hidden below 768 px via CSS.
- `MobileHero.tsx` — mobile hero with a scroll-driven canvas animation that cycles through the 115 frames in `assets/frames_no_bg/`. Shown only below 768 px. Uses a 200 vh scroll container with a sticky inner panel; scroll progress drives frame index, text fade, phone scale/translate/rotate.

### Styling conventions

- Design tokens are defined in `:root` in `index.css`; never hardcode colors, shadows, or radii inline unless the value must be dynamic (e.g., `accent` prop passed to an SVG `stroke`).
- Utility class names follow a flat BEM-ish convention (`.hero`, `.hero-inner`, `.hero-title`, etc.) — all defined in `index.css`.
- The accent color is set dynamically in `App.tsx`; changing `ACCENT` there propagates to all CSS-var consumers and to components that accept the `accent` prop.
