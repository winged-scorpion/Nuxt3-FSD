import { db } from '../../utils/db'
import type { Question } from '../../schema/question'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody<Question>(event)

    const stmt = db.prepare(`
      INSERT INTO questions (question, answer, audio, show, tag, id)
      VALUES (?, ?, ?, ?, ?, ?)
    `)

    stmt.run(
      body.question,
      body.answer,
      body.audio,
      body.show ? 1 : 0,
      body.tag,
      body.id,
      (err: any) => {
        if (err) {
          throw createError({
            statusCode: 500,
            statusMessage: `Ошибка сохранения: ${err.message}`,
          })
        }
      },
    )

    stmt.finalize()

    return {
      success: true,
      message: 'Вопросы успешно сохранены',
    }
  }
  catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: error instanceof Error ? error.message : 'Неизвестная ошибка',
    })
  }
})
