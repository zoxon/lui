import type { TemplateResult } from '@zoxon/mater'
import type { Size, StatusColor } from '@/shared/tokens.js'

export interface StatusDotProps {
  status: StatusColor
  size?: Size
  label?: string
  class?: string
}

export function StatusDot({ status, size = 'md', label, class: className }: StatusDotProps): TemplateResult {
  return (
    <span class={['status-dot', `status-dot--size-${size}`, `status-dot--color-${status}`, className]}>
      <span class="status-dot__dot"></span>
      {label && <span class="status-dot__label">{label}</span>}
    </span>
  )
}
