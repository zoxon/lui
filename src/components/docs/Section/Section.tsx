import type { TemplateResult } from '@zoxon/mater'
import { raw } from '@zoxon/mater'
import { CodeBlock } from '@/components/base/Code/index.js'

export interface SectionProps {
  title: string
  canvas: string | TemplateResult // trusted HTML or rendered component
  code?: string // code text displayed in the code panel (auto-escaped)
  canvasStyle?: string // optional inline style for the canvas element
  desc?: string // optional trusted HTML shown between heading and preview
}

export function Section({ title, canvas, code, canvasStyle, desc }: SectionProps): TemplateResult {
  return (
    <div class="docs-section">
      <h2 class="docs-section__title">{title}</h2>
      {desc
        ? <p class="docs-page__desc" style="margin-bottom:var(--spacing-3)">{raw(desc)}</p>
        : null}

      <div class="docs-preview">
        <div class="docs-preview__canvas" style={canvasStyle}>
          {typeof canvas === 'string'
            ? raw(canvas)
            : canvas}
        </div>
        {code !== undefined
          ? <div class="docs-preview__code"><CodeBlock code={code} lang="tsx" /></div>
          : null}
      </div>
    </div>
  )
}
