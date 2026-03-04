import { defineStore } from 'pinia'
import { useApiFetch } from '~/shared/api/useApiFetch'
import type { QuestionFull } from '~/features/PreparationInterview/model'

export interface interviewState {
  setInterviews: QuestionFull[] | null
  setTagList: string[]
}

export const useInterviews = defineStore('interviews', {
  state: (): interviewState => <interviewState>({
    setInterviews: null,
    setTagList: [],
  }),
  getters: {
    outInterview: (state) => {
      return state.setInterviews
    },
    outTagList: (state) => {
      return state.setTagList
    },
  },
  actions: {
    async getInterview() {
      const { data, error, status } = await useApiFetch('/api/question/question', {
        cache: 'no-cache',
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (data) {
        this.setInterviews = data
        this.setTagList.length = 0
        data.forEach((item: QuestionFull) => {
          this.setTagList.push(item.tag)
        })
        return true
      }
      return false
    },
    async deleteQuestion(id: string) {
      const { data, error, status } = await useApiFetch(`/api/question/${id}`, {
        cache: 'no-cache',
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (data) {
        if (data.success) {
          await this.getInterview()
        }
      }
    },
  },
})
