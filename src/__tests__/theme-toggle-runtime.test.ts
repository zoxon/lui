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

type ChangeListener = (event: { matches: boolean }) => void

const mediaQuery = {
  matches: false,
  listeners: new Set<ChangeListener>(),
  addEventListener: vi.fn((_type: string, listener: ChangeListener) => {
    mediaQuery.listeners.add(listener)
  }),
  removeEventListener: vi.fn((_type: string, listener: ChangeListener) => {
    mediaQuery.listeners.delete(listener)
  }),
  emit(matches: boolean): void {
    mediaQuery.matches = matches
    for (const listener of [...mediaQuery.listeners])
      listener({ matches })
  },
}

beforeEach(() => {
  document.body.innerHTML = ''
  document.documentElement.removeAttribute('data-theme')
  localStorage.clear()
  mediaQuery.matches = false
  mediaQuery.listeners.clear()
  mediaQuery.addEventListener.mockClear()
  mediaQuery.removeEventListener.mockClear()
  Object.defineProperty(window, 'matchMedia', {
    configurable: true,
    value: vi.fn().mockReturnValue(mediaQuery),
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

  it('follows system theme changes while no theme is saved', async () => {
    document.body.innerHTML = `<div id="root">${render(ThemeToggle())}</div>`
    await initComponents({ scope: '#root' })

    expect(document.documentElement.dataset.theme).toBeUndefined()

    mediaQuery.emit(true)
    expect(document.documentElement.dataset.theme).toBe('dark')
    expect(document.querySelector<HTMLElement>('[data-ref="theme-toggle:darkIcon"]')?.hidden).toBe(false)

    mediaQuery.emit(false)
    expect(document.documentElement.dataset.theme).toBeUndefined()
  })

  it('keeps a saved theme when the system theme changes', async () => {
    localStorage.setItem('theme', 'light')
    document.body.innerHTML = `<div id="root">${render(ThemeToggle())}</div>`
    await initComponents({ scope: '#root' })

    mediaQuery.emit(true)

    expect(document.documentElement.dataset.theme).toBeUndefined()
  })

  it('stops following the system after a manual toggle', async () => {
    document.body.innerHTML = `<div id="root">${render(ThemeToggle())}</div>`
    await initComponents({ scope: '#root' })

    document.querySelector<HTMLButtonElement>('[data-component="theme-toggle"]')?.click()
    expect(document.documentElement.dataset.theme).toBe('dark')

    mediaQuery.emit(false)
    expect(document.documentElement.dataset.theme).toBe('dark')
  })

  it('removes the system listener when the instance is replaced or destroyed', async () => {
    document.body.innerHTML = `<div id="root">${render(ThemeToggle())}</div>`
    await initComponents({ scope: '#root' })
    await initComponents({ scope: '#root' })

    expect(mediaQuery.listeners.size).toBe(1)

    const toggle = document.querySelector<HTMLElement & { __instance?: { destroy: () => void } }>('[data-component="theme-toggle"]')
    toggle?.__instance?.destroy()

    expect(mediaQuery.listeners.size).toBe(0)
  })

  it('re-applies the theme when the page is restored from the back/forward cache', async () => {
    document.body.innerHTML = `<div id="root">${render(ThemeToggle())}</div>`
    await initComponents({ scope: '#root' })

    // The OS theme changed while the page was frozen, so no change event fired.
    mediaQuery.matches = true
    window.dispatchEvent(Object.assign(new Event('pageshow'), { persisted: true }))

    expect(document.documentElement.dataset.theme).toBe('dark')
  })

  it('keeps a saved theme on bfcache restore and ignores a normal pageshow', async () => {
    document.body.innerHTML = `<div id="root">${render(ThemeToggle())}</div>`
    await initComponents({ scope: '#root' })

    mediaQuery.matches = true
    window.dispatchEvent(Object.assign(new Event('pageshow'), { persisted: false }))
    expect(document.documentElement.dataset.theme).toBeUndefined()

    localStorage.setItem('theme', 'light')
    window.dispatchEvent(Object.assign(new Event('pageshow'), { persisted: true }))
    expect(document.documentElement.dataset.theme).toBeUndefined()
  })

  it('removes the pageshow listener when the instance is destroyed', async () => {
    const removeEventListener = vi.spyOn(window, 'removeEventListener')
    document.body.innerHTML = `<div id="root">${render(ThemeToggle())}</div>`
    await initComponents({ scope: '#root' })

    document.querySelector<HTMLElement & { __instance?: { destroy: () => void } }>('[data-component="theme-toggle"]')
      ?.__instance
      ?.destroy()

    expect(removeEventListener).toHaveBeenCalledWith('pageshow', expect.any(Function))
  })
})
