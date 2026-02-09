import { defineEventHandler, readBody } from 'h3'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const login: string = 'user'
  const password: string = '111'
  if (body.login === login && body.password === password) {
    return {
      message: 'Данные успешно получены',
      auth: true,
    }
  }
  else {
    return {
      message: 'Данные не совпадают',
      auth: false,
    }
  }
})
