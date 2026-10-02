// @vitest-environment happy-dom

import { render } from '@zoxon/mater'
import { getInstance, initComponents } from '@zoxon/nux'
import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'
import { FileInput } from '../components/base/FileInput/index.js'
import { Tabs, TabsItem } from '../components/base/Tabs/index.js'

vi.mock('@zoxon/nux', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@zoxon/nux')>()

  class TestSafeComponent {
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
      ;(this.element as HTMLElement & { __instance?: TestSafeComponent }).__instance = this
    }

    init(): Promise<void> | void {}
    buildCache(): Promise<void> | void {}
    bindEvents(): Promise<void> | void {}

    destroy(): void {
      ;(this.element as HTMLElement & { __instance?: TestSafeComponent }).__instance = undefined
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
    Component: TestSafeComponent,
  }
})

beforeAll(async () => {
  await import('../components/base/Tabs/client.js')
  await import('../components/base/FileInput/client.js')
})

beforeEach(() => {
  document.body.innerHTML = ''
})

afterEach(() => {
  document.body.innerHTML = ''
})

describe('task 3 nux runtime', () => {
  it('switches the active tabs state on click', async () => {
    document.body.innerHTML = `
      <div id="content">
        ${render(Tabs({
          children: [
            TabsItem({ title: 'Overview', children: '<p>Overview content</p>' }),
            TabsItem({ title: 'Settings', children: '<p>Settings content</p>' }),
          ],
        }))}
      </div>
    `

    await initComponents({ scope: '#content' })

    const tabs = Array.from(document.querySelectorAll<HTMLButtonElement>('.tabs__tab'))
    const panels = Array.from(document.querySelectorAll<HTMLElement>('.tabs__panel'))

    tabs[1]?.dispatchEvent(new MouseEvent('click', { bubbles: true }))

    expect(tabs[0]?.getAttribute('aria-selected')).toBe('false')
    expect(tabs[1]?.getAttribute('aria-selected')).toBe('true')
    expect(panels[0]?.hidden).toBe(true)
    expect(panels[1]?.hidden).toBe(false)
  })

  it('updates the selected file name after change', async () => {
    document.body.innerHTML = `
      <div id="content">
        ${render(FileInput({ label: 'Upload file', name: 'resume' }))}
      </div>
    `

    await initComponents({ scope: '#content' })

    const input = document.querySelector<HTMLInputElement>('.file-input__native')
    const value = document.querySelector<HTMLElement>('.file-input__value')

    Object.defineProperty(input, 'files', {
      configurable: true,
      value: [{ name: 'resume.pdf' }],
    })

    input?.dispatchEvent(new Event('change', { bubbles: true }))

    expect(value?.textContent).toBe('resume.pdf')
    expect(value?.classList.contains('has-file')).toBe(true)
  })

  it('updates the selected files count for multiple file inputs', async () => {
    document.body.innerHTML = `
      <div id="content">
        ${render(FileInput({ label: 'Upload files', name: 'attachments', multiple: true }))}
      </div>
    `

    await initComponents({ scope: '#content' })

    const input = document.querySelector<HTMLInputElement>('.file-input__native')
    const value = document.querySelector<HTMLElement>('.file-input__value')

    Object.defineProperty(input, 'files', {
      configurable: true,
      value: [{ name: 'one.pdf' }, { name: 'two.pdf' }],
    })

    input?.dispatchEvent(new Event('change', { bubbles: true }))

    expect(value?.textContent).toBe('2 files chosen')
    expect(value?.classList.contains('has-file')).toBe(true)
  })

  it('does not duplicate tabs listeners when initialized twice', async () => {
    document.body.innerHTML = `
      <div id="content">
        ${render(Tabs({
          children: [
            TabsItem({ title: 'Overview', children: '<p>Overview content</p>' }),
            TabsItem({ title: 'Settings', children: '<p>Settings content</p>' }),
          ],
        }))}
      </div>
    `

    const root = document.querySelector<HTMLElement>('.tabs')
    await initComponents({ scope: '#content' })
    const firstInstance = getInstance(root!) as { destroy: () => void, ['activate']?: (id?: string) => void }
    const firstDestroy = vi.spyOn(firstInstance, 'destroy')

    await initComponents({ scope: '#content' })
    const secondInstance = getInstance(root!) as { ['activate']?: (id?: string) => void }
    const firstTab = document.querySelectorAll<HTMLButtonElement>('.tabs__tab')[0]
    const secondTab = document.querySelectorAll<HTMLButtonElement>('.tabs__tab')[1]

    expect(firstInstance).toBeDefined()
    expect(secondInstance).toBeDefined()
    expect(secondInstance).not.toBe(firstInstance)
    expect(firstDestroy).toHaveBeenCalledTimes(1)
    expect((root as HTMLElement & { __instance?: unknown }).__instance).toBe(secondInstance)

    const firstActivate = vi.spyOn(firstInstance as { activate: (id?: string) => void }, 'activate')
    const secondActivate = vi.spyOn(secondInstance as { activate: (id?: string) => void }, 'activate')

    secondTab?.dispatchEvent(new MouseEvent('click', { bubbles: true }))

    expect(firstActivate).toHaveBeenCalledTimes(0)
    expect(secondActivate).toHaveBeenCalledTimes(1)
    expect(secondActivate).toHaveBeenCalledWith('tab-1')
    expect(firstTab?.getAttribute('aria-selected')).toBe('false')
    expect(secondTab?.getAttribute('aria-selected')).toBe('true')
  })

  it('does not duplicate file input listeners when initialized twice', async () => {
    document.body.innerHTML = `
      <div id="content">
        ${render(FileInput({ label: 'Upload file', name: 'resume' }))}
      </div>
    `

    const root = document.querySelector<HTMLElement>('.file-input')
    await initComponents({ scope: '#content' })
    const firstInstance = getInstance(root!) as { destroy: () => void, ['syncValue']?: () => void }
    const firstDestroy = vi.spyOn(firstInstance, 'destroy')

    await initComponents({ scope: '#content' })
    const secondInstance = getInstance(root!) as { ['syncValue']?: () => void }
    const input = document.querySelector<HTMLInputElement>('.file-input__native')
    const value = document.querySelector<HTMLElement>('.file-input__value')

    expect(firstInstance).toBeDefined()
    expect(secondInstance).toBeDefined()
    expect(secondInstance).not.toBe(firstInstance)
    expect(firstDestroy).toHaveBeenCalledTimes(1)
    expect((root as HTMLElement & { __instance?: unknown }).__instance).toBe(secondInstance)

    const firstSyncValue = vi.spyOn(firstInstance as { syncValue: () => void }, 'syncValue')
    const secondSyncValue = vi.spyOn(secondInstance as { syncValue: () => void }, 'syncValue')

    Object.defineProperty(input, 'files', {
      configurable: true,
      value: [{ name: 'resume.pdf' }],
    })

    input?.dispatchEvent(new Event('change', { bubbles: true }))

    expect(firstSyncValue).toHaveBeenCalledTimes(0)
    expect(secondSyncValue).toHaveBeenCalledTimes(1)
    expect(value?.textContent).toBe('resume.pdf')
  })
})
