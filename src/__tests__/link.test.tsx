import { render } from '@zoxon/mater'
import { describe, expect, it } from 'vitest'
import { Link } from '../components/docs/Link'

describe('docs Link', () => {
  it('renders a history-api navigo link for a page', () => {
    const html = render(<Link class="docs-nav__link" page="docs-jsx">JSX</Link>)

    expect(html).toContain('<a')
    expect(html).toContain('class="docs-nav__link"')
    expect(html).toContain('href="/docs/jsx"')
    expect(html).toContain('data-page="docs-jsx"')
    expect(html).toContain('data-navigo')
    expect(html).toContain('>JSX</a>')
  })
})
