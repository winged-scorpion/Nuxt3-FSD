export default defineNuxtRouteMiddleware(async (_to, _from) => {
  const status = true
  if (status) {
    console.log('1111')
    return navigateTo('/admin')
  }
  else {
    console.log('2222')
    return navigateTo('/auth')
  }
})
