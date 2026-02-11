export function localStoreSet(name: string, set: any) {
  localStorage.setItem(name, JSON.stringify(set))
}

export async function localStoreGet(name: string) {
  return await JSON.parse(localStorage.getItem(name) || '{}')
}

export function localStoreDelete(localStoreName: string) {
  localStorage.removeItem(localStoreName)
}
