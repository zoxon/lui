import type { TemplateResult } from '@zoxon/mater'
import clsx from 'clsx'

export interface LogoProps {
  class?: string
}

export function Logo({ class: className }: LogoProps = {}): TemplateResult {
  return <a class={clsx('logo', className)} href="/" data-navigo>Lui</a>
}
