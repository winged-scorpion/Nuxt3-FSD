import sqlite3 from 'sqlite3'

const dbPath = process.env.DB_PATH || './server/db/database.sqlite';

export const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Ошибка подключения к базе данных:', err);
  } else {
    console.log('Подключено к SQLite базе данных');
    initializeDatabase();
  }
});

function initializeDatabase() {
  db.run(`
    CREATE TABLE IF NOT EXISTS questions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      question TEXT NOT NULL,
      answer TEXT NOT NULL,
      audio TEXT NOT NULL,
      show BOOLEAN NOT NULL DEFAULT 1,
      tag TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `, (err) => {
    if (err) {
      console.error('Ошибка создания таблицы:', err);
    } else {
      console.log('Таблица questions создана или уже существует');
    }
  });
}

