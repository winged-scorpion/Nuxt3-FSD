import { defineStore } from 'pinia'
import { useApiFetch } from '~/shared/api/useApiFetch'
import type { userData } from '~/shared/ui/TheAuth/model/user'
import { localStoreSet } from '~/shared/api/storageFunction'

export interface AuthState {
  setAuth: boolean
  setUser: null | userData
  setRegMessage: null | string
  setAuthMessage: null | string
}

export const useAuth = defineStore('auth', {
  state: (): AuthState => ({
    setAuth: false,
    setUser: null,
    setRegMessage: null,
    setAuthMessage: null,
  }),
  getters: {
    outAuth: (state) => {
      return state.setAuth
    },
    outUser: (state) => {
      return state.setUser
    },
    outRegMessage: (state) => {
      return state.setRegMessage
    },
    outAuthMessage: (state) => {
      return state.setAuthMessage
    },
  },
  actions: {
    async userRegistration(reg: userData) {
      this.setRegMessage = null
      const { data, error, status } = await useApiFetch('/api/user', {
        cache: 'no-cache',
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: reg,
      })
      if (data.message) {
        this.setRegMessage = data.message
      }
      if (status === 200) {
        this.setAuth = data.success
        localStoreSet('user', data.user)
        return navigateTo('/admin')
      }
      return false
    },

    async userAuth(auth: userData, noRedirect?: boolean) {
      this.setAuthMessage = null
      const { data, error, status } = await useApiFetch(`/api/user?login=${auth.email}&password=${auth.password}`, {
        cache: 'no-cache',
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (data.message) {
        this.setAuthMessage = data.message
      }

      if (status === 200 && data.user !== null) {
        this.setAuth = true
        this.setUser = data.user
        localStoreSet('user', data.user)
        if (noRedirect) return false
        return navigateTo('/admin')
      }
      else {
        this.setAuth = false
      }
    },
  },
})
