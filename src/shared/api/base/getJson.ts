export async function getJsonFunction(name: string) {
  const returnJson = {
    default: [],
  }
  let tempArr = null
  switch (name) {
    case 'liveCode':
      tempArr = await import('../../assets/json/liveTask.json')
      break
    case 'interview':
      tempArr = await import('../../assets/json/questions.json')
      break
    case 'kitchen':
      tempArr = await import('../../assets/json/video.json')
      break
    case 'project':
      tempArr = await import('../../assets/json/project.json')
  }
  return Object.assign(returnJson, tempArr).default
}
