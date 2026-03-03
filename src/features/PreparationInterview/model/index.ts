export interface Question {
  answer: string
  audio: string
  question: string
  time?: number
  show: boolean
  id: string
}

export interface QuestionFull {
  tag: string
  name: string
  show: number
  list: Question[]
}
