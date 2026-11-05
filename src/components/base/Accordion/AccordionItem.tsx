import type { RawHtml, TemplateResult } from '@zoxon/mater'

/**
 * Plain data describing one `<Accordion>` child. `AccordionItem` is only
 * ever consumed by `Accordion`, which reads this shape directly — it is
 * never rendered on its own.
 *
 * It is typed as `TemplateResult & {...}` (not a plain data interface)
 * because `@zoxon/mater`'s JSX runtime requires `JSX.Element = TemplateResult`
 * for any function used as a JSX component: `<AccordionItem>` would not
 * type-check otherwise. The value returned at runtime does **not** actually
 * implement `TemplateResult` (no `strings`/`values`/`dom`/`element`), so the
 * `as unknown as` cast below is a deliberate, narrow escape hatch for that
 * constraint — not a claim that the object is safe to `render()` or
 * interpolate directly. `Accordion` is the only intended consumer; it must
 * filter with `isAccordionItemNode` (see `Accordion.tsx`) rather than trust
 * this type at the boundary.
 */
export type AccordionItemNode = TemplateResult & {
  __type: 'accordion-item'
  title: string
  expanded: boolean
  children: string | TemplateResult | RawHtml
}

export interface AccordionItemProps {
  title: string
  expanded?: boolean
  children: string | TemplateResult | RawHtml
}

export function AccordionItem({ title, expanded = false, children }: AccordionItemProps): AccordionItemNode {
  return {
    __type: 'accordion-item',
    title,
    expanded,
    children,
  } as unknown as AccordionItemNode
}
