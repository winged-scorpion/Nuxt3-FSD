import path from 'node:path'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import { users } from '../schema/schema'

// Путь к вашей базе данных
const sqlite = path.resolve(process.cwd(), './server/db/database.sqlite')

// Инициализация Drizzle ORM
export const db = drizzle(sqlite)

// Экспортируем таблицу для использования в API
export { users }
