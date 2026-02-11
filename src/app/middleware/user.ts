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
    isAuthenticated = true
  }
  if (!isAuthenticated && _to.path !== '/auth') {
    return navigateTo('/auth')
  }
  if (isAuthenticated && _to.path !== '/admin') {
    return navigateTo('/admin')
  }
})
