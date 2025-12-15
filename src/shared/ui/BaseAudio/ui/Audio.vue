<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  audioLink: {
    type: String,
  },
})
// @/assets/audio
const audioSrc = computed(() => {
  const path = new URL('~/app/assets/audio', import.meta.url)
  return `${path}${props.audioLink}`
})
</script>

<template>
  <audio autoplay>
    <source
      :src="audioSrc"
    >
  </audio>
</template>
