import type { TemplateResult } from '@zoxon/mater'
import { Container } from '../Container/index.js'

const renderExample = `import { render } from '@zoxon/mater'
import { Button } from '@zoxon/lui/components/index.js'

const view = <Button label="Save" />
const htmlString = render(view)`

export function QuickStart(): TemplateResult {
  return (
    <section class="landing-quick-start" aria-labelledby="setup-title">
      <Container class="landing-quick-start__container">
        <header class="landing-quick-start__header">
          <p class="landing-quick-start__eyebrow">Quick start</p>
          <h2 id="setup-title">Start with your first component.</h2>
        </header>
        <ol class="landing-quick-start__steps">
          <li class="landing-quick-start__step">
            <span>1</span>
            <div>
              <strong>Clone the repository</strong>
              <code>git clone https://github.com/zoxon/lui.git</code>
            </div>
          </li>
          <li class="landing-quick-start__step">
            <span>2</span>
            <div>
              <strong>Install dependencies</strong>
              <code>pnpm install</code>
            </div>
          </li>
          <li class="landing-quick-start__step">
            <span>3</span>
            <div>
              <strong>Run docs locally</strong>
              <code>pnpm dev</code>
            </div>
          </li>
          <li class="landing-quick-start__step">
            <span>4</span>
            <div>
              <strong>Import styles</strong>
              <code>import '@zoxon/lui/index.css'</code>
            </div>
          </li>
          <li class="landing-quick-start__step">
            <span>5</span>
            <div>
              <strong>Render your first component</strong>
              <pre><code>{renderExample}</code></pre>
            </div>
          </li>
        </ol>
        <a class="landing-quick-start__link" href="/docs/getting-started" data-navigo>Read the full documentation</a>
      </Container>
    </section>
  )
}
