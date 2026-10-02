// design-system/__tests__/toggle.test.ts
import { describe, expect, it } from 'vitest'
import { Toggle } from '../components/base/Toggle/index.js'

describe('toggle', () => {
  it('renders with label', () => {
    const html = Toggle({ label: 'Dark mode' })
    expect(html).toContain('Dark mode')
    expect(html).toContain('class="toggle"')
    expect(html).toContain('toggle__track')
    expect(html).toContain('toggle__thumb')
    expect(html).toContain('type="checkbox"')
  })

  it('renders checked state', () => {
    expect(Toggle({ label: 'x', checked: true })).toContain(' checked')
    expect(Toggle({ label: 'x', checked: false })).not.toContain(' checked')
  })

  it('renders disabled state', () => {
    const html = Toggle({ label: 'x', disabled: true })
    expect(html).toContain(' disabled')
    expect(html).toContain('toggle--disabled')
  })

  it('uses name attribute', () => {
    expect(Toggle({ label: 'x', name: 'theme' })).toContain('name="theme"')
  })

  it('does not render label element when label is empty string', () => {
    const html = Toggle({ label: '' })
    expect(html).not.toContain('toggle__label')
  })

  it('escapes HTML in label', () => {
    const html = Toggle({ label: '<b>bold</b>' })
    expect(html).not.toContain('<b>')
    expect(html).toContain('&lt;b&gt;')
  })
})
