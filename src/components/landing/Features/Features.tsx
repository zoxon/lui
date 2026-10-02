import type { TemplateResult } from '@zoxon/mater'
import { Icon } from '@/components/base/Icon/index.js'
import { Container } from '../Container/index.js'

const features = [
  ['ui/typescript', 'TypeScript-first', 'Typed props make each component predictable to use and easy to maintain.'],
  ['ui/file-jsx', 'JSX-first', 'Compose views with familiar JSX while keeping output explicit.'],
  ['ui/feather', 'Lightweight runtime', 'Use only the small rendering boundary your interface needs.'],
  ['ui/three', 'No virtual DOM', 'Components return TemplateResult values without a virtual DOM layer.'],
  ['ui/shield', 'Safe output', 'Template values keep dynamic content escaped by default.'],
  ['ui/palette', 'Theme-ready', 'Semantic tokens carry the interface from light to dark mode.'],
  ['ui/sliders', 'CSS tokens', 'Build consistently with a small, adaptable token foundation.'],
  ['ui/server', 'Server-friendly', 'Render strings at the boundary for servers, tools, and browsers.'],
] as const

export function Features(): TemplateResult {
  return (
    <section class="landing-features" aria-label="Why Lui">
      <Container class="landing-features__container">
        <div class="landing-features__grid">
          {features.map(([icon, title, description]) => (
            <article class="landing-feature">
              <Icon name={icon} size={28} />
              <h2>{title}</h2>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}
