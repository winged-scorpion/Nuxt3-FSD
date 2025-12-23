<script setup lang="ts">
import { ref } from 'vue'
import { BaseH1 } from '../../../widgets/BaseH1'
import { Modal } from '~/shared/ui/BaseModal'
import { VideoTileContainer } from '~/shared/ui/TheVideoTileContainer'

const showVideo = reactive({
  taskHead: '',
  video: '',
})
const modalVisible = ref(false)
</script>

<template>
  <div class="pageContainer">
    <BaseH1 />
    <VideoTileContainer />
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
