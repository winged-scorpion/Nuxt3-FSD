<script setup lang="ts">
import { BaseH1 } from '~/widgets/BaseH1'
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
    <ProjectTiles
      v-for="item of projectListArrBase"
      :project-arr="item"
      :key="numGenerate(5000)"
    />
  </div>
</template>
