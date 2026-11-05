import type { RawHtml, TemplateResult } from '@zoxon/mater'
import { Icon } from '@/components/base/Icon/index.js'

export interface SpoilerProps {
  label: string
  children: string | TemplateResult | RawHtml
  expanded?: boolean
  class?: string
}

export function Spoiler({ label, children, expanded = false, class: className }: SpoilerProps): TemplateResult {
  return (
    <details class={['spoiler', expanded && 'spoiler--expanded', className]} data-component="spoiler" open={expanded}>
      <summary class="spoiler__trigger" data-ref="spoiler:trigger">
        {label}
        <Icon name="ui/chevron-down" class="spoiler__icon" />
      </summary>
      <div class="spoiler__content" data-ref="spoiler:content">
        {children}
      </div>
    </details>
  )
}
