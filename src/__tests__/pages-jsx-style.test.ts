import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const pageFiles = [
  'components/accordion.tsx',
  'components/avatar.tsx',
  'components/badge.tsx',
  'components/button.tsx',
  'components/card.tsx',
  'components/checkbox.tsx',
  'components/code.tsx',
  'components/content.tsx',
  'components/description-list.tsx',
  'components/drawer.tsx',
  'components/field.tsx',
  'components/file-input.tsx',
  'components/footer.tsx',
  'components/header.tsx',
  'components/icon.tsx',
  'components/modal.tsx',
  'components/notification.tsx',
  'components/progress-bar.tsx',
  'components/radio.tsx',
  'components/select.tsx',
  'components/spoiler.tsx',
  'components/status-dot.tsx',
  'components/table.tsx',
  'components/tabs.tsx',
  'components/text-field.tsx',
  'components/toggle.tsx',
  'tokens/index.tsx',
]

describe('component docs pages JSX style', () => {
  it.each(pageFiles)('%s uses JSX examples instead of object-call examples', (file) => {
    const source = readFileSync(new URL(`../pages/${file}`, import.meta.url), 'utf8')

    expect(source).not.toMatch(/\b(?:PageHeader|Section|Button|Badge|Avatar|Card|Checkbox|Radio|Toggle|TextField|Select|Field|FileInput|ProgressBar|DescriptionList|Table|Code|CodeBlock|Tabs|Accordion|Spoiler|Modal|Drawer|Header|Footer|Content|TokenGrid|TokenRow)\(\{/)
  })
})
