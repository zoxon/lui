import type { TemplateResult } from '@zoxon/mater'
import type { Size } from '@/shared/tokens.js'
import { Field } from '@/components/base/Field/index.js'

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface SelectProps {
  label: string
  options: SelectOption[]
  value?: string | string[]
  multiple?: boolean
  disabled?: boolean
  required?: boolean
  name?: string
  id?: string
  size?: Size
  hint?: string
  error?: string
  class?: string
}

export function Select(props: SelectProps): TemplateResult {
  const {
    label,
    options,
    value,
    multiple = false,
    disabled = false,
    required = false,
    name,
    id,
    size = 'md',
    hint,
    error,
    class: className,
  } = props

  const fieldId = id ?? name
  const selectedValues = Array.isArray(value)
    ? value
    : value
      ? [value]
      : []

  const optionsHtml = options.map(opt =>
    <option value={opt.value} selected={selectedValues.includes(opt.value)} disabled={opt.disabled}>{opt.label}</option>,
  )

  const selectEl = (
    <select
      class={['field__select', size !== 'md' && `field__select--size-${size}`]}
      name={name}
      id={fieldId}
      multiple={multiple}
      disabled={disabled}
      required={required}
    >
      {optionsHtml}
    </select>
  )

  return (
    <Field
      label={label}
      id={fieldId}
      hint={hint}
      error={error}
      required={required}
      children={selectEl}
      class={className}
    />
  )
}
