import type { TemplateResult } from '@zoxon/mater'
import { Code } from '@/components/base/Code/index.js'
import { Field } from '@/components/base/Field/index.js'
import { TextField } from '@/components/base/TextField/index.js'
import { Link, PageHeader, Section } from '@/components/docs/index.js'

export function renderTextField(): TemplateResult {
  return (
    <>
      <PageHeader
        title="TextField"
        desc={(
          <>
            Renders a single-line
            {' '}
            <Code code="<input>" />
            {' '}
            or multi-line
            {' '}
            <Code code="<textarea>" />
            . Use inside
            {' '}
            <Link page="field">Field</Link>
            {' '}
            to add a label, hint, and error message.
          </>
        )}
      />
      <Section
        title="Input types"
        canvasStyle="flex-direction:column;max-width:420px;width:100%"
        canvas={(
          <>
            <Field label="Text" id="tf-text"><TextField name="tf-text" type="text" placeholder="Plain text" /></Field>
            <Field label="Email" id="tf-email"><TextField name="tf-email" type="email" placeholder="user@example.com" /></Field>
            <Field label="Password" id="tf-pass"><TextField name="tf-pass" type="password" placeholder="Enter password" /></Field>
            <Field label="Number" id="tf-num"><TextField name="tf-num" type="number" placeholder="0" /></Field>
          </>
        )}
        code={`<Field label="Text" id="tf-text">
  <TextField name="tf-text" type="text" />
</Field>

<Field label="Email" id="tf-email">
  <TextField name="tf-email" type="email" />
</Field>

<Field label="Password" id="tf-pass">
  <TextField name="tf-pass" type="password" />
</Field>`}
      />
      <Section
        title="Textarea"
        canvasStyle="flex-direction:column;max-width:420px;width:100%"
        canvas={<Field label="Message" id="tf-ta"><TextField name="tf-ta" type="textarea" rows={4} placeholder="Enter your message..." /></Field>}
        code={`<Field label="Message" id="tf-ta">
  <TextField name="tf-ta" type="textarea" rows={4} />
</Field>`}
      />
      <Section
        title="Sizes"
        canvasStyle="flex-direction:column;max-width:420px;width:100%"
        canvas={(
          <>
            <Field label="Small" id="tf-sm"><TextField name="tf-sm" size="sm" placeholder="Small" /></Field>
            <Field label="Medium" id="tf-md"><TextField name="tf-md" size="md" placeholder="Medium (default)" /></Field>
            <Field label="Large" id="tf-lg"><TextField name="tf-lg" size="lg" placeholder="Large" /></Field>
          </>
        )}
        code={`<TextField name="tf-sm" size="sm" />
<TextField name="tf-md" size="md" />
<TextField name="tf-lg" size="lg" />`}
      />
      <Section
        title="States"
        canvasStyle="flex-direction:column;max-width:420px;width:100%"
        canvas={(
          <>
            <Field label="Disabled" id="tf-dis"><TextField name="tf-dis" placeholder="Disabled" disabled /></Field>
            <Field label="With value" id="tf-val"><TextField name="tf-val" value="Prefilled value" /></Field>
          </>
        )}
        code={`<TextField name="tf-dis" disabled />
<TextField name="tf-val" value="Prefilled value" />`}
      />
    </>
  )
}
