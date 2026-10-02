import type { NotificationType } from './Notification.js'
import { render } from '@zoxon/mater'
import { Notification } from './Notification.js'

export interface ShowNotificationOptions {
  board?: string
  type?: NotificationType
  close?: boolean
  class?: string
}

export interface ShowNotificationEventDetail extends ShowNotificationOptions {
  message: string
}

declare global {
  interface WindowEventMap {
    'notification:show': CustomEvent<ShowNotificationEventDetail>
  }
}

let nextId = 0

export function createNotificationElement(
  message: string,
  options: Required<Pick<ShowNotificationOptions, 'type' | 'close'>> & ShowNotificationOptions,
): HTMLElement {
  const id = `notification-${++nextId}`
  const parser = new DOMParser()
  const doc = parser.parseFromString(render(Notification({
    id,
    children: message,
    type: options.type,
    close: options.close,
    class: options.class,
  })), 'text/html')
  const element = doc.body.firstElementChild

  if (!element)
    throw new Error('Notification could not be rendered')

  return document.importNode(element, true) as HTMLElement
}
