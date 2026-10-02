import { dispatchCustomEvent, listenEvent } from '@zoxon/eventor'
import { Component, defineComponent } from '@zoxon/nux'
import { focusFirst, trapFocus } from '../overlays/focus.js'
import { destroyPreviousInstance, isCurrentInstance, replaceListenerController } from '../overlays/instance.js'

declare global {
  interface WindowEventMap {
    'modal:open': CustomEvent<string>
    'modal:close': CustomEvent<string>
  }
}

type ModalDocument = Document & {
  __modalTriggerController?: AbortController
}

export function openModal(id: string): void {
  dispatchCustomEvent('modal:open', id)
}

export function closeModal(id: string): void {
  dispatchCustomEvent('modal:close', id)
}

class ModalClient extends Component {
  private controller?: AbortController
  private animationController?: AbortController
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

    this.element.addEventListener('click', (event) => {
      if (!isCurrentInstance(this.element, this))
        return

      if (event.target === this.element)
        this.close()
    }, { signal: this.controller.signal })
    document.addEventListener('keydown', (event) => {
      if (!isCurrentInstance(this.element, this) || this.element.hidden)
        return
      if (event.key === 'Escape') {
        event.preventDefault()
        this.close()
        return
      }
      if (this.dialog)
        trapFocus(event, this.dialog)
    }, { signal: this.controller.signal })

    this.stopOpenListener = listenEvent('modal:open', (event) => {
      if (!isCurrentInstance(this.element, this) || event.detail !== this.element.id)
        return

      this.open()
    })

    this.stopCloseListener = listenEvent('modal:close', (event) => {
      if (!isCurrentInstance(this.element, this) || event.detail !== this.element.id)
        return

      this.close()
    })
  }

  override destroy(): void {
    this.controller?.abort()
    this.controller = undefined

    this.animationController?.abort()
    this.animationController = undefined

    this.stopOpenListener?.()
    this.stopOpenListener = undefined

    this.stopCloseListener?.()
    this.stopCloseListener = undefined

    super.destroy()
  }

  open(): void {
    this.animationController?.abort()
    this.animationController = undefined

    this.returnFocus = document.activeElement instanceof HTMLElement ? document.activeElement : undefined
    this.element.hidden = false
    this.element.classList.remove('is-closing')
    this.element.classList.add('is-visible')
    if (this.dialog)
      focusFirst(this.dialog, this.closeButton)
  }

  close(): void {
    this.element.classList.remove('is-visible')
    this.element.classList.add('is-closing')

    const controller = new AbortController()
    this.animationController?.abort()
    this.animationController = controller

    this.element.addEventListener('animationend', () => {
      this.element.classList.remove('is-closing')
      this.element.hidden = true
      this.returnFocus?.focus()
      this.returnFocus = undefined

      if (this.animationController === controller)
        this.animationController = undefined
    }, { once: true, signal: controller.signal })
  }

  private get closeButton(): HTMLButtonElement | undefined {
    return this.get<HTMLButtonElement>('close')
  }

  private get dialog(): HTMLElement | undefined { return this.element.querySelector<HTMLElement>('.modal') ?? undefined }
}

function bindModalTriggers(): void {
  if (typeof document === 'undefined')
    return

  const modalDocument = document as ModalDocument
  modalDocument.__modalTriggerController?.abort()

  const controller = new AbortController()
  modalDocument.__modalTriggerController = controller

  document.addEventListener('click', (event) => {
    const trigger = (event.target as HTMLElement | null)?.closest<HTMLElement>('[data-modal-open]')
    const id = trigger?.dataset.modalOpen

    if (!id)
      return

    openModal(id)
  }, { signal: controller.signal })
}

bindModalTriggers()

defineComponent('modal', ModalClient)
