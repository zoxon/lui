import type { TemplateResult } from '@zoxon/mater'
import { raw } from '@zoxon/mater'

export interface NavLink {
  label: string
  href: string
  active?: boolean
}

export interface HeaderProps {
  logo: string
  navLinks: NavLink[]
  actions?: string // trusted HTML from developer
  class?: string
}

export function Header({ logo, navLinks, actions, class: className }: HeaderProps): TemplateResult {
  const linksHtml = navLinks.map(({ label, href, active }) =>
    <a class={['site-header__nav-link', active && 'site-header__nav-link--active']} href={href}>{label}</a>,
  )

  return (
    <header class={['site-header', className]}>
      <span class="site-header__logo">{logo}</span>
      <nav class="site-header__nav">{linksHtml}</nav>
      {actions && (
        <div class="site-header__actions">
          {raw(actions)}
        </div>
      )}
    </header>
  )
}
