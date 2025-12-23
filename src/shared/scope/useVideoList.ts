import { defineStore } from 'pinia'
import type { VideoList } from '~/pages/ItKitchenPage/model'
import { getJsonFunction } from '~/shared/api/base/getJson'

export interface VideoListState {
  setVideoList: null | VideoList[]
}

export const useVideoList = defineStore('videoList', {
  state: (): VideoListState => <VideoListState>({
    setVideoList: null,
  }),
  getters: {
    outProduct: (state) => {
      return state.setVideoList
    },
  },
  actions: {
    async getVideoList() {
      if (this.setVideoList) {
        return false
      }
      return getJsonFunction('kitchen').then((value: VideoList[]) => {
        if (value) {
          this.setVideoList = value
          return value
        }
      })
    },
  },
})
