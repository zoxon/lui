import { describe, expect, it } from 'vitest'
import { Code, CodeBlock } from '../components/base/Code/index.js'

describe('code (inline)', () => {
  it('renders inline code', () => {
    const html = Code({ code: 'const x = 1' })
    expect(html).toContain('class="code-inline"')
    expect(html).toContain('const x = 1')
  })

  it('escapes HTML in code', () => {
    const html = Code({ code: '<script>alert(1)</script>' })
    expect(html).not.toContain('<script>')
    expect(html).toContain('&lt;script&gt;')
  })
})

describe('codeBlock', () => {
  it('renders code block', () => {
    const html = CodeBlock({ code: 'npm install' })
    expect(html).toContain('class="code-block"')
    expect(html).toContain('code-block__pre')
    expect(html).toContain('npm install')
  })

  it('renders header with filename', () => {
    const html = CodeBlock({ code: 'x', filename: 'app.ts' })
    expect(html).toContain('code-block__header')
    expect(html).toContain('app.ts')
  })

  it('renders header with language', () => {
    const html = CodeBlock({ code: 'x', lang: 'typescript' })
    expect(html).toContain('typescript')
  })

  it('does not render header when filename and lang are absent', () => {
    const html = CodeBlock({ code: 'x' })
    expect(html).not.toContain('code-block__header')
  })

  it('applies terminal modifier', () => {
    expect(CodeBlock({ code: 'x', terminal: true })).toContain('code-block--terminal')
  })

  it('escapes HTML in code', () => {
    const html = CodeBlock({ code: '<script>alert(1)</script>' })
    expect(html).not.toContain('<script>')
    expect(html).toContain('&lt;script&gt;')
  })

  it('escapes HTML in filename', () => {
    const html = CodeBlock({ code: 'x', filename: '<b>file</b>' })
    expect(html).not.toContain('<b>')
    expect(html).toContain('&lt;b&gt;')
  })

  it('highlights known languages', () => {
    const html = CodeBlock({ code: 'const value = 1', lang: 'ts' })
    expect(html).toContain('class="language-ts"')
    expect(html).toContain('hljs-')
    expect(html).toContain('const')
  })

  it('highlights TSX markup inside TypeScript', () => {
    const html = CodeBlock({
      code: 'const el = <Button foo="bar">Hi</Button>',
      lang: 'tsx',
    })
    expect(html).toContain('class="language-tsx"')
    expect(html).toContain('hljs-keyword')
    expect(html).toContain('hljs-tag')
    expect(html).toContain('hljs-name')
  })

  it('falls back to escaped code for unknown languages', () => {
    const html = CodeBlock({ code: '<tag>x</tag>', lang: 'unknown-lang' })
    expect(html).toContain('class="language-unknown-lang"')
    expect(html).not.toContain('<tag>')
    expect(html).toContain('&lt;tag&gt;x&lt;/tag&gt;')
  })

  it('can disable highlighting', () => {
    const html = CodeBlock({ code: 'const value = 1', lang: 'ts', highlight: false })
    expect(html).toContain('class="language-ts"')
    expect(html).not.toContain('hljs-')
    expect(html).toContain('const value = 1')
  })
})
