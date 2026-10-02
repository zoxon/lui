import type { RawHtml, TemplateResult } from '@zoxon/mater'

export interface DescriptionItem {
  label: string
  /**
   * Plain strings are escaped like any other user-supplied value. For
   * genuinely trusted markup, pass `raw(html)` or a composed `TemplateResult`
   * explicitly — this component never applies `raw()` on its own.
   */
  value: string | TemplateResult | RawHtml
}

export interface DescriptionListProps {
  items: DescriptionItem[]
  variant?: 'default' | 'plain' | 'bordered'
  class?: string
}

export function DescriptionList({ items, variant = 'default', class: className }: DescriptionListProps): TemplateResult {
  return (
    <dl class={['description-list', `description-list--variant-${variant}`, className]}>
      {items.map(({ label, value }) => (
        <div class="description-list__item">
          <span class="description-list__label">{label}</span>
          <span class="description-list__value">{value}</span>
        </div>
      ))}
    </dl>
  )
}
