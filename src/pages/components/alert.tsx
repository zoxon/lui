import type { TemplateResult } from '@zoxon/mater'
import { Alert } from '@/components/base/Alert/index.js'
import { PageHeader, Section } from '@/components/docs/index.js'

export function renderAlert(): TemplateResult {
  return (
    <>
      <PageHeader title="Alert" desc="Static feedback message for important page-level status." />
      <Section
        title="Themes"
        canvasStyle="flex-direction:column;align-items:stretch;width:100%"
        canvas={(
          <>
            <Alert title="Info">Informational message.</Alert>
            <Alert theme="success" title="Success">The action completed.</Alert>
            <Alert theme="warning" title="Warning">Check this before continuing.</Alert>
            <Alert theme="danger" title="Danger">The action failed.</Alert>
          </>
        )}
        code={`<Alert title="Info">Informational message.</Alert>
<Alert theme="success" title="Success">The action completed.</Alert>
<Alert theme="warning" title="Warning">Check this before continuing.</Alert>
<Alert theme="danger" title="Danger">The action failed.</Alert>`}
      />
      <Section
        title="Closable markup"
        canvasStyle="flex-direction:column;align-items:stretch;width:100%"
        canvas={<Alert title="Dismissible" closable>Close button markup only.</Alert>}
        code={`<Alert title="Dismissible" closable>Close button markup only.</Alert>`}
      />
    </>
  )
}
