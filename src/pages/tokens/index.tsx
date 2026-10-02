import type { TemplateResult } from '@zoxon/mater'
import { PageHeader, TokenGrid } from '@/components/docs/index.js'

export function renderTokens(): TemplateResult {
  return (
    <>
      <PageHeader title="Design Tokens" desc="CSS Custom Properties — the foundation of every component." />
      <TokenGrid
        title="Palette — Slate"
        type="color"
        rows={[
          { name: '--color-white' },
          { name: '--color-slate-50' },
          { name: '--color-slate-100' },
          { name: '--color-slate-200' },
          { name: '--color-slate-300' },
          { name: '--color-slate-400' },
          { name: '--color-slate-600' },
          { name: '--color-slate-700' },
          { name: '--color-slate-800' },
          { name: '--color-slate-900' },
        ]}
      />
      <TokenGrid
        title="Palette — System"
        type="color"
        rows={[
          { name: '--color-green-50' },
          { name: '--color-green-400' },
          { name: '--color-green-600' },
          { name: '--color-green-700' },
          { name: '--color-green-950' },
          { name: '--color-amber-50' },
          { name: '--color-amber-300' },
          { name: '--color-amber-600' },
          { name: '--color-amber-700' },
          { name: '--color-amber-950' },
          { name: '--color-red-50' },
          { name: '--color-red-300' },
          { name: '--color-red-600' },
          { name: '--color-red-700' },
          { name: '--color-red-950' },
          { name: '--color-blue-50' },
          { name: '--color-blue-300' },
          { name: '--color-blue-600' },
          { name: '--color-blue-700' },
          { name: '--color-blue-950' },
        ]}
      />
      <TokenGrid
        title="Surfaces"
        type="color"
        rows={[
          { name: '--fill-background' },
          { name: '--fill-surface' },
          { name: '--fill-subtle' },
          { name: '--fill-muted' },
          { name: '--fill-inverse' },
        ]}
      />
      <TokenGrid
        title="Text"
        type="color"
        rows={[
          { name: '--text-primary' },
          { name: '--text-secondary' },
          { name: '--text-muted' },
          { name: '--text-disabled' },
          { name: '--text-inverse' },
          { name: '--text-interactive' },
        ]}
      />
      <TokenGrid
        title="Border"
        type="color"
        rows={[
          { name: '--border-base' },
          { name: '--border-subtle' },
          { name: '--border-strong' },
        ]}
      />
      <TokenGrid
        title="Interactive"
        type="color"
        rows={[
          { name: '--fill-interactive' },
          { name: '--fill-interactive-hover' },
          { name: '--fill-interactive-active' },
          { name: '--fill-interactive-focus' },
          { name: '--fill-interactive-disabled' },
          { name: '--fill-interactive-subtle' },
          { name: '--text-on-interactive' },
          { name: '--text-on-interactive-disabled' },
        ]}
      />
      <TokenGrid
        title="Success"
        type="color"
        rows={[
          { name: '--fill-success' },
          { name: '--fill-success-subtle' },
          { name: '--text-success' },
        ]}
      />
      <TokenGrid
        title="Warning"
        type="color"
        rows={[
          { name: '--fill-warning' },
          { name: '--fill-warning-subtle' },
          { name: '--text-warning' },
        ]}
      />
      <TokenGrid
        title="Danger"
        type="color"
        rows={[
          { name: '--fill-danger' },
          { name: '--fill-danger-subtle' },
          { name: '--text-danger' },
        ]}
      />
      <TokenGrid
        title="Info"
        type="color"
        rows={[
          { name: '--fill-info' },
          { name: '--fill-info-subtle' },
          { name: '--text-info' },
        ]}
      />
      <TokenGrid
        title="Spacing"
        type="spacing"
        rows={[
          { name: '--space-0', value: '0px' },
          { name: '--space-1', value: '4px' },
          { name: '--space-2', value: '8px' },
          { name: '--space-3', value: '12px' },
          { name: '--space-4', value: '16px' },
          { name: '--space-5', value: '20px' },
          { name: '--space-6', value: '24px' },
          { name: '--space-8', value: '32px' },
          { name: '--space-10', value: '40px' },
          { name: '--space-12', value: '48px' },
          { name: '--space-16', value: '64px' },
          { name: '--space-20', value: '80px' },
        ]}
      />
      <TokenGrid
        title="Border radius"
        type="radius"
        rows={[
          { name: '--border-radius-none', value: '0' },
          { name: '--border-radius-xs', value: '2px' },
          { name: '--border-radius-sm', value: '4px' },
          { name: '--border-radius-md', value: '6px' },
          { name: '--border-radius-lg', value: '8px' },
          { name: '--border-radius-xl', value: '12px' },
          { name: '--border-radius-2xl', value: '16px' },
          { name: '--border-radius-full', value: '9999px' },
        ]}
      />
      <TokenGrid
        title="Shadows"
        type="shadow"
        rows={[
          { name: '--shadow-xs' },
          { name: '--shadow-sm' },
          { name: '--shadow-md' },
          { name: '--shadow-lg' },
          { name: '--shadow-xl' },
        ]}
      />
      <TokenGrid
        title="Z-index"
        type="z-index"
        rows={[
          { name: '--z-index-dropdown', value: '100' },
          { name: '--z-index-sticky', value: '200' },
          { name: '--z-index-fixed', value: '300' },
          { name: '--z-index-backdrop', value: '400' },
          { name: '--z-index-modal', value: '500' },
          { name: '--z-index-tooltip', value: '600' },
        ]}
      />
    </>
  )
}
