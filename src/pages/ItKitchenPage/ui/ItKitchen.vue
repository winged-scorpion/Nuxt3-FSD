<script setup lang="ts">
import { ref } from 'vue'
import { BaseH1 } from '../../../widgets/BaseH1'
import { Modal } from '~/shared/ui/BaseModal'
import { VideoTileContainer } from '~/shared/ui/TheVideoTileContainer'
import type { VideoList } from '~/pages/ItKitchenPage/model'
import { getJsonFunction } from '~/shared/api/base/getJson'

const showVideo = reactive({
  taskHead: '',
  video: '',
})
const modalVisible = ref(false)
const itKitchen: VideoList[] = await getJsonFunction('kitchen')
const videoList = itKitchen
function openVideoTest(id: number) {
  const itemVideo: VideoList | undefined = videoList.find(item => item.id === id)
  showVideo.video = itemVideo.link
  showVideo.taskHead = itemVideo.description
  modalVisible.value = true
}
</script>

<template>
  <div class="pageContainer">
    <BaseH1 />
    <VideoTileContainer
      @open-video="openVideoTest"
    />
  </div>
  <Modal
    :task="showVideo"
    type-content="video"
    :visible="modalVisible"
    @closed="modalVisible = false"
  />
</template>

<style scoped lang="scss">
.videoItem {
  border: solid 2px #000;
  margin: 15px 0;
  width: 45%;

  div {
    padding: 5px 10px;

    &:first-of-type {
      border-right: solid 2px #f5f5f5;
    }
  }

  strong {
    margin-right: 5px;
    display: block;
  }
}

.mh {
  min-height: 76px;
}
</style>
