import { raw } from '@zoxon/mater'
import { describe, expect, it } from 'vitest'
import { Header } from '../components/base/Header/index.js'

const navLinks = [
  { label: 'Dashboard', href: '/dashboard', active: true },
  { label: 'Users', href: '/users' },
  { label: 'Settings', href: '/settings' },
]

describe('header', () => {
  it('renders header with logo', () => {
    const html = Header({ logo: 'MyApp', navLinks })
    expect(html).toContain('site-header')
    expect(html).toContain('site-header__logo')
    expect(html).toContain('MyApp')
  })

  it('renders nav links', () => {
    const html = Header({ logo: 'App', navLinks })
    expect(html).toContain('site-header__nav')
    expect(html).toContain('Dashboard')
    expect(html).toContain('href="/dashboard"')
    expect(html).toContain('Users')
  })

  it('marks active link', () => {
    const html = Header({ logo: 'App', navLinks })
    expect(html).toContain('site-header__nav-link--active')
  })

  it('renders actions slot', () => {
    const html = Header({
      logo: 'App',
      navLinks,
      actions: raw('<button>Login</button>'),
    })
    expect(html).toContain('site-header__actions')
    expect(html).toContain('<button>Login</button>')
  })

  it('does not render actions when absent', () => {
    expect(Header({ logo: 'App', navLinks })).not.toContain('site-header__actions')
  })

  it('escapes HTML in logo', () => {
    const html = Header({ logo: '<b>App</b>', navLinks: [] })
    expect(html).not.toContain('<b>App</b>')
    expect(html).toContain('&lt;b&gt;')
  })

  it('escapes HTML in nav link labels', () => {
    const html = Header({
      logo: 'App',
      navLinks: [
        { label: '<b>link</b>', href: '/' },
      ],
    })
    expect(html).not.toContain('<b>link</b>')
    expect(html).toContain('&lt;b&gt;')
  })

  it('escapes HTML in nav link hrefs', () => {
    const html = Header({
      logo: 'App',
      navLinks: [
        { label: 'x', href: '"><script>' },
      ],
    })
    expect(html).not.toContain('"><script>')
    expect(html).toContain('&quot;&gt;&lt;script&gt;')
  })
})
