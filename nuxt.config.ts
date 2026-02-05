// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  compatibilityDate: '2025-12-15',
  modules: [
    '@unocss/nuxt',
    '@pinia/nuxt',
    'nuxt-directus',
    'nuxt-security',
  ],
  css: ['@/app/global.css', 'vuetify/lib/styles/main.sass'],
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
    pages: 'app/routes',
    layouts: 'shared/ui/layouts',
    middleware: 'app/middleware',
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
