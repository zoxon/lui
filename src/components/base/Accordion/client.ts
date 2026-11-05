import { Component, defineComponent } from '@zoxon/nux'
import { down, up } from 'slide-element'
import { destroyPreviousInstance } from '../overlays/instance.js'

const DURATION = 250
const EASING = 'cubic-bezier(0.4, 0, 0.2, 1)'

class AccordionClient extends Component {
  private readonly animating = new WeakSet<HTMLDetailsElement>()
  private listeners?: Map<HTMLElement, EventListener>

  init(): void {
    this.getItems().forEach((item) => {
      if (item.hasAttribute('open'))
        return

      const content = item.querySelector<HTMLElement>('.accordion__content')
      if (content)
        content.style.display = 'none'
    })
  }

  bindEvents(): void {
    destroyPreviousInstance(this.element, this)

    this.getItems().forEach((item) => {
      const trigger = item.querySelector<HTMLElement>('.accordion__trigger')
      const listeners = this.getListeners()

      if (!trigger || listeners.has(trigger))
        return

      const listener: EventListener = (event) => {
        event.preventDefault()
        this.toggle(item)
      }

      trigger.addEventListener('click', listener)
      listeners.set(trigger, listener)
    })
  }

  override destroy(): void {
    this.getListeners().forEach((listener, trigger) => {
      trigger.removeEventListener('click', listener)
    })
    this.getListeners().clear()
    super.destroy()
  }

  private get isSingle(): boolean {
    return this.element.dataset.single === 'true'
  }

  private getListeners(): Map<HTMLElement, EventListener> {
    this.listeners ??= new Map()
    return this.listeners
  }

  private getItems(): HTMLDetailsElement[] {
    return Array.from(this.element.querySelectorAll<HTMLDetailsElement>('.accordion__item'))
  }

  private isAnyAnimating(): boolean {
    return this.getItems().some(item => this.animating.has(item))
  }

  private async collapse(item: HTMLDetailsElement): Promise<void> {
    if (this.animating.has(item))
      return

    this.animating.add(item)
    try {
      const content = item.querySelector<HTMLElement>('.accordion__content')
      if (content)
        await up(content, { duration: DURATION, easing: EASING })

      item.removeAttribute('open')
    }
    finally {
      this.animating.delete(item)
    }
  }

  private async expand(item: HTMLDetailsElement): Promise<void> {
    if (this.animating.has(item))
      return

    this.animating.add(item)
    try {
      item.setAttribute('open', '')

      const content = item.querySelector<HTMLElement>('.accordion__content')
      if (content)
        await down(content, { duration: DURATION, easing: EASING })
    }
    finally {
      this.animating.delete(item)
    }
  }

  private toggle(item: HTMLDetailsElement): void {
    if (this.isSingle && this.isAnyAnimating())
      return

    if (this.animating.has(item))
      return

    const isOpen = item.hasAttribute('open')

    if (this.isSingle && !isOpen) {
      this.getItems()
        .filter(other => other !== item && other.hasAttribute('open'))
        .forEach((other) => {
          void this.collapse(other)
        })
    }

    void (isOpen
      ? this.collapse(item)
      : this.expand(item))
  }
}

defineComponent('accordion', AccordionClient)
