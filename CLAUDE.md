# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Lui (`@zoxon/lui`) — minimalist, framework-free TypeScript/JSX component library. Components are pure functions returning `TemplateResult` from `@zoxon/mater` (no VDOM, no runtime framework). The repo is meant to be **cloned and adapted**, not installed from npm: the docs site under `src/pages/` is simultaneously the component catalogue and a runnable reference app, and `src/components/base/`, `src/tokens/`, `src/styles/` are the intended customization points. `@zoxon/lui/config` is the one published entry point (`src/config.ts`), used by consumer `lui.config.ts` files.

`AGENTS.md` contains the authoritative component-authoring rules (file layout, JSX conventions, escaping rules, BEM naming, new-component checklist) — read it before adding or modifying a component.

## Commands

```bash
pnpm dev                 # Vite dev server (docs site) at http://localhost:5173
pnpm build               # Build docs site via lui.config.ts -> dist/
pnpm preview             # Serve the existing dist/ build
pnpm test                # Run all unit tests (Vitest, environment: 'node')
pnpm test:watch          # Watch mode
pnpm test -- button      # Run a single suite (substring match on filename)
pnpm typecheck           # tsc --noEmit
pnpm lint                # ESLint check (@antfu/eslint-config, no Prettier)
pnpm lint:fix            # ESLint auto-fix
```

CI (`.github/workflows/ci.yml`) runs `typecheck` → `lint` → `test` → `build` in that order on every PR and push to `main` — run the same sequence locally before considering work done. Note: `.github/workflows/deploy.yml` builds and deploys to Cloudflare Pages independently of CI and does **not** wait for CI to pass, so a red test suite does not by itself block a deploy.

## Architecture

### Build/dev/prerender pipeline

`src/cli.ts` (invoked as `pnpm lui <command>`, aliased by the `dev`/`build`/`preview` scripts) is the sole orchestrator. It loads `lui.config.ts`/`.js`/`.mjs` (`src/config.ts`), builds a Vite config (`src/vite.ts`), and dispatches:
- `dev` — plain Vite dev server.
- `preview` — Vite preview of the existing `outDir`.
- `build` — behavior depends on `lui.config.ts`'s `output` mode:
  - `'spa'` — one direct Vite build into `outDir`, producing a standard client-routed SPA shell.
  - `'static'` (default) — Vite builds into a throwaway `.lui/` temp directory with a manifest, then `src/prerender.ts` reads that manifest, server-renders every route in `src/routes.ts`/`src/page-paths.ts` via `@zoxon/mater`'s `render()`, and writes one `index.html` per route into `outDir`. The temp directory is always cleaned up in a `finally`.

### Client boot and routing

`src/main.ts` branches on `import.meta.env.LUI_STATIC` (set only by the static build):
- **Static/prerendered pages**: just call `initComponents({ scope: '#root' })` from `@zoxon/nux` to hydrate interactive widgets already present in the server-rendered DOM.
- **SPA/dev pages**: additionally load `src/bootstrap.ts`, which mounts `App()` client-side and starts `src/router.ts` — a thin wrapper around Navigo keyed off `src/page-paths.ts`/`src/routes.ts`. On navigation, the router does `contentEl.replaceChildren(...)` (via `DOMParser`, never `innerHTML` — see Security below) and re-runs `initComponents`.

`src/App.tsx`, `src/page-paths.ts`, `src/routes.ts`, and `src/page-constants.ts` are the single source of truth for page identity/URL/nav structure, consumed identically by the prerenderer and the client router — when adding a route, all of these plus `src/main.ts`'s route registration need to stay in sync.

### Interactive components

Components with client-side behavior (`Accordion`, `Drawer`, `FileInput`, `Modal`, `NotificationBoard`, `Spoiler`, `Tabs`) are `@zoxon/nux` components auto-discovered via `data-component`/`data-ref` attributes, each with a `scripts.ts`/`client.ts` module imported centrally from `src/client.ts`. Each follows a "destroyable singleton instance" pattern: a `__instance` reference on the element plus an `AbortController` for its listeners, with a `destroyPreviousInstance()` guard to avoid double-binding when the same DOM node is re-initialized. **Known gap**: this guard only fires when `@zoxon/nux` re-initializes the *same* element — on SPA navigation the router replaces the whole `#content` subtree, so old instances (and their `document`-level listeners, e.g. Modal/Drawer's Escape-key handler) are never explicitly torn down.

### Security constraint

Never assign `innerHTML` on live DOM elements — a PreToolUse hook blocks it. Use `DOMParser` + `replaceChildren` instead, matching `src/router.ts`/`src/bootstrap.ts`:

```typescript
const doc = parser.parseFromString(render(view), 'text/html')
contentEl.replaceChildren(...Array.from(doc.body.childNodes))
```

### Escaping rule (component props)

- User-supplied strings (labels, names, values, hrefs) → auto-escaped by the `html` tag / plain JSX interpolation.
- Content props (`children`, `footer`, `actions`, tab/accordion item content) accept `string | TemplateResult | RawHtml`. A plain string is **escaped**; trusted markup is passed explicitly as `raw(html)` or composed JSX. Components never call `raw()` on a caller's string. `Content.html` accepts only `RawHtml | TemplateResult`. The only internal `raw()` is `CodeBlock` on highlight.js output.

### Testing conventions

Tests live in `src/__tests__/`, one file per component, running in Vitest's `node` environment (no DOM/happy-dom for component tests). `src/__tests__/setup.ts` extends `toContain` to auto-stringify a `TemplateResult`, so assertions read as `expect(Component(props)).toContain('...')` without a `String()` wrapper — this is a substring match against the full rendered HTML, not a structural/DOM assertion, so prefer checking for individual class names/attributes rather than one exact, fully-ordered class string (the latter breaks on harmless `clsx()` reordering).
