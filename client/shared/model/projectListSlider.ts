export interface ProjectItem {
  id?: number
  project?: string
  project_description?: string
  stack?: string[]
  work?: string[]
  slider: string[]
  workflow?: string
  link?: string
  darkTime?: boolean
}

export interface ProjectCompanyList {
  name: string
  temp: string
  id: number
  projectList?: ProjectItem[] | null
}
