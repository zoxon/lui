import type { RawHtml, TemplateResult } from '@zoxon/mater'

export interface ContentProps {
  html: RawHtml | TemplateResult // trusted markup — wrap strings in raw()
  class?: string
}

export function Content({ html: inner, class: className }: ContentProps): TemplateResult {
  return <div class={['content', className]}>{inner}</div>
}
