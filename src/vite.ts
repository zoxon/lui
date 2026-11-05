import type { UserConfig } from 'vite'
import { resolve } from 'node:path'
import { mergeConfig } from 'vite'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { THEME_INIT_SCRIPT } from './theme-init.js'

export function createViteConfig(projectRoot: string, overrides: UserConfig = {}): UserConfig {
  return mergeConfig({
    build: {
      rollupOptions: {
        output: {
          assetFileNames: 'assets/[name]-[hash][extname]',
          chunkFileNames: 'assets/[name]-[hash].js',
          entryFileNames: 'assets/[name]-[hash].js',
        },
      },
    },
    plugins: [
      {
        name: 'lui:theme-init',
        transformIndexHtml: () => [
          { tag: 'script', children: THEME_INIT_SCRIPT, injectTo: 'head-prepend' },
        ],
      },
      createSvgIconsPlugin({
        iconDirs: [
          resolve(projectRoot, 'src/icons'),
        ],
        symbolId: 'icon-[dir]-[name]',
      }),
    ],
    resolve: {
      alias: {
        '@': resolve(projectRoot, 'src'),
      },
    },
    root: resolve(projectRoot, 'src'),
    test: {
      environment: 'node',
      include: [
        resolve(projectRoot, 'src/__tests__/**/*.test.ts'),
        resolve(projectRoot, 'src/__tests__/**/*.test.tsx'),
      ],
      setupFiles: [
        resolve(projectRoot, 'src/__tests__/setup.ts'),
      ],
    },
  }, overrides)
}
