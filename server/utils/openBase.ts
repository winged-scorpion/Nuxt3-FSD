import sqlite3 from 'sqlite3'
import type { Database } from 'sqlite'
import { open } from 'sqlite'

let db: Database | null = null

export async function getDB(): Promise<Database> {
  if (!db) {
    db = await open({
      filename: './server/db/database.sqlite', // путь к файлу БД
      driver: sqlite3.Database,
    })
  }
  return db
}
