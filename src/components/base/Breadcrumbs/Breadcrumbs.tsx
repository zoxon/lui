import type { TemplateResult } from '@zoxon/mater'

export interface BreadcrumbsItem {
  label: string
  href?: string
}

export interface BreadcrumbsProps {
  items: BreadcrumbsItem[]
  label?: string
  class?: string
}

export function Breadcrumbs({ items, label = 'Breadcrumb', class: className }: BreadcrumbsProps): TemplateResult {
  return (
    <nav class={['breadcrumbs', className]} aria-label={label}>
      <ol class="breadcrumbs__list">
        {items.map(item => (
          <li class="breadcrumbs__item">
            {item.href
              ? <a class="breadcrumbs__link" href={item.href}>{item.label}</a>
              : <span class="breadcrumbs__current" aria-current="page">{item.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  )
}
