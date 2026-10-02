import type { TemplateResult } from '@zoxon/mater'
import { Spinner } from '@/components/base/Spinner/index.js'
import { PageHeader, Section } from '@/components/docs/index.js'

export function renderSpinner(): TemplateResult {
  return (
    <>
      <PageHeader title="Spinner" desc="Inline loading indicator that follows current text color." />
      <Section
        title="Sizes"
        canvas={(
          <>
            <Spinner />
            <Spinner size="sm" />
            <Spinner size="md" />
            <Spinner size="lg" />
          </>
        )}
        code={`<Spinner />
<Spinner size="sm" />
<Spinner size="md" />
<Spinner size="lg" />`}
      />
      <Section
        title="Inline"
        canvas={(
          <span>
            <Spinner />
            {' '}
            Loading
          </span>
        )}
        code="<span><Spinner /> Loading</span>"
      />
      <Section
        title="Inside button"
        canvas={(
          <button class="button button--variant-solid button--theme-default button--size-md" type="button">
            <Spinner />
            Saving
          </button>
        )}
        code={`<button class="button button--variant-solid button--theme-default button--size-md" type="button">
  <Spinner />
  Saving
</button>`}
      />
    </>
  )
}
