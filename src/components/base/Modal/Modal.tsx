import type { RawHtml, TemplateResult } from '@zoxon/mater'
import { Icon } from '@/components/base/Icon/index.js'

export interface ModalProps {
  title: string
  children: string | TemplateResult | RawHtml
  footer?: string | TemplateResult | RawHtml // string: escaped; wrap trusted HTML in raw()
  id?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  class?: string
}

export function Modal({ title, children, footer, id, size = 'md', class: className }: ModalProps): TemplateResult {
  const titleId = `${id ?? 'modal'}-title`
  return (
    <div class="modal-backdrop" id={id} data-component="modal" hidden>
      <div class={['modal', `modal--size-${size}`, className]} role="dialog" aria-modal="true" aria-labelledby={titleId}>
        <div class="modal__header">
          <h2 class="modal__title" id={titleId}>{title}</h2>
          <button class="modal__close" data-modal-close data-ref="modal:close" aria-label="Close">
            <Icon name="ui/x" size={20} />
          </button>
        </div>

        <div class="modal__body">
          {children}
        </div>

        {footer && (
          <div class="modal__footer">
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}
