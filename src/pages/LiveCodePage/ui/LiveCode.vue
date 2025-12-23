<script setup lang="ts">
import MasonryWall from '@yeger/vue-masonry-wall'
import { ref } from 'vue'
import { BaseH1 } from '~/widgets/BaseH1'
import { randomBackground } from '~/shared/ui/TheLiveCodeTile/api/randomBackground'
import { getJsonFunction } from '~/shared/api/base/getJson'
import { LiveCodeTile } from '~/shared/ui/TheLiveCodeTile'
import { Modal } from '~/shared/ui/BaseModal'

const modalVisible = ref(false)
const taskList = await getJsonFunction('liveCode')
const taskListArr = reactive({
  taskCode: [] as string[],
  taskHead: '',
})

function openDialog(taskId: number) {
  taskListArr.taskCode = taskList[taskId][1]
  taskListArr.taskHead = String(taskList[taskId][0])
  modalVisible.value = true
}
</script>

<template>
  <div class="pageContainer">
    <BaseH1 />
    <MasonryWall :items="taskList" :ssr-columns="1" :column-width="300" :gap="16">
      <template #default="{ item, index }">
        <LiveCodeTile
          :key="index"
          :tile-text="String(item[0])"
          :style-background="randomBackground()"
          @click="openDialog(index)"
        />
      </template>
    </MasonryWall>
  </div>
  <Modal
    :task="taskListArr"
    type-content="livecode"
    :visible="modalVisible"
    @closed="modalVisible = false"
  />
</template>
