import type { RouteRecordRaw } from 'vue-router'
import { HomePage } from '~/pages/HomePage'
import { BaseLayout } from '~/shared/ui/layouts'

export const routes: RouteRecordRaw[] = [
  {
    name: 'HomePage',
    path: '/',
    component: HomePage,
    meta: {
      layout: BaseLayout,
    },
  },
]
