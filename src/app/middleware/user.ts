import { useAuth } from '~/shared/ui/TheAuth/store/useAuth'

export default defineNuxtRouteMiddleware(async (_to, _from) => {
  const auth = useAuth()
  const isAuthenticated = auth.outAuth

  if (!isAuthenticated && _to.path !== '/auth') {
    return navigateTo('/auth')
  }
  if (isAuthenticated && _to.path !== '/admin') {
    return navigateTo('/admin')
  }
  return
})
