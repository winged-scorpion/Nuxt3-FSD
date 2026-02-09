export default defineNuxtRouteMiddleware(async (_to, _from) => {
  const status = false
  if (status) {
    return navigateTo('/admin')
  }
  else {
    return navigateTo('/auth')
  }
})
