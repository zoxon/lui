import type { TemplateResult } from '@zoxon/mater'
import { Spoiler } from '@/components/base/Spoiler/index.js'
import { PageHeader, Section } from '@/components/docs/index.js'

export function renderSpoiler(): TemplateResult {
  return (
    <>
      <PageHeader title="Spoiler" desc="Collapsible disclosure widget for hiding optional content." />
      <Section
        title="Collapsed (default)"
        canvasStyle="flex-direction:column;width:100%"
        canvas={(
          <Spoiler label="Show answer">
            <p>The answer is revealed here.</p>
          </Spoiler>
        )}
        code={`<Spoiler label="Show answer">
  <p>The answer is revealed here.</p>
</Spoiler>`}
      />
      <Section
        title="Expanded"
        canvasStyle="flex-direction:column;width:100%"
        canvas={(
          <Spoiler label="Show answer" expanded>
            <p>The answer is revealed here.</p>
          </Spoiler>
        )}
        code={`<Spoiler label="Show answer" expanded>
  <p>The answer is revealed here.</p>
</Spoiler>`}
      />
    </>
  )
}
