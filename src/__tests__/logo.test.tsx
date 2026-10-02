import { describe, expect, it } from 'vitest'
import { Logo } from '../components/docs/Logo/index.js'

describe('logo', () => {
  it('renders the landing wordmark as a home link', () => {
    const html = Logo({ class: 'docs-sidebar__logo' })

    expect(html).toContain('class="logo docs-sidebar__logo"')
    expect(html).toContain('href="/"')
    expect(html).toContain('data-navigo')
    expect(html).toContain('>Lui<')
  })
})
