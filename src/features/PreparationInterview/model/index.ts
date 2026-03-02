export interface Question {
  answer: string
  audio: string
  question: string
  time?: number
  show: boolean
}

export interface QuestionFull {
  tag: string
  name: string
  show: number
  list: Question[]
}
