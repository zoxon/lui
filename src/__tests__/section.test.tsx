import { render } from '@zoxon/mater'
import { describe, expect, it } from 'vitest'
import { Section } from '../components/docs/Section/index.js'

describe('docs Section', () => {
  it('renders code examples through highlighted CodeBlock', () => {
    const html = render(
      <Section
        title="Example"
        canvas="<button>Save</button>"
        code="const value = 1"
      />,
    )

    expect(html).toContain('docs-preview__code')
    expect(html).toContain('code-block')
    expect(html).toContain('class="language-tsx"')
    expect(html).toContain('hljs-')
  })
})
