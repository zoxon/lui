import type { TemplateResult } from '@zoxon/mater'
import { Select } from '@/components/base/Select/index.js'
import { Link, PageHeader, Section } from '@/components/docs/index.js'

export function renderSelect(): TemplateResult {
  const options = [
    { value: 'admin', label: 'Administrator' },
    { value: 'editor', label: 'Editor' },
    { value: 'viewer', label: 'Viewer' },
  ]

  return (
    <>
      <PageHeader
        title="Select"
        desc={(
          <>
            Dropdown for single or multiple choices. Uses
            {' '}
            <Link page="field">Field</Link>
            {' '}
            internally to render the label, hint, and error message.
          </>
        )}
      />
      <Section
        title="Single select"
        canvasStyle="flex-direction:column;max-width:420px;width:100%"
        canvas={(
          <>
            <Select label="Role" options={options} name="role1" />
            <Select label="Role (preselected)" options={options} name="role2" value="editor" />
            <Select label="Role (disabled)" options={options} name="role3" disabled />
          </>
        )}
        code={`<Select label="Role" options={options} name="role1" />
<Select label="Role (preselected)" options={options} name="role2" value="editor" />
<Select label="Role (disabled)" options={options} name="role3" disabled />`}
      />
      <Section
        title="States"
        canvasStyle="flex-direction:column;max-width:420px;width:100%"
        canvas={(
          <>
            <Select label="Role" options={options} name="rs1" hint="Determines what the user can access." />
            <Select label="Role" options={options} name="rs2" error="Please select a role." required />
          </>
        )}
        code={`<Select
  label="Role"
  options={options}
  name="rs1"
  hint="Determines what the user can access."
/>

<Select
  label="Role"
  options={options}
  name="rs2"
  error="Please select a role."
  required
/>`}
      />
      <Section
        title="Multiple select"
        canvasStyle="flex-direction:column;max-width:420px;width:100%"
        canvas={<Select label="Roles" options={options} name="roles" multiple value={['admin', 'editor']} />}
        code={`<Select
  label="Roles"
  options={options}
  name="roles"
  multiple
  value={['admin', 'editor']}
/>`}
      />
      <Section
        title="Sizes"
        canvasStyle="flex-direction:column;max-width:420px;width:100%"
        canvas={(
          <>
            <Select label="Small" options={options} name="ss1" size="sm" />
            <Select label="Medium" options={options} name="ss2" size="md" />
            <Select label="Large" options={options} name="ss3" size="lg" />
          </>
        )}
        code={`<Select label="Small" options={options} name="ss1" size="sm" />
<Select label="Medium" options={options} name="ss2" size="md" />
<Select label="Large" options={options} name="ss3" size="lg" />`}
      />
    </>
  )
}
