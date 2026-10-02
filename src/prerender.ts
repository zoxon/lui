import { cp, mkdir, readdir, readFile, rm, stat, writeFile } from 'node:fs/promises'
import { basename, dirname, join, relative } from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import { render } from '@zoxon/mater'
import { $, cyan, dim, green } from 'kleur/colors'
import { App } from './App.js'
import { pageRoutePaths } from './page-paths.js'

const defaultOutputDir = join(import.meta.dirname, '../dist')
const defaultTemporaryDir = join(import.meta.dirname, '../.lui')
const iconsDirectory = join(import.meta.dirname, 'icons')

$.enabled = true

interface ManifestEntry {
  css?: string[]
  file: string
  isEntry?: boolean
  src?: string
}

export function getOutputFile(pathname: string): string {
  return pathname === '/' ? 'index.html' : `${pathname.slice(1)}/index.html`
}

export function getAssetPath(outputFile: string, asset: string, base = '/'): string {
  if (base === './') {
    const directory = dirname(outputFile)
    const depth = directory === '.' ? 0 : directory.split('/').length
    return `${'../'.repeat(depth)}${asset}`
  }

  return `${base.endsWith('/') ? base : `${base}/`}${asset}`
}

async function findIconFiles(directory: string): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true })
  const files = await Promise.all(entries.sort((left, right) => left.name.localeCompare(right.name)).map(async (entry) => {
    const path = join(directory, entry.name)
    return entry.isDirectory() ? findIconFiles(path) : entry.name.endsWith('.svg') ? [path] : []
  }))

  return files.flat()
}

function createSymbol(icon: string, id: string): string {
  const openingTag = icon.match(/^<svg\b[^>]*>/)?.[0] ?? ''
  const attributes = openingTag.slice(4, -1)
  const viewBox = attributes.match(/viewBox=("[^"]*"|'[^']*')/i)?.[1]
  const width = attributes.match(/\swidth=("[^"]*"|'[^']*')/i)?.[1]
  const height = attributes.match(/\sheight=("[^"]*"|'[^']*')/i)?.[1]
  const dimensions = width && height ? ` viewBox="0 0 ${width.slice(1, -1)} ${height.slice(1, -1)}"` : ''
  const symbolAttributes = attributes.replace(/\s(?:aria-hidden|height|version|width|xmlns)=("[^"]*"|'[^']*')/gi, '')

  return icon
    .replace(/^<svg\b[^>]*>/, `<symbol id="${id}"${viewBox ? '' : dimensions}${symbolAttributes}>`)
    .replace(/<\/svg>\s*$/, '</symbol>')
}

function addTrailingSlashes(content: string): string {
  const pagePaths = new Set(Object.values(pageRoutePaths))

  return content.replace(/href="([^"]+)"/g, (href, path: string) => {
    return path !== '/' && pagePaths.has(path) ? `href="${path}/"` : href
  })
}

async function createIconSprite(): Promise<string> {
  const files = await findIconFiles(iconsDirectory)
  const symbols = await Promise.all(files.map(async (file) => {
    const name = relative(iconsDirectory, file).replace(/\.svg$/, '').replaceAll('/', '-')
    return createSymbol(await readFile(file, 'utf8'), `icon-${name}`)
  }))

  return `<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style="position:absolute;width:0;height:0;overflow:hidden">${symbols.join('')}</svg>`
}

function createDocument(content: string, iconSprite: string, outputFile: string, entry: ManifestEntry, base: string): string {
  const styles = (entry.css ?? [])
    .map(file => `<link rel="stylesheet" href="${getAssetPath(outputFile, file, base)}">`)
    .join('')
  const script = `<script type="module" src="${getAssetPath(outputFile, entry.file, base)}"></script>`

  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Lui — Documentation</title>${styles}</head><body>${iconSprite}<div id="root">${addTrailingSlashes(content)}</div>${script}</body></html>`
}

async function getClientEntry(temporaryDir: string): Promise<ManifestEntry> {
  const manifestPath = join(temporaryDir, '.vite/manifest.json')
  const manifest = JSON.parse(await readFile(manifestPath, 'utf8')) as Record<string, ManifestEntry>
  const entry = findClientEntry(manifest)

  if (!entry)
    throw new Error(`Client entry not found in ${manifestPath}`)

  return entry
}

export function findClientEntry(manifest: Record<string, ManifestEntry>): ManifestEntry | undefined {
  return Object.values(manifest).find(item => item.isEntry && item.src === 'index.html')
}

interface BuildReport {
  cssBytes?: number
  durationMs: number
  jsBytes?: number
  outputDir?: string
  pageFiles?: string[]
  pages: number
}

export function formatBuildReport({ cssBytes = 0, durationMs, jsBytes = 0, outputDir = defaultOutputDir, pageFiles = [], pages }: BuildReport): string {
  const files = pageFiles.map((file, index) => `${dim(index === pageFiles.length - 1 ? '└──' : '├──')} ${file}`).join('\n')
  const output = basename(outputDir)

  return `\n${cyan('Lui v1.1.0')}\n\n${cyan(`${output}/`)}\n${files || `${dim('└──')} …`}\n\n${green('✓')} ${pages} pages prerendered in ${durationMs}ms\n${green('✓')} CSS ${(cssBytes / 1024).toFixed(1)} kB · JS ${(jsBytes / 1024).toFixed(1)} kB\n${green('✓')} Output written to ${cyan(output)}`
}

export interface PrerenderOptions {
  base?: string
  outputDir?: string
  temporaryDir?: string
}

export async function prerender({ base = '/', outputDir = defaultOutputDir, temporaryDir = defaultTemporaryDir }: PrerenderOptions = {}): Promise<void> {
  const startedAt = performance.now()

  try {
    const entry = await getClientEntry(temporaryDir)
    const pages = Object.entries(pageRoutePaths)
    const iconSprite = await createIconSprite()
    await rm(outputDir, { force: true, recursive: true })
    await cp(temporaryDir, outputDir, { recursive: true })

    await Promise.all(pages.map(async ([page, pathname]) => {
      const outputFile = getOutputFile(pathname)
      const destination = join(outputDir, outputFile)
      const document = createDocument(render(App({ mode: 'prerender', page })), iconSprite, outputFile, entry, base)

      await mkdir(dirname(destination), { recursive: true })
      await writeFile(destination, document)
    }))

    const [cssBytes, jsBytes] = await Promise.all([
      Promise.all((entry.css ?? []).map(file => stat(join(outputDir, file)))).then(files => files.reduce((total, file) => total + file.size, 0)),
      stat(join(outputDir, entry.file)).then(file => file.size),
    ])

    process.stdout.write(`${formatBuildReport({
      cssBytes,
      durationMs: Math.round(performance.now() - startedAt),
      jsBytes,
      outputDir,
      pageFiles: pages.map(([, pathname]) => getOutputFile(pathname)),
      pages: pages.length,
    })}\n`)
  }
  finally {
    await rm(temporaryDir, { force: true, recursive: true })
  }
}

if (fileURLToPath(import.meta.url) === process.argv[1])
  void prerender()
