<script setup lang="ts">
import { Carousel } from '~/shared/ui/BaseCarousel'
import { VideoPlayer } from '~/shared/ui/BaseVideo'
import { useModal } from '~/shared/scope/useModal'

const modalStore = useModal()
const typeContent = ref('')
const visible = ref(false)

watch(() => modalStore.setVideo, () => {
  if (modalStore.setVideo) {
    visible.value = true
    typeContent.value = 'video'
  }
  else {
    visible.value = false
    typeContent.value = ''
  }
}, { deep: true })

watch(() => modalStore.setLiveCode, () => {
  if (modalStore.setLiveCode) {
    visible.value = true
    typeContent.value = 'livecode'
  }
  else {
    visible.value = false
    typeContent.value = ''
  }
}, { deep: true })

function closed() {
  modalStore.setVideo = null
  modalStore.setLiveCode = null
}
</script>

<template>
  <div
    v-if="visible"
    class="modal"
  >
    <div
      class="modal__body"
      :class="{ 'liveCode-modal': typeContent === 'livecode' }"
    >
      <div v-if="typeContent === 'livecode'">
        <Carousel
          :show-arrows="false"
          height="auto"
          :task-list="modalStore.outLiveCode"
          :update="visible"
        />
      </div>
      <div v-if="typeContent === 'video'">
        <VideoPlayer
          :link="modalStore.outVideoModal?.link"
          :name="modalStore.outVideoModal?.description"
        />
      </div>
      <v-btn
        text="&#x2716;"
        density="compact"
        @click="closed"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.modal {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: #00000033;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;

  &__body {
    position: relative;
    width: 560px;
    background: #fff;
    max-height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
  }

  button {
    width: 50px;
    height: 50px;
    position: absolute;
    right: 0;
    top: 0;

  }
}
.liveCode-modal{
  max-width: 50%;
}

.show {
  display: flex;
}

.x-video {
  background: red;
  width: 500px;
  height: 500px;

}
</style>
