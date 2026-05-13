# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm start` — dev server at http://localhost:3000 (CRA, hot reload).
- `npm run build` — production build into `build/`.
- `npm test` — Jest in interactive watch mode (CRA preset). Single test: `npm test -- --testPathPattern=App.test.js` (add `--watchAll=false` for one-shot CI runs).
- `npm run deploy` — runs `predeploy` (build) then `gh-pages -d build` to publish to GitHub Pages. The production site lives at `pewapplepie.github.io/jcapp`, so the app uses `basename="/jcapp"` only when `NODE_ENV === "production"` (see [src/App.js](src/App.js)). Local dev runs at the root path.

There is no separate lint command; ESLint runs as part of `react-scripts start`/`build` via the `react-app` preset in `package.json`.

## Firebase configuration

The app cannot start without Firebase env vars. Create `.env.local` (gitignored) with all six `REACT_APP_FIREBASE_*` keys consumed by [src/config/firebase.js](src/config/firebase.js). `FIREBASE_SETUP.md` documents the project/Firestore setup; `firestore.rules` is the deployed ruleset (public read on `blogs/` and `content/`, authenticated write, deny-all elsewhere). CRA inlines `REACT_APP_*` vars at build time — restart the dev server after editing `.env.local`.

## Architecture

Create React App single-page app. Two React contexts wrap the entire tree in [src/App.js](src/App.js):

- **`ThemeProvider`** ([src/context/ThemeContext.js](src/context/ThemeContext.js)) — dark/light toggle, defaults to dark. Components branch on `isDarkMode` to pick Tailwind classes; there is no Tailwind `dark:` variant config, so theming is manual via conditional class strings.
- **`AdminProvider`** ([src/context/AdminContext.js](src/context/AdminContext.js)) — the single source of truth for all editable content. On mount it subscribes to `onAuthStateChanged` and hydrates three things from Firestore:
  - `blogs/` collection (blog cards rendered on `/blogs`; doc IDs are stringified numeric IDs).
  - `content/about`, `content/getInTouch`, `content/cv` documents.
  - If a collection/document is empty, the provider seeds it with the `DEFAULT_*` constants defined at the top of that file — meaning the defaults in `AdminContext.js` are the canonical first-run schema. Add new editable fields there and in the matching admin editor under [src/components/admin/](src/components/admin/).
  
  Public pages read content via `useAdmin()`; the `/admin` panel writes via the provider's `addBlog`/`updateBlog`/`deleteBlog`/`update*Content` helpers, which call Firestore directly and then mirror state locally. Login uses Firebase Email/Password auth — admin user must be provisioned in the Firebase console.

Routing (all in [src/App.js](src/App.js)): `/`, `/about`, `/blogs`, `/cv`, `/rust_gameoflife`, `/new_project`, `/admin`, with `*` redirecting home. Some blog cards have `link: "rust_gameoflife"` or `"new_project"` — those are treated as in-app routes; external `https://` links open normally.

## Rust / WebAssembly Game of Life

[src/pages/GamePage.js](src/pages/GamePage.js) → [src/components/GameOfLife.js](src/components/GameOfLife.js) loads a precompiled WASM bundle from [src/components/rustyGame/pkg/](src/components/rustyGame/pkg/) (`wasm_game_of_life.js` + `_bg.wasm`). The Rust source is **not** in this repo — only the `wasm-pack` output is checked in. Treat `pkg/` as a vendored artifact; rebuilding it requires the upstream Rust project.

## Tailwind

[tailwind.config.js](tailwind.config.js) extends a custom palette (e.g. `light`, `dark`, `primary`, `ayo`, `darkslategray`) and sets `corePlugins.preflight: false` — Tailwind's CSS reset is disabled, so default browser styles (margins on `h1`, list bullets, etc.) still apply. Don't assume Preflight when adding new components.
