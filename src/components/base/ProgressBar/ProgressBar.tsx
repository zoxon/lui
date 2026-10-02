import type { TemplateResult } from '@zoxon/mater'
import type { Size, Theme } from '@/shared/tokens.js'

export interface ProgressBarProps {
  value: number
  theme?: Theme
  size?: Size
  label?: string
  showValue?: boolean
  class?: string
}

export function ProgressBar(props: ProgressBarProps): TemplateResult {
  const {
    value,
    theme = 'default',
    size = 'md',
    label,
    showValue = false,
    class: className,
  } = props

  const clamped = Math.min(100, Math.max(0, value))

  return (
    <div class={['progress', `progress--size-${size}`, `progress--theme-${theme}`, className]}>
      {(label || showValue)
        ? (
            <div class="progress__label">
              {label && <span>{label}</span>}
              {showValue
                ? (<span>{`${clamped}%`}</span>)
                : null}
            </div>
          )
        : null}
      <div class="progress__track">
        <div class="progress__bar" style={{ width: `${clamped}%` }}></div>
      </div>
    </div>
  )
}
