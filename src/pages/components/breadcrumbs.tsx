import type { TemplateResult } from '@zoxon/mater'
import { Breadcrumbs } from '@/components/base/Breadcrumbs/index.js'
import { PageHeader, Section } from '@/components/docs/index.js'

export function renderBreadcrumbs(): TemplateResult {
  return (
    <>
      <PageHeader title="Breadcrumbs" desc="Navigation trail for page hierarchy." />
      <Section
        title="Default"
        canvas={(
          <Breadcrumbs items={[
            { label: 'Home', href: '#index' },
            { label: 'Components', href: '#button' },
            { label: 'Breadcrumbs' },
          ]}
          />
        )}
        code={`<Breadcrumbs items={[
  { label: 'Home', href: '#index' },
  { label: 'Components', href: '#button' },
  { label: 'Breadcrumbs' },
]} />`}
      />
    </>
  )
}
