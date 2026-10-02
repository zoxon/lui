import type { TemplateResult } from '@zoxon/mater'
import { raw } from '@zoxon/mater'
import { Icon } from '@/components/base/Icon/index.js'

export interface DrawerProps {
  title: string
  children: string | TemplateResult
  footer?: string // trusted HTML from developer
  id?: string
  side?: 'left' | 'right' | 'top' | 'bottom'
  class?: string
}

function renderContent(children: string | TemplateResult) {
  return typeof children === 'string' ? raw(children) : children
}

export function Drawer({ title, children, footer, id, side = 'right', class: className }: DrawerProps): TemplateResult {
  const titleId = `${id ?? 'drawer'}-title`
  return (
    <div class="drawer-backdrop" id={id} data-component="drawer">
      <aside class={['drawer', `drawer--side-${side}`, className]} role="dialog" aria-modal="true" aria-labelledby={titleId}>
        <div class="drawer__header">
          <h2 class="drawer__title" id={titleId}>{title}</h2>
          <button class="drawer__close" data-drawer-close data-ref="drawer:close" aria-label="Close"><Icon name="ui/x" size={20} /></button>
        </div>

        <div class="drawer__body">
          {renderContent(children)}
        </div>

        {footer && (
          <div class="drawer__footer">
            {raw(footer)}
          </div>
        )}
      </aside>
    </div>
  )
}
