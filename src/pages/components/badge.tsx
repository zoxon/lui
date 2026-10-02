import type { TemplateResult } from '@zoxon/mater'
import { Badge } from '@/components/base/Badge/index.js'
import { PageHeader, Section } from '@/components/docs/index.js'

export function renderBadge(): TemplateResult {
  return (
    <>
      <PageHeader title="Badge" desc="Small label used to highlight status or category." />
      <Section
        title="Themes"
        canvas={(
          <>
            <Badge label="Default" />
            <Badge label="Success" theme="success" />
            <Badge label="Warning" theme="warning" />
            <Badge label="Danger" theme="danger" />
            <Badge label="Info" theme="info" />
          </>
        )}
        code={`<Badge label="Default" />
<Badge label="Success" theme="success" />
<Badge label="Warning" theme="warning" />
<Badge label="Danger" theme="danger" />
<Badge label="Info" theme="info" />`}
      />
      <Section
        title="Sizes"
        canvas={(
          <>
            <Badge label="Small" size="sm" />
            <Badge label="Medium" size="md" />
          </>
        )}
        code={`<Badge label="Small" size="sm" />
<Badge label="Medium" size="md" />`}
      />
    </>
  )
}
