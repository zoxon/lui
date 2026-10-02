import type { TemplateResult } from '@zoxon/mater'
import { DescriptionList } from '@/components/base/DescriptionList/index.js'
import { PageHeader, Section } from '@/components/docs/index.js'

export function renderDescriptionList(): TemplateResult {
  const items = [
    { label: 'Name', value: 'John Doe' },
    { label: 'Role', value: 'Administrator' },
    { label: 'Email', value: 'john@example.com' },
  ]

  return (
    <>
      <PageHeader title="DescriptionList" desc="Structured key-value pairs for displaying entity details." />
      <Section
        title="Default layout"
        canvasStyle="width:100%"
        canvas={<DescriptionList items={items} />}
        code={`<DescriptionList
  items={[
    { label: 'Name', value: 'John Doe' },
    { label: 'Role', value: 'Administrator' },
    { label: 'Email', value: 'john@example.com' },
  ]}
/>`}
      />
      <Section
        title="Plain variant"
        canvasStyle="width:100%"
        canvas={<DescriptionList items={items} variant="plain" />}
        code={`<DescriptionList items={items} variant="plain" />`}
      />
      <Section
        title="Bordered variant"
        canvasStyle="width:100%"
        canvas={<DescriptionList items={items} variant="bordered" />}
        code={`<DescriptionList items={items} variant="bordered" />`}
      />
    </>
  )
}
