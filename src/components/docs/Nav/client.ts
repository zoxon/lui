import { listenEvent } from '@zoxon/eventor'
import { Component, defineComponent } from '@zoxon/nux'

declare global {
  interface WindowEventMap {
    'router:change': CustomEvent<{ page: string }>
  }
}

interface DestroyableInstance {
  destroy: () => void
}

interface NavElement extends HTMLElement {
  __instance?: DestroyableInstance
  __navListenerController?: AbortController
}

class NavClient extends Component {
  private controller?: AbortController
  private stopRouteChangeListener?: () => void

  bindEvents(): void {
    this.destroyPreviousInstance()
    this.controller = this.replaceListenerController()

    this.syncFromLocation()

    this.stopRouteChangeListener = listenEvent('router:change', (event) => {
      if (!this.isCurrentInstance())
        return

      this.setActivePage(event.detail.page)
    })
  }

  override destroy(): void {
    this.controller?.abort()
    this.controller = undefined

    if ((this.element as NavElement).__navListenerController?.signal.aborted)
      (this.element as NavElement).__navListenerController = undefined

    this.stopRouteChangeListener?.()
    this.stopRouteChangeListener = undefined

    super.destroy()
  }

  private syncFromLocation(): void {
    const activeLink = this.links.find((link) => {
      return new URL(link.href, window.location.origin).pathname === window.location.pathname
    })

    this.setActivePage(activeLink?.dataset.page)
  }

  private setActivePage(page?: string): void {
    this.links.forEach((link) => {
      link.classList.toggle('docs-nav__link--active', link.dataset.page === page)
    })
  }

  private get links(): HTMLAnchorElement[] {
    return Array.from(this.element.querySelectorAll<HTMLAnchorElement>('.docs-nav__link'))
  }

  private destroyPreviousInstance(): void {
    const previous = (this.element as NavElement).__instance
    if (previous && previous !== this)
      previous.destroy()
  }

  private isCurrentInstance(): boolean {
    return (this.element as NavElement).__instance === this
  }

  private replaceListenerController(): AbortController {
    const element = this.element as NavElement

    element.__navListenerController?.abort()

    const controller = new AbortController()
    element.__navListenerController = controller
    return controller
  }
}

defineComponent('docs-nav', NavClient)
