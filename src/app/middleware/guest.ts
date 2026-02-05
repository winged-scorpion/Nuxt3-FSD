export default defineNuxtRouteMiddleware(async (_to, _from) => {
  // const { fetchUser, setUser } = useDirectusAuth()
  // const user = useDirectusUser()
  // if (!user.value) {
  //   console.log('start')
  //   const user = await fetchUser()
  //   setUser(user.value)
  // }
  // else {
  //   console.log('end')
  // }
  // if (!user.value) {
  //   return navigateTo('/')
  // }
  const status = false
  if (status) {
    console.log('111')
    return navigateTo('/login')

  }
  else {
    console.log('222')
    return navigateTo('/login', { redirectCode: 301 })
  }
  // await (async function () {
  //
  // })()
})
