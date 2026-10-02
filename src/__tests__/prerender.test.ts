import { readFileSync } from 'node:fs'
import { access, mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { dim, green } from 'kleur/colors'
import { describe, expect, it } from 'vitest'
import { findClientEntry, formatBuildReport, getAssetPath, getOutputFile, prerender } from '@/prerender.js'

const packageJson = JSON.parse(readFileSync(new URL('../../package.json', import.meta.url), 'utf8')) as {
  scripts: Record<string, string>
}

describe('getOutputFile', () => {
  it('uses Lui as the only prerender build command', () => {
    expect(packageJson.scripts.build).toBe('pnpm lui build')
    expect(packageJson.scripts['build:prerender']).toBeUndefined()
  })

  it('maps the root route to index.html', () => {
    expect(getOutputFile('/')).toBe('index.html')
  })

  it('maps nested routes to directory indexes', () => {
    expect(getOutputFile('/docs/getting-started')).toBe('docs/getting-started/index.html')
  })

  it('uses root-relative asset paths by default', () => {
    expect(getAssetPath('docs/jsx/index.html', 'assets/index.js')).toBe('/assets/index.js')
  })

  it('uses an explicit Vite base for client assets', () => {
    expect(getAssetPath('docs/jsx/index.html', 'assets/index.js', '/docs/')).toBe('/docs/assets/index.js')
  })

  it('resolves relative assets correctly for a relative base on the root page', () => {
    expect(getAssetPath('index.html', 'assets/index.js', './')).toBe('assets/index.js')
  })

  it('resolves relative assets up to the shared assets directory for nested pages', () => {
    // "button/index.html" is one level deep — its assets/... reference must
    // climb out of "button/" to reach the shared dist/assets/ directory.
    expect(getAssetPath('button/index.html', 'assets/index.js', './')).toBe('../assets/index.js')
    // "docs/getting-started/index.html" is two levels deep.
    expect(getAssetPath('docs/getting-started/index.html', 'assets/index.js', './')).toBe('../../assets/index.js')
  })

  it('prints prerender page count', () => {
    expect(formatBuildReport({ durationMs: 250, pages: 39 })).toContain('39 pages prerendered')
  })

  it('lists every rendered HTML file', () => {
    const report = formatBuildReport({
      durationMs: 250,
      pageFiles: ['index.html', 'button/index.html', 'docs/jsx/index.html'],
      pages: 3,
    })

    expect(report).toContain(`${dim('├──')} index.html`)
    expect(report).toContain(`${dim('├──')} button/index.html`)
    expect(report).toContain(`${dim('└──')} docs/jsx/index.html`)
  })

  it('prints the colored summary after the file list', () => {
    const report = formatBuildReport({
      durationMs: 250,
      pageFiles: ['index.html'],
      pages: 1,
    })

    expect(report.indexOf('└── index.html')).toBeLessThan(report.indexOf('1 pages prerendered'))
    expect(report).toContain(green('✓'))
  })

  it('prints the configured output directory', () => {
    expect(formatBuildReport({ durationMs: 250, outputDir: '/project/public', pages: 1 })).toContain('public')
  })

  it('finds Vite’s HTML client entry in the manifest', () => {
    expect(findClientEntry({
      'index.html': { file: 'assets/index.js', isEntry: true, src: 'index.html' },
    })).toMatchObject({ file: 'assets/index.js' })
  })

  it('writes pages to dist and cleans the temporary bundle', async () => {
    const root = await mkdtemp(join(tmpdir(), 'lui-prerender-'))
    const temporaryDir = join(root, '.lui')
    const outputDir = join(root, 'dist')

    try {
      await mkdir(join(temporaryDir, '.vite'), { recursive: true })
      await mkdir(join(temporaryDir, 'assets'))
      await writeFile(join(temporaryDir, '.vite/manifest.json'), JSON.stringify({
        'index.html': {
          css: ['assets/index.css'],
          file: 'assets/index.js',
          isEntry: true,
          src: 'index.html',
        },
      }))
      await writeFile(join(temporaryDir, 'assets/index.css'), '')
      await writeFile(join(temporaryDir, 'assets/index.js'), '')

      await prerender({ outputDir, temporaryDir })

      await expect(access(join(outputDir, 'index.html'))).resolves.toBeUndefined()
      await expect(access(join(outputDir, 'docs/getting-started/index.html'))).resolves.toBeUndefined()
      await expect(readFile(join(outputDir, 'index.html'), 'utf8')).resolves.toContain('id="icon-ui-sun"')
      await expect(readFile(join(outputDir, 'index.html'), 'utf8')).resolves.toContain('id="icon-ui-sun" viewBox="0 0 24 24"')
      await expect(readFile(join(outputDir, 'index.html'), 'utf8')).resolves.toContain('id="icon-ui-check" viewBox="0 0 16 16" fill="none"')
      await expect(readFile(join(outputDir, 'index.html'), 'utf8')).resolves.toContain('id="icon-ui-info" viewBox="0 0 24 24" fill="none" stroke="currentColor"')
      await expect(readFile(join(outputDir, 'index.html'), 'utf8')).resolves.toContain('href="/docs/getting-started/"')
      await expect(access(temporaryDir)).rejects.toThrow()
    }
    finally {
      await rm(root, { force: true, recursive: true })
    }
  })
})
