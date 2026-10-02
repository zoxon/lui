import type { UserConfig } from 'vite'
import type { ResolvedLuiConfig } from './config.js'
import { rm } from 'node:fs/promises'
import { resolve } from 'node:path'
import process from 'node:process'
import { createServer, mergeConfig, build as viteBuild, preview as vitePreview } from 'vite'
import { loadConfig, normalizeConfig } from './config.js'
import { prerender } from './prerender.js'
import { createViteConfig } from './vite.js'

interface DevServer {
  listen: () => Promise<unknown>
  printUrls: () => void
}

interface PreviewServer {
  printUrls: () => void
}

export interface CliOperations {
  build: (config: UserConfig) => Promise<unknown> | unknown
  createServer: (config: UserConfig) => Promise<DevServer>
  prerender: (options: { base: string, outputDir: string, temporaryDir: string }) => Promise<void>
  preview: (config: UserConfig) => Promise<PreviewServer>
}

const defaultOperations: CliOperations = {
  build: viteBuild,
  createServer,
  prerender,
  preview: vitePreview,
}

function withOutputDir(config: UserConfig, outDir: string, manifest = false): UserConfig {
  return mergeConfig(config, {
    build: {
      emptyOutDir: true,
      manifest,
      outDir,
    },
  })
}

export async function runCommand(
  command: string,
  config: ResolvedLuiConfig,
  projectRoot: string,
  operations: Partial<CliOperations> = {},
): Promise<void> {
  const api = { ...defaultOperations, ...operations }
  const viteConfig = createViteConfig(projectRoot, config.vite)

  if (command === 'dev') {
    const server = await api.createServer(viteConfig)
    await server.listen()
    server.printUrls()
    return
  }

  if (command === 'preview') {
    const server = await api.preview(mergeConfig(viteConfig, { build: { outDir: config.outDir } }))
    server.printUrls()
    return
  }

  if (command === 'build' && config.output === 'spa') {
    await api.build(withOutputDir(viteConfig, config.outDir))
    return
  }

  if (command === 'build') {
    const temporaryDir = resolve(projectRoot, '.lui')
    const base = typeof viteConfig.base === 'string' ? viteConfig.base : '/'

    try {
      await api.build(mergeConfig(withOutputDir(viteConfig, temporaryDir, true), {
        define: { 'import.meta.env.LUI_STATIC': 'true' },
      }))
      await api.prerender({ base, outputDir: config.outDir, temporaryDir })
    }
    finally {
      await rm(temporaryDir, { force: true, recursive: true })
    }
    return
  }

  throw new Error(`Unknown Lui command: ${command}`)
}

async function main(): Promise<void> {
  const root = process.cwd()
  const config = normalizeConfig(await loadConfig(root), root)
  await runCommand(process.argv[2] ?? 'dev', config, root)
}

if (import.meta.url === new URL(process.argv[1], 'file:').href) {
  void main().catch((error: unknown) => {
    console.error(error instanceof Error ? error.message : error)
    process.exitCode = 1
  })
}
