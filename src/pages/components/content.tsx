import type { TemplateResult } from '@zoxon/mater'
import { raw } from '@zoxon/mater'
import { Content } from '@/components/base/Content/index.js'
import { PageHeader, Section } from '@/components/docs/index.js'

export function renderContent(): TemplateResult {
  return (
    <>
      <PageHeader title="Content" desc="Prose content wrapper for rich text areas." />
      <Section
        title="Basic content"
        canvasStyle="flex-direction:column;width:100%"
        canvas={(
          <Content html={raw('<h2>Getting Started</h2><p>Welcome to Lui. This is a <strong>rich text</strong> content area that supports full HTML.</p><ul><li>Install the package</li><li>Import the CSS tokens</li><li>Use the components</li></ul>')} />
        )}
        code={`<Content html={raw("<h2>Getting Started</h2><p>Welcome to Lui.</p>...")} />`}
      />
      <Section
        title="With custom class"
        canvasStyle="flex-direction:column;width:100%"
        canvas={<Content html={raw('<p>A simple paragraph wrapped in the content component.</p>')} class="content--compact" />}
        code={`<Content html={raw("<p>A simple paragraph.</p>")} class="content--compact" />`}
      />
    </>
  )
}
