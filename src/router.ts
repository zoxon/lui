import { dispatchCustomEvent } from '@zoxon/eventor'
import { render } from '@zoxon/mater'
import { initComponents as initNuxComponents } from '@zoxon/nux'
import Navigo from 'navigo'
import { destroyComponentInstances } from './components/base/overlays/instance.js'
import { getPagePath, pageRoutePaths } from './page-paths.js'
import { DEFAULT_PAGE, routes } from './routes.js'

export interface AppRouter {
  start: () => void
  navigate: (page: string) => void
  destroy: () => void
  path: (page: string) => string
}

export interface CreateAppRouterOptions {
  mountPage?: (page: string) => void
}

export { getPagePath, pageRoutePaths }

declare global {
  interface WindowEventMap {
    'router:change': CustomEvent<{ page: string }>
  }
}

function mountPage(page: string): void {
  const contentEl = document.getElementById('content')
  if (!contentEl)
    return

  const pageEl = document.querySelector('.page')
  pageEl?.classList.toggle('page--landing', page === DEFAULT_PAGE || page === '')

  const renderFn = routes[page] ?? routes[DEFAULT_PAGE]
  const parser = new DOMParser()
  const doc = parser.parseFromString(render(renderFn()), 'text/html')

  destroyComponentInstances(contentEl)
  contentEl.replaceChildren(...Array.from(doc.body.childNodes))

  void initNuxComponents({ scope: '#root' })
  dispatchCustomEvent('router:change', { page })
}

export function createAppRouter({ mountPage: mount = mountPage }: CreateAppRouterOptions = {}): AppRouter {
  const router = new Navigo('/', { linksSelector: '[data-navigo]' })

  Object.entries(pageRoutePaths).forEach(([page, path]) => {
    router.on(path, () => {
      mount(page)
      router.updatePageLinks()
    })
  })

  router.notFound(() => {
    mount(DEFAULT_PAGE)
    router.updatePageLinks()
  })

  return {
    start: () => router.resolve(),
    navigate: page => router.navigate(getPagePath(page)),
    destroy: () => router.destroy(),
    path: getPagePath,
  }
}
