import { raw } from '@zoxon/mater'
import { describe, expect, it } from 'vitest'
import { Spoiler } from '../components/base/Spoiler/index.js'

describe('spoiler', () => {
  it('renders spoiler with label and content', () => {
    const html = Spoiler({
      label: 'Show more',
      children: raw('<p>Hidden content</p>'),
    })
    expect(html).toContain('class="spoiler"')
    expect(html).toContain('spoiler__trigger')
    expect(html).toContain('spoiler__content')
    expect(html).toContain('spoiler__icon')
    expect(html).toContain('Show more')
  })

  it('renders nux data hooks for client runtime wiring', () => {
    const html = Spoiler({
      label: 'Show more',
      children: raw('<p>Hidden content</p>'),
    })

    expect(html).toContain('data-component="spoiler"')
    expect(html).toContain('data-ref="spoiler:trigger"')
    expect(html).toContain('data-ref="spoiler:content"')
  })

  it('uses <details> and <summary> elements', () => {
    const html = Spoiler({ label: 'Show', children: 'content' })
    expect(html).toContain('<details')
    expect(html).toContain('<summary')
  })

  it('renders expanded state', () => {
    const openHtml = Spoiler({ label: 'x', children: 'y', expanded: true })
    const closedHtml = Spoiler({ label: 'x', children: 'y', expanded: false })

    expect(openHtml).toContain('spoiler--expanded')
    expect(openHtml).toContain(' open')
    expect(closedHtml).not.toContain(' open')
  })

  it('renders content (raw HTML)', () => {
    const html = Spoiler({
      label: 'x',
      children: raw('<strong>bold</strong>'),
    })
    expect(html).toContain('<strong>bold</strong>')
  })

  it('escapes HTML in label', () => {
    const html = Spoiler({ label: '<b>show</b>', children: 'x' })
    expect(html).not.toContain('<b>show</b>')
    expect(html).toContain('&lt;b&gt;')
  })
})
