import { dispatchCustomEvent, listenEvent } from '@zoxon/eventor'
import { Component, defineComponent } from '@zoxon/nux'
import { focusFirst, trapFocus } from '../overlays/focus.js'
import { destroyPreviousInstance, isCurrentInstance, replaceListenerController } from '../overlays/instance.js'

declare global {
  interface WindowEventMap {
    'drawer:open': CustomEvent<string>
    'drawer:close': CustomEvent<string>
  }
}

type DrawerDocument = Document & {
  __drawerTriggerController?: AbortController
}

export function openDrawer(id: string): void {
  dispatchCustomEvent('drawer:open', id)
}

export function closeDrawer(id: string): void {
  dispatchCustomEvent('drawer:close', id)
}

class DrawerClient extends Component {
  private controller?: AbortController
  private stopOpenListener?: () => void
  private stopCloseListener?: () => void
  private returnFocus?: HTMLElement

  bindEvents(): void {
    destroyPreviousInstance(this.element, this)
    this.controller = replaceListenerController(this.element)

    this.closeButton?.addEventListener('click', () => {
      if (!isCurrentInstance(this.element, this))
        return

      this.close()
    }, { signal: this.controller.signal })
    document.addEventListener('keydown', (event) => {
      if (!isCurrentInstance(this.element, this) || !this.element.classList.contains('is-visible'))
        return
      if (event.key === 'Escape') {
        event.preventDefault()
        this.close()
        return
      }
      if (this.dialog)
        trapFocus(event, this.dialog)
    }, { signal: this.controller.signal })

    this.element.addEventListener('click', (event) => {
      if (!isCurrentInstance(this.element, this))
        return

      if (event.target === this.element)
        this.close()
    }, { signal: this.controller.signal })

    this.stopOpenListener = listenEvent('drawer:open', (event) => {
      if (!isCurrentInstance(this.element, this) || event.detail !== this.element.id)
        return

      this.open()
    })

    this.stopCloseListener = listenEvent('drawer:close', (event) => {
      if (!isCurrentInstance(this.element, this) || event.detail !== this.element.id)
        return

      this.close()
    })
  }

  override destroy(): void {
    this.controller?.abort()
    this.controller = undefined

    this.stopOpenListener?.()
    this.stopOpenListener = undefined

    this.stopCloseListener?.()
    this.stopCloseListener = undefined

    super.destroy()
  }

  open(): void {
    this.returnFocus = document.activeElement instanceof HTMLElement
      ? document.activeElement
      : undefined
    this.element.classList.add('is-visible')
    if (this.dialog)
      focusFirst(this.dialog, this.closeButton)
  }

  close(): void {
    this.element.classList.remove('is-visible')
    this.returnFocus?.focus()
    this.returnFocus = undefined
  }

  private get closeButton(): HTMLButtonElement | undefined {
    return this.get<HTMLButtonElement>('close')
  }

  private get dialog(): HTMLElement | undefined { return this.element.querySelector<HTMLElement>('.drawer') ?? undefined }
}

function bindDrawerTriggers(): void {
  if (typeof document === 'undefined')
    return

  const drawerDocument = document as DrawerDocument
  drawerDocument.__drawerTriggerController?.abort()

  const controller = new AbortController()
  drawerDocument.__drawerTriggerController = controller

  document.addEventListener('click', (event) => {
    const trigger = (event.target as HTMLElement | null)?.closest<HTMLElement>('[data-drawer-open]')
    const id = trigger?.dataset.drawerOpen

    if (!id)
      return

    openDrawer(id)
  }, { signal: controller.signal })
}

bindDrawerTriggers()

defineComponent('drawer', DrawerClient)
