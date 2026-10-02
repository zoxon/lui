import type { TemplateResult } from '@zoxon/mater'
import { Icon } from '@/components/base/Icon/index.js'
import { Container } from '../Container/index.js'

export function Hero(): TemplateResult {
  return (
    <section class="landing-hero" aria-labelledby="landing-title">
      <Container class="landing-hero__container">
        <p class="landing-hero__eyebrow">Lightweight User Interface</p>
        <h1 id="landing-title">Build calm, capable interfaces.</h1>
        <p class="landing-hero__lead">
          A small TypeScript component library for JSX and TemplateResult values — no framework runtime required.
        </p>
        <div class="landing-hero__actions">
          <a class="landing-button landing-button--primary" href="/docs/getting-started" data-navigo>
            Get started
          </a>
          <a class="landing-button landing-button--secondary" href="https://github.com/zoxon/lui" target="_blank" rel="noreferrer">
            <Icon name="ui/github" size={16} />
            View on GitHub
          </a>
        </div>
      </Container>
    </section>
  )
}
