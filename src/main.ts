import { initComponents } from '@zoxon/nux'
import '@/index.css'
import '@/styles/docs.css'
import './client.js'

if (!import.meta.env.LUI_STATIC) {
  void import('virtual:svg-icons-register')
  void import('./bootstrap.js')
}
else {
  void initComponents({ scope: '#root' })
}
