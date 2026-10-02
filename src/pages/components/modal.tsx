import type { TemplateResult } from '@zoxon/mater'
import { Modal } from '@/components/base/Modal/index.js'
import { PageHeader, Section } from '@/components/docs/index.js'

export function renderModal(): TemplateResult {
  const footer = '<button class="button button--variant-solid button--theme-default button--size-sm">Confirm</button>'

  return (
    <>
      <PageHeader title="Modal" desc="Dialog overlay for focused interactions requiring user attention." />
      <Section
        title="Size variants"
        canvas={(
          <>
            <button class="button button--variant-solid button--theme-default button--size-sm" data-modal-open="modal-sm">Open sm</button>
            <button class="button button--variant-solid button--theme-default button--size-sm" data-modal-open="modal-md">Open md</button>
            <button class="button button--variant-solid button--theme-default button--size-sm" data-modal-open="modal-lg">Open lg</button>
            <button class="button button--variant-solid button--theme-default button--size-sm" data-modal-open="modal-xl">Open xl</button>

            <Modal id="modal-sm" title="Small Modal" size="sm" footer={footer}>
              <p>Modal body content goes here.</p>
            </Modal>
            <Modal id="modal-md" title="Medium Modal" size="md" footer={footer}>
              <p>Modal body content goes here.</p>
            </Modal>
            <Modal id="modal-lg" title="Large Modal" size="lg" footer={footer}>
              <p>Modal body content goes here.</p>
            </Modal>
            <Modal id="modal-xl" title="Extra Large" size="xl" footer={footer}>
              <p>Modal body content goes here.</p>
            </Modal>
          </>
        )}
        code={`<Modal
  id="modal-sm"
  title="Small Modal"
  size="sm"
>
  <p>Content</p>
</Modal>`}
      />
    </>
  )
}
