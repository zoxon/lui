import type { TemplateResult } from '@zoxon/mater'

export type NotificationBoardPosition = 'top-right' | 'bottom-right' | 'top-left' | 'bottom-left'

export interface NotificationBoardProps {
  id?: string
  position?: NotificationBoardPosition
  delay?: number
  label?: string
  class?: string
}

export function NotificationBoard({
  id,
  position = 'bottom-right',
  delay = 3000,
  label = 'Notifications',
  class: className,
}: NotificationBoardProps = {}): TemplateResult {
  return (
    <div
      class={['notification-board', `notification-board--position-${position}`, className]}
      id={id}
      data-component="notification-board"
      data-notification-board
      data-notification-delay={delay}
      aria-live="polite"
      aria-atomic="false"
      aria-label={label}
    />
  )
}
