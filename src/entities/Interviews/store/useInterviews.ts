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
    async getInterviewTest() {
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
    async createInterviewTopic() {
      const { data, error, status } = await useApiFetch('/api/question', {
        cache: 'no-cache',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: [
          {
            tag: 'javascript',
            name: 'javascript',
            show: true,
            list: [
              {
                question: 'javascript111',
                answer: 'javascript222',
                audio: 'javascript333',
                show: true,
              },
              {
                question: 'typescript111',
                answer: 'typescript222',
                audio: 'typescript333',
                show: true,
              },
            ],
          },
        ],
      })
      console.log('start----------')
      if (status === 200) {
        this.setInterviews = data.questions
        return true
      }
      return false
    },
  },
})
