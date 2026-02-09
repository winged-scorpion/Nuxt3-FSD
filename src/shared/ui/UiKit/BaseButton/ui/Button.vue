<script setup lang="ts">
const props = defineProps({
  status: {
    type: Boolean,
  },
})
</script>

<template>
  <v-btn>
    <slot />
  </v-btn>
</template>

<style scoped lang="scss">
button{
  border: solid 1px #000;
}
</style>
