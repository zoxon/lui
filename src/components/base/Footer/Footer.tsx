import type { TemplateResult } from '@zoxon/mater'

export interface FooterLink {
  label: string
  href: string
}

export interface FooterProps {
  copyright: string
  links?: FooterLink[]
  class?: string
}

export function Footer({ copyright, links, class: className }: FooterProps): TemplateResult {
  const linksHtml = links && links.length > 0
    ? (
        <div class="site-footer__links">
          {links.map(({ label, href }) =>
            <a class="site-footer__link" href={href}>{label}</a>,
          )}
        </div>
      )
    : null

  return (
    <footer class={['site-footer', className]}>
      <span class="site-footer__copyright">{copyright}</span>
      {linksHtml}
    </footer>
  )
}
