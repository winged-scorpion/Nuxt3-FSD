import { db } from '../utils/database'
import type { TagItem } from '../types/question'

export default defineEventHandler(async (event) => {

  try {
    const body = await readBody<TagItem[]>(event)

    // Валидация
    if (!Array.isArray(body)) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Данные должны быть массивом',
      })
    }

    const stmt = db.prepare(`
      INSERT INTO questions (tag, name, show, ilIndex, list)
      VALUES (?, ?, ?, ?, ?)
    `)

    body.forEach((item) => {
      stmt.run(
        item.tag,
        item.name,
        item.show ? 1 : 0,
        item.ilIndex,
        JSON.stringify(item.list),
        (err: any) => {
          if (err) {
            throw createError({
              statusCode: 500,
              statusMessage: `Ошибка сохранения: ${err.message}`,
            })
          }
        },
      )
    })

    stmt.finalize()

    return {
      success: true,
      message: 'Данные успешно сохранены test',
      count: body.length,
    }
  }
  catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: error instanceof Error ? error.message : 'Неизвестная ошибка',
    })
  }
})
