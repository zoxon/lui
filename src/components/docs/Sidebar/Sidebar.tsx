import type { TemplateResult } from '@zoxon/mater'
import type { NavGroup } from '@/components/docs/Nav/index.js'
import { Logo } from '@/components/docs/Logo/index.js'
import { Nav } from '@/components/docs/Nav/index.js'
import { ThemeToggle } from '@/components/docs/ThemeToggle/index.js'

export interface SidebarProps {
  items: NavGroup[]
}

export function Sidebar({ items }: SidebarProps): TemplateResult {
  return (
    <aside class="docs-sidebar" id="sidebar">
      <div class="docs-sidebar__header">
        <Logo class="docs-sidebar__logo" />
        <ThemeToggle />
      </div>
      <Nav groups={items} />
    </aside>
  )
}
