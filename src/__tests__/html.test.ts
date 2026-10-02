import { describe, expect, it } from 'vitest'
import { html, raw, SafeHtml } from '../utils/html'

describe('helpers/html compatibility', () => {
  it('supports inline boolean attributes', () => {
    const result = html`<input disabled=${true} required=${false} />`
    expect(result.html.value).toBe('<input disabled />')
  })

  it('supports attrs objects with precedence over scalar sugar', () => {
    const result = html`<input attrs=${{ disabled: false, checked: true }} disabled=${true} />`
    expect(result.html.value).toBe('<input checked />')
  })

  it('keeps raw html trusted in content position', () => {
    expect(html`<div>${raw('<b>x</b>')}</div>`.html.value).toBe('<div><b>x</b></div>')
  })

  it('still exposes SafeHtml wrapper', () => {
    expect(html`<p>test</p>`.html).toBeInstanceOf(SafeHtml)
  })
})
