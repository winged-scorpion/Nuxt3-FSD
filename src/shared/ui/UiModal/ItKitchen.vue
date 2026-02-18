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
  <div class="video">
    <div v-html="link" />
    <div class="description">
      {{ name }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.video{
  position: relative;
  padding: 20px;
  border-radius: 10px;
  background: #fff;
  max-height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
