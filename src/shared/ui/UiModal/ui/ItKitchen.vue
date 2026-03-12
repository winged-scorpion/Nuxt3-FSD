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
    <iframe
      width="560"
      height="315"
      :src="link"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerpolicy="strict-origin-when-cross-origin"
      allowfullscreen
    />
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
  width:min-content;
}
</style>
