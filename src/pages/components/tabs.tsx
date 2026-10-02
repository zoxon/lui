import type { TemplateResult } from '@zoxon/mater'
import { Tabs, TabsItem } from '@/components/base/Tabs/index.js'
import { PageHeader, Section } from '@/components/docs/index.js'

export function renderTabs(): TemplateResult {
  return (
    <>
      <PageHeader title="Tabs" desc="Organizes content into switchable tabbed panels." />
      <Section
        title="Default variant"
        canvasStyle="flex-direction:column;width:100%"
        canvas={(
          <Tabs>
            <TabsItem title="Overview">
              <p>Overview content goes here. This is the default tab.</p>
            </TabsItem>
            <TabsItem title="Settings">
              <p>Settings content goes here. Configure your preferences.</p>
            </TabsItem>
            <TabsItem title="Billing">
              <p>Billing content goes here. Manage your subscription.</p>
            </TabsItem>
          </Tabs>
        )}
        code={`<Tabs>
  <TabsItem title="Overview">
    <p>Overview content goes here. This is the default tab.</p>
  </TabsItem>
  <TabsItem title="Settings">
    <p>Settings content goes here. Configure your preferences.</p>
  </TabsItem>
  <TabsItem title="Billing">
    <p>Billing content goes here. Manage your subscription.</p>
  </TabsItem>
</Tabs>`}
      />
      <Section
        title="Pills variant"
        canvasStyle="flex-direction:column;width:100%"
        canvas={(
          <Tabs variant="pills">
            <TabsItem title="Overview">
              <p>Overview content goes here. This is the default tab.</p>
            </TabsItem>
            <TabsItem title="Settings" selected>
              <p>Settings content goes here. Configure your preferences.</p>
            </TabsItem>
            <TabsItem title="Billing">
              <p>Billing content goes here. Manage your subscription.</p>
            </TabsItem>
          </Tabs>
        )}
        code={`<Tabs variant="pills">
  <TabsItem title="Overview">
    <p>Overview content goes here. This is the default tab.</p>
  </TabsItem>
  <TabsItem title="Settings" selected>
    <p>Settings content goes here. Configure your preferences.</p>
  </TabsItem>
  <TabsItem title="Billing">
    <p>Billing content goes here. Manage your subscription.</p>
  </TabsItem>
</Tabs>`}
      />
    </>
  )
}
