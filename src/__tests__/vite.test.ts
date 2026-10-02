import { describe, expect, it } from 'vitest'
import { createViteConfig } from '@/vite.js'

describe('createViteConfig', () => {
  it('writes hashed client entries, chunks, and assets', () => {
    const config = createViteConfig('/project')

    expect(config.build?.rollupOptions?.output).toMatchObject({
      assetFileNames: 'assets/[name]-[hash][extname]',
      chunkFileNames: 'assets/[name]-[hash].js',
      entryFileNames: 'assets/[name]-[hash].js',
    })
  })

  it('merges a project Vite override after Lui defaults', () => {
    expect(createViteConfig('/project', { base: '/docs/' })).toMatchObject({
      base: '/docs/',
      root: '/project/src',
    })
  })
})
