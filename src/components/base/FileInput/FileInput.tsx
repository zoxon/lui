import type { TemplateResult } from '@zoxon/mater'
import { Field } from '@/components/base/Field/index.js'

export interface FileInputProps {
  label: string
  id?: string
  name?: string
  accept?: string
  multiple?: boolean
  disabled?: boolean
  required?: boolean
  hint?: string
  error?: string
  class?: string
}

export function FileInput(props: FileInputProps): TemplateResult {
  const {
    label,
    id,
    name,
    accept,
    multiple = false,
    disabled = false,
    required = false,
    hint,
    error,
    class: className,
  } = props

  const fieldId = id ?? name

  const input = (
    <label
      class={[
        'file-input',
        {
          'file-input--disabled': disabled,
          'file-input--error': error,
        },
        className,
      ]}
      data-component="file-input"
    >
      <input
        class="file-input__native"
        type="file"
        name={name}
        id={fieldId}
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        required={required}
        data-ref="file-input:input"
      />
      <span class="file-input__trigger">{multiple ? 'Choose files' : 'Choose file'}</span>
      <span class="file-input__value" data-ref="file-input:value">No file chosen</span>
    </label>
  )

  return (
    <Field
      label={label}
      id={fieldId}
      hint={hint}
      error={error}
      required={required}
      children={input}
    />
  )
}
