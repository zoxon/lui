import type { TemplateResult } from '@zoxon/mater'
import { raw } from '@zoxon/mater'
import { Badge } from '@/components/base/Badge/index.js'
import { Button } from '@/components/base/Button/index.js'
import { CodeBlock } from '@/components/base/Code/index.js'
import { PageHeader, Section } from '@/components/docs/index.js'

export function renderDocsJsx(): TemplateResult {
  return (
    <>
      <PageHeader
        title="JSX"
        desc="The local JSX runtime compiles TSX elements into TemplateResult values, preserving the same safe rendering rules."
      />

      <Section
        title="Component authoring"
        canvas={<Button label="Save" variant="outline" />}
        code={`import type { TemplateResult } from '@zoxon/mater'

export function Action(): TemplateResult {
  return <Button label="Save" variant="outline" />
}`}
      />

      <Section
        title="Attributes"
        canvas={(
          <>
            <Badge label="Default" />
            <Badge label="Success" theme="success" />
            <Button label="Disabled" disabled />
          </>
        )}
        code={`<>
  <Badge label="Default" />
  <Badge label="Success" theme="success" />
  <Button label="Disabled" disabled />
</>`}
      />

      <Section
        title="Trusted HTML"
        canvasStyle="flex-direction:column;align-items:stretch;width:100%"
        canvas={(
          <CodeBlock code={(<p>{raw('<strong>Trusted</strong> HTML')}</p>).html.value} lang="html" />
        )}
        code={`<p>{raw('<strong>Trusted</strong> HTML')}</p>`}
      />
    </>
  )
}
