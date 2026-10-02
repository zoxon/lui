import type { TemplateResult } from '@zoxon/mater'
import { Field } from '@/components/base/Field/index.js'
import { Select } from '@/components/base/Select/index.js'
import { TextField } from '@/components/base/TextField/index.js'
import { PageHeader, Section } from '@/components/docs/index.js'

export function renderField(): TemplateResult {
  const roleOptions = [
    { value: 'admin', label: 'Administrator' },
    { value: 'editor', label: 'Editor' },
    { value: 'viewer', label: 'Viewer' },
  ]

  return (
    <>
      <PageHeader
        title="Field"
        desc="Universal form field wrapper. Renders a label, hint, and error message around any form control (TextField, Select, Checkbox, etc.)."
      />
      <Section
        title="States"
        canvasStyle="flex-direction:column;max-width:420px;width:100%"
        canvas={(
          <>
            <Field label="Default" id="f1"><TextField name="f1" placeholder="Enter text..." /></Field>
            <Field label="With hint" id="f2" hint="This is a hint message."><TextField name="f2" placeholder="Enter text..." /></Field>
            <Field label="With error" id="f3" error="This field is required."><TextField name="f3" placeholder="Enter text..." /></Field>
            <Field label="Required" id="f4" required><TextField name="f4" placeholder="Enter text..." required /></Field>
          </>
        )}
        code={`<Field label="Default" id="f1">
  <TextField name="f1" placeholder="Enter text..." />
</Field>

<Field label="With hint" id="f2" hint="This is a hint message.">
  <TextField name="f2" placeholder="Enter text..." />
</Field>

<Field label="With error" id="f3" error="This field is required.">
  <TextField name="f3" placeholder="Enter text..." />
</Field>

<Field label="Required" id="f4" required>
  <TextField name="f4" required />
</Field>`}
      />
      <Section
        title="Wrapping Select"
        canvasStyle="flex-direction:column;max-width:420px;width:100%"
        canvas={(
          <>
            <Select label="Role" options={roleOptions} name="role1" hint="Choose the user role." />
            <Select label="Role" options={roleOptions} name="role2" error="Selection is required." required />
          </>
        )}
        code={`// Select uses Field internally
<Select label="Role" options={options} name="role1" hint="Choose the user role." />
<Select label="Role" options={options} name="role2" error="Selection is required." required />`}
      />
      <Section
        title="Custom children"
        canvasStyle="flex-direction:column;max-width:420px;width:100%"
        desc="<p class='docs-page__desc' style='margin-bottom:var(--spacing-3)'>Pass any TemplateResult or trusted HTML string as <code>children</code>.</p>"
        canvas={(
          <Field label="Avatar upload" id="avatar-upload" hint="PNG or JPG, max 2 MB.">
            <input type="file" id="avatar-upload" accept="image/*" style="font-size:var(--text-body-sm-size)" />
          </Field>
        )}
        code={`<Field label="Avatar upload" id="avatar-upload" hint="PNG or JPG, max 2 MB.">
  <input type="file" id="avatar-upload" accept="image/*" />
</Field>`}
      />
    </>
  )
}
