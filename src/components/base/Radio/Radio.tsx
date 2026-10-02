import type { TemplateResult } from '@zoxon/mater'

export interface RadioProps {
  label: string
  value: string
  name: string
  checked?: boolean
  disabled?: boolean
  id?: string
  class?: string
}

export function Radio({ label, value, name, checked = false, disabled = false, id, class: className }: RadioProps): TemplateResult {
  const inputId = id ?? `${name}-${value}`

  return (
    <label class={['radio', disabled && 'radio--disabled', className]} for={inputId}>
      <input
        class="radio__input"
        type="radio"
        name={name}
        id={inputId}
        value={value}
        checked={checked}
        disabled={disabled}
      />
      <span class="radio__label">{label}</span>
    </label>
  )
}
