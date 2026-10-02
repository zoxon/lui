import { describe, expect, it } from 'vitest'
import { TextField } from '../components/base/TextField/index.js'

describe('textField', () => {
  it('renders input with default type', () => {
    const html = TextField({ name: 'email' })
    expect(html).toContain('class="field__input"')
    expect(html).toContain('type="text"')
    expect(html).toContain('name="email"')
  })

  it('sets id attribute', () => {
    const html = TextField({ name: 'email', id: 'email-field' })
    expect(html).toContain('id="email-field"')
  })

  it('renders placeholder', () => {
    expect(TextField({ placeholder: 'Enter email' })).toContain('placeholder="Enter email"')
  })

  it('renders disabled state', () => {
    expect(TextField({ disabled: true })).toContain(' disabled')
  })

  it('renders required attribute', () => {
    expect(TextField({ required: true })).toContain(' required')
  })

  it('renders textarea when type=textarea', () => {
    const html = TextField({ type: 'textarea' })
    expect(html).toContain('<textarea')
    expect(html).toContain('class="field__textarea"')
    expect(html).not.toContain('<input')
  })

  it('renders textarea with rows attribute', () => {
    expect(TextField({ type: 'textarea', rows: 6 })).toContain('rows="6"')
  })

  it('applies size modifier to input', () => {
    expect(TextField({ size: 'sm' })).toContain('field__input--size-sm')
    expect(TextField({ size: 'lg' })).toContain('field__input--size-lg')
  })

  it('no size modifier for md (default)', () => {
    expect(TextField({ size: 'md' })).not.toContain('field__input--size-md')
  })

  it('renders value in input', () => {
    expect(TextField({ value: 'hello' })).toContain('value="hello"')
  })

  it('escapes HTML in value', () => {
    expect(TextField({ value: '"oops' })).toContain('&quot;oops')
  })

  it('escapes HTML in placeholder', () => {
    const html = TextField({ placeholder: '<script>' })
    expect(html).not.toContain('<script>')
    expect(html).toContain('&lt;script&gt;')
  })

  it('renders custom class on input', () => {
    expect(TextField({ class: 'my-input' })).toContain('my-input')
  })
})
