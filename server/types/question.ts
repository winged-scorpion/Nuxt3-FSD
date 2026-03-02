export interface QuestionItem {
  question: string
  answer: string
  audio: string
  show: boolean
}

export interface TagItem {
  tag: string
  name: string
  show: boolean
  ilIndex: number
  list: QuestionItem[]
}
