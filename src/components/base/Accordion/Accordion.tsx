import type { TemplateResult } from '@zoxon/mater'
import type { AccordionItemNode } from './AccordionItem.js'
import { raw } from '@zoxon/mater'
import { Icon } from '@/components/base/Icon/index.js'

export interface AccordionProps {
  children: AccordionItemNode | AccordionItemNode[] | TemplateResult | TemplateResult[]
  multiple?: boolean
  class?: string
}

function renderContent(children: string | TemplateResult) {
  return typeof children === 'string'
    ? raw(children)
    : children
}

function isAccordionItemNode(child: unknown): child is AccordionItemNode {
  return typeof child === 'object' && child !== null && (child as { __type?: unknown }).__type === 'accordion-item'
}

export function Accordion({ children, multiple = false, class: className }: AccordionProps): TemplateResult {
  const items = (Array.isArray(children)
    ? children
    : [children]).filter(isAccordionItemNode)

  return (
    <div
      class={['accordion', className]}
      data-component="accordion"
      data-single={!multiple
        ? 'true'
        : null}
    >
      {
        items.map(({ __type, title, expanded, children: content }) => {
          if (__type !== 'accordion-item')
            return null

          return (
            <details class="accordion__item" open={expanded}>
              <summary class="accordion__trigger">
                {title}
                <Icon name="ui/chevron-down" class="accordion__icon" />
              </summary>
              <div class="accordion__content">{renderContent(content)}</div>
            </details>
          )
        })
      }
    </div>
  )
}
