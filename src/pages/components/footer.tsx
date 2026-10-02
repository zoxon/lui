import type { TemplateResult } from '@zoxon/mater'
import { Footer } from '@/components/base/Footer/index.js'
import { PageHeader, Section } from '@/components/docs/index.js'

export function renderFooter(): TemplateResult {
  const links = [
    { label: 'Privacy', href: '#' },
    { label: 'Terms', href: '#' },
    { label: 'Contact', href: '#' },
  ]

  return (
    <>
      <PageHeader title="Footer" desc="Page footer with copyright and navigation links." />
      <Section
        title="With copyright and links"
        canvasStyle="flex-direction:column;padding:0"
        canvas={<Footer copyright="© 2026 Lui. All rights reserved." links={links} />}
        code={`<Footer
  copyright="© 2026 Lui. All rights reserved."
  links={[
    { label: 'Privacy', href: '#' },
    { label: 'Terms', href: '#' },
    { label: 'Contact', href: '#' },
  ]}
/>`}
      />
      <Section
        title="Copyright only"
        canvasStyle="flex-direction:column;padding:0"
        canvas={<Footer copyright="© 2026 Lui." />}
        code={`<Footer copyright="© 2026 Lui." />`}
      />
    </>
  )
}
