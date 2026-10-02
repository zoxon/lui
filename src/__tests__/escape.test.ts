// design-system/__tests__/escape.test.ts
import { describe, expect, it } from 'vitest'
import { escapeHtml } from '../utils/escape.js'

describe('escapeHtml', () => {
  it('escapes ampersand', () => {
    expect(escapeHtml('a & b')).toBe('a &amp; b')
  })

  it('escapes less-than', () => {
    expect(escapeHtml('<script>')).toBe('&lt;script&gt;')
  })

  it('escapes greater-than', () => {
    expect(escapeHtml('a > b')).toBe('a &gt; b')
  })

  it('escapes double quotes', () => {
    expect(escapeHtml('"hello"')).toBe('&quot;hello&quot;')
  })

  it('escapes single quotes', () => {
    expect(escapeHtml('it\'s fine')).toBe('it&#39;s fine')
  })

  it('escapes all special chars at once', () => {
    expect(escapeHtml(`<a href="x" title='y'>a & b</a>`))
      .toBe('&lt;a href=&quot;x&quot; title=&#39;y&#39;&gt;a &amp; b&lt;/a&gt;')
  })

  it('returns plain strings unchanged', () => {
    expect(escapeHtml('Hello world')).toBe('Hello world')
  })

  it('handles empty string', () => {
    expect(escapeHtml('')).toBe('')
  })
})
