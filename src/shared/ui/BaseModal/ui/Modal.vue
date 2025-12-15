<script setup lang="ts">
import type { PropType } from 'vue'
import type { ModalContentLiveCode } from '../model/modal'
import { Carousel } from '~/shared/ui/BaseCarousel'

const props = defineProps({
  task: {
    type: Object as PropType<ModalContentLiveCode>,
    required: true,
  },
  typeContent: {
    type: String,
    required: true,
  },
  visible: {
    type: Boolean,
    required: true,
  },
})
</script>

<template>
  <div
    v-if="visible"
    class="modal"
  >
    <div
      class="modal__body"
      :class="{ 'liveCode-modal': typeContent === 'livecode'}"
    >
      <div v-if="typeContent === 'livecode'">
        <Carousel
          :show-arrows="false"
          height="auto"
          :task-list="task"
          :update="visible"
        />
      </div>
      <div v-if="typeContent === 'video'">
        <VideoPlayer
          :link="task.video"
          :name="task.taskHead"
        />
      </div>
      <v-btn
        text="&#x2716;"
        density="compact"
        @click="$emit('closed')"
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
