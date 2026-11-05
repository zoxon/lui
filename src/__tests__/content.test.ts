import { raw } from '@zoxon/mater'
import { describe, expect, it } from 'vitest'
import { Content } from '../components/base/Content/index.js'

describe('content', () => {
  it('renders content wrapper', () => {
    const html = Content({
      html: raw('<p>Hello world</p>'),
    })
    expect(html).toContain('class="content"')
    expect(html).toContain('<p>Hello world</p>')
  })

  it('passes HTML through without escaping (trusted developer content)', () => {
    const markup = '<h1>Title</h1><p>Body <strong>text</strong></p><ul><li>Item</li></ul>'
    const html = Content({
      html: raw(markup),
    })
    expect(html).toContain(markup)
  })

  it('appends extra class', () => {
    expect(Content({
      html: raw(''),
      class: 'prose',
    })).toContain('content prose')
  })
})
