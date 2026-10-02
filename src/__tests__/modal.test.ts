import { describe, expect, it } from 'vitest'
import { Modal } from '../components/base/Modal/index.js'

describe('modal', () => {
  it('renders modal with title and body', () => {
    const html = Modal({ title: 'Confirm', children: '<p>Are you sure?</p>' })
    expect(html).toContain('modal-backdrop')
    expect(html).toContain('data-component="modal"')
    expect(html).toContain('modal__header')
    expect(html).toContain('modal__body')
    expect(html).toContain('modal__title')
    expect(html).toContain('data-ref="modal:close"')
    expect(html).toContain('Confirm')
    expect(html).toContain('<p>Are you sure?</p>')
  })

  it('applies size modifier', () => {
    expect(Modal({ title: 'x', children: '', size: 'sm' })).toContain('modal--size-sm')
    expect(Modal({ title: 'x', children: '', size: 'lg' })).toContain('modal--size-lg')
    expect(Modal({ title: 'x', children: '', size: 'xl' })).toContain('modal--size-xl')
    expect(Modal({ title: 'x', children: '', size: 'full' })).toContain('modal--size-full')
  })

  it('default size is md', () => {
    expect(Modal({ title: 'x', children: '' })).toContain('modal--size-md')
  })

  it('renders footer when provided', () => {
    const html = Modal({ title: 'x', children: '', footer: '<button>OK</button>' })
    expect(html).toContain('modal__footer')
    expect(html).toContain('<button>OK</button>')
  })

  it('does not render footer when absent', () => {
    expect(Modal({ title: 'x', children: '' })).not.toContain('modal__footer')
  })

  it('passes body and footer HTML through without escaping (trusted content)', () => {
    const html = Modal({ title: 'x', children: '<strong>bold</strong>', footer: '<em>note</em>' })
    expect(html).toContain('<strong>bold</strong>')
    expect(html).toContain('<em>note</em>')
  })

  it('escapes HTML in title', () => {
    const html = Modal({ title: '<script>alert(1)</script>', children: '' })
    expect(html).not.toContain('<script>')
    expect(html).toContain('&lt;script&gt;')
  })
})
