import { defineStore } from 'pinia'
import { useApiFetch } from '~/shared/api/useApiFetch'
import type { QuestionFull } from '~/shared/ui/TheInterview/model'

export interface interviewState {
  setInterview: QuestionFull[] | null
}

export const useInterview = defineStore('interview', {
  state: (): interviewState => <interviewState>({
    setInterview: null,
  }),
  getters: {
    outInterview: (state) => {
      return state.setInterview
    },
  },
  actions: {
    async getLiveCode() {
      if (this.setInterview)
        return false
      const { data, error, status } = await useApiFetch('/api/question', {
        cache: 'no-cache',
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (status === 200) {
        this.setInterview = data.questions
        return true
      }
      return false
    },
  },
})
