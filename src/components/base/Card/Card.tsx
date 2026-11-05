import type { RawHtml, TemplateResult } from '@zoxon/mater'

export interface CardProps {
  title?: string
  subtitle?: string
  children: string | TemplateResult | RawHtml
  footer?: string | TemplateResult | RawHtml // string: escaped; wrap trusted HTML in raw()
  actions?: string | TemplateResult | RawHtml // string: escaped; wrap trusted HTML in raw()
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
          {actions && <div class="card__actions">{actions}</div>}
        </div>
      )}
      <div class="card__body">
        {children}
      </div>
      {footer && <div class="card__footer">{footer}</div>}
    </div>
  )
}
