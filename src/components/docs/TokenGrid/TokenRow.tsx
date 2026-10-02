import type { TemplateResult } from '@zoxon/mater'

export type TokenRowType = 'color' | 'spacing' | 'radius' | 'shadow' | 'z-index' | 'token'

export interface TokenRowProps {
  type?: TokenRowType
  name: string
  value?: string
}

function renderPreview({ type, name, value = '' }: Required<Pick<TokenRowProps, 'type' | 'name'>> & Pick<TokenRowProps, 'value'>): TemplateResult {
  if (type === 'color') {
    return <div class="docs-token-swatch" style={`background:var(${name})`}></div>
  }

  if (type === 'spacing') {
    return <div style={`width:${value};height:16px;min-width:2px;background:var(--fill-interactive-subtle);border-radius:2px;border:1px solid var(--border-base)`}></div>
  }

  if (type === 'radius') {
    return <div style={`width:32px;height:32px;background:var(--fill-interactive-subtle);border:1px solid var(--border-base);border-radius:var(${name})`}></div>
  }

  if (type === 'shadow') {
    return <div style={`width:32px;height:32px;border-radius:var(--border-radius-sm);background:var(--fill-background);box-shadow:var(${name})`}></div>
  }

  if (type === 'z-index') {
    return <div style="width:32px;height:20px;border-radius:var(--border-radius-sm);background:var(--fill-interactive-subtle);border:1px solid var(--border-base);display:flex;align-items:center;justify-content:center;font-size:10px;color:var(--text-muted);font-family:var(--font-mono)">{value}</div>
  }

  return <div style="width:32px;height:20px;border-radius:var(--border-radius-sm);background:var(--fill-interactive-subtle);border:1px solid var(--border-base)"></div>
}

export function TokenRow({ type = 'token', name, value = '' }: TokenRowProps): TemplateResult {
  return (
    <div class="docs-token-row" data-token-type={type}>
      <div>{renderPreview({ type, name, value })}</div>
      <div class="docs-token-name">{name}</div>
      <div class="docs-token-value">{value}</div>
    </div>
  )
}
