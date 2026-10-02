# Lui

**L**ightweight **U**ser **I**nterface — minimalist cross-framework UI library. Components are pure TypeScript/JSX functions that return `TemplateResult` from `@zoxon/mater` — no framework, no virtual DOM.

## Start from Lui

Clone Lui and adapt its components, tokens, styles, and docs to your product:

```bash
git clone https://github.com/zoxon/lui.git
cd lui
pnpm install
pnpm dev      # docs site at http://localhost:5173
```

The local docs site is both the component catalogue and a runnable reference application.

## Customize

- `src/components/base/` — UI primitives to adapt or compose.
- `src/tokens/` and `src/styles/` — design tokens and global styling.
- `src/pages/` — runnable examples and documentation pages.

Components use the existing Vite `@/` alias:

```tsx
import { Button } from '@/components/base/Button/index.js'

export function SaveAction() {
  return <Button label="Save" />
}
```

## Components

| Component | Description |
|-----------|-------------|
| `Accordion` | Collapsible content panels |
| `Avatar` | User avatar with initials fallback |
| `Badge` | Status and label badges |
| `Button` | Action button with variants and sizes |
| `Card` | Content container with header/footer |
| `Checkbox` | Checkbox input with label |
| `Code` | Inline and block code display |
| `Content` | Rich text content wrapper |
| `DescriptionList` | Key-value pairs |
| `Drawer` | Side panel overlay |
| `Field` | Form field wrapper with label and error |
| `FileInput` | File upload input |
| `Footer` | Page footer |
| `Header` | Page header with navigation |
| `Icon` | SVG icon via sprite (`ui/name` format) |
| `Modal` | Dialog overlay |
| `ProgressBar` | Progress indicator |
| `Radio` | Radio input with label |
| `Select` | Dropdown select |
| `Spoiler` | Toggleable hidden content |
| `StatusDot` | Colored status indicator |
| `Table` | Data table |
| `Tabs` | Tabbed interface |
| `TextField` | Text input with label |
| `Toggle` | Toggle switch |

## Design tokens

CSS Custom Properties defined in `src/tokens/`:

- `--color-*` — semantic colors (bg, text, border, accent)
- `--spacing-*` — spacing scale (1–16)
- `--radius-*` — border radius (sm, md, lg, full)
- `--shadow-*` — box shadows
- `--text-*` — typography (size, weight, line-height)
- `--font-family-*` — font stacks

Dark mode: set `data-theme="dark"` on `<html>`.

## Project structure

```
src/
  components/        # base components — Props interface + TemplateResult function
  icons/             # SVG source files (ui/*.svg)
  tokens/            # CSS Custom Properties
  styles/            # reset, base, components layers
  components/docs/   # docs-only layout, nav, page header, token grid
  pages/             # Docs page renderers
  App.tsx            # Docs app shell
  main.ts            # Docs entrypoint
```

## Development

```bash
pnpm typecheck     # Type-check only
pnpm test          # Run all unit tests
pnpm test:watch    # Watch mode
pnpm lint          # ESLint check
pnpm lint:fix      # ESLint auto-fix
```

## Build

### Lui

The standard commands use the root `lui.config.ts`:

```bash
pnpm dev       # Start the development server
pnpm build     # Build according to lui.config.ts
pnpm preview   # Serve the existing dist/ build
```

```ts
// lui.config.ts
import { defineConfig } from '@zoxon/lui/config'

export default defineConfig({
  output: 'static',
  outDir: './dist',
})
```

`output` may be `'static'` (the default) or `'spa'`. Set `vite` for optional Vite overrides:

```ts
export default defineConfig({
  vite: { base: '/docs/' },
})
```

Static mode writes one `index.html` per route; SPA mode writes Vite's standard application shell. Both write to `outDir`. Client JavaScript, CSS, and other assets are content-hashed under `assets/`.

`lui.config.js` and `lui.config.mjs` are also supported.

### Vite compatibility

Projects that need direct Vite control can invoke it without using the Lui scripts:

```bash
pnpm exec vite
pnpm exec vite build
pnpm exec vite preview
```

## Quality checks

```bash
pnpm typecheck     # Type-check only
pnpm test          # Run all unit tests
pnpm test:watch    # Watch mode
pnpm lint          # ESLint check
pnpm lint:fix      # ESLint auto-fix
```

## Tech stack

- **TypeScript 5** — strict, ESM
- **Vite 5** — dev server and build
- **Vitest** — unit tests (node environment, no DOM)
- **PostCSS** — postcss-import, postcss-nested, autoprefixer
- **ESLint + @antfu/eslint-config** — linting and formatting
- **@zoxon/mater** — external Mater TemplateResult runtime
