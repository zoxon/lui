import { describe, expect, it } from 'vitest'
import { Select } from '../components/base/Select/index.js'

const options = [
  { value: 'a', label: 'Option A' },
  { value: 'b', label: 'Option B' },
  { value: 'c', label: 'Option C' },
]

describe('select', () => {
  it('renders label and options', () => {
    const html = Select({ label: 'Choose', options })
    expect(html).toContain('Choose')
    expect(html).toContain('class="field"')
    expect(html).toContain('<select')
    expect(html).toContain('Option A')
    expect(html).toContain('Option B')
    expect(html).toContain('Option C')
  })

  it('links label to select via for/id', () => {
    const html = Select({ label: 'Choose', name: 'choice', options })
    expect(html).toContain('id="choice"')
    expect(html).toContain('for="choice"')
  })

  it('renders selected option', () => {
    const html = String(Select({ label: 'x', options, value: 'b' }))
    const optionBIndex = html.indexOf('value="b"')
    const selectedIndex = html.indexOf(' selected', optionBIndex)
    expect(selectedIndex).toBeGreaterThan(optionBIndex)
    expect(selectedIndex - optionBIndex).toBeLessThan(20)
  })

  it('renders multiple select', () => {
    const html = Select({ label: 'x', options, multiple: true })
    expect(html).toContain(' multiple')
  })

  it('renders multiple selected values', () => {
    const html = Select({ label: 'x', options, multiple: true, value: ['a', 'c'] })
    expect(html).toContain('value="a" selected')
    expect(html).toContain('value="c" selected')
    expect(html).not.toContain('value="b" selected')
  })

  it('renders error state', () => {
    const html = Select({ label: 'x', options, error: 'Required' })
    expect(html).toContain('field--error')
    expect(html).toContain('Required')
  })

  it('renders hint', () => {
    const html = Select({ label: 'x', options, hint: 'Pick one' })
    expect(html).toContain('Pick one')
  })

  it('renders disabled state', () => {
    expect(Select({ label: 'x', options, disabled: true })).toContain(' disabled')
  })

  it('applies size modifier', () => {
    expect(Select({ label: 'x', options, size: 'sm' })).toContain('field__select--size-sm')
    expect(Select({ label: 'x', options, size: 'lg' })).toContain('field__select--size-lg')
  })

  it('escapes HTML in option labels', () => {
    const html = Select({ label: 'x', options: [{ value: 'x', label: '<b>bold</b>' }] })
    expect(html).not.toContain('<b>')
    expect(html).toContain('&lt;b&gt;')
  })

  it('escapes HTML in option values', () => {
    const html = Select({ label: 'x', options: [{ value: '"x"', label: 'x' }] })
    expect(html).toContain('&quot;x&quot;')
  })
})
