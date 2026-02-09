<script setup lang="ts">
import MasonryWall from '@yeger/vue-masonry-wall'
import { computed } from 'vue'
import { randomBackground } from '~/shared/ui/TheLiveCodeTile/api/randomBackground'
import { LiveCodeTile } from '~/shared/ui/TheLiveCodeTile'
import { useModal } from '~/shared/store/useModal'
import { useLiveCode } from '~/shared/ui/TheMasonyWall/store/useLiveCode'

const liveCode = useLiveCode()
const modalStore = useModal()

await liveCode.getLiveCode()

function openDialog(code: [string, string[]]) {
  modalStore.initLiveCodeModal({ taskCode: code[1], taskHead: code[0] })
}
const taskList:[[string, string[]]] = computed(() => {
  if (liveCode.outLiveCode)
    return liveCode.outLiveCode
})
</script>

<template>
  <MasonryWall
    v-if="taskList"
    :items="taskList"
    :ssr-columns="1"
    :column-width="300"
    :gap="16"
  >
    <template #default="{ item, index }">
      <LiveCodeTile
        :key="index"
        :tile-text="String(item[0])"
        :style-background="randomBackground()"
        @click="openDialog(item)"
      />
    </template>
  </MasonryWall>
</template>

<style scoped lang="scss">

</style>
