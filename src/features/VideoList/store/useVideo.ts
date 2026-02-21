import { defineStore } from 'pinia'
import { useApiFetch } from '~/shared/api/useApiFetch'
import type { VideoList } from '~/pages/ItKitchenPage/model'

export interface videoState {
  setVideo: VideoList[] | null
}

export const useVideo = defineStore('video', {
  state: (): videoState => <videoState>({
    setVideo: null,
  }),
  getters: {
    outVideo: (state) => {
      return state.setVideo
    },
  },
  actions: {
    async getVideo() {
      if (this.setVideo)
        return false
      const { data, error, status } = await useApiFetch('/api/video', {
        cache: 'no-cache',
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (status === 200) {
        this.setVideo = data.video
        return true
      }
      return false
    },
  },
})
