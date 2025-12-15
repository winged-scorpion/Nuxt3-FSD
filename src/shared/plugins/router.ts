import { createRouter, createWebHistory } from 'vue-router'
import { routes } from '~/app/router/routers'

export default defineNuxtPlugin((nuxtApp) => {
  const router = createRouter({
    history: createWebHistory(),
    routes,
  })

  nuxtApp.vueApp.use(router)
  return {
    provide: {
      router,
    },
  }
})
