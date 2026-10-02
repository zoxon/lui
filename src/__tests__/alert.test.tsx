import { describe, expect, it } from 'vitest'
import { Alert } from '../components/base/Alert/index.js'
import { Badge } from '../components/base/Badge/index.js'
import { renderAlert } from '../pages/components/alert.js'

describe('alert', () => {
  it('renders default alert with title and body', () => {
    const html = Alert({ title: 'Message title', children: 'Message text' })
    expect(html).toContain('class="alert alert--theme-info"')
    expect(html).toContain('class="alert__title"')
    expect(html).toContain('Message title')
    expect(html).toContain('Message text')
  })

  it('applies theme modifier', () => {
    expect(Alert({ theme: 'success', children: 'Saved' })).toContain('alert--theme-success')
    expect(Alert({ theme: 'warning', children: 'Careful' })).toContain('alert--theme-warning')
    expect(Alert({ theme: 'danger', children: 'Failed' })).toContain('alert--theme-danger')
  })

  it('renders closable button without behavior', () => {
    const html = Alert({ children: 'Dismiss me', closable: true })
    expect(html).toContain('class="alert__close"')
    expect(html).toContain('data-alert-close')
    expect(html).toContain('aria-label="Close"')
    expect(html).toContain('class="icon"')
    expect(html).toContain('href="#icon-ui-x"')
    expect(html).not.toContain('visuallyhidden')
  })

  it('escapes string children and supports JSX children', () => {
    const escaped = Alert({ children: '<b>unsafe</b>' })
    expect(escaped).not.toContain('<b>')
    expect(escaped).toContain('&lt;b&gt;unsafe')

    const rich = Alert({ children: <Badge label="New" /> })
    expect(rich).toContain('badge--theme-default')
    expect(rich).toContain('badge--size-md')
  })

  it('documents dismissible alert at full width', () => {
    const html = renderAlert().toString()
    const dismissibleSection = html.slice(html.indexOf('Closable markup'))

    expect(dismissibleSection).toContain('style="flex-direction:column;align-items:stretch;width:100%"')
  })
})
