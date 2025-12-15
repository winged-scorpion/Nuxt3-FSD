<script setup lang="ts">
import { BaseH1 } from '~/shared/ui/BaseH1'
import { DraggingSlider } from '~/shared/ui/TheDraggingSlider'
import { useProjectList } from '~/shared/ui/TheDraggingSlider/api/useProjectList'
import { ProjectTiles } from '~/shared/ui/TheProjectTiles'

const projectListStore = useProjectList()
projectListStore.getProjectList()

const projectListArrBase = computed(() => projectListStore.outProduct)
const numGenerate = (max: number) => Math.floor(Math.random() * max)

function updateShowProjectList(item: [number, number]) {
  projectListStore.getProjectList(item)
}
</script>

<template>
  <div class="pageContainer">
    <BaseH1 />
    <DraggingSlider
      @update-project-list="updateShowProjectList"
    />
    <div class="projectList">
      <ProjectTiles
        v-for="item of projectListArrBase"
        :project-arr="item"
        :key="numGenerate(5000)"
      />
    </div>
  </div>
</template>

<style lang="scss">
.projectList {
  & > div {
    &:nth-child(odd) {
      & > div {
        flex-direction: row-reverse;

        .btn-wrap {
          text-align: left;
        }
      }
    }
  }
}
</style>
