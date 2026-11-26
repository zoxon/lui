import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'
import { Logo } from '../components/docs/Logo/index.js'

describe('logo', () => {
  it('renders the landing wordmark as a home link', () => {
    const html = Logo({ class: 'docs-sidebar__logo' })

    expect(html).toContain('class="logo docs-sidebar__logo"')
    expect(html).toContain('href="/"')
    expect(html).toContain('data-navigo')
    expect(html).toContain('>Lui<')
  })

  it('draws the mark as a decorative image with a frame and a square', () => {
    const html = Logo()

    expect(html).toContain('class="logo__mark"')
    expect(html).toContain('aria-hidden="true"')
    expect(html).toContain('class="logo__frame"')
    expect(html).toContain('class="logo__dot"')
  })

  it('takes the mark colour from the brand token', () => {
    const css = readFileSync(resolve(process.cwd(), 'src/components/docs/Logo/styles.css'), 'utf8')
    const tokens = readFileSync(resolve(process.cwd(), 'src/tokens/colors.css'), 'utf8')

    expect(css).toContain('color: var(--fill-brand)')
    expect(tokens).toContain('--fill-brand: var(--color-blue-600)')
    expect(tokens).toContain('--fill-brand: var(--color-blue-300)')
  })

  it('plays the square motion only on hover and only when motion is allowed', () => {
    const css = readFileSync(resolve(process.cwd(), 'src/components/docs/Logo/styles.css'), 'utf8')

    expect(css).toContain('(hover: hover) and (prefers-reduced-motion: no-preference)')
    expect(css).toContain('.logo:hover .logo__dot')
    expect(css).toContain('animation: logo-dot-dock var(--duration-slower) var(--easing-in-out)')
    expect(css).toContain('transform: translateY(10px)')
    expect(css).toContain('shape-rendering: crispEdges')
    expect(css).toContain('overflow: visible')
    expect(css).not.toContain(':focus-visible')
    expect(css).not.toContain('infinite')
  })
})
