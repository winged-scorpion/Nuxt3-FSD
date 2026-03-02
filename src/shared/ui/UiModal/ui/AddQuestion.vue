<script setup lang="ts">
import { AddRoundIcon } from '~/shared/ui/Icon'
import { useApiFetch } from '~/shared/api/useApiFetch'

const form = reactive({
  question: '',
  answer: '',
  audio: '',
  tag: '',
  id: '',
  show: 0,
})
const newTagShow = ref(false)
const tagList = ['html', 'javascript', 'typescript']

function generateRandomId(): string {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const randomLetter = letters.charAt(Math.floor(Math.random() * letters.length))
  const randomNumber = Math.floor(Math.random() * 100000)
  return `${randomLetter}${randomNumber}`
}

async function submit() {
  form.id = generateRandomId()
  const { data, error, status } = await useApiFetch('/api/question/question', {
    cache: 'no-cache',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: form,
  })

  if (status === 200) {
    return true
  }
  return false
}
function newTag() {
  newTagShow.value = !newTagShow.value
  tagList.push()
}
</script>

<template>
  <v-sheet
    class="form"
  >
    <v-form validate-on="submit lazy" @submit.prevent="submit">
      <div class="flex">
        <v-text-field
          v-if="newTagShow"
          v-model="form.tag"
          label="Новая тема"
        />
        <v-select
          v-else
          v-model="form.tag"
          label="Тема"
          :items="tagList"
        />
        <div>
          <button
            class="svg-icon mt-3"
            @click.prevent="newTag"
          >
            <AddRoundIcon />
          </button>
        </div>
      </div>
      <v-textarea
        v-model="form.question"
        required
        label="Вопрос"
      />
      <v-textarea
        v-model="form.answer"
        required
        label="Ответ"
      />
      <v-text-field
        v-model="form.audio"
        required
        label="Ссылка на аудио фаил"
      />
      <div>
        <v-radio-group v-model.number="form.show" required>
          <v-radio label="Скрыть" :value="0" />
          <v-radio label="Показать" :value="1" />
        </v-radio-group>
      </div>
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
