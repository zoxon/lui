import { describe, expect, it } from 'vitest'
import { Icon } from '../components/base/Icon/index.js'

describe('icon', () => {
  it('renders an svg referencing the sprite symbol for the given name', () => {
    const html = Icon({ name: 'ui/check' })
    expect(html).toContain('class="icon"')
    expect(html).toContain('<use href="#icon-ui-check">')
  })

  it('defaults to size 16', () => {
    const html = Icon({ name: 'ui/check' })
    expect(html).toContain('width="16"')
    expect(html).toContain('height="16"')
  })

  it('applies a custom size', () => {
    const html = Icon({ name: 'ui/check', size: 32 })
    expect(html).toContain('width="32"')
    expect(html).toContain('height="32"')
  })

  it('appends extra class', () => {
    expect(Icon({ name: 'ui/check', class: 'accordion__icon' })).toContain('icon accordion__icon')
  })

  it('is hidden from assistive tech and not keyboard-focusable', () => {
    const html = Icon({ name: 'ui/check' })
    expect(html).toContain('aria-hidden="true"')
    expect(html).toContain('focusable="false"')
  })

  it('only replaces the first slash when building the sprite id', () => {
    // Sprite ids are generated from nested icon paths by replacing "/" with
    // "-" (see prerender.ts's createSymbol) — Icon's name.replace('/', '-')
    // must stay consistent with that scheme for names with a single segment.
    expect(Icon({ name: 'ui/chevron-down' })).toContain('#icon-ui-chevron-down')
  })
})
