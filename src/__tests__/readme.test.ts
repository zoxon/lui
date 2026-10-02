import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const readme = readFileSync(new URL('../../README.md', import.meta.url), 'utf8')
const packageJson = JSON.parse(readFileSync(new URL('../../package.json', import.meta.url), 'utf8')) as {
  scripts: Record<string, string>
}

describe('rEADME adoption workflow', () => {
  it('documents cloning and adapting Lui in place', () => {
    expect(readme).toContain('git clone https://github.com/zoxon/lui.git')
    expect(readme).toContain('pnpm install')
    expect(readme).toContain('src/components/base')
    expect(readme).toContain('src/tokens')
    expect(readme).toContain('src/styles')
    expect(packageJson.scripts).toMatchObject({
      build: 'pnpm lui build',
      dev: 'pnpm lui dev',
      preview: 'pnpm lui preview',
    })
    expect(packageJson.scripts).not.toHaveProperty('build:prerender')
    expect(readme).toContain('pnpm build')
    expect(readme).toContain('output: \'static\'')
    expect(readme).toContain('from \'@zoxon/lui/config\'')
  })
})
