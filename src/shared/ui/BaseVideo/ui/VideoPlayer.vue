<script setup>
const props = defineProps({
  link: {
    type: String,
    required: false,
  },
  name: {
    type: String,
    required: false,
  },
})
</script>

<template>
  <div v-html="link" />
  <div class="description">
    {{ name }}
  </div>
</template>

<style scoped lang="scss">
.customClassName {
  width: 100%;
  height: 400px;
}

.description {
  font-size: 14px;
  padding: 5px 12px;
}
</style>
