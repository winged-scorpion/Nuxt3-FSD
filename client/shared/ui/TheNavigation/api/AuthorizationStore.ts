import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('userStore', () => {
  const authInfo = ref({
    login: 'winscode',
    password: '123456',
    email: 'winScode@mail.ru',
  })
  const user = ref({
    login: '',
    password: '',
    email: '',
    authStatus: '',
  })
  const authSend = ref(false)
  return {
    authInfo,
    user,
    authSend,
  }
})
