import type { TemplateResult } from '@zoxon/mater'
import { Layout } from '@/components/docs/Layout/index.js'
import { DEFAULT_PAGE, routes } from '@/routes.js'

export interface AppProps {
  mode?: 'spa' | 'prerender'
  page?: string
}

export function App({ mode = 'spa', page = DEFAULT_PAGE }: AppProps = {}): TemplateResult {
  const content = mode === 'prerender' ? (routes[page] ?? routes[DEFAULT_PAGE])() : undefined

  return <Layout content={content} landing={page === DEFAULT_PAGE} />
}
