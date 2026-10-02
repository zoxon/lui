import type { TemplateResult } from '@zoxon/mater'
import { ThemeToggle } from '@/components/docs/ThemeToggle/index.js'
import { Container } from '../Container/index.js'

export function LandingHeader(): TemplateResult {
  return (
    <header class="landing-header">
      <Container class="landing-header__container">
        <a class="landing-header__brand" href="/" data-navigo>Lui</a>
        <nav class="landing-header__nav" aria-label="Main navigation">
          <a href="/docs/getting-started" data-navigo>Documentation</a>
          <a href="https://github.com/zoxon/lui" target="_blank" rel="noreferrer">GitHub</a>
          <ThemeToggle />
        </nav>
      </Container>
    </header>
  )
}
