import type { TemplateResult } from '@zoxon/mater'
import { getPagePath } from '@/page-paths.js'

export interface LinkProps {
  page: string
  class?: string
  children?: string | number | TemplateResult
}

export function Link({ page, class: className, children }: LinkProps): TemplateResult {
  return (
    <a class={className} href={getPagePath(page)} data-page={page} data-navigo>
      {children}
    </a>
  )
}
