/// <reference types="vitest" />
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag: any) => ['ErrorMessage', 'Field', 'v-btn', 'Input'].includes(tag),
          resolveJsonModule: true,
          module: 'commonjs',
        },
      },
    }),
    vueJsx({
      include: ['src/**/*.jsx'],
      exclude: ['src/**/*.jsx'],
    }),
  ],
})
