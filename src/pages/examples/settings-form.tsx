import type { TemplateResult } from '@zoxon/mater'
import { PageHeader, Section } from '@/components/docs/index.js'
import { Alert, Button, Checkbox, Field, Select, TextField, Toggle } from '@/components/index.js'

export function renderSettingsForm(): TemplateResult {
  const regionOptions = [
    { value: 'us', label: 'United States' },
    { value: 'eu', label: 'Europe' },
    { value: 'apac', label: 'Asia Pacific' },
  ]

  const form = (
    <form class="form">
      <div class="form__item">
        <Alert theme="info" title="Draft settings">
          Changes are staged locally in this example.
        </Alert>
      </div>
      <div class="form__item">
        <Field label="Project name" id="project-name" required hint="Visible to everyone in the workspace.">
          <TextField id="project-name" name="projectName" value="Lui Admin" required />
        </Field>
      </div>
      <div class="form__item">
        <Field label="Support email" id="support-email" hint="Used in notification footers.">
          <TextField id="support-email" name="supportEmail" type="email" value="support@example.com" />
        </Field>
      </div>
      <div class="form__item">
        <Select
          label="Default region"
          name="region"
          value="eu"
          options={regionOptions}
          hint="Used for new resources."
        />
      </div>
      <div class="form__item">
        <div class="form__stack">
          <Toggle label="Require two-factor authentication" name="twoFactor" checked />
          <Checkbox label="Send weekly usage summary" name="weeklySummary" checked />
        </div>
      </div>
      <div class="form__actions">
        <Button label="Save changes" type="submit" />
        <Button label="Cancel" type="button" variant="ghost" />
      </div>
    </form>
  )

  return (
    <>
      <PageHeader title="Settings Form" desc="A composed settings form with validation copy, toggles, and save actions." />
      <Section
        title="Project settings"
        canvasStyle="width:100%;align-items:stretch"
        canvas={form}
        code={`<Field label="Project name" id="project-name" required>
  <TextField id="project-name" value="Lui Admin" required />
</Field>`}
      />
    </>
  )
}
