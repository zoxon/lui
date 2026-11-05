import { describe, expect, it } from 'vitest'
import { Breadcrumbs } from '../components/base/Breadcrumbs/index.js'

describe('breadcrumbs', () => {
  it('renders linked and current items', () => {
    const html = Breadcrumbs({
      items: [
        { label: 'Home', href: '/' },
        { label: 'Category', href: '/category' },
        { label: 'Page' },
      ],
    })

    expect(html).toContain('class="breadcrumbs"')
    expect(html).toContain('aria-label="Breadcrumb"')
    expect(html).toContain('href="/"')
    expect(html).toContain('href="/category"')
    expect(html).toContain('aria-current="page"')
    expect(html).toContain('Page')
  })

  it('escapes labels and href values', () => {
    const html = Breadcrumbs({
      items: [
        { label: '<Home>', href: '/?q="<x>"' },
        { label: '<Page>' },
      ],
    })

    expect(html).not.toContain('<Home>')
    expect(html).not.toContain('<Page>')
    expect(html).toContain('&lt;Home&gt;')
    expect(html).toContain('/?q=&quot;&lt;x&gt;&quot;')
  })

  it('supports custom aria label and class', () => {
    const html = Breadcrumbs({
      label: 'Path',
      class: 'page__breadcrumbs',
      items: [
        { label: 'Page' },
      ],
    })
    expect(html).toContain('aria-label="Path"')
    expect(html).toContain('class="breadcrumbs page__breadcrumbs"')
  })
})
