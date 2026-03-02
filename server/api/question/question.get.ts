import { db } from '../../utils/db'
import type { Question } from '../../schema/question'

export default defineEventHandler(async () => {
  interface QuestionFull {
    tag: string
    name: string
    show: number
    list: Question[]
  }
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM questions', (err, rows: Question[]) => {
      if (err) {
        reject(createError({
          statusCode: 500,
          statusMessage: err.message,
        }))
      }
      else {
        const outQuestionFull: QuestionFull[] = []
        rows.forEach((questionItem: Question) => {
          const exists = outQuestionFull.some(questionFind => questionItem.tag === questionFind.tag)
          if (exists) {
            outQuestionFull.find((item, index) => {
              if (questionItem.tag === item.tag) {
                outQuestionFull[index].list.push(questionItem)
              }
            })
          }
          else {
            const outQuestionItem = <QuestionFull>{}
            outQuestionItem.tag = questionItem.tag
            outQuestionItem.name = questionItem.tag
            outQuestionItem.show = 1
            outQuestionItem.list = [questionItem]
            outQuestionFull.push(outQuestionItem)
          }
        })
        resolve(outQuestionFull)
      }
    })
  })
})
