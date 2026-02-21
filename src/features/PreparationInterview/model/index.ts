export interface Question {
  answer: string
  audio: string
  question: string
  time?: number
}

export interface QuestionFull {
  tag: string
  name: string
  list: Question[]
}
