import { describe, expect, it } from 'vitest'
import { App } from '@/App.js'

describe('app', () => {
  it('leaves the SPA content mount empty by default', () => {
    expect(App()).toContain('<main class="page__main" id="content"></main>')
  })

  it('renders the selected page into the prerender shell', () => {
    const page = App({ mode: 'prerender', page: 'button' })

    expect(page).toContain('class="page__main" id="content"')
    expect(page).toContain('Variants and themes')
  })
})
