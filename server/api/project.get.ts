export default defineEventHandler(async () => {
  async function project() {
    const temporaryJson = await import('~~/server/json/project.json')
    return temporaryJson.default
  }

  return {
    project: await project(),
  }
})
