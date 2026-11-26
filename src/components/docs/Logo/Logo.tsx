import type { TemplateResult } from '@zoxon/mater'
import { raw } from '@zoxon/mater'
import clsx from 'clsx'

export interface LogoProps {
  class?: string
}

// The mark is drawn on a 28 x 28 pixel grid and shown at 28 px (1 unit = 1 px, 2 device pixels on a 2x screen), so every edge is sharp.
// It is a constant, not user input, so it is passed as trusted markup. The JSX types do not know the SVG path attributes.
const MARK = raw(
  '<svg class="logo__mark" viewBox="0 0 28 28" width="28" height="28" aria-hidden="true" focusable="false">'
  + '<path class="logo__frame" d="M2 2H16V7H7V21H21V12H26V26H2Z"></path>'
  + '<path class="logo__dot" d="M21 2H26V7H21Z"></path>'
  + '</svg>',
)

export function Logo({ class: className }: LogoProps = {}): TemplateResult {
  return (
    <a class={clsx('logo', className)} href="/" data-navigo>
      {MARK}
      <span class="logo__name">Lui</span>
    </a>
  )
}
