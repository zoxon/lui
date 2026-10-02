// design-system/__tests__/button.test.ts
import { describe, expect, it } from 'vitest'
import { Button } from '../components/base/Button/index.js'

describe('button', () => {
  it('renders default button with label', () => {
    const html = Button({ label: 'Click me' })
    expect(html).toContain('Click me')
    expect(html).toContain('button--variant-solid')
    expect(html).toContain('button--theme-default')
    expect(html).toContain('button--size-md')
    expect(html).toContain('type="button"')
  })

  it('applies variant and theme modifiers', () => {
    expect(Button({ label: 'x', variant: 'ghost', theme: 'success' })).toContain('button--variant-ghost button--theme-success')
    expect(Button({ label: 'x', variant: 'outline', theme: 'danger' })).toContain('button--variant-outline button--theme-danger')
    expect(Button({ label: 'x', variant: 'soft', theme: 'info' })).toContain('button--variant-soft button--theme-info')
  })

  it('applies size modifier', () => {
    expect(Button({ label: 'x', size: 'sm' })).toContain('button--size-sm')
    expect(Button({ label: 'x', size: 'lg' })).toContain('button--size-lg')
  })

  it('applies shape modifiers', () => {
    expect(Button({ label: 'x', pill: true, rounded: true, block: true })).toContain('button--pill button--rounded button--block')
  })

  it('adds disabled attribute when disabled=true', () => {
    expect(Button({ label: 'x', disabled: true })).toContain(' disabled')
  })

  it('does not add disabled attribute when disabled=false', () => {
    expect(Button({ label: 'x', disabled: false })).not.toContain(' disabled')
  })

  it('uses submit type', () => {
    expect(Button({ label: 'x', type: 'submit' })).toContain('type="submit"')
  })

  it('appends extra class', () => {
    expect(Button({ label: 'x', class: 'my-class' })).toContain('my-class')
  })

  it('escapes HTML in label', () => {
    const html = Button({ label: '<script>alert(1)</script>' })
    expect(html).not.toContain('<script>')
    expect(html).toContain('&lt;script&gt;')
  })
})
