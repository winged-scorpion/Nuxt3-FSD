// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  alias: {
    '@': '../client',
  },
  modules: [
    '@unocss/nuxt',
    '@pinia/nuxt',
  ],
  css: ['@/app/global.css', '@unocss/reset/tailwind.css', 'vuetify/lib/styles/main.sass'],

  srcDir: 'client',

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
    { src: '~/shared/plugins/vuetify' },
  ],

  components: [
    {
      path: '~/shared',
      pathPrefix: false,
      // Auto-import all components from shared directory.
    },
  ],
})
