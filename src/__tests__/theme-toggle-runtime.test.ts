// @vitest-environment happy-dom

import { render } from '@zoxon/mater'
import { initComponents } from '@zoxon/nux'
import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'
import { ThemeToggle } from '../components/docs/ThemeToggle/index.js'

vi.mock('@zoxon/nux', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@zoxon/nux')>()

  class TestComponent {
    name: string
    element: HTMLElement
    rawRefs: { name: string, element: HTMLElement }[]

    constructor({
      name,
      element,
      references = [],
    }: {
      name: string
      element: HTMLElement
      references?: { name: string, element: HTMLElement }[]
    }) {
      this.name = name
      this.element = element
      this.rawRefs = references
      this.bindEvents()
      ;(this.element as HTMLElement & { __instance?: TestComponent }).__instance = this
    }

    init(): void {}
    bindEvents(): void {}

    destroy(): void {
      ;(this.element as HTMLElement & { __instance?: TestComponent }).__instance = undefined
    }

    get<T extends HTMLElement = HTMLElement>(name: string): T | undefined {
      return this.rawRefs.find(ref => ref.name.toLowerCase() === `${this.name}:${name}`.toLowerCase())?.element as T | undefined
    }
  }

  return {
    ...actual,
    Component: TestComponent,
  }
})

beforeAll(async () => {
  await import('../components/docs/ThemeToggle/client.js')
})

beforeEach(() => {
  document.body.innerHTML = ''
  document.documentElement.removeAttribute('data-theme')
  localStorage.clear()
  Object.defineProperty(window, 'matchMedia', {
    configurable: true,
    value: vi.fn().mockReturnValue({ matches: false }),
  })
})

afterEach(() => {
  document.body.innerHTML = ''
  document.documentElement.removeAttribute('data-theme')
  localStorage.clear()
  vi.restoreAllMocks()
})

describe('theme toggle runtime', () => {
  it('initializes from saved theme and toggles document theme', async () => {
    localStorage.setItem('theme', 'dark')
    document.body.innerHTML = `<div id="root">${render(ThemeToggle())}</div>`

    await initComponents({ scope: '#root' })

    const toggle = document.querySelector<HTMLButtonElement>('[data-component="theme-toggle"]')
    const lightIcon = document.querySelector<HTMLElement>('[data-ref="theme-toggle:lightIcon"]')
    const darkIcon = document.querySelector<HTMLElement>('[data-ref="theme-toggle:darkIcon"]')

    expect(document.documentElement.dataset.theme).toBe('dark')
    expect(lightIcon?.hidden).toBe(true)
    expect(darkIcon?.hidden).toBe(false)

    toggle?.click()

    expect(document.documentElement.dataset.theme).toBeUndefined()
    expect(localStorage.getItem('theme')).toBe('light')
    expect(lightIcon?.hidden).toBe(false)
    expect(darkIcon?.hidden).toBe(true)
  })

  it('replaces previous instance on repeated initialization', async () => {
    document.body.innerHTML = `<div id="root">${render(ThemeToggle())}</div>`

    const toggle = document.querySelector<HTMLButtonElement>('[data-component="theme-toggle"]')
    const addEventListener = vi.spyOn(toggle!, 'addEventListener')
    const removeEventListener = vi.spyOn(toggle!, 'removeEventListener')

    await initComponents({ scope: '#root' })
    await initComponents({ scope: '#root' })

    expect(addEventListener).toHaveBeenCalledTimes(2)
    expect(removeEventListener).toHaveBeenCalledTimes(1)

    toggle?.click()

    expect(document.documentElement.dataset.theme).toBe('dark')
    expect(localStorage.getItem('theme')).toBe('dark')
  })
})
