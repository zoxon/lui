import { describe, expect, it } from 'vitest'
import { Field } from '../components/base/Field/index.js'

describe('field', () => {
  it('renders wrapper with label and children', () => {
    const html = Field({ label: 'Email', children: '<input type="text">' })
    expect(html).toContain('class="field"')
    expect(html).toContain('Email')
    expect(html).toContain('<input type="text">')
  })

  it('links label to control via for attribute', () => {
    const html = Field({ label: 'Email', id: 'email', children: '' })
    expect(html).toContain('for="email"')
  })

  it('renders hint when no error', () => {
    const html = Field({ label: 'x', children: '', hint: 'Must be valid email' })
    expect(html).toContain('field__hint')
    expect(html).toContain('Must be valid email')
  })

  it('hides hint when error is present', () => {
    const html = Field({
      label: 'x',
      children: '',
      hint: 'Hint text',
      error: 'Required',
    })
    expect(html).not.toContain('field__hint')
    expect(html).not.toContain('Hint text')
  })

  it('renders error state', () => {
    const html = Field({ label: 'x', children: '', error: 'Required field' })
    expect(html).toContain('field--error')
    expect(html).toContain('field__error')
    expect(html).toContain('Required field')
  })

  it('renders required label marker', () => {
    const html = Field({ label: 'Email', children: '', required: true })
    expect(html).toContain('field__label--required')
  })

  it('renders children as trusted HTML (not escaped)', () => {
    const html = Field({ label: 'x', children: '<input class="field__input">' })
    expect(html).toContain('<input class="field__input">')
  })

  it('applies extra class to wrapper', () => {
    const html = Field({ label: 'x', children: '', class: 'my-field' })
    expect(html).toContain('my-field')
  })

  it('escapes label', () => {
    const html = Field({ label: '<b>Bold</b>', children: '' })
    expect(html).not.toContain('<b>')
    expect(html).toContain('&lt;b&gt;')
  })

  it('escapes error message', () => {
    const html = Field({ label: 'x', children: '', error: '<script>bad</script>' })
    expect(html).not.toContain('<script>')
    expect(html).toContain('&lt;script&gt;')
  })

  it('escapes hint message', () => {
    const html = Field({ label: 'x', children: '', hint: '<b>hint</b>' })
    expect(html).not.toContain('<b>')
    expect(html).toContain('&lt;b&gt;')
  })
})
