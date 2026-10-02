import type { TemplateResult } from '@zoxon/mater'
import { Avatar } from '@/components/base/Avatar/index.js'
import { PageHeader, Section } from '@/components/docs/index.js'

export function renderAvatar(): TemplateResult {
  return (
    <>
      <PageHeader title="Avatar" desc="User identity representation with initials or image." />
      <Section
        title="Sizes"
        canvas={(
          <>
            <Avatar initials="XS" size="xs" />
            <Avatar initials="SM" size="sm" />
            <Avatar initials="MD" size="md" />
            <Avatar initials="LG" size="lg" />
            <Avatar initials="XL" size="xl" />
          </>
        )}
        code={`<Avatar initials="XS" size="xs" />
<Avatar initials="SM" size="sm" />
<Avatar initials="MD" size="md" />
<Avatar initials="LG" size="lg" />
<Avatar initials="XL" size="xl" />`}
      />
      <Section
        title="With status"
        canvas={(
          <>
            <Avatar initials="ON" size="md" status="green" />
            <Avatar initials="AW" size="md" status="yellow" />
            <Avatar initials="BY" size="md" status="red" />
            <Avatar initials="OF" size="md" status="gray" />
          </>
        )}
        code={`<Avatar initials="ON" size="md" status="green" />
<Avatar initials="AW" size="md" status="yellow" />
<Avatar initials="BY" size="md" status="red" />
<Avatar initials="OF" size="md" status="gray" />`}
      />
    </>
  )
}
