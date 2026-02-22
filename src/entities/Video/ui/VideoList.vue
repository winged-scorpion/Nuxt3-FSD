<script setup lang="ts">
import { UploadIcon } from '~/shared/ui/Icon'
</script>

<template>
  <div class="tabs-head">
    <strong>Видео с It кухни</strong>
    <button
      class="svg-icon rotate180"
    >
      <UploadIcon />
    </button>
  </div>
  <hr class="mb-5">
</template>

<style scoped lang="scss">
.tabs-head{
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}
</style>
