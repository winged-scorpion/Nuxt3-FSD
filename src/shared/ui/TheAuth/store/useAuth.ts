import { defineStore } from 'pinia'
import { useApiFetch } from '~/shared/api/useApiFetch'

export interface authState {
  setAuth: boolean
}
interface userData {
  login: string
  password: string
  email: string
}

export const useAuth = defineStore('auth', {
  state: (): authState => <authState>({
    setAuth: false,
  }),
  getters: {
    outAuth: (state) => {
      return state.setAuth
    },
  },
  actions: {
    async userRegistration(reg: userData) {
      const { data, error, status } = await useApiFetch('/api/userreg', {
        cache: 'no-cache',
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: reg,
      })
      if (status === 200) {
        this.setAuth = data.auth
        return data.auth
      }
      return false
    },

    async userAuth(auth: userData) {
      const { data, error, status } = await useApiFetch(`/api/user?login=${auth.email}&password=${auth.password}`, {
        cache: 'no-cache',
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      // if (status === 200) {
      //   this.setInterview = data.questions
      //   return true
      // }
      console.log('userData-----------',data)
    },
  },
})
