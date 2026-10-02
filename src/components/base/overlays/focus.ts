const selector = 'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])'

export function focusFirst(container: HTMLElement, preferred?: HTMLElement): void {
  ;(preferred ?? Array.from(container.querySelectorAll<HTMLElement>(selector))[0] ?? container).focus()
}

export function trapFocus(event: KeyboardEvent, container: HTMLElement): void {
  if (event.key !== 'Tab')
    return
  const elements = Array.from(container.querySelectorAll<HTMLElement>(selector))
  const first = elements[0]
  const last = elements.at(-1)
  if (!first || !last)
    return
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault()
    last.focus()
  }
  if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault()
    first.focus()
  }
}
