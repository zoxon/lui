import type { TemplateResult } from '@zoxon/mater'
import { Container } from '../Container/index.js'

export function LandingFooter(): TemplateResult {
  return (
    <footer class="landing-footer">
      <Container class="landing-footer__container">
        <span>© 2026 Lui — Lightweight User Interface. Open source under the MIT License.</span>
        <nav aria-label="Footer navigation">
          <a href="/docs/getting-started" data-navigo>Documentation</a>
          <a href="https://github.com/zoxon/lui" target="_blank" rel="noreferrer">GitHub</a>
        </nav>
      </Container>
    </footer>
  )
}
