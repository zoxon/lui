import { readdirSync } from 'node:fs'
import { TemplateResult } from '@zoxon/mater'
import { describe, expect, it } from 'vitest'
import { DEFAULT_PAGE, routes } from '../routes'

describe('docs routes', () => {
  it('uses overview as default page', () => {
    expect(DEFAULT_PAGE).toBe('index')
    expect(routes['']).toBe(routes.index)
  })

  it('registers runtime documentation pages', () => {
    expect(routes.index()).toBeInstanceOf(TemplateResult)
    expect(routes['docs-getting-started']()).toBeInstanceOf(TemplateResult)
    expect(routes['docs-template-literals']()).toBeInstanceOf(TemplateResult)
    expect(routes['docs-jsx']()).toBeInstanceOf(TemplateResult)
    expect(routes['docs-rendering']()).toBeInstanceOf(TemplateResult)
  })

  it('renders highlighted code examples in documentation content pages', () => {
    expect(routes['docs-getting-started']()).toContain('hljs-')
    expect(routes['docs-template-literals']()).toContain('hljs-')
    expect(routes['docs-jsx']()).toContain('hljs-')
    expect(routes['docs-rendering']()).toContain('hljs-')
  })

  it('documents server-side string rendering', () => {
    expect(routes['docs-rendering']()).toContain('Server-side string rendering')
    expect(routes['docs-rendering']()).toContain('render(view)')
  })

  it('documents repository clone setup', () => {
    expect(routes['docs-getting-started']()).toContain('https://github.com/zoxon/lui.git')
    expect(routes['docs-getting-started']()).not.toContain('pnpm add @zoxon/lui @zoxon/mater')
  })

  it('uses content blocks for documentation prose pages', () => {
    expect(routes['docs-getting-started']()).toContain('class="content')
    expect(routes['docs-getting-started']()).not.toContain('docs-section')
    expect(routes['docs-rendering']()).toContain('class="content')
    expect(routes['docs-rendering']()).not.toContain('docs-section')
  })

  it('keeps component pages as TemplateResult renderers', () => {
    expect(routes.button()).toBeInstanceOf(TemplateResult)
    expect(routes.accordion()).toBeInstanceOf(TemplateResult)
    expect(routes.icon()).toBeInstanceOf(TemplateResult)
    expect(routes.notification()).toBeInstanceOf(TemplateResult)
    expect(routes.tokens()).toBeInstanceOf(TemplateResult)
  })

  it('documents every project icon', () => {
    const iconNames = readdirSync(new URL('../icons/ui', import.meta.url))
      .filter(file => file.endsWith('.svg'))
      .map(file => `ui/${file.replace(/\.svg$/, '')}`)

    const page = routes.icon()

    expect(page).toContain('Icon gallery')
    iconNames.forEach((name) => {
      expect(page).toContain(name)
    })
  })

  it('documents notification options', () => {
    const page = routes.notification()
    const html = page.toString()

    expect(page).toContain('Notification options')
    expect(page).toContain('NotificationBoard options')
    expect(page).toContain('delay: 0')
    expect(page).toContain('dispatchCustomEvent')
    expect(page).toContain('notification:show')
    expect(page).toContain('board, type, close, class')
    expect(page).not.toContain('lui:notification-show')
    expect(page).not.toContain('notify(')
    expect(page).not.toContain('Data attribute API')
    expect(page).not.toContain('data-notification-message')
    expect(page).not.toContain('type, delay, close, class')
    expect(page).not.toContain('createNotificationBoard')
    expect(html.match(/class="docs-section"/g)).toHaveLength(2)
    expect(page).toContain('class="content')
  })
})
