import type { TemplateResult } from '@zoxon/mater'
import type { Size } from '@/shared/tokens.js'

export interface SkeletonProps {
  variant?: 'rectangle' | 'circle' | 'text'
  size?: Size
  width?: string
  animated?: boolean
  class?: string
}

export function Skeleton(props: SkeletonProps): TemplateResult {
  const {
    variant = 'rectangle',
    size,
    width,
    animated = true,
    class: className,
  } = props

  return (
    <span
      class={[
        'skeleton',
        `skeleton--variant-${variant}`,
        size && `skeleton--size-${size}`,
        animated && 'skeleton--animated',
        className,
      ]}
      style={width
        ? { width }
        : undefined}
      aria-hidden="true"
    >
    </span>
  )
}
