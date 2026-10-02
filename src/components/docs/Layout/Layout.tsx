import type { TemplateResult } from '@zoxon/mater'
import { NotificationBoard } from '@/components/base/NotificationBoard/index.js'
import { Sidebar } from '@/components/docs/Sidebar/index.js'
import { NAV_GROUPS } from '@/nav.js'

export interface LayoutProps {
  content?: TemplateResult
  landing?: boolean
}

export function Layout({ content, landing = false }: LayoutProps = {}): TemplateResult {
  return (
    <div class={['page', landing && 'page--landing']}>
      <Sidebar items={NAV_GROUPS} />
      <main class="page__main" id="content">{content}</main>
      <NotificationBoard />
    </div>
  )
}
