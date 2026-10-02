import { mkdtemp, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { defineConfig, loadConfig, normalizeConfig } from '@/config.js'

describe('lui configuration', () => {
  it('defaults to static output in dist', () => {
    expect(normalizeConfig({}, '/project')).toMatchObject({
      outDir: '/project/dist',
      output: 'static',
      vite: {},
    })
  })

  it('preserves explicit spa output and Vite overrides', () => {
    const vite = { base: '/docs/' }

    expect(normalizeConfig(defineConfig({ outDir: './public', output: 'spa', vite }), '/project')).toMatchObject({
      outDir: '/project/public',
      output: 'spa',
      vite,
    })
  })

  it('loads optional TypeScript and JavaScript config and falls back when absent', async () => {
    const root = await mkdtemp(join(tmpdir(), 'lui-config-'))

    try {
      await writeFile(join(root, 'lui.config.ts'), 'export default { output: \'spa\' }\n')

      await expect(loadConfig(root)).resolves.toMatchObject({ output: 'spa' })

      await rm(join(root, 'lui.config.ts'))
      await writeFile(join(root, 'lui.config.js'), 'export default { outDir: \'./public\' }\n')

      await expect(loadConfig(root)).resolves.toMatchObject({ outDir: './public' })
      await expect(loadConfig(join(root, 'missing'))).resolves.toEqual({})
    }
    finally {
      await rm(root, { force: true, recursive: true })
    }
  })

  it('rejects an unsupported output mode', () => {
    expect(() => normalizeConfig({ output: 'server' as 'spa' }, '/project')).toThrow('server')
  })

  it('rejects an outDir that escapes the project root', () => {
    expect(() => normalizeConfig({ outDir: '../../etc' }, '/project')).toThrow(/outDir/)
    expect(() => normalizeConfig({ outDir: '/etc' }, '/project')).toThrow(/outDir/)
  })

  it('provides the repository default static configuration', async () => {
    const config = (await import('../../lui.config.js')).default

    expect(config).toEqual({
      outDir: './dist',
      output: 'static',
    })
  })
})
