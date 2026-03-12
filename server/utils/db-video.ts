import sqlite3 from 'sqlite3'

const dbPath = process.env.DB_PATH || './server/db/database.sqlite'

export const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Ошибка подключения к базе данных:', err)
  }
  else {
    console.log('Подключено к SQLite базе данных')
    initializeDatabase()
  }
})
function initializeDatabase() {
  db.run(`
      CREATE TABLE IF NOT EXISTS videos (
       id TEXT PRIMARY KEY,
       description TEXT,
       tag TEXT,
       topic TEXT,
       img TEXT,
       link TEXT
      )
  `, (err) => {
    if (err) {
      console.error('Ошибка создания таблицы:', err)
    }
    else {
      console.log('Таблица questions создана или уже существует')
    }
  })
}
