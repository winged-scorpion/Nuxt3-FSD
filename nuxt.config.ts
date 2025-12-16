// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  alias: {
    '@': '../src',
  },
  compatibilityDate: '2025-12-15',
  modules: [
    '@unocss/nuxt',
    '@pinia/nuxt',
  ],
  css: ['@/app/global.css', '@unocss/reset/tailwind.css'],

  srcDir: 'src',

  future: {
    compatibilityVersion: 4,
  },

  imports: {
    dirs: [
      'shared/*',
      // Auto-import all files from shared directory. You can specify only need paths | https://nuxt.com/docs/guide/directory-structure/composables
    ],
  },

  dir: {
    pages: './app/routes',
    layouts: './shared/ui/layouts',
  },
  build: {
    transpile: ['vuetify'],
  },
  plugins: [
    { src: '@/shared/plugins/vuetify' },
    { src: '@/shared/plugins/vue-masonry-wall' },
  ],

  components: [
    {
      path: '~/shared',
      pathPrefix: false,
      // Auto-import all components from shared directory.
    },
  ],
  vite: {
    server: {
      allowedHosts: [process.env.host],
    },
  },
})
