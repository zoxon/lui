import { raw } from '@zoxon/mater'
import { describe, expect, it } from 'vitest'
import { Drawer } from '../components/base/Drawer/index.js'

describe('drawer', () => {
  it('renders drawer with title and body', () => {
    const html = Drawer({
      title: 'Filters',
      children: raw('<p>Filter content</p>'),
    })
    expect(html).toContain('drawer-backdrop')
    expect(html).toContain('data-component="drawer"')
    expect(html).toContain('drawer__header')
    expect(html).toContain('drawer__body')
    expect(html).toContain('drawer__title')
    expect(html).toContain('data-ref="drawer:close"')
    expect(html).toContain('Filters')
    expect(html).toContain('<p>Filter content</p>')
  })

  it('applies side modifier', () => {
    expect(Drawer({ title: 'x', children: '', side: 'left' })).toContain('drawer--side-left')
    expect(Drawer({ title: 'x', children: '', side: 'top' })).toContain('drawer--side-top')
    expect(Drawer({ title: 'x', children: '', side: 'bottom' })).toContain('drawer--side-bottom')
  })

  it('default side is right', () => {
    expect(Drawer({ title: 'x', children: '' })).toContain('drawer--side-right')
  })

  it('renders footer when provided', () => {
    const html = Drawer({
      title: 'x',
      children: '',
      footer: raw('<button>Apply</button>'),
    })
    expect(html).toContain('drawer__footer')
    expect(html).toContain('<button>Apply</button>')
  })

  it('does not render footer when absent', () => {
    expect(Drawer({ title: 'x', children: '' })).not.toContain('drawer__footer')
  })

  it('renders raw() body and footer without escaping', () => {
    const html = Drawer({
      title: 'x',
      children: raw('<strong>bold</strong>'),
    })
    expect(html).toContain('<strong>bold</strong>')
  })

  it('escapes HTML in title', () => {
    const html = Drawer({ title: '<b>title</b>', children: '' })
    expect(html).not.toContain('<b>title</b>')
    expect(html).toContain('&lt;b&gt;')
  })
})
