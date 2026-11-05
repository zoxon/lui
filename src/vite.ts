import type { UserConfig } from 'vite'
import { resolve } from 'node:path'
import { mergeConfig } from 'vite'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

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
