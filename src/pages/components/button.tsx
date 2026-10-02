import type { TemplateResult } from '@zoxon/mater'
import { Button } from '@/components/base/Button/index.js'
import { PageHeader, Section } from '@/components/docs/index.js'

export function renderButton(): TemplateResult {
  return (
    <>
      <PageHeader title="Button" desc="Triggers actions or navigates to a new location." />
      <Section
        title="Variants and themes"
        canvas={(
          <>
            <Button label="Default" />
            <Button label="Outline" variant="outline" />
            <Button label="Ghost success" variant="ghost" theme="success" />
            <Button label="Soft danger" variant="soft" theme="danger" />
          </>
        )}
        code={`<Button label="Default" />
<Button label="Outline" variant="outline" />
<Button label="Ghost success" variant="ghost" theme="success" />
<Button label="Soft danger" variant="soft" theme="danger" />`}
      />
      <Section
        title="Sizes"
        canvas={(
          <>
            <Button label="Small" size="sm" />
            <Button label="Medium" size="md" />
            <Button label="Large" size="lg" />
          </>
        )}
        code={`<Button label="Small" size="sm" />
<Button label="Medium" size="md" />
<Button label="Large" size="lg" />`}
      />
      <Section
        title="Disabled"
        canvas={(
          <>
            <Button label="Default" disabled />
            <Button label="Outline" variant="outline" disabled />
            <Button label="Ghost" variant="ghost" disabled />
            <Button label="Danger" theme="danger" disabled />
          </>
        )}
        code={`<Button label="Default" disabled />
<Button label="Outline" variant="outline" disabled />
<Button label="Ghost" variant="ghost" disabled />
<Button label="Danger" theme="danger" disabled />`}
      />
    </>
  )
}
