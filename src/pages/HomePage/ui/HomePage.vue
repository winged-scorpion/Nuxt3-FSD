<script setup lang="ts">
import { BaseH1 } from '../../../shared/ui/BaseH1'
import { DraggingSlider } from '../../../features/DraggingSliderProject'
import { ProjectTiles } from '~/shared/ui/TheProjectTiles'
</script>

<template>
  <div class="pageContainer">
    <BaseH1 />
    <DraggingSlider />
    <ProjectTiles />
  </div>
</template>
