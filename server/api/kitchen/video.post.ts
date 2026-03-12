import { db } from '../../utils/db-video'
import type { Video } from '../../schema/video'

export default defineEventHandler(async (event) => {
  try {
    // Читаем тело запроса
    const body: Video = await readBody(event)

    // Подготавливаем запрос для вставки
    const stmt = db.prepare(`
      INSERT INTO videos (id, description, tag, topic, img, link)
      VALUES (?, ?, ?, ?, ?, ?)
    `)
    stmt.run(
      body.id,
      body.description,
      body.tag,
      body.topic,
      body.img,
      body.link,

      (err: any) => {
        if (err) {
          throw createError({
            statusCode: 500,
            message: `Ошибка сохранения: ${err.message}`,
          })
        }
      },
    )
    stmt.finalize()
    return {
      success: true,
      message: `Успешно добавлено ${body} элементов`,
    }
  }
  catch (error: any) {
    console.error('Ошибка при добавлении данных:', error)
    return {
      success: false,
      error: error.message || 'Не удалось добавить данные',
    }
  }
})
