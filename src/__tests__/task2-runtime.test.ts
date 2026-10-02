// @vitest-environment happy-dom

import { render } from '@zoxon/mater'
import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'
import { Accordion, AccordionItem } from '../components/base/Accordion/index.js'
import { Spoiler } from '../components/base/Spoiler/index.js'

const downMock = vi.fn(async (element: HTMLElement) => {
  element.style.display = ''
})

const upMock = vi.fn(async (element: HTMLElement) => {
  element.style.display = 'none'
})

vi.mock('@zoxon/nux', () => {
  class Component {
    name: string
    element: HTMLElement
    rawRefs: { name: string, element: HTMLElement }[]
    options: Record<string, unknown>
    data: Record<string, unknown>
    destroyed = false

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
      options?: Record<string, unknown>
      data?: Record<string, unknown>
    }) {
      this.name = name
      this.element = element
      this.options = options
      this.rawRefs = references
      this.data = data
      this.buildCache()
      this.bindEvents()
      ;(this.element as HTMLElement & { __instance?: Component }).__instance = this
    }

    init(): void {}
    buildCache(): void {}
    bindEvents(): void {}

    destroy(): void {
      this.destroyed = true
      ;(this.element as HTMLElement & { __instance?: Component }).__instance = undefined
    }

    get<T extends HTMLElement = HTMLElement>(name: string): T | undefined {
      return this.rawRefs.find(ref => ref.name.toLowerCase() === `${this.name}:${name}`.toLowerCase())?.element as T | undefined
    }

    getAll<T extends HTMLElement = HTMLElement>(name: string): T[] {
      return this.rawRefs
        .filter(ref => ref.name === `${this.name}:${name}`)
        .map(ref => ref.element as T)
    }
  }

  const registry = new Map<string, new (options: {
    name: string
    element: HTMLElement
    references?: { name: string, element: HTMLElement }[]
  }) => Component>()

  return {
    Component,
    defineComponent: (name: string, component: new (options: {
      name: string
      element: HTMLElement
      references?: { name: string, element: HTMLElement }[]
    }) => Component) => {
      registry.set(name, component)
    },
    initComponents: async ({ scope = 'page' }: { scope?: string } = {}) => {
      const root = !scope || scope === 'page'
        ? document
        : document.querySelector(scope) ?? document

      const components = Array.from(root.querySelectorAll<HTMLElement>('[data-component]'))

      for (const element of components) {
        const name = element.dataset.component
        if (!name)
          continue

        const ComponentCtor = registry.get(name)
        if (!ComponentCtor)
          continue

        const references = Array.from(element.querySelectorAll<HTMLElement>('[data-ref]'))
          .map(ref => ({ name: ref.dataset.ref ?? '', element: ref }))

        const instance = new ComponentCtor({ name, element, references })
        await instance.init()
      }
    },
  }
})

vi.mock('slide-element', () => ({
  down: downMock,
  up: upMock,
}))

const { initComponents } = await import('@zoxon/nux')

beforeAll(async () => {
  await import('../components/base/Accordion/client.js')
  await import('../components/base/Spoiler/client.js')
})

beforeEach(() => {
  document.body.innerHTML = ''
})

afterEach(() => {
  document.body.innerHTML = ''
  downMock.mockImplementation(async (element: HTMLElement) => {
    element.style.display = ''
  })
  upMock.mockImplementation(async (element: HTMLElement) => {
    element.style.display = 'none'
  })
  downMock.mockClear()
  upMock.mockClear()
})

