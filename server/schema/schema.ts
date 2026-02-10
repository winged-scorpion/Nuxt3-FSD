import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const users = sqliteTable('user', {
  id: integer('id').primaryKey(),
  login: text('login').notNull(),
  email: text('email').notNull(),
  password: text('password').notNull(),
})

export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert
