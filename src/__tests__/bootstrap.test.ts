// @vitest-environment happy-dom

import { beforeEach, describe, expect, it, vi } from 'vitest'

describe('bootstrap (SPA entry)', () => {
  beforeEach(() => {
    vi.resetModules()
    document.body.innerHTML = '<div id="root"></div>'
  })

  it('mounts the app shell into #root and resolves the initial route into #content', async () => {
    await import('../bootstrap.js')

    const root = document.getElementById('root')
    expect(root?.children.length).toBeGreaterThan(0)

    const content = document.getElementById('content')
    expect(content).not.toBeNull()
    expect(content?.innerHTML.length).toBeGreaterThan(0)
  })

  it('does nothing when #root is missing from the document', async () => {
    document.body.innerHTML = ''

    await expect(import('../bootstrap.js')).resolves.toBeDefined()
    expect(document.getElementById('content')).toBeNull()
  })
})
