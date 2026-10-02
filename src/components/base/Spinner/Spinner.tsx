import type { TemplateResult } from '@zoxon/mater'
import type { Size } from '@/shared/tokens.js'

export interface SpinnerProps {
  size?: Size
  label?: string
  class?: string
}

export function Spinner({ size, label = 'Loading', class: className }: SpinnerProps): TemplateResult {
  return (
    <span class={['spinner', size && `spinner--size-${size}`, className]} role="status" aria-label={label}>
      <span class="spinner__icon" aria-hidden="true"></span>
    </span>
  )
}
