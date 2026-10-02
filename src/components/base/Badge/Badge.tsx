import type { TemplateResult } from '@zoxon/mater'
import type { Theme } from '@/shared/tokens.js'

export interface BadgeProps {
  label: string
  theme?: Theme
  size?: 'sm' | 'md'
}

export function Badge({ label, theme = 'default', size = 'md' }: BadgeProps): TemplateResult {
  return (
    <span
      class={['badge', `badge--theme-${theme}`, `badge--size-${size}`]}
    >
      {label}
    </span>
  )
}
