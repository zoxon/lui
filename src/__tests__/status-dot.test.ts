import { describe, expect, it } from 'vitest'
import { StatusDot } from '../components/base/StatusDot/index.js'

describe('statusDot', () => {
  it('renders green status dot', () => {
    const html = StatusDot({ status: 'green' })
    expect(html).toContain('status-dot--color-green')
    expect(html).toContain('status-dot__dot')
    expect(html).toContain('status-dot--size-md')
    expect(html).toContain('status-dot--color-green')
  })

  it('renders all status values', () => {
    for (const status of ['green', 'yellow', 'red', 'gray'] as const) {
      expect(StatusDot({ status })).toContain(`status-dot--color-${status}`)
    }
  })

  it('applies size modifier', () => {
    expect(StatusDot({ status: 'green', size: 'sm' })).toContain('status-dot--size-sm')
    expect(StatusDot({ status: 'green', size: 'lg' })).toContain('status-dot--size-lg')
  })

  it('renders label when provided', () => {
    const html = StatusDot({ status: 'green', label: 'Active' })
    expect(html).toContain('status-dot__label')
    expect(html).toContain('Active')
  })

  it('does not render label element when label is omitted', () => {
    const html = StatusDot({ status: 'green' })
    expect(html).not.toContain('status-dot__label')
  })

  it('escapes HTML in label', () => {
    const html = StatusDot({ status: 'green', label: '<b>bold</b>' })
    expect(html).not.toContain('<b>')
    expect(html).toContain('&lt;b&gt;')
  })

  it('applies extra class', () => {
    const html = StatusDot({ status: 'green', class: 'avatar__status' })
    expect(html).toContain('avatar__status')
  })
})
