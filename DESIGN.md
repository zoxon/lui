# Lui — Design Reference

Lui (Lightweight User Interface) — minimalist cross-framework UI library. Monochromatic (slate) palette with semantic color accents, 4px base grid, Inter + JetBrains Mono typefaces.

---

## Architecture

All components are **pure TypeScript functions** returning HTML strings:

```typescript
function Component(props: ComponentProps): string
```

No framework. No virtual DOM. No runtime state. Consumers render the string into the DOM however they choose.

**Two content categories:**
- **User-supplied strings** (labels, names, values, hrefs) — always HTML-escaped via `escapeHtml()`
- **Trusted markup** (body, footer, actions, content fields) — typed `string | TemplateResult | RawHtml`: a plain string is escaped, trusted HTML is passed explicitly with `raw()` or composed as JSX

---

## Design Tokens

Defined as CSS Custom Properties in `src/tokens/`. Applied globally via `src/index.css`.

### Colors

| Token | Light | Dark |
|---|---|---|
| `--color-bg-canvas` | `#FFFFFF` | `#0F172A` |
| `--color-bg-default` | `#F8FAFC` | `#1E293B` |
| `--color-bg-subtle` | `#F1F5F9` | `#334155` |
| `--color-bg-muted` | `#E2E8F0` | `#475569` |
| `--color-bg-inverse` | `#0F172A` | `#F8FAFC` |
| `--color-text-primary` | `#0F172A` | `#F1F5F9` |
| `--color-text-secondary` | `#475569` | `#94A3B8` |
| `--color-text-tertiary` | `#94A3B8` | `#475569` |
| `--color-text-disabled` | `#CBD5E1` | `#334155` |
| `--color-text-inverse` | `#FFFFFF` | `#0F172A` |
| `--color-border-default` | `#E2E8F0` | `#1E293B` |
| `--color-border-subtle` | `#F1F5F9` | `#0F172A` |
| `--color-border-strong` | `#CBD5E1` | `#334155` |
| `--color-accent-default` | `#0F172A` | `#F1F5F9` |
| `--color-accent-hover` | `#1E293B` | `#FFFFFF` |
| `--color-accent-muted` | `#F1F5F9` | `#1E293B` |
| `--color-accent-on-accent` | `#FFFFFF` | `#0F172A` |
| `--color-success-default` | `#16A34A` | `#4ADE80` |
| `--color-success-bg` | `#F0FDF4` | `#052E16` |
| `--color-warning-default` | `#D97706` | `#FCD34D` |
| `--color-warning-bg` | `#FFFBEB` | `#1C1200` |
| `--color-error-default` | `#DC2626` | `#FCA5A5` |
| `--color-error-bg` | `#FEF2F2` | `#1F0A0A` |
| `--color-info-default` | `#2563EB` | `#93C5FD` |
| `--color-info-bg` | `#EFF6FF` | `#0F1E3D` |

Dark mode activates when `data-theme="dark"` is present on `:root`.

### Spacing (4px base grid)

| Token | Value |
|---|---|
| `--spacing-1` | `4px` |
| `--spacing-2` | `8px` |
| `--spacing-3` | `12px` |
| `--spacing-4` | `16px` |
| `--spacing-5` | `20px` |
| `--spacing-6` | `24px` |
| `--spacing-8` | `32px` |
| `--spacing-10` | `40px` |
| `--spacing-12` | `48px` |
| `--spacing-16` | `64px` |
| `--spacing-20` | `80px` |

### Border Radius

| Token | Value |
|---|---|
| `--radius-none` | `0` |
| `--radius-xs` | `2px` |
| `--radius-sm` | `4px` |
| `--radius-md` | `6px` |
| `--radius-lg` | `8px` |
| `--radius-xl` | `12px` |
| `--radius-2xl` | `16px` |
| `--radius-full` | `9999px` |

### Shadows

| Token | Value |
|---|---|
| `--shadow-xs` | `0 1px 2px rgba(0,0,0,.06)` |
| `--shadow-sm` | `0 1px 3px rgba(0,0,0,.1), 0 1px 2px rgba(0,0,0,.06)` |
| `--shadow-md` | `0 4px 6px -1px rgba(0,0,0,.1), 0 2px 4px -1px rgba(0,0,0,.06)` |
| `--shadow-lg` | `0 10px 15px -3px rgba(0,0,0,.1), 0 4px 6px -2px rgba(0,0,0,.05)` |
| `--shadow-xl` | `0 20px 25px -5px rgba(0,0,0,.1), 0 10px 10px -5px rgba(0,0,0,.04)` |

### Typography

