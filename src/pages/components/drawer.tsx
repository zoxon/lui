import type { TemplateResult } from '@zoxon/mater'
import { Drawer } from '@/components/base/Drawer/index.js'
import { PageHeader, Section } from '@/components/docs/index.js'

export function renderDrawer(): TemplateResult {
  const footer = '<button class="button button--variant-solid button--theme-default button--size-sm">Save</button>'

  return (
    <>
      <PageHeader title="Drawer" desc="Side panel that slides in from an edge of the viewport." />
      <Section
        title="Side variants"
        canvas={(
          <>
            <button class="button button--variant-solid button--theme-default button--size-sm" data-drawer-open="drawer-right">Open right</button>
            <button class="button button--variant-solid button--theme-default button--size-sm" data-drawer-open="drawer-left">Open left</button>

            <Drawer id="drawer-right" title="Right Drawer" side="right" footer={footer}>
              <p>Drawer body content goes here.</p>
            </Drawer>

            <Drawer id="drawer-left" title="Left Drawer" side="left" footer={footer}>
              <p>Drawer body content goes here.</p>
            </Drawer>
          </>
        )}
        code={`<Drawer
  id="drawer-right"
  title="Right Drawer"
  side="right"
>
  <p>Content</p>
</Drawer>`}
      />
    </>
  )
}
