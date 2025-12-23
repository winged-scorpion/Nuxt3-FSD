import { defineStore } from 'pinia'
import type { ModalContentVideo, ModalInit } from '~/shared/ui/BaseModal/model/ModalContent'

export interface ModalState {
  setModal: null | ModalInit
  setVideo: null | ModalContentVideo
  setBaseModal: null | ModalInit
}

export const useModal = defineStore('modal', {
  state: (): ModalState => ({
    setModal: null,
    setVideo: null,
    setBaseModal: null,
  }),
  getters: {
    outVideoModal: (state) => {
      return state.setVideo
    },
    outBaseModal: (state) => {
      return state.setBaseModal
    },
  },
  actions: {
    initVideoModal(item: ModalContentVideo) {
      this.setVideo = item
    },
  },
})
