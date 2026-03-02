import { defineStore } from 'pinia'
import { useApiFetch } from '~/shared/api/useApiFetch'
import type { QuestionFull } from '~/features/PreparationInterview/model'

export interface interviewState {
  setInterviews: QuestionFull[] | null
}
export interface Question {
  id: string
  question: string
  answer: string
  audio: string
  show: boolean
  tag: string
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
      const { data, error, status } = await useApiFetch('/api/question/question', {
        cache: 'no-cache',
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (data) {
        this.setInterviews = data
        return true
      }
      return false
    },
    async addQuestion() {
      const { data, error, status } = await useApiFetch('/api/question', {
        cache: 'no-cache',
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          id: 'test12',
          question: 'вопрос тест',
          answer: 'ответ тест',
          audio: 'ссылка на аудио тест',
          show: 1,
          tag: 'вопрос тест',
        },
      })
      if (data) {
        this.setInterviews = data.questions
        return true
      }
      return false
    },
  },
})
