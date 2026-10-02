import type { TemplateResult } from '@zoxon/mater'
import { Toggle } from '@/components/base/Toggle/index.js'
import { PageHeader, Section } from '@/components/docs/index.js'

export function renderToggle(): TemplateResult {
  return (
    <>
      <PageHeader title="Toggle" desc="Binary on/off switch for settings and preferences." />
      <Section
        title="States"
        canvas={(
          <>
            <Toggle label="Off" name="tgl1" />
            <Toggle label="On" name="tgl2" checked />
            <Toggle label="Disabled Off" name="tgl3" disabled />
            <Toggle label="Disabled On" name="tgl4" checked disabled />
          </>
        )}
        code={`<Toggle label="Off" name="tgl1" />
<Toggle label="On" name="tgl2" checked />
<Toggle label="Disabled Off" name="tgl3" disabled />
<Toggle label="Disabled On" name="tgl4" checked disabled />`}
      />
    </>
  )
}
