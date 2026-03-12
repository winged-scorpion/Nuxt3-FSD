import { getDB } from '../../utils/openBase'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'ID is required',
    })
  }

  try {
    const db = await getDB()

    const result = await db.run(
      'DELETE FROM videos WHERE id = ?',
      [id],
    )

    if (result.changes === 0) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Question not found',
      })
    }

    return {
      success: true,
      message: `Question with ID ${id} deleted successfully`,
    }
  }
  catch (error) {
    console.error('Error deleting question:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to delete question',
    })
  }
})
