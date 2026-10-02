// design-system/__tests__/badge.test.ts
import { describe, expect, it } from 'vitest'
import { Badge } from '../components/base/Badge/index.js'

describe('badge', () => {
  it('renders default badge', () => {
    const html = Badge({ label: 'New' })
    expect(html).toContain('New')
    expect(html).toContain('badge--theme-default')
    expect(html).toContain('badge--size-md')
  })

  it('applies theme modifier', () => {
    expect(Badge({ label: 'x', theme: 'success' })).toContain('badge--theme-success')
    expect(Badge({ label: 'x', theme: 'warning' })).toContain('badge--theme-warning')
    expect(Badge({ label: 'x', theme: 'danger' })).toContain('badge--theme-danger')
    expect(Badge({ label: 'x', theme: 'info' })).toContain('badge--theme-info')
  })

  it('applies size modifier', () => {
    expect(Badge({ label: 'x', size: 'sm' })).toContain('badge--size-sm')
  })

  it('escapes HTML in label', () => {
    const html = Badge({ label: '<b>bold</b>' })
    expect(html).not.toContain('<b>')
    expect(html).toContain('&lt;b&gt;')
  })
})
