export default defineEventHandler(async () => {
  async function getLiveTask() {
    const temporaryJson = await import('~~/server/json/liveTask.json')
    return temporaryJson.default
  }

  return {
    liveTask: await getLiveTask(),
  }
})
