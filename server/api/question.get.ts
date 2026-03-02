import { db } from '../utils/database'
import type { QuestionItem } from '../types/question'

export default defineEventHandler(async () => {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM questions ORDER BY created_at DESC', (err, rows) => {
      if (err) {
        reject(createError({
          statusCode: 500,
          statusMessage: err.message,
        }))
      }
      else {
        const result: {
          id: number
          tag: string
          name: string
          show: boolean
          ilIndex: number
          list: QuestionItem[]
          created_at: string
          updated_at: string
        }[] = rows.map(row => ({
          id: row.id,
          tag: row.tag,
          name: row.name,
          show: Boolean(row.show),
          ilIndex: row.ilIndex,
          list: JSON.parse(row.list),
          created_at: row.created_at,
          updated_at: row.updated_at,
        }))
        resolve(result)
      }
    })
  })
})
