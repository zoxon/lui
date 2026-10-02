import type { TemplateResult } from '@zoxon/mater'
import { raw } from '@zoxon/mater'

export interface ContentProps {
  html: string // trusted HTML from developer — NOT escaped
  class?: string
}

export function Content({ html: inner, class: className }: ContentProps): TemplateResult {
  return <div class={['content', className]}>{raw(inner)}</div>
}
