import type { TemplateResult } from '@zoxon/mater'
import { Radio } from '@/components/base/Radio/index.js'
import { PageHeader, Section } from '@/components/docs/index.js'

export function renderRadio(): TemplateResult {
  return (
    <>
      <PageHeader title="Radio" desc="Single selection control within a group of mutually exclusive options." />
      <Section
        title="States"
        canvasStyle="flex-direction:column;align-items:flex-start"
        canvas={(
          <>
            <Radio label="Unchecked" name="r1" value="a" />
            <Radio label="Checked" name="r1" value="b" checked />
            <Radio label="Disabled" name="r2" value="c" disabled />
            <Radio label="Checked + Disabled" name="r2" value="d" checked disabled />
          </>
        )}
        code={`<Radio label="Option A" name="group" value="a" />
<Radio label="Option B" name="group" value="b" checked />
<Radio label="Disabled" name="group" value="c" disabled />`}
      />
      <Section
        title="Group"
        canvasStyle="flex-direction:column;align-items:flex-start"
        canvas={(
          <>
            <Radio label="Monthly" name="billing" value="monthly" checked />
            <Radio label="Quarterly" name="billing" value="quarterly" />
            <Radio label="Annually" name="billing" value="annually" />
          </>
        )}
        code={`<Radio label="Monthly" name="billing" value="monthly" checked />
<Radio label="Quarterly" name="billing" value="quarterly" />
<Radio label="Annually" name="billing" value="annually" />`}
      />
    </>
  )
}
