import { render } from '@zoxon/mater'
import { describe, expect, it } from 'vitest'
import { TokenGrid } from '../components/docs/TokenGrid/index.js'

describe('tokenGrid', () => {
  it('renders TokenRow entries from plain row data', () => {
    const html = render(
      <TokenGrid
        title="Colors"
        type="color"
        rows={[
          { name: '--fill-background' },
          { type: 'spacing', name: '--space-4', value: '16px' },
          { type: 'radius', name: '--border-radius-md', value: '6px' },
          { type: 'shadow', name: '--shadow-sm' },
          { type: 'z-index', name: '--z-index-modal', value: '500' },
          { type: 'token', name: '--font-mono' },
        ]}
      />,
    )

    expect(html).toContain('Colors')
    expect(html).toContain('docs-token-row')
    expect(html).toContain('--fill-background')
    expect(html).toContain('--space-4')
    expect(html).toContain('16px')
    expect(html).toContain('background:var(--fill-background)')
    expect(html).toContain('width:16px')
    expect(html).toContain('border-radius:var(--border-radius-md)')
    expect(html).toContain('box-shadow:var(--shadow-sm)')
    expect(html).toContain('data-token-type="color"')
    expect(html).toContain('data-token-type="spacing"')
    expect(html).toContain('data-token-type="radius"')
    expect(html).toContain('data-token-type="shadow"')
    expect(html).toContain('data-token-type="z-index"')
    expect(html).toContain('data-token-type="token"')
  })
})
