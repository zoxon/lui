import { describe, expect, it } from 'vitest'
import { Footer } from '../components/base/Footer/index.js'

describe('footer', () => {
  it('renders footer with copyright', () => {
    const html = Footer({ copyright: '© 2024 Acme Corp' })
    expect(html).toContain('site-footer')
    expect(html).toContain('site-footer__copyright')
    expect(html).toContain('© 2024 Acme Corp')
  })

  it('renders footer links', () => {
    const html = Footer({
      copyright: '© Acme',
      links: [
        { label: 'Privacy', href: '/privacy' },
        { label: 'Terms', href: '/terms' },
      ],
    })
    expect(html).toContain('site-footer__links')
    expect(html).toContain('site-footer__link')
    expect(html).toContain('Privacy')
    expect(html).toContain('href="/privacy"')
  })

  it('does not render links section when links is empty', () => {
    expect(Footer({ copyright: '©' })).not.toContain('site-footer__links')
  })

  it('escapes HTML in copyright', () => {
    const html = Footer({ copyright: '<b>© Corp</b>' })
    expect(html).not.toContain('<b>')
    expect(html).toContain('&lt;b&gt;')
  })

  it('escapes HTML in link labels and hrefs', () => {
    const html = Footer({
      copyright: '©',
      links: [{ label: '<script>', href: '"><script>' }],
    })
    expect(html).not.toContain('<script>')
    expect(html).toContain('&lt;script&gt;')
  })
})
