<script setup lang="ts">
import { BaseH1 } from '~/widgets/BaseH1'
import { DraggingSlider } from '~/shared/ui/TheDraggingSlider'
import { ProjectTiles } from '~/shared/ui/TheProjectTiles'
import { useProjectList } from '~/shared/store/useProjectList'

const projectListStore = useProjectList()

onMounted(async () => {
  await projectListStore.getProject()
})
</script>

<template>
  <div class="pageContainer">
    <BaseH1 />
    <DraggingSlider />
    <ProjectTiles />
  </div>
</template>
