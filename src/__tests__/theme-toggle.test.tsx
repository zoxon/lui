import { describe, expect, it } from 'vitest'
import { Sidebar } from '../components/docs/Sidebar/index.js'
import { ThemeToggle } from '../components/docs/ThemeToggle/index.js'

describe('themeToggle', () => {
  it('renders nux hooks and svg icons', () => {
    const html = ThemeToggle()

    expect(html).toContain('data-component="theme-toggle"')
    expect(html).toContain('data-ref="theme-toggle:lightIcon"')
    expect(html).toContain('data-ref="theme-toggle:darkIcon"')
    expect(html).toContain('href="#icon-ui-sun"')
    expect(html).toContain('href="#icon-ui-moon"')
    expect(html).not.toContain('☀')
    expect(html).not.toContain('🌙')
  })

  it('is composed by docs sidebar', () => {
    const html = Sidebar({ items: [] })

    expect(html).toContain('data-component="theme-toggle"')
    expect(html).not.toContain('id="theme-toggle"')
    expect(html).not.toContain('id="theme-icon"')
  })
})
