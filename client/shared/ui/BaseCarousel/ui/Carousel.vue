<script setup lang="ts">
import type { PropType } from 'vue'
import { IMG_LIST } from '../api/imgConstant'
import type { BaseCarouselInt } from '../model/BaseCarouselInt'
import { TileModalContent } from '~/shared/ui/TheTileModalContent'

const props = defineProps({
  sliderList: {
    type: Object as PropType<string[]>,
    required: false,
  },
  taskList: {
    type: Object as PropType<BaseCarouselInt>,
    required: false,
  },
  sliderImg: {
    type: Boolean,
  },
  update: {
    type: Boolean,
  },
})

function validateBackground(str: string) {
  let link = ''
  IMG_LIST.forEach((item) => {
    if (str.indexOf(item) > 0) {
      link = str
    }
  })
  return link
}
</script>

<template>
  <v-carousel
    v-if="props.sliderList !== undefined"
    controls
    indicators
    :class="{ __noPagination: props.sliderList.length === 1 }"
  >
    <v-carousel-item
      v-for="item of props.sliderList"
      :src="validateBackground(item)"
      class="projectSlider"
    />
  </v-carousel>
  <v-carousel
    v-if="taskList !== undefined"
    height="auto"
    :show-arrows="props.taskList?.taskCode && props.taskList.taskCode.length > 1"
    :class="{ __noPagination: props.taskList?.taskCode?.length === 1 }"
    class="custom-button"
  >
    <v-carousel-item
      v-for="(item, i) of props.taskList?.taskCode"
      :key="i"
      class="projectSlider"
    >
      <TileModalContent
        :code-task="item"
        :code-title="taskList?.taskHead"
      />
    </v-carousel-item>
  </v-carousel>
</template>

<style lang="scss">
.v-btn--active {
  background: rgb(95, 158, 160);
}

.v-carousel-item {
  padding-bottom: 50px;
}

.__noPagination {
  .v-carousel__controls {
    display: none;
  }
}

.custom-button {
  .v-window__left,.v-window__right{
    bottom: 0;
    position: absolute;
    z-index: 2;
  }
  .v-window__left {
    left: 0;
  }

  .v-window__right {
    right: 0;
  }
}
</style>
