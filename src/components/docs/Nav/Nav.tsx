import type { TemplateResult } from '@zoxon/mater'
import { Link } from '../Link/index.js'

export interface NavItem {
  label: string
  page: string
}

export interface NavGroup {
  section: string
  items: NavItem[]
}

export interface NavProps {
  groups: NavGroup[]
}

export function Nav({ groups }: NavProps): TemplateResult {
  return (
    <nav class="docs-nav" data-component="docs-nav">
      {groups.map(({ section, items }) => {
        return (
          <>
            <div class="docs-nav__section">{section}</div>
            {items.map(({ label, page }) => (
              <Link class="docs-nav__link" page={page}>{label}</Link>
            ))}
          </>
        )
      })}
    </nav>
  )
}
