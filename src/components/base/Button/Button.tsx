import type { TemplateResult } from '@zoxon/mater'
import type { Size, Theme } from '@/shared/tokens.js'

export interface ButtonProps {
  label: string
  variant?: 'solid' | 'outline' | 'ghost' | 'soft'
  theme?: Theme
  size?: Size
  pill?: boolean
  rounded?: boolean
  block?: boolean
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  class?: string
}

export function Button(props: ButtonProps): TemplateResult {
  const {
    label,
    variant = 'solid',
    theme = 'default',
    size = 'md',
    pill = false,
    rounded = false,
    block = false,
    disabled = false,
    type = 'button',
    class: className,
  } = props

  return (
    <button
      class={[
        'button',
        `button--variant-${variant}`,
        `button--theme-${theme}`,
        `button--size-${size}`,
        pill && 'button--pill',
        rounded && 'button--rounded',
        block && 'button--block',
        className,
      ]}
      type={type}
      disabled={disabled}
    >
      {label}
    </button>
  )
}