| Token | Value |
|---|---|
| `--font-family-base` | `'Inter', system-ui, sans-serif` |
| `--font-family-mono` | `'JetBrains Mono', 'Fira Code', monospace` |
| `--text-heading-h1-size` | `24px` / weight `600` |
| `--text-heading-h2-size` | `20px` / weight `600` |
| `--text-heading-h3-size` | `16px` / weight `600` |
| `--text-heading-h4-size` | `14px` / weight `600` |
| `--text-body-lg-size` | `16px` |
| `--text-body-md-size` | `14px` |
| `--text-body-sm-size` | `12px` |
| `--text-label-lg-size` | `14px` / weight `500` |
| `--text-label-md-size` | `12px` / weight `500` |
| `--text-label-sm-size` | `11px` / weight `500` |

---

## Component API Reference

Import from the barrel: `import { Button, Badge } from '@ds/components/index.js'`
Or directly: `import { Button } from '@ds/components/button.js'`

### Core

#### Button
```typescript
interface ButtonProps {
  label: string
  color?: 'default' | 'secondary' | 'ghost' | 'danger'  // default: 'default'
  size?: 'sm' | 'md' | 'lg'                              // default: 'md'
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'                   // default: 'button'
  class?: string
}
```

#### Badge
```typescript
interface BadgeProps {
  label: string
  color?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'dark'
  size?: 'sm' | 'md'  // default: 'md'
}
```

#### StatusDot
```typescript
interface StatusDotProps {
  status: 'online' | 'away' | 'busy' | 'offline'
  size?: 'sm' | 'md' | 'lg'   // default: 'md'
  label?: string               // shown next to dot
}
```

#### Avatar
```typescript
interface AvatarProps {
  initials?: string
  src?: string                                       // image URL
  alt?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'          // default: 'md'
  status?: 'online' | 'away' | 'busy' | 'offline'   // optional badge
  class?: string
}
```

---

### Form

#### Checkbox
```typescript
interface CheckboxProps {
  name: string
  label?: string
  checked?: boolean
  disabled?: boolean
  value?: string
  class?: string
}
```

#### Toggle
```typescript
interface ToggleProps {
  name: string
  label?: string
  checked?: boolean
  disabled?: boolean
  value?: string
  class?: string
}
```
Uses CSS `:has()` for checked state — no JS required.

#### TextField
```typescript
interface TextFieldProps {
  label: string
  name: string
  type?: 'text' | 'email' | 'password' | 'number' | 'search' | 'textarea'
  placeholder?: string
  value?: string
  hint?: string
  error?: string
  required?: boolean
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'  // default: 'md'
  rows?: number               // for textarea, default: 4
  class?: string
}
```

#### Select
```typescript
interface SelectOption {
  value: string
  label: string
}

interface SelectProps {
  label: string
  name: string
  options: SelectOption[]
  value?: string | string[]   // string[] for multiple
  multiple?: boolean
  required?: boolean
  disabled?: boolean
  error?: string
  hint?: string
  size?: 'sm' | 'md' | 'lg'  // default: 'md'
  class?: string
}
```

---

### Display

#### ProgressBar
```typescript
interface ProgressBarProps {
  value: number                                  // 0–100
  max?: number                                   // default: 100
  color?: 'default' | 'success' | 'warning' | 'error'
  size?: 'sm' | 'md' | 'lg'
  label?: string
  showValue?: boolean
  class?: string
}
```

#### Card
```typescript
interface CardProps {
  title?: string      // escaped
  subtitle?: string   // escaped
  body: string | TemplateResult | RawHtml        // string: escaped; raw() or JSX for markup
  footer?: string | TemplateResult | RawHtml     // string: escaped; raw() or JSX for markup
  actions?: string | TemplateResult | RawHtml    // string: escaped; raw() or JSX for markup — rendered in card header next to title
  class?: string
}
```

#### DescriptionList
```typescript
interface DescriptionItem {
  label: string                          // escaped
  value: string | TemplateResult | RawHtml  // string: escaped; wrap with raw() or compose JSX for trusted markup
}

interface DescriptionListProps {
  items: DescriptionItem[]
  variant?: 'default' | 'plain' | 'bordered'  // default: 'default'
  class?: string
}
```

#### Table
```typescript
interface TableColumn {
  key: string
  label: string
}

interface TableRow {
  [key: string]: string
}

interface TableProps {
  columns: TableColumn[]
  rows: TableRow[]
  striped?: boolean
  class?: string
}
```

---

### Rich

#### Code (inline)
```typescript
interface CodeProps {
  code: string   // escaped
  class?: string
}
function Code(props: CodeProps): string
```

#### CodeBlock
```typescript
interface CodeBlockProps {
  code: string       // escaped
  lang?: string      // shown in header if no filename
  filename?: string  // shown in header, takes priority over lang
  terminal?: boolean // applies --terminal modifier
  class?: string
}
function CodeBlock(props: CodeBlockProps): string
```

#### Tabs
```typescript
interface TabItem {
  id: string
  label: string   // escaped
  content: string | TemplateResult | RawHtml // string: escaped; raw() or JSX for markup
}

interface TabsProps {
  items: TabItem[]
  activeId?: string                 // defaults to first item
  variant?: 'default' | 'pills'
  class?: string
}
```
Static HTML with `aria-selected`. Consumer adds click interactivity.

