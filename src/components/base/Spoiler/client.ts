import { Component, defineComponent } from '@zoxon/nux'
import { down, up } from 'slide-element'
import { destroyPreviousInstance } from '../overlays/instance.js'

const DURATION = 250
const EASING = 'cubic-bezier(0.4, 0, 0.2, 1)'

class SpoilerClient extends Component {
  private isAnimating = false
  private triggerListener?: EventListener

  init(): void {
    if (this.element.hasAttribute('open'))
      return

    this.content?.style.setProperty('display', 'none')
  }

  bindEvents(): void {
    destroyPreviousInstance(this.element, this)

    if (!this.trigger || this.triggerListener)
      return

    this.triggerListener = (event) => {
      event.preventDefault()

      if (this.isAnimating || !this.content)
        return

      void (this.element.hasAttribute('open') ? this.collapse() : this.expand())
    }

    this.trigger.addEventListener('click', this.triggerListener)
  }

  override destroy(): void {
    if (this.trigger && this.triggerListener)
      this.trigger.removeEventListener('click', this.triggerListener)

    this.triggerListener = undefined
    super.destroy()
  }

  private get trigger(): HTMLElement | undefined {
    return this.get<HTMLElement>('trigger')
  }

  private get content(): HTMLElement | undefined {
    return this.get<HTMLElement>('content')
  }

  private async collapse(): Promise<void> {
    if (!this.content)
      return

    this.isAnimating = true
    try {
      await up(this.content, { duration: DURATION, easing: EASING })
      this.element.removeAttribute('open')
    }
    finally {
      this.isAnimating = false
    }
  }

  private async expand(): Promise<void> {
    if (!this.content)
      return

    this.isAnimating = true
    try {
      this.element.setAttribute('open', '')
      await down(this.content, { duration: DURATION, easing: EASING })
    }
    finally {
      this.isAnimating = false
    }
  }
}

defineComponent('spoiler', SpoilerClient)
