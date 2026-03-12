import { defineStore } from 'pinia'
import { useApiFetch } from '~/shared/api/useApiFetch'
import type { VideoList } from '~/pages/ItKitchenPage/model'

export interface videoState {
  setVideo: VideoList[] | null
}

export const useVideos = defineStore('videos', {
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
      const { data, error, status } = await useApiFetch('/api/kitchen/video', {
        cache: 'no-cache',
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (data) {
        console.log('data--------------------',data)
        this.setVideo = data
        return true
      }
      return false
    },
    async deleteVideo(videoId: string) {
      const { data, error, status } = await useApiFetch(`/api/kitchen/${videoId}`, {
        cache: 'no-cache',
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (data) {
        if (data.success) {
          await this.getVideo()
        }
      }
    },
  },
})
