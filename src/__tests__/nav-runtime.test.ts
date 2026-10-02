// @vitest-environment happy-dom

import { dispatchCustomEvent } from '@zoxon/eventor'
import { render } from '@zoxon/mater'
import { initComponents } from '@zoxon/nux'
import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'
import { Nav } from '../components/docs/Nav/index.js'

vi.mock('@zoxon/nux', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@zoxon/nux')>()

  class TestComponent {
    name: string
    element: HTMLElement
    options: Record<string, any>
    rawRefs: { name: string, element: HTMLElement }[]
    data: Record<string, any>

    constructor({
      name,
      element,
      references = [],
      options = {},
      data = {},
    }: {
      name: string
      element: HTMLElement
      references?: { name: string, element: HTMLElement }[]
      options?: Record<string, any>
      data?: Record<string, any>
    }) {
      this.name = name
      this.element = element
      this.options = options
      this.rawRefs = references
      this.data = data
      this.buildCache()
      this.bindEvents()
      ;(this.element as HTMLElement & { __instance?: TestComponent }).__instance = this
    }

    init(): Promise<void> | void {}
    buildCache(): Promise<void> | void {}
    bindEvents(): Promise<void> | void {}

    destroy(): void {
      ;(this.element as HTMLElement & { __instance?: TestComponent }).__instance = undefined
    }

    get<T extends HTMLElement = HTMLElement>(name: string): T | undefined {
      const ref = this.rawRefs.find(item => item.name.toLowerCase() === `${this.name}:${name}`.toLowerCase())
      return ref?.element as T | undefined
    }

    getAll<T extends HTMLElement = HTMLElement>(name: string): T[] {
      return this.rawRefs
        .filter(item => item.name === `${this.name}:${name}`)
        .map(item => item.element as T)
    }
  }

  return {
    ...actual,
    Component: TestComponent,
  }
})

beforeAll(async () => {
  await import('../components/docs/Nav/client.js')
})

beforeEach(() => {
  document.body.innerHTML = ''
  window.history.replaceState({}, '', '/')
})

afterEach(() => {
  document.body.innerHTML = ''
  window.history.replaceState({}, '', '/')
})

describe('docs nav runtime', () => {
  it('marks the current route link as active on init and updates on router events', async () => {
    window.history.replaceState({}, '', '/docs/jsx')
    document.body.innerHTML = `
      <div id="root">
        ${render(Nav({
          groups: [
            {
              section: 'Docs',
              items: [
                { label: 'Home', page: 'accordion' },
                { label: 'JSX', page: 'docs-jsx' },
              ],
            },
          ],
        }))}
      </div>
    `

    await initComponents({ scope: '#root' })

    const links = Array.from(document.querySelectorAll<HTMLAnchorElement>('.docs-nav__link'))

    expect(links[0]?.classList.contains('docs-nav__link--active')).toBe(false)
    expect(links[1]?.classList.contains('docs-nav__link--active')).toBe(true)

    dispatchCustomEvent('router:change', { page: 'accordion' })

    expect(links[0]?.classList.contains('docs-nav__link--active')).toBe(true)
    expect(links[1]?.classList.contains('docs-nav__link--active')).toBe(false)
  })
})
