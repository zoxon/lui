import type { TemplateResult } from '@zoxon/mater'
import { StatusDot } from '@/components/base/StatusDot/index.js'
import { PageHeader, Section } from '@/components/docs/index.js'

export function renderStatusDot(): TemplateResult {
  return (
    <>
      <PageHeader title="StatusDot" desc="Visual indicator dot in one of four semantic colors." />
      <Section
        title="Colors with labels"
        canvas={(
          <>
            <StatusDot status="green" label="Online" />
            <StatusDot status="yellow" label="Away" />
            <StatusDot status="red" label="Busy" />
            <StatusDot status="gray" label="Offline" />
          </>
        )}
        code={`<StatusDot status="green" label="Online" />
<StatusDot status="yellow" label="Away" />
<StatusDot status="red" label="Busy" />
<StatusDot status="gray" label="Offline" />`}
      />
      <Section
        title="Sizes"
        canvas={(
          <>
            <StatusDot status="green" size="sm" />
            <StatusDot status="green" size="md" />
            <StatusDot status="green" size="lg" />
          </>
        )}
        code={`<StatusDot status="green" size="sm" />
<StatusDot status="green" size="md" />
<StatusDot status="green" size="lg" />`}
      />
    </>
  )
}
