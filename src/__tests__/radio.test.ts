import { describe, expect, it } from 'vitest'
import { Radio } from '../components/base/Radio/index.js'

describe('radio', () => {
  it('renders label text', () => {
    const html = Radio({ label: 'Small', value: 'sm', name: 'size' })
    expect(html).toContain('Small')
    expect(html).toContain('class="radio"')
    expect(html).toContain('type="radio"')
  })

  it('derives id from name and value when id is omitted', () => {
    const html = Radio({ label: 'Small', value: 'sm', name: 'size' })
    expect(html).toContain('id="size-sm"')
    expect(html).toContain('for="size-sm"')
  })

  it('uses an explicit id over the derived one', () => {
    const html = Radio({
      label: 'Small',
      value: 'sm',
      name: 'size',
      id: 'size-small',
    })
    expect(html).toContain('id="size-small"')
    expect(html).toContain('for="size-small"')
  })

  it('shares the name attribute across a group', () => {
    expect(Radio({ label: 'x', value: 'sm', name: 'size' })).toContain('name="size"')
  })

  it('carries the option value', () => {
    expect(Radio({ label: 'x', value: 'lg', name: 'size' })).toContain('value="lg"')
  })

  it('renders checked state', () => {
    expect(Radio({
      label: 'x',
      value: 'sm',
      name: 'size',
      checked: true,
    })).toContain(' checked')
    expect(Radio({
      label: 'x',
      value: 'sm',
      name: 'size',
      checked: false,
    })).not.toContain(' checked')
  })

  it('renders disabled state', () => {
    const html = Radio({
      label: 'x',
      value: 'sm',
      name: 'size',
      disabled: true,
    })
    expect(html).toContain(' disabled')
    expect(html).toContain('radio--disabled')
  })

  it('escapes HTML in label', () => {
    const html = Radio({ label: '<script>', value: 'sm', name: 'size' })
    expect(html).not.toContain('<script>')
    expect(html).toContain('&lt;script&gt;')
  })

  it('appends extra class', () => {
    expect(Radio({
      label: 'x',
      value: 'sm',
      name: 'size',
      class: 'my-class',
    })).toContain('my-class')
  })
})
