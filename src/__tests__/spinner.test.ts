import { describe, expect, it } from 'vitest'
import { Spinner } from '../components/base/Spinner/index.js'
import { renderSpinner } from '../pages/components/spinner.js'

describe('spinner', () => {
  it('renders default spinner', () => {
    const html = Spinner({})
    expect(html).toContain('class="spinner"')
    expect(html).toContain('role="status"')
    expect(html).toContain('aria-label="Loading"')
    expect(html).not.toContain('visuallyhidden')
  })

  it('applies size modifier', () => {
    expect(Spinner({ size: 'sm' })).toContain('spinner--size-sm')
    expect(Spinner({ size: 'md' })).toContain('spinner--size-md')
    expect(Spinner({ size: 'lg' })).toContain('spinner--size-lg')
  })

  it('escapes label text', () => {
    const html = Spinner({ label: '<b>Loading</b>' })
    expect(html).not.toContain('<b>')
    expect(html).toContain('aria-label="&lt;b&gt;Loading&lt;/b&gt;"')
  })

  it('applies custom class', () => {
    expect(Spinner({ class: 'button__spinner' })).toContain('class="spinner button__spinner"')
  })

  it('documents spinner inside a button', () => {
    const html = renderSpinner().toString()

    expect(html).toContain('Inside button')
    expect(html).toContain('class="button button--variant-solid button--theme-default button--size-md"')
    expect(html).toContain('class="spinner"')
    expect(html).toContain('Saving')
  })
})
