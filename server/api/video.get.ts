export default defineEventHandler(async () => {
  async function getVideo() {
    const temporaryJson = await import('~~/server/json/video.json')
    return temporaryJson.default
  }

  return {
    video: await getVideo(),
  }
})
