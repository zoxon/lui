// @vitest-environment happy-dom

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { DEFAULT_PAGE } from '../routes'

const {
  dispatchCustomEvent,
  initNuxComponents,
  routeHandlers,
  notFoundHandlers,
  routerState,
} = vi.hoisted(() => ({
  dispatchCustomEvent: vi.fn(),
  initNuxComponents: vi.fn(),
  routeHandlers: new Map<string, () => void>(),
  notFoundHandlers: [] as Array<() => void>,
  routerState: {
    destroy: vi.fn(),
    navigate: vi.fn(),
    resolve: vi.fn(),
    updatePageLinks: vi.fn(),
  },
}))

vi.mock('@zoxon/eventor', () => ({
  dispatchCustomEvent,
}))

vi.mock('@zoxon/nux', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@zoxon/nux')>()

  return {
    ...actual,
    initComponents: initNuxComponents,
  }
})

vi.mock('navigo', () => ({
  default: class NavigoMock {
    on(path: string, handler: () => void) {
      routeHandlers.set(path, handler)
      return this
    }

    notFound(handler: () => void) {
      notFoundHandlers.push(handler)
      return this
    }

    resolve() {
      return routerState.resolve()
    }

    navigate(path: string) {
      return routerState.navigate(path)
    }

    destroy() {
      return routerState.destroy()
    }

    updatePageLinks() {
      return routerState.updatePageLinks()
    }
  },
}))

const { createAppRouter, getPagePath, pageRoutePaths } = await import('../router')

beforeEach(() => {
  document.body.innerHTML = '<div id="content"></div><a class="docs-nav__link" data-page="accordion"></a>'
  dispatchCustomEvent.mockClear()
  initNuxComponents.mockClear()
  routeHandlers.clear()
  notFoundHandlers.length = 0
  routerState.destroy.mockClear()
  routerState.navigate.mockClear()
  routerState.resolve.mockClear()
  routerState.updatePageLinks.mockClear()
})

afterEach(() => {
  document.body.innerHTML = ''
})

describe('app router contract', () => {
  it('maps pages to stable history paths', () => {
    expect(getPagePath(DEFAULT_PAGE)).toBe('/')
    expect(getPagePath('docs-jsx')).toBe('/docs/jsx')
    expect(getPagePath('button')).toBe('/button')
    expect(getPagePath('missing')).toBe('/')
  })

  it('exposes an adapter interface independent from Navigo', () => {
    const router = createAppRouter({
      mountPage: () => undefined,
    })

    expect(router.path('docs-rendering')).toBe('/docs/rendering')
    expect(router.start).toEqual(expect.any(Function))
    expect(router.navigate).toEqual(expect.any(Function))
    expect(router.destroy).toEqual(expect.any(Function))

    router.destroy()

    expect(routerState.destroy).toHaveBeenCalledTimes(1)
  })

  it('registers every route page except legacy empty alias', () => {
    expect(Object.hasOwn(pageRoutePaths, '')).toBe(false)
    expect(pageRoutePaths).toHaveProperty(DEFAULT_PAGE, '/')
    expect(pageRoutePaths).toHaveProperty('accordion', '/accordion')
  })

  it('switches the application shell for the landing route', () => {
    document.body.innerHTML = '<div class="page"><main id="content"></main></div>'
    createAppRouter()

    routeHandlers.get('/')?.()
    expect(document.querySelector('.page')?.classList.contains('page--landing')).toBe(true)

    routeHandlers.get('/button')?.()
    expect(document.querySelector('.page')?.classList.contains('page--landing')).toBe(false)
  })

  it('initializes nux components after router-driven page mount', () => {
    createAppRouter()

    const handler = routeHandlers.get('/accordion')
    expect(handler).toEqual(expect.any(Function))

    handler?.()

    expect(initNuxComponents).toHaveBeenCalledWith({ scope: '#root' })
    expect(dispatchCustomEvent).toHaveBeenCalledWith('router:change', { page: 'accordion' })
    expect(routerState.updatePageLinks).toHaveBeenCalledTimes(1)
  })

  it('destroys component instances left in #content before replacing its children', () => {
    createAppRouter()

    const content = document.getElementById('content')!
    const widget = document.createElement('div')
    widget.setAttribute('data-component', 'modal')
    const destroy = vi.fn()
    ;(widget as HTMLElement & { __instance?: { destroy: () => void } }).__instance = { destroy }
    content.append(widget)

    const handler = routeHandlers.get('/accordion')
    handler?.()

    expect(destroy).toHaveBeenCalledTimes(1)
    expect(content.contains(widget)).toBe(false)
  })
})
