import type { TemplateResult } from '@zoxon/mater'

export interface CodeProps {
  code: string
  class?: string
}

export function Code({ code, class: className }: CodeProps): TemplateResult {
  return <code class={['code-inline', className]}>{code}</code>
}
