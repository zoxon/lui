import { Component, defineComponent } from '@zoxon/nux'
import { destroyPreviousInstance, isCurrentInstance, replaceListenerController } from '../overlays/instance.js'

const EMPTY_LABEL = 'No file chosen'

class FileInputClient extends Component {
  private inputListener?: EventListener
  private controller?: AbortController

  bindEvents(): void {
    destroyPreviousInstance(this.element, this)
    this.controller = replaceListenerController(this.element)

    if (!this.input || this.inputListener)
      return

    this.inputListener = () => {
      if (!isCurrentInstance(this.element, this))
        return

      this.syncValue()
    }

    this.input.addEventListener('change', this.inputListener, { signal: this.controller.signal })
  }

  override destroy(): void {
    this.controller?.abort()
    this.controller = undefined

    if (this.input && this.inputListener)
      this.input.removeEventListener('change', this.inputListener)

    this.inputListener = undefined
    super.destroy()
  }

  private get input(): HTMLInputElement | undefined {
    return this.get<HTMLInputElement>('input')
  }

  private get value(): HTMLElement | undefined {
    return this.get<HTMLElement>('value')
  }

  private syncValue(): void {
    if (!this.input || !this.value || !this.input.files) {
      return
    }

    const count = this.input.files.length

    if (count === 0) {
      this.value.textContent = EMPTY_LABEL
      this.value.classList.remove('has-file')
      return
    }

    this.value.classList.add('has-file')

    if (count === 1) {
      this.value.textContent = this.input.files[0]?.name ?? EMPTY_LABEL
      return
    }

    this.value.textContent = `${count} files chosen`
  }
}

defineComponent('file-input', FileInputClient)
