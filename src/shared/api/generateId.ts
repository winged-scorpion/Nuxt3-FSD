export function generateId(): string {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const randomLetter = letters.charAt(Math.floor(Math.random() * letters.length))
  const randomNumber = Math.floor(Math.random() * 100000)
  return `${randomLetter}${randomNumber}`
}
