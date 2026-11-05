import type { TemplateResult } from '@zoxon/mater'
import { raw } from '@zoxon/mater'

export interface PageHeaderProps {
  title: string
  desc: string | TemplateResult // trusted HTML string or JSX content
}

export function PageHeader({ title, desc }: PageHeaderProps): TemplateResult {
  return (
    <>
      <h1 class="docs-page__title">{title}</h1>
      <p class="docs-page__desc">
        {typeof desc === 'string'
          ? raw(desc)
          : desc}
      </p>
    </>
  )
}
