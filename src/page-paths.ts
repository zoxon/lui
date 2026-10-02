import { NAV_PAGES } from './nav.js'
import { DEFAULT_PAGE } from './page-constants.js'

export const pageRoutePaths: Record<string, string> = Object.fromEntries(
  NAV_PAGES.map(page => [page, page === DEFAULT_PAGE ? '/' : `/${page.replace(/^docs-/, 'docs/')}`]),
)

export function getPagePath(page: string): string {
  return pageRoutePaths[page] ?? pageRoutePaths[DEFAULT_PAGE]
}
