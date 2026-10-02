import type { TemplateResult } from '@zoxon/mater'
import type { Size } from '@/shared/tokens.js'

export interface TextFieldProps {
  placeholder?: string
  value?: string
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search' | 'textarea'
  rows?: number
  disabled?: boolean
  required?: boolean
  name?: string
  id?: string
  size?: Size
  class?: string
}

export function TextField(props: TextFieldProps): TemplateResult {
  const {
    placeholder,
    value,
    type = 'text',
    rows = 4,
    disabled = false,
    required = false,
    name,
    id,
    size = 'md',
    class: className,
  } = props

  if (type === 'textarea') {
    return (
      <textarea
        class={['field__textarea', className]}
        name={name}
        id={id}
        rows={rows.toString()}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
      >
        {value ?? ''}
      </textarea>
    )
  }

  return (
    <input
      class={['field__input', size !== 'md' && `field__input--size-${size}`, className]}
      type={type}
      name={name}
      id={id}
      placeholder={placeholder}
      value={value}
      disabled={disabled}
      required={required}
    />
  )
}
