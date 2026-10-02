import { render } from '@zoxon/mater'
import { describe, expect, it } from 'vitest'
import { Code } from '../components/base/Code/index.js'
import { Link, PageHeader } from '../components/docs/index.js'

describe('pageHeader', () => {
  it('accepts JSX descriptions for docs links and inline code', () => {
    const html = render(
      <PageHeader
        title="TextField"
        desc={(
          <>
            Renders a single-line
            {' '}
            <Code code="<input>" />
            . Use inside
            {' '}
            <Link page="field">Field</Link>
            .
          </>
        )}
      />,
    )

    expect(html).toContain('&lt;input&gt;')
    expect(html).toContain('href="/field"')
    expect(html).toContain('data-navigo')
  })
})
