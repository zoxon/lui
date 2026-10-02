import { mkdtemp, readFile, rm } from 'node:fs/promises'
import { join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { afterEach, describe, expect, it } from 'vitest'
import { runCommand } from '@/cli.js'
import { normalizeConfig } from '@/config.js'

// Real end-to-end coverage: runs an actual `vite build` (not a fabricated
// manifest) through the real static-build pipeline, then asserts on the
// resulting production dist/index.html — closing the gap between "unit
// tests pass" and "the built site is correct" (see AUDIT-008).

const projectRoot = resolve(fileURLToPath(import.meta.url), '../../..')

let outputDir: string | undefined

afterEach(async () => {
  if (outputDir)
    await rm(outputDir, { force: true, recursive: true })
  outputDir = undefined
})

describe('static build (end-to-end)', () => {
  it('builds a real production bundle and prerenders valid HTML into dist/index.html', async () => {
    // Must resolve inside the project root — normalizeConfig refuses an
    // outDir outside it (see AUDIT-009), so this can't use the system temp
    // directory directly.
    outputDir = await mkdtemp(join(projectRoot, '.lui-e2e-'))
    const config = normalizeConfig({ outDir: outputDir, output: 'static' }, projectRoot)

    await runCommand('build', config, projectRoot)

    const html = await readFile(join(outputDir, 'index.html'), 'utf8')

    // A real, content-hashed script/style pair from the actual Vite build —
    // not a hand-written fixture.
    expect(html).toMatch(/<script type="module" src="\/assets\/index-[\w-]+\.js"><\/script>/)
    expect(html).toMatch(/<link rel="stylesheet" href="\/assets\/index-[\w-]+\.css">/)

    // The icon sprite was actually assembled from real SVG source files.
    expect(html).toContain('id="icon-ui-check" viewBox="0 0 16 16"')

    // A nested route was actually prerendered to its own directory index.
    const nested = await readFile(join(outputDir, 'button/index.html'), 'utf8')
    expect(nested).toContain('<button')
  }, 30_000)
})
