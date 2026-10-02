import type { ResolvedLuiConfig } from '@/config.js'
import { readFileSync } from 'node:fs'
import { access, mkdir, mkdtemp, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { describe, expect, it, vi } from 'vitest'
import { runCommand } from '@/cli.js'

const config: ResolvedLuiConfig = {
  outDir: '/project/dist',
  output: 'static',
  vite: {},
}

describe('runCommand', () => {
  it('builds static output in .lui before prerendering into outDir', async () => {
    const build = vi.fn()
    const prerender = vi.fn()

    await runCommand('build', config, '/project', { build, prerender })

    expect(build).toHaveBeenCalledWith(expect.objectContaining({
      build: expect.objectContaining({
        manifest: true,
        outDir: '/project/.lui',
      }),
      define: { 'import.meta.env.LUI_STATIC': 'true' },
    }))
    expect(prerender).toHaveBeenCalledWith({ base: '/', outputDir: '/project/dist', temporaryDir: '/project/.lui' })
  })

  it('removes the temporary bundle when the static client build fails', async () => {
    const root = await mkdtemp(join(tmpdir(), 'lui-cli-'))
    const temporaryDir = join(root, '.lui')

    try {
      const build = vi.fn(async () => {
        await mkdir(temporaryDir)
        throw new Error('build failed')
      })

      await expect(runCommand('build', { ...config, outDir: join(root, 'dist') }, root, { build })).rejects.toThrow('build failed')
      await expect(access(temporaryDir)).rejects.toThrow()
    }
    finally {
      await rm(root, { force: true, recursive: true })
    }
  })

  it('builds SPA output directly into outDir', async () => {
    const build = vi.fn()

    await runCommand('build', { ...config, output: 'spa' }, '/project', { build })

    expect(build).toHaveBeenCalledWith(expect.objectContaining({
      build: expect.objectContaining({
        outDir: '/project/dist',
      }),
    }))
  })

  it('previews the configured output directory', async () => {
    const preview = vi.fn().mockResolvedValue({ printUrls: vi.fn() })

    await runCommand('preview', { ...config, outDir: '/project/public' }, '/project', { preview })

    expect(preview).toHaveBeenCalledWith(expect.objectContaining({
      build: expect.objectContaining({
        outDir: '/project/public',
      }),
    }))
  })

  it('rejects an unknown command', async () => {
    await expect(runCommand('deploy', config, '/project')).rejects.toThrow('Unknown Lui command: deploy')
  })

  it('initializes static components without loading the SPA bootstrap', () => {
    const main = readFileSync(new URL('../main.ts', import.meta.url), 'utf8')

    expect(main).toContain('if (!import.meta.env.LUI_STATIC)')
    expect(main).toContain('void initComponents({ scope: \'#root\' })')
  })
})
