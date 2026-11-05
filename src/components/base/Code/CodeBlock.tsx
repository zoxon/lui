import type { TemplateResult } from '@zoxon/mater'
import { raw } from '@zoxon/mater'
import hljs from 'highlight.js/lib/core'
import bash from 'highlight.js/lib/languages/bash'
import css from 'highlight.js/lib/languages/css'
import javascript from 'highlight.js/lib/languages/javascript'
import json from 'highlight.js/lib/languages/json'
import typescript from 'highlight.js/lib/languages/typescript'
import xml from 'highlight.js/lib/languages/xml'

hljs.registerLanguage('bash', bash)
hljs.registerLanguage('css', css)
hljs.registerLanguage('html', xml)
hljs.registerLanguage('xml', xml)
hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('js', javascript)
hljs.registerLanguage('json', json)
hljs.registerLanguage('jsx', javascript)
hljs.registerLanguage('sh', bash)
hljs.registerLanguage('ts', typescript)
hljs.registerLanguage('tsx', typescript)
hljs.registerLanguage('typescript', typescript)

export interface CodeBlockProps {
  code: string
  lang?: string
  filename?: string
  terminal?: boolean
  highlight?: boolean
  class?: string
}

function highlightCode(code: string, lang?: string): string | null {
  if (!lang || !hljs.getLanguage(lang))
    return null

  try {
    return hljs.highlight(code, { language: lang, ignoreIllegals: true }).value
  }
  catch {
    return null
  }
}

export function CodeBlock(props: CodeBlockProps): TemplateResult {
  const { code, lang, filename, terminal = false, highlight = true, class: className } = props
  const highlighted = highlight
    ? highlightCode(code, lang)
    : null

  return (
    <div class={['code-block', terminal && 'code-block--terminal', className]}>
      {(filename || lang) && (
        <div class="code-block__header">
          <span>{filename ?? lang ?? ''}</span>
        </div>
      )}
      <pre class="code-block__pre">
        <code class={lang
          ? `language-${lang}`
          : undefined}
        >
          {highlighted
            ? raw(highlighted)
            : code}
        </code>
      </pre>
    </div>
  )
}
