import { describe, expect, it } from 'vitest'
import { Card } from '../components/base/Card/index.js'

describe('card', () => {
  it('renders card with body content', () => {
    const html = Card({ children: '<p>Hello</p>' })
    expect(html).toContain('class="card"')
    expect(html).toContain('card__body')
    expect(html).toContain('<p>Hello</p>')
  })

  it('renders header with title', () => {
    const html = Card({ title: 'My Card', children: '' })
    expect(html).toContain('card__header')
    expect(html).toContain('card__title')
    expect(html).toContain('My Card')
  })

  it('renders subtitle when provided', () => {
    const html = Card({ title: 'T', subtitle: 'Sub text', children: '' })
    expect(html).toContain('card__subtitle')
    expect(html).toContain('Sub text')
  })

  it('does not render header when title is absent', () => {
    const html = Card({ children: 'content' })
    expect(html).not.toContain('card__header')
  })

  it('renders footer when provided', () => {
    const html = Card({ children: '', footer: '<button>OK</button>' })
    expect(html).toContain('card__footer')
    expect(html).toContain('<button>OK</button>')
  })

  it('renders actions in header', () => {
    const html = Card({ title: 'T', children: '', actions: '<button>Edit</button>' })
    expect(html).toContain('<button>Edit</button>')
  })

  it('passes string children HTML through without escaping (trusted content)', () => {
    const html = Card({ children: '<strong>Bold</strong>' })
    expect(html).toContain('<strong>Bold</strong>')
  })

  it('escapes HTML in title and subtitle', () => {
    const html = Card({ title: '<b>title</b>', subtitle: '<i>sub</i>', children: '' })
    expect(html).not.toContain('<b>')
    expect(html).not.toContain('<i>')
    expect(html).toContain('&lt;b&gt;')
    expect(html).toContain('&lt;i&gt;')
  })

  it('appends extra class', () => {
    expect(Card({ children: '', class: 'my-card' })).toContain('my-card')
  })
})
