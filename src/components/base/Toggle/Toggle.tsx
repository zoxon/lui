import type { TemplateResult } from '@zoxon/mater'

export interface ToggleProps {
  label: string
  checked?: boolean
  disabled?: boolean
  name?: string
  id?: string
  class?: string
}

export function Toggle({ label, checked = false, disabled = false, name, id, class: className }: ToggleProps): TemplateResult {
  return (
    <label class={['toggle', disabled && 'toggle--disabled', className]}>
      <input
        class="toggle__input"
        type="checkbox"
        name={name}
        id={id}
        checked={checked}
        disabled={disabled}
      />
      <span class="toggle__track"><span class="toggle__thumb"></span></span>
      {label && <span class="toggle__label">{label}</span>}
    </label>
  )
}
