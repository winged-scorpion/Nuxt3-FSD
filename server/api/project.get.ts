export default defineEventHandler(async () => {
  async function getProject() {
    const temporaryJson = await import('~~/server/json/project.json')
    return temporaryJson.default
  }

  return {
    project: await getProject(),
  }
})
