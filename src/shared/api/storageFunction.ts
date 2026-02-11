export function localStoreSet(name: string, set: any) {
  console.log('name, JSON.stringify(set)',name, JSON.stringify(set))
  localStorage.setItem(name, JSON.stringify(set))
}

export async function localStoreGet(name: string) {
  return await JSON.parse(localStorage.getItem(name) || '{}')
}

export function localStoreDelete(localStoreName: string) {
  localStorage.removeItem(localStoreName)
}
