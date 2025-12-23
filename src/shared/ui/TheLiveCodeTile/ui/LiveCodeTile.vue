<script setup lang="ts">
import type { PropType } from 'vue'

const props = defineProps({
  tileText: {
    type: String,
    required: true,
  },
  styleBackground: {
    type: Array as PropType<string[]>,
    required: true,
  },
})
</script>

<template>
  <div
    :style="{ color: props.styleBackground[1], background: props.styleBackground[0] }"
    class="tile pa-2"
  >
    <strong>{{ props.tileText }}</strong>
  </div>
</template>

<style lang="scss" scoped>
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
</style>
