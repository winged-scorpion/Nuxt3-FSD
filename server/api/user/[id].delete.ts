import { defineEventHandler } from 'h3'
import { db } from '../../db/sqlite-service'

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id
  if (!id || !/^\d+$/.test(id)) {
    return {
      error: 'Некорректный ID пользователя',
    }
  }
  try {
    if (!id) {
      event.node.res.statusCode = 400
      return { error: 'id is required' }
    }
    // костыльный вариант со временем убрать передачу параметра id = ${Number(id)} из прямого запроса в базу
    const result = db.run(`DELETE FROM user WHERE id = ${Number(id)}`)
    if (result.changes === 0) {
      return {
        error: 'Пользователь не найден',
      }
    }
    return {
      success: true,
      message: `Пользователь с ID ${id} удалён`,
    }
  }
  catch (err) {
    console.error('Ошибка при удалении из БД:', err)
    return {
      error: `Ошибка сервера при удалении пользователя 111`,
      id,
    }
  }
})
