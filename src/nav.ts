import type { NavGroup } from '@/components/docs/Nav/index.js'

export const NAV_GROUPS: NavGroup[] = [
  {
    section: 'Docs',
    items: [
      { label: 'Overview', page: 'index' },
      { label: 'Getting Started', page: 'docs-getting-started' },
      { label: 'Template Literals', page: 'docs-template-literals' },
      { label: 'JSX', page: 'docs-jsx' },
      { label: 'DOM & HTML Output', page: 'docs-rendering' },
    ],
  },
  {
    section: 'Tokens',
    items: [
      { label: 'Colors & Tokens', page: 'tokens' },
    ],
  },
  {
    section: 'Examples',
    items: [
      { label: 'User Management', page: 'examples-user-management' },
      { label: 'Settings Form', page: 'examples-settings-form' },
    ],
  },
  {
    section: 'Core',
    items: [
      { label: 'Button', page: 'button' },
      { label: 'Badge', page: 'badge' },
      { label: 'Icon', page: 'icon' },
      { label: 'Alert', page: 'alert' },
      { label: 'StatusDot', page: 'status-dot' },
      { label: 'Avatar', page: 'avatar' },
    ],
  },
  {
    section: 'Form',
    items: [
      { label: 'Field', page: 'field' },
      { label: 'FileInput', page: 'file-input' },
      { label: 'Checkbox', page: 'checkbox' },
      { label: 'Radio', page: 'radio' },
      { label: 'Toggle', page: 'toggle' },
      { label: 'TextField', page: 'text-field' },
      { label: 'Select', page: 'select' },
    ],
  },
  {
    section: 'Display',
    items: [
      { label: 'ProgressBar', page: 'progress-bar' },
      { label: 'Spinner', page: 'spinner' },
      { label: 'Skeleton', page: 'skeleton' },
      { label: 'Card', page: 'card' },
      { label: 'DescriptionList', page: 'description-list' },
      { label: 'Table', page: 'table' },
    ],
  },
  {
    section: 'Rich',
    items: [
      { label: 'Code', page: 'code' },
      { label: 'Tabs', page: 'tabs' },
      { label: 'Accordion', page: 'accordion' },
      { label: 'Spoiler', page: 'spoiler' },
    ],
  },
  {
    section: 'Layout',
    items: [
      { label: 'Modal', page: 'modal' },
      { label: 'Notification', page: 'notification' },
      { label: 'Drawer', page: 'drawer' },
      { label: 'Breadcrumbs', page: 'breadcrumbs' },
      { label: 'Header', page: 'header' },
      { label: 'Footer', page: 'footer' },
      { label: 'Content', page: 'content' },
    ],
  },
]

export const NAV_PAGES = NAV_GROUPS.flatMap(group => group.items.map(item => item.page))
