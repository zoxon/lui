import type { TemplateResult } from '@zoxon/mater'
import { raw } from '@zoxon/mater'
import { CodeBlock } from '@/components/base/Code/index.js'
import { Content } from '@/components/base/Content/index.js'
import { PageHeader } from '@/components/docs/index.js'

export function renderDocsRendering(): TemplateResult {
  return (
    <>
      <PageHeader
        title="DOM & HTML Output"
        desc="TemplateResult is the source of truth. Use string or DOM projections only at system boundaries."
      />

      <Content html={raw('<h2>HTML string boundary</h2><p>Use <code>render(view)</code> when an integration expects an HTML string.</p>')} />
      <CodeBlock
        code={`import { render } from '@zoxon/mater'

const htmlString = render(<Button label="Save" />)`}
        lang="tsx"
      />

      <Content html={raw('<h2>DOM projections</h2><p>Use DOM projections only in browser boundaries that need real nodes.</p>')} />
      <CodeBlock
        code={`const view = <Button label="Save" />

view.html    // SafeHtml, memoized
view.dom     // fresh DocumentFragment
view.element // fresh Element, requires one root element`}
        lang="tsx"
      />

      <Content html={raw('<h2>Server-side string rendering</h2><p>On the server, keep the output as a string. Call <code>render(view)</code>, then place the string into your HTTP response, template shell, or static file writer.</p>')} />
      <CodeBlock
        code={`import { render } from '@zoxon/mater'
import { Button } from '@zoxon/lui/components/index.js'

const view = <Button label="Save" />
const htmlString = render(view)

return \`<!doctype html><body>\${htmlString}</body>\``}
        lang="tsx"
      />

      <Content html={raw('<h2>Router boundary pattern</h2><p>The docs app parses the rendered string and swaps nodes at the route boundary.</p>')} />
      <CodeBlock
        code={`const doc = parser.parseFromString(render(renderFn()), 'text/html')
contentEl.replaceChildren(...Array.from(doc.body.childNodes))`}
        lang="ts"
      />
    </>
  )
}
