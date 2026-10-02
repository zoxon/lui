import type { TemplateResult } from '@zoxon/mater'
import type { StatusColor } from '@/shared/tokens.js'
import { StatusDot } from '@/components/base/StatusDot/index.js'

export interface AvatarProps {
  initials?: string
  src?: string
  alt?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  status?: StatusColor
}

export function Avatar({ initials = '', src, alt = '', size = 'md', status }: AvatarProps): TemplateResult {
  return (
    <span class={['avatar', `avatar--size-${size}`]}>
      <span class="avatar__inner">
        {src
          ? <img class="avatar__img" src={src} alt={alt} />
          : initials}
      </span>
      {status && <StatusDot status={status} class="avatar__status" />}
    </span>
  )
}
