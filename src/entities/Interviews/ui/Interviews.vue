<script setup lang="ts">
import { UploadIcon } from '~/shared/ui/Icon'
import { useInterviews } from '~/entities/Interviews/store/useInterviews'

const interviews = useInterviews()

onMounted(() => {
  interviews.getInterview()
  console.log('------------111-',interviews.setInterviews)
})
</script>

<template>
  <div class="tabs-head">
    <strong>Вопросы-ответы</strong>
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
