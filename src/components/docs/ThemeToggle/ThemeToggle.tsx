import type { TemplateResult } from '@zoxon/mater'
import { Icon } from '@/components/base/Icon/index.js'

export function ThemeToggle(): TemplateResult {
  return (
    <button
      class="docs-theme-toggle"
      type="button"
      title="Toggle theme"
      aria-label="Toggle theme"
      data-component="theme-toggle"
    >
      <span data-ref="theme-toggle:lightIcon">
        <Icon name="ui/sun" size={16} />
      </span>
      <span data-ref="theme-toggle:darkIcon" hidden>
        <Icon name="ui/moon" size={16} />
      </span>
    </button>
  )
}
