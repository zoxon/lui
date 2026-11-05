import { raw } from '@zoxon/mater'
import { describe, expect, it } from 'vitest'
import { DescriptionList } from '../components/base/DescriptionList/index.js'

const items = [
  { label: 'Name', value: 'John Doe' },
  { label: 'Role', value: 'Admin' },
]

describe('descriptionList', () => {
  it('renders items with label and value', () => {
    const html = DescriptionList({ items })

    expect(html).toContain('class="description-list')
    expect(html).toContain('description-list__item')
    expect(html).toContain('description-list__label')
    expect(html).toContain('description-list__value')
    expect(html).toContain('Name')
    expect(html).toContain('John Doe')
  })

  it('renders plain variant (no dots)', () => {
    const html = DescriptionList({ items, variant: 'plain' })
    expect(html).toContain('description-list--variant-plain')
    expect(html).not.toContain('description-list__sep')
  })

  it('renders bordered variant', () => {
    const html = DescriptionList({ items, variant: 'bordered' })
    expect(html).toContain('description-list--variant-bordered')
    expect(html).not.toContain('description-list__sep')
  })

  it('escapes a plain string value by default (not trusted HTML)', () => {
    const html = DescriptionList({
      items: [
        { label: 'Bio', value: '<img src=x onerror=alert(1)>' },
      ],
    })
    expect(html).not.toContain('<img src=x onerror=alert(1)>')
    expect(html).toContain('&lt;img')
  })

  it('renders explicit trusted markup passed via raw()', () => {
    const html = DescriptionList({
      items: [
        {
          label: 'Status',
          value: raw('<span class="badge badge--theme-success">Active</span>'),
        },
      ],
    })
    expect(html).toContain('<span class="badge badge--theme-success">Active</span>')
  })

  it('escapes HTML in label', () => {
    const html = DescriptionList({
      items: [
        { label: '<b>Label</b>', value: 'v' },
      ],
    })
    expect(html).not.toContain('<b>')
    expect(html).toContain('&lt;b&gt;')
  })
})
