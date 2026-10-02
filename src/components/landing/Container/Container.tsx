import type { TemplateResult } from '@zoxon/mater'
import clsx from 'clsx'

export interface ContainerProps {
  class?: string
  children: TemplateResult | TemplateResult[]
}

export function Container({ class: className, children }: ContainerProps): TemplateResult {
  return <div class={clsx('landing-container', className)}>{children}</div>
}
