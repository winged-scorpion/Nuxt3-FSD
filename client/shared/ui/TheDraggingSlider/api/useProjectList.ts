import { defineStore } from 'pinia'
import type { ProjectCompanyList } from '~/shared/model/projectListSlider'
import { getJsonFunction } from '~/shared/api/base/getJson'

export interface ProjectListState {
  setProjectList: null | ProjectCompanyList[]
}

export const useProjectList = defineStore('projectList', {
  state: (): ProjectListState => <ProjectListState>({
    setProjectList: null,
  }),
  getters: {
    outProduct: (state) => {
      return state.setProjectList
    },
  },
  actions: {
    async getProjectList(slice?: [number, number]) {
      await getJsonFunction('project').then((value: ProjectCompanyList[]) => {
        if (value) {
          if (slice) {
            this.setProjectList = value.slice(slice[0], slice[1] + 1).flat()
          }
          else {
            this.setProjectList = value
          }
        }
      })
    },
  },
})
