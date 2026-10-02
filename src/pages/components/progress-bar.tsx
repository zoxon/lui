import type { TemplateResult } from '@zoxon/mater'
import { ProgressBar } from '@/components/base/ProgressBar/index.js'
import { PageHeader, Section } from '@/components/docs/index.js'

export function renderProgressBar(): TemplateResult {
  return (
    <>
      <PageHeader title="ProgressBar" desc="Visual indicator of task or loading progress." />
      <Section
        title="Themes"
        canvasStyle="flex-direction:column;width:100%"
        canvas={(
          <>
            <ProgressBar value={60} />
            <ProgressBar value={60} theme="success" />
            <ProgressBar value={60} theme="warning" />
            <ProgressBar value={60} theme="danger" />
          </>
        )}
        code={`<ProgressBar value={60} />
<ProgressBar value={60} theme="success" />
<ProgressBar value={60} theme="warning" />
<ProgressBar value={60} theme="danger" />`}
      />
      <Section
        title="Sizes"
        canvasStyle="flex-direction:column;width:100%"
        canvas={(
          <>
            <ProgressBar value={60} size="sm" />
            <ProgressBar value={60} size="md" />
            <ProgressBar value={60} size="lg" />
          </>
        )}
        code={`<ProgressBar value={60} size="sm" />
<ProgressBar value={60} size="md" />
<ProgressBar value={60} size="lg" />`}
      />
      <Section
        title="With label"
        canvasStyle="flex-direction:column;width:100%"
        canvas={<ProgressBar value={60} showValue label="Loading..." />}
        code={`<ProgressBar value={60} showValue label="Loading..." />`}
      />
    </>
  )
}
