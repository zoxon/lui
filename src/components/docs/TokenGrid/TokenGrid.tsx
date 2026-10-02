import type { TemplateResult } from '@zoxon/mater'
import type { TokenRowProps, TokenRowType } from './TokenRow.js'
import { TokenRow } from './TokenRow.js'

export interface TokenGridProps {
  title: string
  type: TokenRowType
  rows: TokenRowProps[]
}

export function TokenGrid({ title, type, rows }: TokenGridProps): TemplateResult {
  return (
    <div class="docs-section">
      <h2 class="docs-section__title">{title}</h2>
      <div class="docs-token-grid">
        {rows.map(row => <TokenRow {...row} type={row.type ?? type} />)}
      </div>
    </div>
  )
}
