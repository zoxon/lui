import type { TemplateResult } from '@zoxon/mater'
import { Skeleton } from '@/components/base/Skeleton/index.js'
import { PageHeader, Section } from '@/components/docs/index.js'

export function renderSkeleton(): TemplateResult {
  return (
    <>
      <PageHeader title="Skeleton" desc="Primitive loading placeholder for composing pending states." />
      <Section
        title="Variants"
        canvasStyle="flex-direction:column;align-items:flex-start;width:100%"
        canvas={(
          <>
            <Skeleton variant="text" width="12rem" />
            <Skeleton variant="rectangle" width="16rem" />
            <Skeleton variant="circle" size="lg" />
          </>
        )}
        code={`<Skeleton variant="text" width="12rem" />
<Skeleton variant="rectangle" width="16rem" />
<Skeleton variant="circle" size="lg" />`}
      />
      <Section
        title="Static"
        canvas={<Skeleton width="12rem" animated={false} />}
        code={`<Skeleton width="12rem" animated={false} />`}
      />
    </>
  )
}
