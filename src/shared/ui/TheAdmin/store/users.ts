import { defineStore } from 'pinia'
import { useApiFetch } from '~/shared/api/useApiFetch'
import type { userData } from '~/shared/ui/TheAuth/model/user'

export interface UsersState {
  setUserData: null | userData[]
}

export const useUsers = defineStore('users', {
  state: (): UsersState => ({
    setUserData: null,
  }),
  getters: {
    outUsersData: (state) => {
      return state.setUserData
    },
  },
  actions: {
    async getAllUserData() {
      const { data, error, status } = await useApiFetch(`/api/user?user=all`, {
        cache: 'no-cache',
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (data) {
        console.log('data-----------------', data)
        this.setUserData = data
      }
    },
  },
})
