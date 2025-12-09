// import { NavArrModel } from '~/shared/model/NavigationArrModel'
export function h1Search(url: string, arrLink: any) {
  for (const key of arrLink) {
    if (key.page === url) {
      return key.h1
    }
  }
}
