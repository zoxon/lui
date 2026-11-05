import type { TemplateResult } from '@zoxon/mater'
import { Icon } from '@/components/base/Icon/index.js'

export type NotificationType = 'info' | 'notice' | 'success' | 'error' | 'warning'

export interface NotificationProps {
  children: string | TemplateResult
  id?: string
  type?: NotificationType
  close?: boolean
  class?: string
}

const notificationIcons: Record<NotificationType, string> = {
  info: 'ui/info',
  notice: 'ui/bell',
  success: 'ui/check',
  warning: 'ui/triangle-alert',
  error: 'ui/circle-x',
}

export function Notification({
  children,
  id,
  type = 'info',
  close = true,
  class: className,
}: NotificationProps): TemplateResult {
  return (
    <div
      class={['notification', `notification--type-${type}`, className]}
      id={id}
      role={type === 'error'
        ? 'alert'
        : 'status'}
      data-notification
    >
      <Icon name={notificationIcons[type]} size={20} class="notification__icon" />
      <div class="notification__message">{children}</div>
      {close
        ? (
            <button class="notification__close" type="button" data-notification-close aria-label="Close">
              <Icon name="ui/x" size={16} />
            </button>
          )
        : null}
    </div>
  )
}
