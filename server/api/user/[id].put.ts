import { defineEventHandler, readBody } from 'h3'
import { db } from '../../db/sqlite-service'
import type { NewUser } from '~~/server/schema/schema'

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id
  const data = (await readBody(event)) as NewUser
  if (!id)
    return { statusCode: 400, message: 'User id not specified' }
  const { login, email } = data
  if (!login || !email) {
    return { statusCode: 400, message: 'Name and email are required' }
  }
  try {
    const user = await db.get(`SELECT * FROM user WHERE id = ${Number(id)}`)
    if (!user) {
      return { statusCode: 404, message: 'User not found' }
    }
    await db.run(`UPDATE user SET login = '${login}', email = '${email}' WHERE id = ${Number(id)}`)
    return {
      statusCode: 200,
      message: 'User updated successfully',
      user: await db.get(`SELECT * FROM user WHERE id = ${Number(id)}`),
    }
  }
  catch (err) {
    return { statusCode: 500, message: 'Database error', error: err.message }
  }
})
