import type { UserConfig } from 'vite'
import { access } from 'node:fs/promises'
import { isAbsolute, relative, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

export type LuiOutput = 'spa' | 'static'

export interface LuiConfig {
  outDir?: string
  output?: LuiOutput
  vite?: UserConfig
}

export interface ResolvedLuiConfig {
  outDir: string
  output: LuiOutput
  vite: UserConfig
}

export function defineConfig(config: LuiConfig): LuiConfig {
  return config
}

export function normalizeConfig(config: LuiConfig, root: string): ResolvedLuiConfig {
  const output = config.output ?? 'static'

  if (output !== 'spa' && output !== 'static')
    throw new Error(`Unsupported Lui output mode: ${String(output)}`)

  const outDir = resolve(root, config.outDir ?? 'dist')
  const relativeToRoot = relative(root, outDir)

  // The build recursively deletes outDir (see cli.ts/prerender.ts). Refuse a
  // config that would resolve it outside the project root rather than let a
  // typo or malicious lui.config.ts delete an arbitrary directory.
  if (relativeToRoot.startsWith('..') || isAbsolute(relativeToRoot))
    throw new Error(`Lui outDir must resolve inside the project root, got: ${outDir}`)

  return {
    outDir,
    output,
    vite: config.vite ?? {},
  }
}

export async function loadConfig(root: string): Promise<LuiConfig> {
  for (const file of ['lui.config.ts', 'lui.config.js', 'lui.config.mjs']) {
    const path = resolve(root, file)

    try {
      await access(path)
    }
    catch {
      continue
    }

    const config = (await import(pathToFileURL(path).href)).default

    if (!config || typeof config !== 'object' || Array.isArray(config))
      throw new TypeError(`Lui config must export an object: ${path}`)

    return config as LuiConfig
  }

  return {}
}
