/// <reference types="vitest/config" />
import fs from 'node:fs'
import path from 'node:path'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, type Plugin } from 'vite'

// GitHub Pages serves 404.html for unknown paths; making it a copy of index.html
// lets client-side routes such as /problems/cm1-12 work on a hard refresh.
const spaFallback = (): Plugin => {
  let outDir = 'dist'
  return {
    name: 'spa-404-fallback',
    apply: 'build',
    configResolved(config) {
      outDir = path.resolve(config.root, config.build.outDir)
    },
    closeBundle() {
      fs.copyFileSync(path.join(outDir, 'index.html'), path.join(outDir, '404.html'))
    },
  }
}

export default defineConfig({
  // A custom domain (CNAME) serves from the root. For a project page such as
  // user.github.io/repo, set BASE_PATH=/repo/ in the deploy workflow.
  base: process.env.BASE_PATH ?? '/',
  plugins: [react(), tailwindcss(), spaFallback()],
  worker: { format: 'es' },
  // Lazily imported (CV builder download); pre-bundle so dev doesn't re-optimise mid-session.
  optimizeDeps: { include: ['@react-pdf/renderer'] },
  build: {
    target: 'es2022',
    chunkSizeWarningLimit: 900,
  },
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
  },
})
