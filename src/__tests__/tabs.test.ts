import { raw } from '@zoxon/mater'
import { describe, expect, it } from 'vitest'
import { Tabs, TabsItem } from '../components/base/Tabs/index.js'

describe('tabs', () => {
  it('renders tabs nav and panels', () => {
    const html = Tabs({
      children: [
        TabsItem({
          title: 'Overview',
          children: raw('<p>Overview content</p>'),
        }),
        TabsItem({
          title: 'Settings',
          children: raw('<p>Settings content</p>'),
        }),
        TabsItem({
          title: 'Billing',
          children: raw('<p>Billing content</p>'),
        }),
      ],
    })
    expect(html).toContain('class="tabs"')
    expect(html).toContain('data-component="tabs"')
    expect(html).toContain('tabs__nav')
    expect(html).toContain('tabs__tab')
    expect(html).toContain('tabs__panel')
    expect(html).toContain('data-ref="tabs:tab"')
    expect(html).toContain('data-ref="tabs:panel"')
  })

  it('renders all tab labels', () => {
    const html = Tabs({
      children: [
        TabsItem({
          title: 'Overview',
          children: raw('<p>Overview content</p>'),
        }),
        TabsItem({
          title: 'Settings',
          children: raw('<p>Settings content</p>'),
        }),
        TabsItem({
          title: 'Billing',
          children: raw('<p>Billing content</p>'),
        }),
      ],
    })
    expect(html).toContain('Overview')
    expect(html).toContain('Settings')
    expect(html).toContain('Billing')
  })

  it('marks first tab as selected by default', () => {
    const html = String(Tabs({
      children: [
        TabsItem({
          title: 'Overview',
          children: raw('<p>Overview content</p>'),
        }),
        TabsItem({
          title: 'Settings',
          children: raw('<p>Settings content</p>'),
        }),
      ],
    }))
    expect(html).toContain('aria-selected="true"')
    expect(html).toMatch(/<button[^>]*aria-selected="true"[^>]*>Overview<\/button>/)
  })

  it('marks selected tab as active', () => {
    const html = String(Tabs({
      children: [
        TabsItem({
          title: 'Overview',
          children: raw('<p>Overview content</p>'),
        }),
        TabsItem({
          title: 'Settings',
          selected: true,
          children: raw('<p>Settings content</p>'),
        }),
        TabsItem({
          title: 'Billing',
          children: raw('<p>Billing content</p>'),
        }),
      ],
    }))
    expect(html).toMatch(/<button[^>]*aria-selected="true"[^>]*>Settings<\/button>/)
  })

  it('renders pill variant', () => {
    expect(Tabs({
      children: [
        TabsItem({
          title: 'Overview',
          children: raw('<p>Overview content</p>'),
        }),
      ],
      variant: 'pills',
    })).toContain('tabs--variant-pills')
  })

  it('renders panel content (raw HTML)', () => {
    const html = Tabs({
      children: [
        TabsItem({
          title: 'Overview',
          children: raw('<p>Overview content</p>'),
        }),
      ],
    })
    expect(html).toContain('<p>Overview content</p>')
  })

  it('escapes HTML in tab labels', () => {
    const html = Tabs({
      children: [
        TabsItem({ title: '<b>tab</b>', children: '' }),
      ],
    })
    expect(html).not.toContain('<b>tab</b>')
    expect(html).toContain('&lt;b&gt;')
  })

  it('filters out non-TabsItem children instead of leaving a phantom slot', () => {
    // Simulates `{condition && <TabsItem/>}` yielding `false` for a falsy
    // branch — a real JS caller can produce this even though the TS types
    // disallow it statically.
    const stray = false as unknown as ReturnType<typeof TabsItem>

    const html = String(Tabs({
      children: [
        stray,
        TabsItem({
          title: 'Overview',
          children: raw('<p>Overview content</p>'),
        }),
        TabsItem({
          title: 'Settings',
          selected: true,
          children: raw('<p>Settings content</p>'),
        }),
      ],
    }))

    // The stray child must not consume an index slot: "Overview" is the
    // first real item and should render as tab-0, not tab-1.
    expect(html).toMatch(/<button[^>]*data-tab="tab-0"[^>]*>Overview<\/button>/)
    expect(html).toMatch(/<button[^>]*aria-selected="true"[^>]*data-tab="tab-1"[^>]*>Settings<\/button>/)
  })
})
