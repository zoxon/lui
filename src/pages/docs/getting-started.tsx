import type { TemplateResult } from '@zoxon/mater'
import { raw } from '@zoxon/mater'
import { CodeBlock } from '@/components/base/Code/index.js'
import { Content } from '@/components/base/Content/index.js'
import { PageHeader } from '@/components/docs/index.js'

export function renderDocsGettingStarted(): TemplateResult {
  return (
    <>
      <PageHeader
        title="Getting Started"
        desc="Clone the repository, run the docs locally, then compose Lui components as typed JSX functions."
      />

      <Content html={raw('<h2>Clone repository</h2><p>Packages are not published yet. Use the repository directly while Lui is in early development.</p>')} />
      <CodeBlock
        code={`git clone https://github.com/zoxon/lui.git
cd lui
pnpm install
pnpm dev`}
        lang="bash"
      />

      <Content html={raw('<h2>Import styles</h2><p>Import the CSS bundle once at your application entrypoint.</p>')} />
      <CodeBlock
        code={`import '@zoxon/lui/index.css'`}
        lang="ts"
      />

      <Content html={raw('<h2>Render a component</h2><p>Compose components as JSX and render the resulting TemplateResult only at the boundary.</p>')} />
      <CodeBlock
        code={`import { render } from '@zoxon/mater'
import { Button } from '@zoxon/lui/components/index.js'

const view = <Button label="Save" />
const htmlString = render(view)`}
        lang="tsx"
      />

      <Content html={raw('<h2>Mount in the browser</h2><p>Parse the rendered string and replace the target contents without assigning innerHTML.</p>')} />
      <CodeBlock
        code={`const parser = new DOMParser()
const doc = parser.parseFromString(render(view), 'text/html')

container.replaceChildren(...Array.from(doc.body.childNodes))`}
        lang="ts"
      />
    </>
  )
}
