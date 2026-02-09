import { defineStore } from 'pinia'
import { useApiFetch } from '~/shared/api/useApiFetch'

export interface authState {
  setAuth: boolean
}
interface userData {
  login: string
  password: string
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
    async postData(auth: userData) {
      const { data, error, status } = await useApiFetch('/api/auth', {
        cache: 'no-cache',
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: auth,
      })
      if (status === 200 && data.auth) {
        this.setAuth = data.auth
        return data.auth
      }
      return false
    },
  },
})
