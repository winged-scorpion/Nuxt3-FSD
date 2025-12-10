<script setup lang="ts">
import { defineExpose, ref } from 'vue'

const props = defineProps({
  header: {
    type: String,
  },
})

const status = ref(false)

const detailsContent = ref()
const detailsWrap = ref()
const maxHeight = ref()
function open() {
  maxHeight.value = detailsContent.value.clientHeight
  if (status.value === true) {
    status.value = false
    detailsWrap.value.style.height = '65px'
  }
  else {
    status.value = true
    detailsWrap.value.style.height = `${maxHeight.value}px`
  }
}
defineExpose({ detailsContent })
</script>

<template>
  <div class="details">
    <div
      v-if="props.header"
      class="details__head" :class="{ _open: status }" @click="open()"
    >
      {{ props.header }}
    </div>
    <div
      ref="detailsWrap"
      class="details__wrap"
      :class="{ _open: status }"
    >
      <div
        ref="detailsContent"
        class="details__content"
      >
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.details{
  &__head{
    font-weight: bold;
    cursor: pointer;
    &:after{
      content: "\27A4";
      display: inline-block;
      color: #5f9ea0;
      vertical-align: text-top;
      margin: 0 0 0 10px;
      transition: 0.5s;
      transform: scale(1,-1) rotate(90deg);
    }
    &._open{
      &:after{
        transform:scale(1,1) rotate(90deg);
      }
    }
  }
  &__wrap{
    height: 65px;
    position: relative;
    overflow: hidden;
    transition: 0.5s;
    white-space: break-spaces;
    font-size: 14px;
    &:before{
      position: absolute;
      content: '';
      width: 100%;
      height: 100%;
      z-index: 2;
      background: linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%);
      opacity: 1;
      transition: 0.5s;
    }
    &._open{
      &:before{
        opacity: 0;
      }
    }
  }
}
</style>
