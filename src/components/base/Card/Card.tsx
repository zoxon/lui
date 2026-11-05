import type { TemplateResult } from '@zoxon/mater'
import { raw } from '@zoxon/mater'

export interface CardProps {
  title?: string
  subtitle?: string
  children: string | TemplateResult
  footer?: string // trusted HTML from developer
  actions?: string // trusted HTML from developer (placed in header)
  class?: string
}

export function Card(props: CardProps): TemplateResult {
  const { title, subtitle, children, footer, actions, class: className } = props

  return (
    <div class={['card', className]}>
      {title && (
        <div class="card__header">
          <div>
            <h3 class="card__title">{title}</h3>
            {subtitle && <p class="card__subtitle">{subtitle}</p>}
          </div>
          {actions && <div class="card__actions">{raw(actions)}</div>}
        </div>
      )}
      <div class="card__body">
        {typeof children === 'string'
          ? raw(children)
          : children}
      </div>
      {footer && <div class="card__footer">{raw(footer)}</div>}
    </div>
  )
}
