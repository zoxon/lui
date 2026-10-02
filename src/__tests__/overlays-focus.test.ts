// @vitest-environment happy-dom

import { describe, expect, it } from 'vitest'
import { focusFirst, trapFocus } from '../components/base/overlays/focus.js'

function makeDialog(): HTMLElement {
  document.body.innerHTML = `
    <div id="dialog">
      <button id="first">First</button>
      <input id="middle" />
      <button id="last">Last</button>
    </div>
  `
  return document.getElementById('dialog')!
}

describe('overlays/focus', () => {
  describe('focusFirst', () => {
    it('focuses the preferred element when given', () => {
      const dialog = makeDialog()
      const preferred = document.getElementById('last') as HTMLElement
      focusFirst(dialog, preferred)
      expect(document.activeElement).toBe(preferred)
    })

    it('falls back to the first focusable element inside the container', () => {
      const dialog = makeDialog()
      focusFirst(dialog)
      expect(document.activeElement).toBe(document.getElementById('first'))
    })

    it('falls back to the container itself when nothing focusable is found', () => {
      document.body.innerHTML = `<div id="empty" tabindex="-1"><span>No focusable children</span></div>`
      const empty = document.getElementById('empty')!
      focusFirst(empty)
      expect(document.activeElement).toBe(empty)
    })
  })

  describe('trapFocus', () => {
    it('wraps Shift+Tab from the first element to the last', () => {
      const dialog = makeDialog()
      const first = document.getElementById('first') as HTMLElement
      const last = document.getElementById('last') as HTMLElement
      first.focus()

      const event = new KeyboardEvent('keydown', { key: 'Tab', shiftKey: true, cancelable: true })
      trapFocus(event, dialog)

      expect(event.defaultPrevented).toBe(true)
      expect(document.activeElement).toBe(last)
    })

    it('wraps Tab from the last element to the first', () => {
      const dialog = makeDialog()
      const first = document.getElementById('first') as HTMLElement
      const last = document.getElementById('last') as HTMLElement
      last.focus()

      const event = new KeyboardEvent('keydown', { key: 'Tab', cancelable: true })
      trapFocus(event, dialog)

      expect(event.defaultPrevented).toBe(true)
      expect(document.activeElement).toBe(first)
    })

    it('does not interfere with Tab on a middle element', () => {
      const dialog = makeDialog()
      const middle = document.getElementById('middle') as HTMLElement
      middle.focus()

      const event = new KeyboardEvent('keydown', { key: 'Tab', cancelable: true })
      trapFocus(event, dialog)

      expect(event.defaultPrevented).toBe(false)
    })

    it('ignores non-Tab keys', () => {
      const dialog = makeDialog()
      const last = document.getElementById('last') as HTMLElement
      last.focus()

      const event = new KeyboardEvent('keydown', { key: 'Escape', cancelable: true })
      trapFocus(event, dialog)

      expect(event.defaultPrevented).toBe(false)
      expect(document.activeElement).toBe(last)
    })
  })
})
