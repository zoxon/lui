import { defineConfig } from 'vite'
import { createViteConfig } from './src/vite.js'

export default defineConfig(createViteConfig(import.meta.dirname))
