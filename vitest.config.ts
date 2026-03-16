// vitest.config.ts
import { fileURLToPath } from 'node:url'
import { resolve } from 'node:path'
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue({
    template: {
      compilerOptions: {
        isCustomElement: (tag: any) => ['ErrorMessage', 'Field', 'v-btn'].includes(tag),
      },
    },
  })],
  test: {
    environment: 'jsdom',
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/cypress/**',
      '**/.{idea,git,cache,output,temp}/**',
    ],
    root: fileURLToPath(new URL('./', import.meta.url)),
    coverage: {
      reporter: ['text', 'json', 'html'],
    },
    alias: {
      '~': fileURLToPath(new URL('./src/', import.meta.url)),
      '@': resolve(__dirname, '.'),
    },
  },
  resolve: {
    alias: {
      // '@': fileURLToPath(new URL('./', import.meta.url)),
      '~': fileURLToPath(new URL('./', import.meta.url)), // Alternative for those used to `~` for root path
    },
  },
})
