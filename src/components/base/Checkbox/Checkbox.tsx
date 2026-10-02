import type { TemplateResult } from '@zoxon/mater'

export interface CheckboxProps {
  label: string
  checked?: boolean
  disabled?: boolean
  name?: string
  id?: string
  class?: string
}

export function Checkbox({ label, checked = false, disabled = false, name, id, class: className }: CheckboxProps): TemplateResult {
  const inputId = id ?? name

  return (
    <label class={['checkbox', disabled && 'checkbox--disabled', className]} for={inputId}>
      <input
        class="checkbox__input"
        type="checkbox"
        name={name}
        id={inputId}
        checked={checked}
        disabled={disabled}
      />
      <span class="checkbox__label">{label}</span>
    </label>
  )
}
