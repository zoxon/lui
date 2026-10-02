import { describe, expect, it } from 'vitest'
import { Content } from '../components/base/Content/index.js'

describe('content', () => {
  it('renders content wrapper', () => {
    const html = Content({ html: '<p>Hello world</p>' })
    expect(html).toContain('class="content"')
    expect(html).toContain('<p>Hello world</p>')
  })

  it('passes HTML through without escaping (trusted developer content)', () => {
    const raw = '<h1>Title</h1><p>Body <strong>text</strong></p><ul><li>Item</li></ul>'
    const html = Content({ html: raw })
    expect(html).toContain(raw)
  })

  it('appends extra class', () => {
    expect(Content({ html: '', class: 'prose' })).toContain('content prose')
  })
})
