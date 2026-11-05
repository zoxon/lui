import { runInNewContext } from 'node:vm'
import { describe, expect, it } from 'vitest'
import { THEME_INIT_SCRIPT } from '@/theme-init.js'
import { createViteConfig } from '@/vite.js'

interface Env {
  saved?: string | null
  prefersDark?: boolean
  storageThrows?: boolean
}

function run({ saved = null, prefersDark = false, storageThrows = false }: Env): string | undefined {
  const dataset: Record<string, string> = {}
  const localStorage = {
    getItem: (): string | null => {
      if (storageThrows)
        throw new Error('blocked')
      return saved
    },
  }
  const matchMedia = (): { matches: boolean } => ({ matches: prefersDark })
  const document = {
    documentElement: { dataset },
  }

  runInNewContext(THEME_INIT_SCRIPT, { localStorage, matchMedia, document })

  return dataset.theme
}

describe('theme init script', () => {
  it('applies a saved dark theme', () => {
    expect(run({ saved: 'dark' })).toBe('dark')
  })

  it('keeps light when saved light, even if the system prefers dark', () => {
    expect(run({ saved: 'light', prefersDark: true })).toBeUndefined()
  })

  it('follows the system preference without a saved theme', () => {
    expect(run({ prefersDark: true })).toBe('dark')
    expect(run({ prefersDark: false })).toBeUndefined()
  })

  it('ignores unknown saved values and blocked storage', () => {
    expect(run({ saved: 'sepia', prefersDark: true })).toBe('dark')
    expect(() => run({ storageThrows: true })).not.toThrow()
  })

  it('is injected into the head by the Vite config', () => {
    const plugins = (createViteConfig('/tmp/project').plugins ?? []).flat() as Array<{
      name?: string
      transformIndexHtml?: () => Array<{ tag: string, children: string, injectTo: string }>
    }>
    const plugin = plugins.find(item => item.name === 'lui:theme-init')

    expect(plugin?.transformIndexHtml?.()).toEqual([
      { tag: 'script', children: THEME_INIT_SCRIPT, injectTo: 'head-prepend' },
    ])
  })
})
