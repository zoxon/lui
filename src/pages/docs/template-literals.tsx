import type { TemplateResult } from '@zoxon/mater'
import { html, raw } from '@zoxon/mater'
import { CodeBlock } from '@/components/base/Code/index.js'
import { PageHeader, Section } from '@/components/docs/index.js'

export function renderDocsTemplateLiterals(): TemplateResult {
  const list = ['Escaped text', 'Nested templates', 'Attribute sugar']

  return (
    <>
      <PageHeader
        title="Template Literals"
        desc="The html tag is safe by default: text is escaped, nested templates compose, and raw HTML stays explicit."
      />

      <Section
        title="Safe interpolation"
        canvasStyle="flex-direction:column;align-items:stretch;width:100%"
        canvas={(
          <CodeBlock
            code={html`<p>${'<script>alert("x")</script>'}</p>`.html.value}
            lang="html"
          />
        )}
        code={`html\`<p>\${'<script>alert("x")</script>'}</p>\``}
      />

      <Section
        title="Composition"
        canvasStyle="flex-direction:column;align-items:stretch;width:100%"
        canvas={(
          <CodeBlock
            code={html`<ul>${list.map(item => html`<li>${item}</li>`)}</ul>`.html.value}
            lang="html"
          />
        )}
        code={`const list = ['Escaped text', 'Nested templates']
html\`<ul>\${list.map(item => html\`<li>\${item}</li>\`)}</ul>\``}
      />

      <Section
        title="Attributes and trusted HTML"
        canvasStyle="flex-direction:column;align-items:stretch;width:100%"
        canvas={(
          <CodeBlock
            code={html`<button attrs=${{
              disabled: true,
              class: [
                'button',
                'button--variant-outline',
                'button--theme-default',
                'button--size-md',
              ],
            }}>${raw('<strong>Save</strong>')}</button>`.html.value}
            lang="html"
          />
        )}
        code={`html\`<button attrs=\${{ disabled: true, class: ['button', 'button--variant-outline', 'button--theme-default', 'button--size-md'] }}>
  \${raw('<strong>Save</strong>')}
</button>\``}
      />
    </>
  )
}
