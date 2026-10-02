import { describe, expect, it } from 'vitest'
import { Skeleton } from '../components/base/Skeleton/index.js'

describe('skeleton', () => {
  it('renders default animated rectangle', () => {
    const html = Skeleton({})
    expect(html).toContain('skeleton--variant-rectangle')
    expect(html).toContain('skeleton--animated')
    expect(html).toContain('aria-hidden="true"')
  })

  it('applies variants and sizes', () => {
    expect(Skeleton({ variant: 'circle', size: 'lg' })).toContain('skeleton--variant-circle skeleton--size-lg')
    expect(Skeleton({ variant: 'text', size: 'sm' })).toContain('skeleton--variant-text skeleton--size-sm')
  })

  it('can disable animation', () => {
    const html = Skeleton({ animated: false })
    expect(html).toContain('skeleton--variant-rectangle')
    expect(html).not.toContain('skeleton--animated')
  })

  it('applies width style and custom class', () => {
    const html = Skeleton({ width: '12rem', class: 'profile__skeleton' })
    expect(html).toContain('skeleton--variant-rectangle')
    expect(html).toContain('skeleton--animated')
    expect(html).toContain('profile__skeleton')
    expect(html).toContain('style="width:12rem;"')
  })
})
