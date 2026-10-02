import { Component, defineComponent } from '@zoxon/nux'

type Theme = 'light' | 'dark'

interface DestroyableInstance {
  destroy: () => void
}

type ThemeToggleElement = HTMLElement & {
  __instance?: DestroyableInstance
  __themeToggleDispose?: () => void
}

class ThemeToggleClient extends Component {
  init(): void {
    this.applyTheme(this.getInitialTheme())
  }

  bindEvents(): void {
    this.destroyPreviousInstance()
    this.disposePreviousListener()

    const triggerListener = () => {
      const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'
      localStorage.setItem('theme', next)
      this.applyTheme(next)
    }

    this.element.addEventListener('click', triggerListener)
    ;(this.element as ThemeToggleElement).__themeToggleDispose = () => {
      this.element.removeEventListener('click', triggerListener)
    }
  }

  override destroy(): void {
    this.disposeListener()

    super.destroy()
  }

  private getInitialTheme(): Theme {
    const saved = localStorage.getItem('theme')
    if (saved === 'dark' || saved === 'light')
      return saved

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }

  private applyTheme(theme: Theme): void {
    if (theme === 'dark')
      document.documentElement.dataset.theme = 'dark'
    else
      delete document.documentElement.dataset.theme

    if (this.lightIcon)
      this.lightIcon.hidden = theme === 'dark'

    if (this.darkIcon)
      this.darkIcon.hidden = theme === 'light'
  }

  private get lightIcon(): HTMLElement | undefined {
    return this.get<HTMLElement>('lightIcon')
  }

  private get darkIcon(): HTMLElement | undefined {
    return this.get<HTMLElement>('darkIcon')
  }

  private destroyPreviousInstance(): void {
    const previous = (this.element as ThemeToggleElement).__instance
    if (previous && previous !== this)
      previous.destroy()
  }

  private disposePreviousListener(): void {
    const element = this.element as ThemeToggleElement
    element.__themeToggleDispose?.()
    element.__themeToggleDispose = undefined
  }

  private disposeListener(): void {
    const element = this.element as ThemeToggleElement
    element.__themeToggleDispose?.()
    element.__themeToggleDispose = undefined
  }
}

defineComponent('theme-toggle', ThemeToggleClient)
