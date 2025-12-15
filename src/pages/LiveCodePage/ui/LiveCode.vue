<script setup lang="ts">
import MasonryWall from '@yeger/vue-masonry-wall'
import { ref } from 'vue'
import { randomBackground } from '~/shared/ui/TheLiveCodeTile/api/randomBackground'
import { getJsonFunction } from '~/shared/api/base/getJson'
import { LiveCodeTile } from '~/shared/ui/TheLiveCodeTile'
import { BaseH1 } from '~/shared/ui/BaseH1'
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
          class="tile pa-2"
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

<style lang="scss">
.tile {
  cursor: pointer;

  &:hover {
    strong {
      color: #fff;
    }
  }

  strong {
    transition: 0.1s;
  }
}

.card-title {
  display: block;
  flex: none;
  font-size: 1.25rem;
  font-weight: 500;
  -webkit-hyphens: auto;
  hyphens: auto;
  letter-spacing: 0.0125em;
  min-width: 0;
  padding: 0.5rem 1rem;
  text-transform: none;
}

pre {
  font-size: 14px;
  color: black;
  font-weight: 900;
}
</style>
