
import { getDB } from '../utils/openBase'


export default defineEventHandler(async () => {
  const db = await getDB()
  try {
    // Выполняем SQL команду для удаления таблицы
    db.exec('DROP TABLE IF EXISTS questions')
    return { success: true, message: 'Таблица question удалена'}
  } catch (error) {
    return {success: false, message: error.message}
  } finally {
    db.close()
  }
})
