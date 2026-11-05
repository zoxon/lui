import type { TemplateResult } from '@zoxon/mater'
import type { TabsItemNode } from './TabsItem.js'

export interface TabsProps {
  children: TemplateResult | TemplateResult[]
  variant?: 'default' | 'pills'
  class?: string
  id?: string
}

let nextTabsId = 0

function isTabsItemNode(child: unknown): child is TabsItemNode {
  return typeof child === 'object' && child !== null && (child as { __type?: unknown }).__type === 'tabs-item'
}

export function Tabs({ children, variant = 'default', class: className, id }: TabsProps): TemplateResult {
  const tabsId = id ?? `tabs-${++nextTabsId}`
  const items = (Array.isArray(children)
    ? children
    : [children]).filter(isTabsItemNode)
  const selectedIndex = items.findIndex(item => item.selected)
  const activeIndex = selectedIndex >= 0
    ? selectedIndex
    : 0

  return (
    <div class={['tabs', variant === 'pills' && 'tabs--variant-pills', className]} data-component="tabs">
      <div class="tabs__nav" role="tablist">
        {
          items.map(({ __type, title }, index) => {
            if (__type !== 'tabs-item')
              return null

            const isActive = index === activeIndex
            const tabId = `${tabsId}-tab-${index}`
            const panelId = `${tabsId}-panel-${index}`
            return <button class="tabs__tab" id={tabId} role="tab" aria-selected={isActive ? 'true' : 'false'} aria-controls={panelId} data-ref="tabs:tab" data-tab={`tab-${index}`}>{title}</button>
          })
        }
      </div>
      {items.map(({ __type, children: content }, index) => {
        if (__type !== 'tabs-item')
          return null

        const isActive = index === activeIndex
        const tabId = `${tabsId}-tab-${index}`
        const panelId = `${tabsId}-panel-${index}`
        return <div class="tabs__panel" id={panelId} role="tabpanel" aria-labelledby={tabId} data-ref="tabs:panel" data-panel={`tab-${index}`} hidden={!isActive}>{content}</div>
      })}
    </div>
  )
}
