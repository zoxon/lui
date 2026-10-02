import { render } from '@zoxon/mater'
import { App } from './App.js'
import { createAppRouter } from './router.js'
import { parser } from './shared/parser.js'

function mount(): void {
  const root = document.getElementById('root')
  if (!root)
    return

  const doc = parser.parseFromString(render(App()), 'text/html')
  root.replaceChildren(...Array.from(doc.body.childNodes))
}

const router = createAppRouter()

mount()
router.start()
