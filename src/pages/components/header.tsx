import type { TemplateResult } from '@zoxon/mater'
import { Button } from '@/components/base/Button/index.js'
import { Header } from '@/components/base/Header/index.js'
import { PageHeader, Section } from '@/components/docs/index.js'

export function renderHeader(): TemplateResult {
  const navLinks = [
    { label: 'Dashboard', href: '#', active: true },
    { label: 'Users', href: '#' },
    { label: 'Settings', href: '#' },
  ]

  return (
    <>
      <PageHeader title="Header" desc="Top-level navigation bar with logo, nav links, and action area." />
      <Section
        title="Full header"
        canvasStyle="flex-direction:column;padding:0"
        canvas={<Header logo="Lui" navLinks={navLinks} actions={<Button label="Sign out" variant="outline" size="sm" />} />}
        code={`<Header
  logo="Lui"
  navLinks={[
    { label: 'Dashboard', href: '#', active: true },
    { label: 'Users', href: '#' },
    { label: 'Settings', href: '#' },
  ]}
  actions={<Button label="Sign out" variant="outline" size="sm" />}
/>`}
      />
      <Section
        title="Logo only"
        canvasStyle="flex-direction:column;padding:0"
        canvas={<Header logo="Lui" navLinks={[]} />}
        code={`<Header logo="Lui" navLinks={[]} />`}
      />
    </>
  )
}
