// @vitest-environment happy-dom

import { dispatchCustomEvent } from '@zoxon/eventor'
import { render } from '@zoxon/mater'
import { getInstance, initComponents } from '@zoxon/nux'
import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'
import { Drawer } from '../components/base/Drawer/index.js'
import { Modal } from '../components/base/Modal/index.js'

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
  await import('../components/base/Modal/client.js')
  await import('../components/base/Drawer/client.js')
})

beforeEach(() => {
  document.body.innerHTML = ''
})

afterEach(() => {
  document.body.innerHTML = ''
})

describe('task 4 nux runtime', () => {
  it('opens a modal from the global data-modal-open trigger and closes with animation cleanup', async () => {
    document.body.innerHTML = `
      <button type="button" data-modal-open="modal-1">Open modal</button>
      <div id="content">
        ${render(Modal({ id: 'modal-1', title: 'Confirm', children: '<p>Body</p>' }))}
      </div>
    `

    await initComponents({ scope: '#content' })

    const trigger = document.querySelector<HTMLElement>('[data-modal-open="modal-1"]')
    const backdrop = document.getElementById('modal-1')
    const close = document.querySelector<HTMLButtonElement>('[data-modal-close]')

    trigger?.dispatchEvent(new MouseEvent('click', { bubbles: true }))

    expect(backdrop?.hidden).toBe(false)
    expect(backdrop?.classList.contains('is-visible')).toBe(true)
    expect(backdrop?.classList.contains('is-closing')).toBe(false)

    close?.dispatchEvent(new MouseEvent('click', { bubbles: true }))

    expect(backdrop?.classList.contains('is-visible')).toBe(false)
    expect(backdrop?.classList.contains('is-closing')).toBe(true)
    expect(backdrop?.hidden).toBe(false)

    backdrop?.dispatchEvent(new Event('animationend'))

    expect(backdrop?.hidden).toBe(true)
    expect(backdrop?.classList.contains('is-closing')).toBe(false)
  })

  it('closes the modal only on backdrop clicks, not inner content clicks', async () => {
    document.body.innerHTML = `
      <button type="button" data-modal-open="modal-1">Open modal</button>
      <div id="content">
        ${render(Modal({ id: 'modal-1', title: 'Confirm', children: '<p>Body</p>' }))}
      </div>
    `

    await initComponents({ scope: '#content' })

    const trigger = document.querySelector<HTMLElement>('[data-modal-open="modal-1"]')
    const backdrop = document.getElementById('modal-1')
    const dialog = document.querySelector<HTMLElement>('.modal')

    trigger?.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    dialog?.dispatchEvent(new MouseEvent('click', { bubbles: true }))

    expect(backdrop?.classList.contains('is-visible')).toBe(true)

    backdrop?.dispatchEvent(new MouseEvent('click', { bubbles: true }))

    expect(backdrop?.classList.contains('is-closing')).toBe(true)
  })

  it('opens and closes a modal from custom events', async () => {
    document.body.innerHTML = `
      <div id="content">
        ${render(Modal({ id: 'modal-1', title: 'Confirm', children: '<p>Body</p>' }))}
      </div>
    `

    await initComponents({ scope: '#content' })

    const backdrop = document.getElementById('modal-1')

    dispatchCustomEvent('modal:open', 'modal-1')

    expect(backdrop?.hidden).toBe(false)
    expect(backdrop?.classList.contains('is-visible')).toBe(true)

    dispatchCustomEvent('modal:close', 'modal-1')

    expect(backdrop?.classList.contains('is-visible')).toBe(false)
    expect(backdrop?.classList.contains('is-closing')).toBe(true)
  })

  it('opens a drawer from the global data-drawer-open trigger and closes from local controls', async () => {
    document.body.innerHTML = `
      <button type="button" data-drawer-open="drawer-1">Open drawer</button>
      <div id="content">
        ${render(Drawer({ id: 'drawer-1', title: 'Filters', children: '<p>Body</p>' }))}
      </div>
    `

    await initComponents({ scope: '#content' })

    const trigger = document.querySelector<HTMLElement>('[data-drawer-open="drawer-1"]')
    const backdrop = document.getElementById('drawer-1')
    const close = document.querySelector<HTMLButtonElement>('[data-drawer-close]')

    trigger?.dispatchEvent(new MouseEvent('click', { bubbles: true }))

    expect(backdrop?.classList.contains('is-visible')).toBe(true)

    close?.dispatchEvent(new MouseEvent('click', { bubbles: true }))

    expect(backdrop?.classList.contains('is-visible')).toBe(false)
  })

  it('closes the drawer only on backdrop clicks, not inner content clicks', async () => {
    document.body.innerHTML = `
      <button type="button" data-drawer-open="drawer-1">Open drawer</button>
      <div id="content">
        ${render(Drawer({ id: 'drawer-1', title: 'Filters', children: '<p>Body</p>' }))}
      </div>
    `

    await initComponents({ scope: '#content' })

    const trigger = document.querySelector<HTMLElement>('[data-drawer-open="drawer-1"]')
    const backdrop = document.getElementById('drawer-1')
    const drawer = document.querySelector<HTMLElement>('.drawer')

    trigger?.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    drawer?.dispatchEvent(new MouseEvent('click', { bubbles: true }))

    expect(backdrop?.classList.contains('is-visible')).toBe(true)

    backdrop?.dispatchEvent(new MouseEvent('click', { bubbles: true }))

    expect(backdrop?.classList.contains('is-visible')).toBe(false)
  })

  it('opens and closes a drawer from custom events', async () => {
    document.body.innerHTML = `
      <div id="content">
        ${render(Drawer({ id: 'drawer-1', title: 'Filters', children: '<p>Body</p>' }))}
      </div>
    `

    await initComponents({ scope: '#content' })

    const backdrop = document.getElementById('drawer-1')

    dispatchCustomEvent('drawer:open', 'drawer-1')

    expect(backdrop?.classList.contains('is-visible')).toBe(true)

    dispatchCustomEvent('drawer:close', 'drawer-1')

    expect(backdrop?.classList.contains('is-visible')).toBe(false)
  })

  it('does not keep the previous modal instance alive after re-init on the same DOM', async () => {
    document.body.innerHTML = `
      <button type="button" data-modal-open="modal-1">Open modal</button>
      <div id="content">
        ${render(Modal({ id: 'modal-1', title: 'Confirm', children: '<p>Body</p>' }))}
      </div>
    `

    const root = document.getElementById('modal-1')
    await initComponents({ scope: '#content' })
    const firstInstance = getInstance(root!) as { destroy: () => void, open?: () => void }
    const firstDestroy = vi.spyOn(firstInstance, 'destroy')

    await initComponents({ scope: '#content' })
    const secondInstance = getInstance(root!) as { open?: () => void }
    const trigger = document.querySelector<HTMLElement>('[data-modal-open="modal-1"]')
    const firstOpen = vi.spyOn(firstInstance as { open: () => void }, 'open')
    const secondOpen = vi.spyOn(secondInstance as { open: () => void }, 'open')

    trigger?.dispatchEvent(new MouseEvent('click', { bubbles: true }))

    expect(secondInstance).not.toBe(firstInstance)
    expect(firstDestroy).toHaveBeenCalledTimes(1)
    expect(firstOpen).toHaveBeenCalledTimes(0)
    expect(secondOpen).toHaveBeenCalledTimes(1)
  })

  it('does not keep the previous drawer instance alive after re-init on the same DOM', async () => {
    document.body.innerHTML = `
      <button type="button" data-drawer-open="drawer-1">Open drawer</button>
      <div id="content">
        ${render(Drawer({ id: 'drawer-1', title: 'Filters', children: '<p>Body</p>' }))}
      </div>
    `

    const root = document.getElementById('drawer-1')
    await initComponents({ scope: '#content' })
    const firstInstance = getInstance(root!) as { destroy: () => void, open?: () => void }
    const firstDestroy = vi.spyOn(firstInstance, 'destroy')

    await initComponents({ scope: '#content' })
    const secondInstance = getInstance(root!) as { open?: () => void }
    const trigger = document.querySelector<HTMLElement>('[data-drawer-open="drawer-1"]')
    const firstOpen = vi.spyOn(firstInstance as { open: () => void }, 'open')
    const secondOpen = vi.spyOn(secondInstance as { open: () => void }, 'open')

    trigger?.dispatchEvent(new MouseEvent('click', { bubbles: true }))

    expect(secondInstance).not.toBe(firstInstance)
    expect(firstDestroy).toHaveBeenCalledTimes(1)
    expect(firstOpen).toHaveBeenCalledTimes(0)
    expect(secondOpen).toHaveBeenCalledTimes(1)
  })
})
