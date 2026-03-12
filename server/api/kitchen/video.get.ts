import { db } from '../../utils/db-video'
import type { Video } from '../../schema/video'

export default defineEventHandler(async () => {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM videos', (err, rows: Video[]) => {
      if (err) {
        reject(createError({
          statusCode: 500,
          statusMessage: err.message,
        }))
      }
      else {
        resolve(rows)
      }
    })
  })
})
