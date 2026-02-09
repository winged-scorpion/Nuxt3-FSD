import { defineEventHandler, readBody } from 'h3'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const login:string = 'user'
  const password:string = '111'
  return {
    message: 'Данные успешно получены',
    received: body,
  }
})
