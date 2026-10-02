import { describe, expect, it } from 'vitest'
import { Avatar } from '../components/base/Avatar/index.js'

describe('avatar', () => {
  it('renders initials avatar', () => {
    const html = Avatar({ initials: 'JD' })
    expect(html).toContain('JD')
    expect(html).toContain('class="avatar avatar--size-md"')
  })

  it('renders image avatar when src is provided', () => {
    const html = Avatar({ src: '/photo.jpg', alt: 'Jane Doe' })
    expect(html).toContain('<img')
    expect(html).toContain('src="/photo.jpg"')
    expect(html).toContain('alt="Jane Doe"')
    expect(html).toContain('class="avatar__img"')
  })

  it('applies size modifier', () => {
    expect(Avatar({ initials: 'JD', size: 'xs' })).toContain('avatar--size-xs')
    expect(Avatar({ initials: 'JD', size: 'sm' })).toContain('avatar--size-sm')
    expect(Avatar({ initials: 'JD', size: 'lg' })).toContain('avatar--size-lg')
    expect(Avatar({ initials: 'JD', size: 'xl' })).toContain('avatar--size-xl')
  })

  it('renders status indicator via StatusDot', () => {
    const html = Avatar({ initials: 'JD', status: 'green' })
    expect(html).toContain('avatar__status')
    expect(html).toContain('status-dot--color-green')
    expect(html).toContain('status-dot__dot')
  })

  it('renders correct color class for each status', () => {
    expect(Avatar({ initials: 'JD', status: 'yellow' })).toContain('status-dot--color-yellow')
    expect(Avatar({ initials: 'JD', status: 'red' })).toContain('status-dot--color-red')
    expect(Avatar({ initials: 'JD', status: 'gray' })).toContain('status-dot--color-gray')
  })

  it('does not render status indicator when status is omitted', () => {
    expect(Avatar({ initials: 'JD' })).not.toContain('avatar__status')
  })

  it('escapes HTML in initials', () => {
    const html = Avatar({ initials: '<b>' })
    expect(html).not.toContain('<b>')
    expect(html).toContain('&lt;b&gt;')
  })

  it('escapes HTML in src and alt', () => {
    const html = Avatar({ src: '"/oops', alt: '"oops"' })
    expect(html).toContain('&quot;/oops')
    expect(html).toContain('&quot;oops&quot;')
  })
})
