import type { TemplateResult } from '@zoxon/mater'
import { Button } from '@/components/base/Button/index.js'
import { Card } from '@/components/base/Card/index.js'
import { PageHeader, Section } from '@/components/docs/index.js'

export function renderCard(): TemplateResult {
  return (
    <>
      <PageHeader title="Card" desc="Container for related content and actions." />
      <Section
        title="Basic card"
        canvas={(
          <Card
            title="Card Title"
            footer={<span>Footer content</span>}
          >
            <p>This is the card body content. It can contain any HTML.</p>
          </Card>
        )}
        code={`<Card
  title="Card Title"
  footer={<span>Footer content</span>}
>
  <p>This is the card body content.</p>
</Card>`}
      />
      <Section
        title="With subtitle and actions"
        canvas={(
          <Card
            title="Dashboard"
            subtitle="Overview of your account"
            actions={<Button label="Edit" variant="outline" size="sm" />}
          >
            <p>Key metrics and activity are shown here.</p>
          </Card>
        )}
        code={`<Card
  title="Dashboard"
  subtitle="Overview of your account"
  actions={<Button label="Edit" variant="outline" size="sm" />}
>
  <p>Key metrics and activity.</p>
</Card>`}
      />
      <Section
        title="Body-only card"
        canvas={<Card><p>A minimal card with just a body.</p></Card>}
        code="<Card><p>A minimal card with just a body.</p></Card>"
      />
    </>
  )
}
