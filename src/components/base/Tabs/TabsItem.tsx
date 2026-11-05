import type { RawHtml, TemplateResult } from '@zoxon/mater'

/**
 * Plain data describing one `<Tabs>` child. `TabsItem` is only ever
 * consumed by `Tabs`, which reads this shape directly — it is never
 * rendered on its own.
 *
 * It is typed as `TemplateResult & {...}` (not a plain data interface)
 * because `@zoxon/mater`'s JSX runtime requires `JSX.Element = TemplateResult`
 * for any function used as a JSX component: `<TabsItem>` would not type-check
 * otherwise. The value returned at runtime does **not** actually implement
 * `TemplateResult` (no `strings`/`values`/`dom`/`element`), so the `as unknown
 * as` cast below is a deliberate, narrow escape hatch for that constraint —
 * not a claim that the object is safe to `render()` or interpolate directly.
 * `Tabs` is the only intended consumer; it must filter with `isTabsItemNode`
 * (see `Tabs.tsx`) rather than trust this type at the boundary.
 */
export type TabsItemNode = TemplateResult & {
  __type: 'tabs-item'
  title: string
  selected: boolean
  children: string | TemplateResult | RawHtml
}

export interface TabsItemProps {
  title: string
  selected?: boolean
  children: string | TemplateResult | RawHtml
}

export function TabsItem({ title, selected = false, children }: TabsItemProps): TabsItemNode {
  return {
    __type: 'tabs-item',
    title,
    selected,
    children,
  } as unknown as TabsItemNode
}
