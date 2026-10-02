import type { TemplateResult } from '@zoxon/mater'
import { raw } from '@zoxon/mater'

export interface FieldProps {
  label: string
  id?: string
  hint?: string
  error?: string
  required?: boolean
  children: string | TemplateResult
  class?: string
}

export function Field({ label, id, hint, error, required = false, children, class: className }: FieldProps): TemplateResult {
  return (
    <div class={['field', { 'field--error': error }, className]}>
      <label class={['field__label', required && 'field__label--required']} for={id}>{label}</label>
      {typeof children === 'string' ? raw(children) : children}
      {hint && !error ? <span class="field__hint">{hint}</span> : null}
      {error ? (<span class="field__error">{error}</span>) : null}
    </div>
  )
}
