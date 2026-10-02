import type { NotificationType } from '@/components/base/Notification/index.js'
import { dispatchCustomEvent } from '@zoxon/eventor'
import { Component, defineComponent } from '@zoxon/nux'

interface DestroyableInstance {
  destroy: () => void
}

type NotificationDemoElement = HTMLElement & {
  __instance?: DestroyableInstance
  __notificationDemoController?: AbortController
}

class NotificationDemoClient extends Component {
  private controller?: AbortController

  bindEvents(): void {
    this.destroyPreviousInstance()
    this.controller = this.replaceListenerController()

    this.element.addEventListener('click', (event) => {
      if (!this.isCurrentInstance())
        return

      const trigger = (event.target as HTMLElement | null)?.closest<HTMLButtonElement>('[data-notification-demo]')
      const type = trigger?.dataset.notificationDemo as NotificationType | undefined
      const message = trigger?.dataset.notificationDemoMessage
      const board = trigger?.dataset.notificationBoard

      if (!type || !message)
        return

      dispatchCustomEvent('notification:show', {
        board,
        message,
        type,
      })
    }, { signal: this.controller.signal })
  }

  override destroy(): void {
    this.controller?.abort()
    this.controller = undefined

    if ((this.element as NotificationDemoElement).__notificationDemoController?.signal.aborted)
      (this.element as NotificationDemoElement).__notificationDemoController = undefined

    super.destroy()
  }

  private destroyPreviousInstance(): void {
    const previous = (this.element as NotificationDemoElement).__instance
    if (previous && previous !== this)
      previous.destroy()
  }

  private isCurrentInstance(): boolean {
    return (this.element as NotificationDemoElement).__instance === this
  }

  private replaceListenerController(): AbortController {
    const element = this.element as NotificationDemoElement

    element.__notificationDemoController?.abort()

    const controller = new AbortController()
    element.__notificationDemoController = controller
    return controller
  }
}

defineComponent('notification-demo', NotificationDemoClient)
