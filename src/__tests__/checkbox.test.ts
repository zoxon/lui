// design-system/__tests__/checkbox.test.ts
import { describe, expect, it } from 'vitest'
import { Checkbox } from '../components/base/Checkbox/index.js'

describe('checkbox', () => {
  it('renders label text', () => {
    const html = Checkbox({ label: 'Accept terms' })
    expect(html).toContain('Accept terms')
    expect(html).toContain('class="checkbox"')
    expect(html).toContain('type="checkbox"')
  })

  it('renders checked state', () => {
    expect(Checkbox({ label: 'x', checked: true })).toContain(' checked')
    expect(Checkbox({ label: 'x', checked: false })).not.toContain(' checked')
  })

  it('renders disabled state', () => {
    const html = Checkbox({ label: 'x', disabled: true })
    expect(html).toContain(' disabled')
    expect(html).toContain('checkbox--disabled')
  })

  it('uses name attribute', () => {
    expect(Checkbox({ label: 'x', name: 'agree' })).toContain('name="agree"')
  })

  it('uses id attribute', () => {
    expect(Checkbox({ label: 'x', id: 'chk1' })).toContain('id="chk1"')
  })

  it('links label to input via for/id when name is provided', () => {
    const html = Checkbox({ label: 'x', name: 'agree' })
    expect(html).toContain('id="agree"')
    expect(html).toContain('for="agree"')
  })

  it('escapes HTML in label', () => {
    const html = Checkbox({ label: '<script>' })
    expect(html).not.toContain('<script>')
    expect(html).toContain('&lt;script&gt;')
  })
})
