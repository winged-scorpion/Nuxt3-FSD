import { defineStore } from 'pinia'
import { useApiFetch } from '~/shared/api/useApiFetch'

export interface liveCodeState {
  setLiveCode: null | [string, string[]]
}

export const useLiveCode = defineStore('liveCode', {
  state: (): liveCodeState => <liveCodeState>({
    setLiveCode: null,
  }),
  getters: {
    outLiveCode: (state) => {
      return state.setLiveCode
    },
  },
  actions: {
    async getLiveCode() {
      if (this.setLiveCode)
        return false
      const { data, error, status } = await useApiFetch('/api/livecode', {
        cache: 'no-cache',
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (status === 200) {
        this.setLiveCode = data.liveTask
        return true
      }
      return false
    },
  },
})
