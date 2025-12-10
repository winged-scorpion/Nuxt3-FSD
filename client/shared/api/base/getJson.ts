export async function getJsonFunction(name: string) {
  const returnJson = {
    default: [],
  }
  let tempArr = null
  switch (name) {
    case 'liveCode':
      tempArr = await import('~/app/assets/json/liveTask.json')
      break
    case 'interview':
      tempArr = await import('~/app/assets/json/questions.json')
      break
    case 'kitchen':
      tempArr = await import('~/app/assets/json/video.json')
      break
    case 'project':
      tempArr = await import('~/app/assets/json/project.json')
  }
  return Object.assign(returnJson, tempArr).default
}
