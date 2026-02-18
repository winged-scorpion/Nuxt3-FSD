import { defineEventHandler, readBody } from 'h3'
import { db, users } from '../db/sqlite-service'
import type { NewUser } from '../schema/schema'

export default defineEventHandler(async (event) => {
  try {
    const body = (await readBody(event)) as NewUser
    if (!body.login || !body.password) {
      return {
        error: 'Name and email are required',
        status: 400,
      }
    }

    const result = db
      .insert(users)
      .values({
        login: body.login,
        email: body.email,
        password: body.password,
      })
      .run()
    return {
      success: true,
      message: 'Пользователь зарегестрирован',
      user: {
        id: result.lastInsertRowid,
        login: body.login,
        email: body.email,
        password: body.password,
      },
    }
  }
  catch (error) {
    return {
      error: 'Failed to create user',
      details: error instanceof Error ? error.message : String(error),
      status: 500,
    }
  }
})
