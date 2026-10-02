import { Component, defineComponent } from '@zoxon/nux'
import { destroyPreviousInstance, isCurrentInstance, replaceListenerController } from '../overlays/instance.js'

class TabsClient extends Component {
  private listeners?: Map<HTMLButtonElement, EventListener>
  private controller?: AbortController

  bindEvents(): void {
    destroyPreviousInstance(this.element, this)
    const controller = replaceListenerController(this.element)
    this.controller = controller

    this.tabs.forEach((tab) => {
      const listeners = this.getListeners()
      if (listeners.has(tab))
        return

      const listener: EventListener = () => {
        if (!isCurrentInstance(this.element, this))
          return

        this.activate(tab.dataset.tab)
      }

      tab.addEventListener('click', listener, { signal: controller.signal })
      tab.addEventListener('keydown', event => this.onKeydown(event), { signal: controller.signal })
      listeners.set(tab, listener)
    })
  }

  override destroy(): void {
    this.controller?.abort()
    this.controller = undefined

    this.getListeners().forEach((listener, tab) => {
      tab.removeEventListener('click', listener)
    })
    this.getListeners().clear()
    super.destroy()
  }

  private get tabs(): HTMLButtonElement[] {
    return this.getAll<HTMLButtonElement>('tab')
  }

  private get panels(): HTMLElement[] {
    return this.getAll<HTMLElement>('panel')
  }

  private getListeners(): Map<HTMLButtonElement, EventListener> {
    this.listeners ??= new Map()
    return this.listeners
  }

  private activate(id?: string): void {
    if (!id)
      return

    this.tabs.forEach((tab) => {
      tab.setAttribute('aria-selected', String(tab.dataset.tab === id))
      tab.tabIndex = tab.dataset.tab === id ? 0 : -1
    })

    this.panels.forEach((panel) => {
      panel.hidden = panel.dataset.panel !== id
    })
  }

  private onKeydown(event: KeyboardEvent): void {
    const index = this.tabs.indexOf(event.currentTarget as HTMLButtonElement)
    const count = this.tabs.length
    if (index < 0 || count === 0)
      return
    const target = event.key === 'ArrowRight' ? (index + 1) % count : event.key === 'ArrowLeft' ? (index - 1 + count) % count : event.key === 'Home' ? 0 : event.key === 'End' ? count - 1 : -1
    if (target < 0)
      return
    event.preventDefault()
    const tab = this.tabs[target]!
    this.activate(tab.dataset.tab)
    tab.focus()
  }
}

defineComponent('tabs', TabsClient)
