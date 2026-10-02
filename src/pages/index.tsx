import type { TemplateResult } from '@zoxon/mater'
import { Features } from '@/components/landing/Features/index.js'
import { LandingFooter } from '@/components/landing/Footer/index.js'
import { LandingHeader } from '@/components/landing/Header/index.js'
import { Hero } from '@/components/landing/Hero/index.js'
import { QuickStart } from '@/components/landing/QuickStart/index.js'

export function renderIndex(): TemplateResult {
  return (
    <div class="landing">
      <LandingHeader />
      <main class="landing__main">
        <Hero />
        <Features />
        <QuickStart />
      </main>
      <LandingFooter />
    </div>
  )
}
