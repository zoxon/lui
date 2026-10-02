import type { TemplateResult } from '@zoxon/mater'
import { Checkbox } from '@/components/base/Checkbox/index.js'
import { PageHeader, Section } from '@/components/docs/index.js'

export function renderCheckbox(): TemplateResult {
  return (
    <>
      <PageHeader title="Checkbox" desc="Binary selection control for forms." />
      <Section
        title="States"
        canvas={(
          <>
            <Checkbox label="Unchecked" name="cb1" />
            <Checkbox label="Checked" name="cb2" checked />
            <Checkbox label="Disabled" name="cb3" disabled />
            <Checkbox label="Checked + Disabled" name="cb4" checked disabled />
          </>
        )}
        canvasStyle="flex-direction:column;align-items:flex-start"
        code={`<Checkbox label="Unchecked" name="cb1" />
<Checkbox label="Checked" name="cb2" checked />
<Checkbox label="Disabled" name="cb3" disabled />
<Checkbox label="Checked + Disabled" name="cb4" checked disabled />`}
      />
    </>
  )
}
