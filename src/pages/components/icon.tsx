import type { TemplateResult } from '@zoxon/mater'
import { Icon } from '@/components/base/Icon/index.js'
import { PageHeader, Section } from '@/components/docs/index.js'

const icons = [
  'ui/bell',
  'ui/check',
  'ui/chevron-down',
  'ui/circle-x',
  'ui/code',
  'ui/feather',
  'ui/file-jsx',
  'ui/github',
  'ui/info',
  'ui/moon',
  'ui/palette',
  'ui/server',
  'ui/shield',
  'ui/sliders',
  'ui/sun',
  'ui/three',
  'ui/triangle-alert',
  'ui/typescript',
  'ui/x',
]

export function renderIcon(): TemplateResult {
  return (
    <>
      <PageHeader title="Icon" desc="Sprite-backed SVG icon primitive." />
      <Section
        title="Icon gallery"
        canvas={(
          <div
            style="display:grid;grid-template-columns:repeat(auto-fit,minmax(12rem,1fr));gap:var(--space-3);width:100%;"
          >
            {icons.map(name => (
              <div
                style="display:flex;align-items:center;gap:var(--space-3);min-width:0;padding:var(--space-3);border:1px solid var(--border-base);border-radius:var(--border-radius-md);background:var(--fill-surface);"
              >
                <Icon name={name} size={24} />
                <code style="min-width:0;overflow-wrap:anywhere;">{name}</code>
              </div>
            ))}
          </div>
        )}
        code={`<Icon name="ui/check" size={24} />
<Icon name="ui/info" size={24} />
<Icon name="ui/triangle-alert" size={24} />`}
      />
      <Section
        title="Sizes"
        canvas={(
          <>
            <Icon name="ui/check" size={16} />
            <Icon name="ui/check" size={24} />
            <Icon name="ui/check" size={32} />
          </>
        )}
        code={`<Icon name="ui/check" size={16} />
<Icon name="ui/check" size={24} />
<Icon name="ui/check" size={32} />`}
      />
    </>
  )
}
