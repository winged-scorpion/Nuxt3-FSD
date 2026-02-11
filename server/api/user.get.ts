import { getQuery } from 'h3'
import { db } from '../db/sqlite-service'
import { users } from '../schema/schema'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  try {
    const usersList = db.select().from(users).all()
    if(query.user === 'all'){
      return usersList
    }
    const result = usersList.filter(user =>
      user.login === query.login && user.password === query.password,
    )
    if (result.length !== 0) {
      return {
        user: result[0],
      }
    }
    else {
      return {
        user: null,
        message: 'Пользователь не найден',
      }
    }
  }
  catch (e: any) {
    throw createError({
      statusCode: 400,
      statusMessage: e.message,
    })
  }
})
