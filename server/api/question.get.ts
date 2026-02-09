export default defineEventHandler(async () => {
  async function getQuestions() {
    const temporaryJson = await import('~~/server/json/questions.json')
    return temporaryJson.default
  }

  return {
    questions: await getQuestions(),
  }
})
