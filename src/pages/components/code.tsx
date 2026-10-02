import type { TemplateResult } from '@zoxon/mater'
import { Code, CodeBlock } from '@/components/base/Code/index.js'
import { PageHeader, Section } from '@/components/docs/index.js'

export function renderCode(): TemplateResult {
  const tsxCode = `interface ButtonProps {
  variant?: 'primary' | 'secondary'
}

export function Button(props: ButtonProps) {
  return <button class="button">{props.variant}</button>
}`

  const htmlCode = `<article class="card">
  <h2>Admin DS</h2>
  <p>Safe HTML string rendering.</p>
</article>`

  return (
    <>
      <PageHeader
        title="Code"
        desc="Inline and block code display with optional language labels and terminal style."
      />
      <Section
        title="Inline code"
        canvas={(
          <p>
            Use
            {' '}
            <Code code="const x = 1" />
            {' '}
            to declare a constant.
          </p>
        )}
        code={`<Code code="const x = 1" />`}
      />
      <Section
        title="Highlighted TypeScript"
        canvasStyle="flex-direction:column;width:100%;padding:0"
        canvas={<CodeBlock code={tsxCode} lang="tsx" filename="Button.tsx" />}
        code={`<CodeBlock code={tsxCode} lang="tsx" filename="Button.tsx" />`}
      />
      <Section
        title="Highlighted HTML"
        canvasStyle="flex-direction:column;width:100%;padding:0"
        canvas={<CodeBlock code={htmlCode} lang="html" />}
        code={`<CodeBlock code={htmlCode} lang="html" />`}
      />
      <Section
        title="Terminal modifier"
        canvasStyle="flex-direction:column;width:100%;padding:0"
        canvas={<CodeBlock code={'pnpm install\npnpm run dev'} lang="bash" terminal />}
        code={`<CodeBlock code={'pnpm install\\npnpm run dev'} lang="bash" terminal />`}
      />
    </>
  )
}
