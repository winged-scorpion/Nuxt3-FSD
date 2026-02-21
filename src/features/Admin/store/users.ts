import { defineStore } from 'pinia'
import { useApiFetch } from '~/shared/api/useApiFetch'
import type { userData } from '~/features/AuthUser/model/user'
import { localStoreSet } from '~/shared/api/storageFunction'

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
        this.setUserData = data
      }
    },
    async deleteUser(user: userData) {
      const { data, error, status } = await useApiFetch(`/api/user/${user.id}`, {
        cache: 'no-cache',
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (data) {
        if (data.success) {
          await this.getAllUserData()
        }
      }
    },
    async updateUser(user: userData) {
      const { data, error, status } = await useApiFetch(`/api/user/${user.id}`, {
        cache: 'no-cache',
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: user,
      })
      if (data) {
        if (this.setUserData === null)
          return false
        const index: number | undefined = this.setUserData?.findIndex(item => item.id === user.id)
        if (index !== -1) {
          this.setUserData[index] = { ...this.setUserData[index], ...data.user }
          localStoreSet('user', this.setUserData[index])
        }
      }
    },
  },
})
