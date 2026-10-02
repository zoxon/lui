import type { TemplateResult } from '@zoxon/mater'
import { DEFAULT_PAGE } from './page-constants.js'
import { renderAccordion } from './pages/components/accordion.js'
import { renderAlert } from './pages/components/alert.js'
import { renderAvatar } from './pages/components/avatar.js'
import { renderBadge } from './pages/components/badge.js'
import { renderBreadcrumbs } from './pages/components/breadcrumbs.js'
import { renderButton } from './pages/components/button.js'
import { renderCard } from './pages/components/card.js'
import { renderCheckbox } from './pages/components/checkbox.js'
import { renderCode } from './pages/components/code.js'
import { renderContent } from './pages/components/content.js'
import { renderDescriptionList } from './pages/components/description-list.js'
import { renderDrawer } from './pages/components/drawer.js'
import { renderField } from './pages/components/field.js'
import { renderFileInput } from './pages/components/file-input.js'
import { renderFooter } from './pages/components/footer.js'
import { renderHeader } from './pages/components/header.js'
import { renderIcon } from './pages/components/icon.js'
import { renderModal } from './pages/components/modal.js'
import { renderNotification } from './pages/components/notification.js'
import { renderProgressBar } from './pages/components/progress-bar.js'
import { renderRadio } from './pages/components/radio.js'
import { renderSelect } from './pages/components/select.js'
import { renderSkeleton } from './pages/components/skeleton.js'
import { renderSpinner } from './pages/components/spinner.js'
import { renderSpoiler } from './pages/components/spoiler.js'
import { renderStatusDot } from './pages/components/status-dot.js'
import { renderTable } from './pages/components/table.js'
import { renderTabs } from './pages/components/tabs.js'
import { renderTextField } from './pages/components/text-field.js'
import { renderToggle } from './pages/components/toggle.js'
import { renderDocsGettingStarted } from './pages/docs/getting-started.js'
import { renderDocsJsx } from './pages/docs/jsx.js'
import { renderDocsRendering } from './pages/docs/rendering.js'
import { renderDocsTemplateLiterals } from './pages/docs/template-literals.js'
import { renderSettingsForm } from './pages/examples/settings-form.js'
import { renderUserManagement } from './pages/examples/user-management.js'
import { renderIndex } from './pages/index.js'
import { renderTokens } from './pages/tokens/index.js'

export type PageRenderer = () => TemplateResult

export { DEFAULT_PAGE }

export const routes: Record<string, PageRenderer> = {
  '': renderIndex,
  'index': renderIndex,
  'docs-getting-started': renderDocsGettingStarted,
  'docs-template-literals': renderDocsTemplateLiterals,
  'docs-jsx': renderDocsJsx,
  'docs-rendering': renderDocsRendering,
  'examples-user-management': renderUserManagement,
  'examples-settings-form': renderSettingsForm,
  'tokens': renderTokens,
  'button': renderButton,
  'badge': renderBadge,
  'icon': renderIcon,
  'alert': renderAlert,
  'spinner': renderSpinner,
  'skeleton': renderSkeleton,
  'status-dot': renderStatusDot,
  'avatar': renderAvatar,
  'checkbox': renderCheckbox,
  'radio': renderRadio,
  'toggle': renderToggle,
  'field': renderField,
  'file-input': renderFileInput,
  'text-field': renderTextField,
  'select': renderSelect,
  'progress-bar': renderProgressBar,
  'card': renderCard,
  'breadcrumbs': renderBreadcrumbs,
  'description-list': renderDescriptionList,
  'table': renderTable,
  'code': renderCode,
  'tabs': renderTabs,
  'accordion': renderAccordion,
  'spoiler': renderSpoiler,
  'modal': renderModal,
  'notification': renderNotification,
  'drawer': renderDrawer,
  'header': renderHeader,
  'footer': renderFooter,
  'content': renderContent,
}
