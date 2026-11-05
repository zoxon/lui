# Lui — Agent Instructions

## Project Overview

Lui (Lightweight User Interface) — minimalist cross-framework UI library. TypeScript functions that return `TemplateResult` from `@zoxon/mater` — no framework, no virtual DOM. Runtime dependencies: `@zoxon/mater` and `clsx`.

## Commands

```bash
pnpm dev           # Vite dev server at http://localhost:5173 (docs site)
pnpm test          # Run all unit tests (Vitest)
pnpm test:watch    # Watch mode
pnpm build         # Build docs site to dist/docs/
pnpm tsc --noEmit  # Type-check only
pnpm lint          # ESLint check
pnpm lint:fix      # ESLint auto-fix
```

## Repository Layout

```text
src/
  components/      # 21 components — each exports Props interface + TemplateResult function
  components/docs/ # Docs-only components: Layout, Sidebar, Nav, Section, PageHeader, TokenGrid
  __tests__/       # One test file per component (+ html.test.ts)
    setup.ts        # Vitest toContain custom matcher (auto-stringifies TemplateResult)
  tokens/          # CSS Custom Properties: colors, spacing, radius, shadows, typography
  styles/          # reset.css, base.css, components.css, docs.css
  utils/
    html.ts        # re-export shim from @zoxon/mater
  pages/           # 23 render functions (tokens + 22 components)
  index.css        # Barrel: @import tokens, styles/reset, styles/base, styles/components
  index.html       # Minimal SPA shell (just <script>)
  main.ts          # mount() + hash router + theme toggle
```

## Tech Stack

- **TypeScript 5.4** — strict, ESM
- **Vite 5.2** — dev server, `root: src/`, `@` alias → project root
- **Vitest 1.5** — `environment: 'node'`, test files in `src/__tests__/`
- **@zoxon/mater** — external Mater TemplateResult runtime
- **clsx 2.1** — class merging (used inside `@zoxon/mater`)
- **ESLint + @antfu/eslint-config** — linting and formatting (no Prettier)

## Import Rules

- Always use `.js` extension on internal imports: `import { Button } from '../components/button.js'`
- Use the `@` alias (points to project root): `import { Button } from '@/components/base/Button/index.js'`
- Import `html`, `raw`, `render`, `TemplateResult` from `@zoxon/mater`: `import { html, raw } from '@zoxon/mater'`
- Import CSS via alias: `import '@/styles/docs.css'`

## Component Authoring

Every component is a TypeScript function returning `TemplateResult`:

```typescript
import type { TemplateResult } from '@zoxon/mater'

export interface XxxProps { /* ... */ }
export function Xxx(props: XxxProps): TemplateResult {
  return <div>...</div>
}
```

Prefer JSX syntax everywhere it is practical.
JSX is the default syntax for components in this repo: use it for component bodies, composition, and nested UI structure unless there is a concrete reason not to.
Use `<Icon ... />`, `<Button ... />`, and similar JSX directly instead of `${Icon(props)}` inside `html`` templates`.
Do not introduce new component interpolation inside `html`` templates when the same output can be expressed with JSX.
Use `html`` only when JSX is not a good fit; otherwise prefer JSX first.

**Escaping rule:**

- User-supplied strings (labels, names, values, hrefs) → auto-escaped by `html` tag
- Content props (children, footer, actions, item content) → plain strings are escaped; pass trusted markup as `raw(value)` or JSX (`string | TemplateResult | RawHtml`)
- Boolean attributes (disabled, checked, open) → inline: `disabled=${value}` — omits attribute when false/null/undefined

**Composition rule:**

- Nest components directly with JSX: `<Button ... />`, not `${Button(props)}`
- Do not call `raw()` on a caller's string inside a component; interpolate it (`{children}`) and let it be escaped. `raw()` belongs at the call site
- Convert to string only at system boundaries: `render(view)` → pass to `parseFromString`, serialization, etc.

**Class naming:** BEM — block, `block__element`, `block--modifier`. Key-value props use `block--prop-value` (`button--variant-ghost`, `button--theme-success`, `button--size-sm`). Boolean props use `block--prop` (`spoiler--expanded`, `button--pill`). clsx for conditional classes.

**Component file structure:**

Each component lives in its own directory:

```text
src/components/base/Button/
  Button.ts     # Props interface + TemplateResult function
  index.ts      # re-exports: `export { Button } from './Button.js'`
  styles.css    # BEM styles for this component
  scripts.ts    # client-side JS (only if needed — Accordion, Drawer, FileInput, Modal, Spoiler, Tabs)
```

Rule: one component per file.
Rule: prefer `.tsx` for component files so JSX stays the primary authoring style.
If a parent component has related child components, keep them in the same folder, but give each child its own file, for example `Tabs.tsx` and `TabsItem.tsx`.

No `helpers.ts` or placeholder `scripts.ts` — create `scripts.ts` only when there is actual client-side behaviour.

**New component checklist:**

1. Write failing test in `src/__tests__/<name>.test.ts`
2. Confirm test fails
3. Implement `src/components/base/<Name>/<Name>.ts` (returns `TemplateResult`)
4. Confirm test passes
5. Create `src/components/base/<Name>/index.ts` re-exporting component + props type
6. Export from `src/components/base/index.ts`
7. Add CSS to `src/styles/components/<name>.css` + `@import` in `components.css`
8. Add docs page to `src/pages/<name>.ts` + register route in `src/main.ts`

## Security Constraints

The PreToolUse hook blocks `innerHTML` assignment on live DOM elements.
`src/main.ts` uses `DOMParser` + `replaceChildren` instead:

```typescript
const doc = parser.parseFromString(render(view), 'text/html')
contentEl.replaceChildren(...Array.from(doc.body.childNodes))
```

Never use `innerHTML` assignment in docs runtime code.

## CSS Conventions

- All values come from tokens (`var(--color-*)`, `var(--spacing-*)`, etc.) — no hardcoded hex/px
- Dark mode: `[data-theme="dark"]` on `:root` overrides all color tokens
- Each component has its own CSS file in `src/styles/components/<name>.css`
- Docs components have CSS in `src/styles/components/docs/<name>.css`

## Testing

Tests use `environment: 'node'` — no DOM. Each test imports the component and checks output via `toContain`:

```typescript
import { Button } from '@/components/base/Button/index.js'

it('renders label', () => {
  expect(Button({ label: 'OK' })).toContain('>OK<')
})
```

`src/__tests__/setup.ts` extends Vitest `toContain` to auto-stringify `TemplateResult`, so no `String()` wrapper is needed.

Run a single suite: `pnpm test -- button`
