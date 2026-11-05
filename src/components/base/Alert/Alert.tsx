import type { TemplateResult } from '@zoxon/mater'
import { Icon } from '@/components/base/Icon/index.js'

export interface AlertProps {
  theme?: 'info' | 'success' | 'warning' | 'danger'
  title?: string
  children: string | TemplateResult
  closable?: boolean
  class?: string
}

export function Alert(props: AlertProps): TemplateResult {
  const {
    theme = 'info',
    title,
    children,
    closable = false,
    class: className,
  } = props

  return (
    <div class={['alert', `alert--theme-${theme}`, className]} role="status">
      {title
        ? <div class="alert__title">{title}</div>
        : null}
      <div class="alert__body">{children}</div>
      {closable
        ? (
            <button class="alert__close" type="button" data-alert-close aria-label="Close">
              <Icon name="ui/x" size={20} />
            </button>
          )
        : null}
    </div>
  )
}
