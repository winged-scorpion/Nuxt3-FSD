import { resolve } from 'node:path'
import Database from 'better-sqlite3'

export default defineEventHandler(async (event) => {
  const dbPath = resolve(process.cwd(), './server/db/database.sqlite')
  const db = new Database(dbPath)

  try {
    db.prepare('DELETE FROM questions').run()
    // либо для сброса счётчика автоинкремента:
    // db.prepare('DELETE FROM questions').run()
    // db.prepare('VACUUM').run()
    return { success: true, message: 'Таблица questions очищена' }
  } catch (error) {
    return { success: false, message: String(error) }
  } finally {
    db.close()
  }
})
