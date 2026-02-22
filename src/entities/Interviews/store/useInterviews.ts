import { defineStore } from 'pinia'
import { useApiFetch } from '~/shared/api/useApiFetch'
import type { QuestionFull } from '~/features/PreparationInterview/model'

export interface interviewState {
  setInterviews: QuestionFull[] | null
}

export const useInterviews = defineStore('interviews', {
  state: (): interviewState => <interviewState>({
    setInterviews: null,
  }),
  getters: {
    outInterview: (state) => {
      return state.setInterviews
    },
  },
  actions: {
    async getInterview() {
      if (this.setInterviews)
        return false
      const { data, error, status } = await useApiFetch('/api/question', {
        cache: 'no-cache',
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (status === 200) {
        this.setInterviews = data.questions

        return true
      }
      return false
    },
  },
})
