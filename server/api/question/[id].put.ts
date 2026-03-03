import { getDB } from '../../utils/openBase'

// Интерфейс для данных запроса
interface UpdateQuestionData {
  question?: string
  answer?: string
  audio?: string
  show?: boolean
  tag?: string
}

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'ID is required',
    })
  }

  // Получаем данные из тела запроса
  const body = await readBody<UpdateQuestionData>(event)

  if (!body) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Request body is required',
    })
  }

  try {
    const db = await getDB()

    // Формируем запрос и параметры динамически
    const setFields: string[] = []
    const params: any[] = []

    if (body.question !== undefined) {
      setFields.push('question = ?')
      params.push(body.question)
    }
    if (body.answer !== undefined) {
      setFields.push('answer = ?')
      params.push(body.answer)
    }
    if (body.audio !== undefined) {
      setFields.push('audio = ?')
      params.push(body.audio)
    }
    if (body.show !== undefined) {
      setFields.push('show = ?')
      params.push(body.show)
    }
    if (body.tag !== undefined) {
      setFields.push('tag = ?')
      params.push(body.tag)
    }

    if (setFields.length === 0) {
      throw createError({
        statusCode: 400,
        statusMessage: 'No fields to update',
      })
    }

    params.push(id) // добавляем ID в конец параметров

    const result = await db.run(
      `UPDATE questions SET ${setFields.join(', ')} WHERE id = ?`,
      params,
    )

    if (result.changes === 0) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Question not found',
      })
    }

    return {
      success: true,
      message: `Question with ID ${id} updated successfully`,
    }
  }
  catch (error) {
    console.error('Error updating question:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to update question',
    })
  }
})