describe('task 2 nux runtime', () => {
  it('initializes only the replaced page subtree', async () => {
    document.body.innerHTML = `
      <div id="content">
        ${render(Accordion({
          children: [
            AccordionItem({ title: 'Inside', children: '<p>Inside content</p>' }),
          ],
        }))}
      </div>
      ${render(Spoiler({ label: 'Outside', children: '<p>Outside content</p>' }))}
    `

    await initComponents({ scope: '#content' })

    const insideContent = document.querySelector<HTMLElement>('#content .accordion__content')
    const outsideContent = document.querySelector<HTMLElement>('body > .spoiler .spoiler__content')

    expect(insideContent?.style.display).toBe('none')
    expect(outsideContent?.style.display).toBe('')
  })

  it('does not duplicate accordion listeners when initialized twice', async () => {
    document.body.innerHTML = `
      <div id="content">
        ${render(Accordion({
          children: [
            AccordionItem({ title: 'Question', children: '<p>Answer</p>' }),
          ],
        }))}
      </div>
    `

    await initComponents({ scope: '#content' })
    await initComponents({ scope: '#content' })

    const trigger = document.querySelector<HTMLElement>('.accordion__trigger')

    trigger?.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }))
    await Promise.resolve()

    expect(downMock).toHaveBeenCalledTimes(1)
  })

  it('does not duplicate spoiler listeners when initialized twice', async () => {
    document.body.innerHTML = `
      <div id="content">
        ${render(Spoiler({ label: 'Show', children: '<p>Answer</p>' }))}
      </div>
    `

    await initComponents({ scope: '#content' })
    await initComponents({ scope: '#content' })

    const trigger = document.querySelector<HTMLElement>('.spoiler__trigger')

    trigger?.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }))
    await Promise.resolve()

    expect(downMock).toHaveBeenCalledTimes(1)
  })

  it('destroys the previous accordion instance before re-init on the same element', async () => {
    document.body.innerHTML = `
      <div id="content">
        ${render(Accordion({
          children: [
            AccordionItem({ title: 'Question', children: '<p>Answer</p>' }),
          ],
        }))}
      </div>
    `

    const root = document.querySelector<HTMLElement>('.accordion')
    await initComponents({ scope: '#content' })
    const firstInstance = (root as HTMLElement & { __instance?: { destroyed?: boolean } }).__instance
    await initComponents({ scope: '#content' })
    const secondInstance = (root as HTMLElement & { __instance?: unknown }).__instance

    expect(firstInstance).toBeDefined()
    expect(firstInstance?.destroyed).toBe(true)
    expect(secondInstance).toBeDefined()
    expect(secondInstance).not.toBe(firstInstance)
  })

  it('destroys the previous spoiler instance before re-init on the same element', async () => {
    document.body.innerHTML = `
      <div id="content">
        ${render(Spoiler({ label: 'Show', children: '<p>Answer</p>' }))}
      </div>
    `

    const root = document.querySelector<HTMLElement>('.spoiler')
    await initComponents({ scope: '#content' })
    const firstInstance = (root as HTMLElement & { __instance?: { destroyed?: boolean } }).__instance
    await initComponents({ scope: '#content' })
    const secondInstance = (root as HTMLElement & { __instance?: unknown }).__instance

    expect(firstInstance).toBeDefined()
    expect(firstInstance?.destroyed).toBe(true)
    expect(secondInstance).toBeDefined()
    expect(secondInstance).not.toBe(firstInstance)
  })

  it('resets accordion animation state after an expand animation failure', async () => {
    downMock.mockRejectedValueOnce(new Error('expand failed'))

    document.body.innerHTML = `
      <div id="content">
        ${render(Accordion({
          children: [
            AccordionItem({ title: 'Question', children: '<p>Answer</p>' }),
          ],
        }))}
      </div>
    `

    await initComponents({ scope: '#content' })

    const item = document.querySelector<HTMLDetailsElement>('.accordion__item')
    const root = document.querySelector<HTMLElement>('.accordion')
    const instance = (root as HTMLElement & { __instance?: { expand: (item: HTMLDetailsElement) => Promise<void> } }).__instance

    expect(instance).toBeDefined()
    expect(item).toBeDefined()

    await expect(instance?.expand(item!)).rejects.toThrow('expand failed')
    await expect(instance?.expand(item!)).resolves.toBeUndefined()

    expect(downMock).toHaveBeenCalledTimes(2)
    expect(item?.hasAttribute('open')).toBe(true)
  })

  it('resets spoiler animation state after a collapse animation failure', async () => {
    upMock.mockRejectedValueOnce(new Error('collapse failed'))

    document.body.innerHTML = `
      <div id="content">
        ${render(Spoiler({ label: 'Show', children: '<p>Answer</p>', expanded: true }))}
      </div>
    `

    await initComponents({ scope: '#content' })

    const spoiler = document.querySelector<HTMLDetailsElement>('.spoiler')
    const root = document.querySelector<HTMLElement>('.spoiler')
    const instance = (root as HTMLElement & { __instance?: { collapse: () => Promise<void> } }).__instance

    expect(instance).toBeDefined()

    await expect(instance?.collapse()).rejects.toThrow('collapse failed')
    await expect(instance?.collapse()).resolves.toBeUndefined()

    expect(upMock).toHaveBeenCalledTimes(2)
    expect(spoiler?.hasAttribute('open')).toBe(false)
  })
})
