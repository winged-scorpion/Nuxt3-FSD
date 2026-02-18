import { defineNuxtRouteMiddleware } from 'nuxt/app'
import { useAuth } from '~/shared/ui/TheAuth/store/useAuth'
import type { userData } from '~/shared/ui/TheAuth/model/user'
import { localStoreGet } from '~/shared/api/storageFunction'

export default defineNuxtRouteMiddleware(async (_to, _from) => {
  const auth = useAuth()
  let isAuthenticated = auth.outAuth
  // eslint-disable-next-line node/prefer-global/process
  if (process.server)
    return
  const localUserData: userData = await localStoreGet('user')
  if (localUserData.login) {
    console.log('11111')
    isAuthenticated = true
  }
  if (!isAuthenticated && _to.path !== '/auth') {
    console.log('22222')
    return navigateTo('/auth')
  }
  if (isAuthenticated && _to.path !== '/admin') {
    console.log('33333')
    return navigateTo('/admin')
  }
})
