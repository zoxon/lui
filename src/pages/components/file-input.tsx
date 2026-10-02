import type { TemplateResult } from '@zoxon/mater'
import { FileInput } from '@/components/base/FileInput/index.js'
import { PageHeader, Section } from '@/components/docs/index.js'

export function renderFileInput(): TemplateResult {
  return (
    <>
      <PageHeader title="FileInput" desc="Styled file picker that wraps the native input." />
      <Section
        title="Default"
        canvas={<FileInput label="Attachment" name="file" hint="PNG, JPG, PDF up to 10 MB" />}
        code={`<FileInput label="Attachment" name="file" hint="PNG, JPG, PDF up to 10 MB" />`}
      />
      <Section
        title="Accept & multiple"
        canvas={<FileInput label="Images" name="images" accept="image/*" multiple />}
        code={`<FileInput label="Images" name="images" accept="image/*" multiple />`}
      />
      <Section
        title="Error state"
        canvas={<FileInput label="Document" name="doc" error="File is required" required />}
        code={`<FileInput label="Document" name="doc" error="File is required" required />`}
      />
      <Section
        title="Disabled"
        canvas={<FileInput label="Upload" name="upload" disabled hint="Upload is disabled" />}
        code={`<FileInput label="Upload" name="upload" disabled hint="Upload is disabled" />`}
      />
    </>
  )
}
