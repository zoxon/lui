import type { ShowNotificationEventDetail, ShowNotificationOptions } from '../Notification/client.js'
import { listenEvent } from '@zoxon/eventor'
import { Component, defineComponent, getInstance } from '@zoxon/nux'
import { createNotificationElement } from '../Notification/client.js'
import { destroyPreviousInstance, isCurrentInstance, replaceListenerController } from '../overlays/instance.js'

const DEFAULT_SELECTOR = '[data-notification-board]'
const DEFAULT_DELAY = 3000

function getBoard(): HTMLElement {
  if (typeof document === 'undefined')
    throw new Error('NotificationBoard requires document')

  const element = document.querySelector<HTMLElement>(DEFAULT_SELECTOR)

  if (!element)
    throw new Error('NotificationBoard was not found')

  return element
}

export function getNotificationBoardClient(): NotificationBoardClient {
  const element = getBoard()
  const instance = getInstance(element)

  if (!(instance instanceof NotificationBoardClient))
    throw new Error('NotificationBoard is not initialized')

  return instance
}

class NotificationBoardClient extends Component {
  private controller?: AbortController
  private stopShowListener?: () => void
  private timers = new Map<string, number>()

  bindEvents(): void {
    destroyPreviousInstance(this.element, this)
    this.controller = replaceListenerController(this.element)

    this.element.addEventListener('click', (event) => {
      if (!isCurrentInstance(this.element, this))
        return

      const closeButton = (event.target as HTMLElement | null)?.closest<HTMLElement>('[data-notification-close]')
      const item = closeButton?.closest<HTMLElement>('[data-notification]')

      if (item?.id)
        this.close(item.id)
    }, { signal: this.controller.signal })

    this.stopShowListener = listenEvent('notification:show', (event) => {
      if (!isCurrentInstance(this.element, this) || !this.accepts(event.detail))
        return

      this.show(event.detail.message, event.detail)
    })
  }

  override destroy(): void {
    this.controller?.abort()
    this.controller = undefined

    this.timers.forEach(timer => window.clearTimeout(timer))
    this.timers.clear()

    this.stopShowListener?.()
    this.stopShowListener = undefined

    super.destroy()
  }

  show(message: string, options: ShowNotificationOptions = {}): string {
    const delay = this.delay
    const item = createNotificationElement(message, {
      type: options.type ?? 'info',
      close: options.close ?? true,
      ...options,
    })

    this.element.append(item)

    if (delay > 0) {
      this.timers.set(item.id, window.setTimeout(() => {
        this.close(item.id)
      }, delay))
    }

    return item.id
  }

  close(id: string): void {
    const item = this.element.querySelector<HTMLElement>(`#${CSS.escape(id)}`)
    if (!item || item.classList.contains('is-closing'))
      return

    const timer = this.timers.get(id)
    if (timer) {
      window.clearTimeout(timer)
      this.timers.delete(id)
    }

    item.classList.add('is-closing')
    item.addEventListener('animationend', () => item.remove(), { once: true })
  }

  private get delay(): number {
    const delay = Number(this.element.dataset.notificationDelay)

    return Number.isFinite(delay) ? delay : DEFAULT_DELAY
  }

  private accepts(detail: ShowNotificationEventDetail): boolean {
    if (detail.board)
      return this.element.id === detail.board

    return document.querySelector(DEFAULT_SELECTOR) === this.element
  }
}

defineComponent('notification-board', NotificationBoardClient)