#### Accordion
```typescript
interface AccordionItem {
  id: string
  label: string   // escaped
  content: string | TemplateResult | RawHtml // string: escaped; raw() or JSX for markup
  open?: boolean
}

interface AccordionProps {
  items: AccordionItem[]
  multiple?: boolean  // default: false — adds data-single="true" for JS single-open
  class?: string
}
```
Uses native `<details>`/`<summary>` — interactive without JS.

#### Spoiler
```typescript
interface SpoilerProps {
  label: string   // escaped
  content: string | TemplateResult | RawHtml // string: escaped; raw() or JSX for markup
  open?: boolean
  class?: string
}
```
Uses native `<details>`/`<summary>`.

---

### Layout

#### Modal
```typescript
interface ModalProps {
  title: string           // escaped
  body: string | TemplateResult | RawHtml            // string: escaped; raw() or JSX for markup
  footer?: string | TemplateResult | RawHtml         // string: escaped; raw() or JSX for markup
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'  // default: 'md'
  class?: string
}
```
Renders `.modal-backdrop` + `.modal` as static HTML. Consumer manages open/close state.

#### Drawer
```typescript
interface DrawerProps {
  title: string            // escaped
  body: string | TemplateResult | RawHtml             // string: escaped; raw() or JSX for markup
  footer?: string | TemplateResult | RawHtml          // string: escaped; raw() or JSX for markup
  side?: 'left' | 'right' | 'top' | 'bottom'  // default: 'right'
  class?: string
}
```
Renders `.drawer-backdrop` + `.drawer` as static HTML. Consumer manages open/close state.

#### Header
```typescript
interface NavLink {
  label: string
  href: string
  active?: boolean
}

interface HeaderProps {
  logo: string          // escaped
  navLinks: NavLink[]
  actions?: string | TemplateResult | RawHtml      // string: escaped; raw() or JSX for markup (buttons, avatar, etc.)
  class?: string
}
```

#### Footer
```typescript
interface FooterLink {
  label: string
  href: string
}

interface FooterProps {
  copyright: string     // escaped
  links?: FooterLink[]
  class?: string
}
```

#### Content
```typescript
interface ContentProps {
  html: RawHtml | TemplateResult  // trusted markup — wrap strings in raw()
  class?: string
}
```

---

## CSS Class Reference (BEM)

Each component maps to predictable BEM classes:

| Component | Root class | Key elements/modifiers |
|---|---|---|
| Button | `.btn` | `--default`, `--secondary`, `--ghost`, `--danger`, `--sm`, `--md`, `--lg` |
| Badge | `.badge` | `--default`, `--success`, `--warning`, `--error`, `--info`, `--dark`, `--sm`, `--md` |
| StatusDot | `.status-dot` | `--online`, `--away`, `--busy`, `--offline`, `--sm`, `--md`, `--lg` |
| Avatar | `.avatar` | `--xs/sm/md/lg/xl`, `__initials`, `__img`, `__status` |
| Checkbox | `.checkbox` | `__input`, `__indicator`, `__label` |
| Toggle | `.toggle` | `__input`, `__track`, `__thumb`, `__label` |
| TextField | `.field` | `__label`, `__input`, `__textarea`, `__hint`, `__error`, `--sm/md/lg`, `--error` |
| Select | `.field` | same as TextField + `__select` |
| ProgressBar | `.progress` | `__track`, `__bar`, `__label`, `__value`, `--success/warning/error`, `--sm/md/lg` |
| Card | `.card` | `__header`, `__title`, `__subtitle`, `__actions`, `__body`, `__footer` |
| DescriptionList | `.dl` | `__item`, `__label`, `__sep`, `__value`, `--plain`, `--bordered` |
| Table | `.table-wrap` | `.table`, `__head`, `__body`, `__th`, `__tr`, `__td`, `--striped` |
| Code | `.code-inline` | — |
| CodeBlock | `.code-block` | `__header`, `__pre`, `--terminal` |
| Tabs | `.tabs` | `__nav`, `__tab`, `__panel`, `--pills` |
| Accordion | `.accordion` | `__item` (`<details>`), `__trigger` (`<summary>`), `__content`, `__icon` |
| Spoiler | `.spoiler` | `__trigger` (`<summary>`), `__content`, `__icon` |
| Modal | `.modal-backdrop` | `.modal`, `__header`, `__title`, `__body`, `__footer`, `--sm/md/lg/xl/full` |
| Drawer | `.drawer-backdrop` | `.drawer`, `__header`, `__title`, `__body`, `__footer`, `--left/right/top/bottom` |
| Header | `.site-header` | `__logo`, `__nav`, `__nav-link`, `__nav-link--active`, `__actions` |
| Footer | `.site-footer` | `__copyright`, `__links`, `__link` |
| Content | `.content` | — |
