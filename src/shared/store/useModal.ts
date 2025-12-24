import { defineStore } from 'pinia'
import type { ModalContentVideo, ModalLiveCodeContent } from '~/widgets/BaseModal/model/ModalContent'

export interface ModalState {
  setVideo: null | ModalContentVideo
  setLiveCode: null | ModalLiveCodeContent
}

export const useModal = defineStore('modal', {
  state: (): ModalState => ({
    setVideo: null,
    setLiveCode: null,
  }),
  getters: {
    outVideoModal: (state) => {
      return state.setVideo
    },
    outLiveCode: (state) => {
      return state.setLiveCode
    },
  },
  actions: {
    initVideoModal(item: ModalContentVideo) {
      this.setVideo = item
    },
    initLiveCodeModal(item: ModalLiveCodeContent) {
      this.setLiveCode = item
    },
  },
})
