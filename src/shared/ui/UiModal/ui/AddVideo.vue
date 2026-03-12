<script setup lang="ts">
import { generateId } from '~/shared/api/generateId'
import {useApiFetch} from "~/shared/api/useApiFetch";

const form = reactive({
  description: '',
  tag: 'base',
  topic: 'Общий',
  id: '',
  img: '',
  link: '',
})

async function submit() {
  form.id = generateId()
  const {data, error, status} = await useApiFetch('/api/kitchen/video', {
    cache: 'no-cache',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: form,
  })
}
</script>

<template>
  <v-sheet
    class="form"
  >
    <v-form validate-on="submit lazy" @submit.prevent="submit">
      <v-textarea
        v-model="form.description"
        label="Описание"
      />
      <v-text-field
        v-model="form.link"
        label="Ссылка на видео"
      />
      <v-text-field
        v-model="form.img"
        label="Ссылка превью"
      />
      <v-btn
        class="mt-2"
        text="Отправить"
        type="submit"
        block
      />
    </v-form>
  </v-sheet>
</template>

<style scoped lang="scss">
.form{
  width: 600px;
  padding: 20px;
  position: relative;
}
</style>
