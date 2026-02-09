import { defineStore } from 'pinia'
import type { ProjectCompanyList } from '~/shared/model/projectListSlider'
import { useApiFetch } from '~/shared/api/useApiFetch'

export interface ProjectListState {
  setProjectList: null | ProjectCompanyList[]
  setProjectOut: null | ProjectCompanyList[]
}

export const useProjectList = defineStore('projectList', {
  state: (): ProjectListState => <ProjectListState>({
    setProjectList: null,
    setProjectOut: null,
  }),
  getters: {
    outProduct: (state) => {
      return state.setProjectOut
    },
    outProject: (state) => {
      return state.setProjectOut
    },
  },
  actions: {
    async getProject() {
      if (this.setProjectList)
        return false
      const { data, error, status } = await useApiFetch('/api/project', {
        cache: 'no-cache',
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (status === 200) {
        this.setProjectList = data.project
        return true
      }
      return false
    },
    async filterProjectList(slice?: [number, number]) {
      if (!this.setProjectList)
        return false
      if (slice) {
        this.setProjectOut = this.setProjectList.slice(slice[0], slice[1] + 1).flat()
      }
      else {
        this.setProjectOut = this.setProjectList
      }
    },
  },
})
