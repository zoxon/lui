import type { TemplateResult } from '@zoxon/mater'

export interface IconProps {
  name: string
  size?: number
  class?: string
}

export function Icon({ name, size = 16, class: className }: IconProps): TemplateResult {
  const id = `#icon-${name.replace('/', '-')}`

  return (
    <svg
      class={['icon', className]}
      width={size}
      height={size}
      aria-hidden="true"
      focusable="false"
    >
      <use href={id}></use>
    </svg>
  )
}
