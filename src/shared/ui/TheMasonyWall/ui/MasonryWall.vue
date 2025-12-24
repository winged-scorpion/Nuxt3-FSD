<script setup lang="ts">
import MasonryWall from '@yeger/vue-masonry-wall'
import { randomBackground } from '~/shared/ui/TheLiveCodeTile/api/randomBackground'
import { LiveCodeTile } from '~/shared/ui/TheLiveCodeTile'
import { getJsonFunction } from '~/shared/api/base/getJson'
import { useModal } from '~/shared/store/useModal'

const taskList = await getJsonFunction('liveCode')
const modalStore = useModal()
function openDialog(code: [string, string[]]) {
  modalStore.initLiveCodeModal({ taskCode: code[1], taskHead: code[0] })
}
</script>

<template>
  <MasonryWall :items="taskList" :ssr-columns="1" :column-width="300" :gap="16">
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
