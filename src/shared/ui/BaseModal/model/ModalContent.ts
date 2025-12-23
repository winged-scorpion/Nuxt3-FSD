export interface ModalLiveCodeContent {
  taskCode: string[]
  taskHead: string
}
export interface ModalContentVideo {
  id: number
  description: string
  link: string
  img: string
}
export interface ModalInit {
  liveCode: null | ModalLiveCodeContent
  video: null | ModalContentVideo
}
