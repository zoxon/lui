// @vitest-environment happy-dom

import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { dispatchCustomEvent } from '@zoxon/eventor'
import { render } from '@zoxon/mater'
import { initComponents } from '@zoxon/nux'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { Notification } from '../components/base/Notification/index.js'
import { NotificationBoard } from '../components/base/NotificationBoard/index.js'
import { renderNotification } from '../pages/components/notification.js'
import '../components/base/NotificationBoard/client.js'
import '../pages/components/notification.client.js'

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

beforeEach(() => {
  document.body.innerHTML = ''
  vi.useRealTimers()
})

describe('notification', () => {
  it('renders an escaped message with type and close button', () => {
    const view = Notification({
      children: '<b>Saved</b>',
      type: 'success',
      id: 'notice-1',
    })

    expect(view).toContain('id="notice-1"')
    expect(view).toContain('notification--type-success')
    expect(view).toContain('notification__icon')
    expect(view).toContain('#icon-ui-check')
    expect(view).toContain('&lt;b&gt;Saved&lt;/b&gt;')
    expect(view).toContain('data-notification-close')
  })

  it('renders an icon for each notification type', () => {
    expect(Notification({ type: 'info', children: 'Info' })).toContain('#icon-ui-info')
    expect(Notification({ type: 'notice', children: 'Notice' })).toContain('#icon-ui-bell')
    expect(Notification({ type: 'success', children: 'Success' })).toContain('#icon-ui-check')
    expect(Notification({ type: 'warning', children: 'Warning' })).toContain('#icon-ui-triangle-alert')
    expect(Notification({ type: 'error', children: 'Error' })).toContain('#icon-ui-circle-x')
  })

  it('can render a notification board where notifications should appear', () => {
    const view = NotificationBoard({ id: 'alerts', position: 'top-right', delay: 100 })

    expect(view).toContain('id="alerts"')
    expect(view).toContain('notification-board--position-top-right')
    expect(view).toContain('data-notification-delay="100"')
    expect(view).toContain('data-component="notification-board"')
    expect(view).toContain('data-notification-board')
    expect(view).toContain('aria-live="polite"')
  })

  it('keeps info and notice visually distinct', () => {
    const css = readFileSync(resolve(process.cwd(), 'src/components/base/Notification/styles.css'), 'utf8')

    expect(css).toContain('&--type-info')
    expect(css).toContain('&--type-notice')
    expect(css).not.toContain('&--type-info,\n    &--type-notice')
  })

  it('animates notification icons separately from the toast container', () => {
    const css = readFileSync(resolve(process.cwd(), 'src/components/base/Notification/styles.css'), 'utf8')

    expect(css).toContain('notification-icon-enter')
    expect(css).toContain('notification-icon-exit')
    expect(css).toContain('animation-delay: 0.25s')
    expect(css).toContain('prefers-reduced-motion: reduce')
  })

  it('keeps NotificationBoard in its own component folder', () => {
    const notificationCss = readFileSync(resolve(process.cwd(), 'src/components/base/Notification/styles.css'), 'utf8')
    const boardCss = readFileSync(resolve(process.cwd(), 'src/components/base/NotificationBoard/styles.css'), 'utf8')

    expect(existsSync(resolve(process.cwd(), 'src/components/base/Notification/Notification.client.ts'))).toBe(false)
    expect(existsSync(resolve(process.cwd(), 'src/components/base/Notification/NotificationBoard.client.ts'))).toBe(false)
    expect(notificationCss).not.toContain('.notification-board')
    expect(boardCss).toContain('.notification-board')
  })
})

describe('notification runtime api', () => {
  it('shows a notification through the notification event bus', async () => {
    document.body.innerHTML = render(NotificationBoard({ id: 'alerts' }))
    await initComponents({ scope: 'body' })

    dispatchCustomEvent('notification:show', {
      message: 'Saved',
      type: 'success',
    })

    const item = document.querySelector<HTMLElement>('#alerts .notification')
    expect(item?.classList.contains('notification--type-success')).toBe(true)
    expect(item?.textContent).toContain('Saved')
  })

  it('can target a board through the notification event detail', async () => {
    document.body.innerHTML = `
      ${render(NotificationBoard({ id: 'primary', delay: 0 }))}
      ${render(NotificationBoard({ id: 'secondary', delay: 0 }))}
    `
    await initComponents({ scope: 'body' })

    dispatchCustomEvent('notification:show', {
      board: 'secondary',
      message: 'Done',
      type: 'notice',
    })

    const item = document.querySelector<HTMLElement>('#secondary .notification')
    expect(document.querySelector('#primary .notification')).toBeNull()
    expect(item?.classList.contains('notification--type-notice')).toBe(true)
  })

  it('closes by button and removes after animation end', async () => {
    document.body.innerHTML = render(NotificationBoard({ id: 'alerts', delay: 0 }))
    await initComponents({ scope: 'body' })

    dispatchCustomEvent('notification:show', {
      message: 'Saved',
    })

    const item = document.querySelector<HTMLElement>('#alerts .notification')
    const close = item?.querySelector<HTMLButtonElement>('[data-notification-close]')

    close?.dispatchEvent(new MouseEvent('click', { bubbles: true }))

    expect(item?.classList.contains('is-closing')).toBe(true)

    item?.dispatchEvent(new Event('animationend'))

    expect(document.querySelector('#alerts .notification')).toBeNull()
  })

  it('auto-closes after delay', async () => {
    vi.useFakeTimers()
    document.body.innerHTML = render(NotificationBoard({ id: 'alerts', delay: 100 }))
    await initComponents({ scope: 'body' })

    dispatchCustomEvent('notification:show', {
      message: 'Saved',
    })

    const item = document.querySelector<HTMLElement>('#alerts .notification')

    vi.advanceTimersByTime(100)

    expect(item?.classList.contains('is-closing')).toBe(true)
  })

  it('does not throw when the board is missing', () => {
    expect(() => {
      dispatchCustomEvent('notification:show', {
        message: 'Done',
      })
    }).not.toThrow()
  })

  it('does not throw when the board is not initialized by nux', () => {
    document.body.innerHTML = render(NotificationBoard({ id: 'alerts' }))

    expect(() => {
      dispatchCustomEvent('notification:show', {
        message: 'Done',
      })
    }).not.toThrow()
    expect(document.querySelector('#alerts .notification')).toBeNull()
  })

  it('shows notifications from the documentation demo buttons', async () => {
    document.body.innerHTML = render(renderNotification())
    await initComponents({ scope: 'body' })

    document.querySelector<HTMLButtonElement>('[data-notification-demo="success"]')
      ?.dispatchEvent(new MouseEvent('click', { bubbles: true }))

    const board = document.getElementById('page-notifications')
    const item = board?.querySelector<HTMLElement>('.notification')

    expect(item?.classList.contains('notification--type-success')).toBe(true)
    expect(item?.textContent).toContain('Action completed')
  })
})
