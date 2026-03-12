<script setup lang="ts">
import { AddRoundIcon } from '~/shared/ui/Icon'
import { useApiFetch } from '~/shared/api/useApiFetch'
import { useInterviews } from '~/entities/Interviews/store/useInterviews'
import { generateId } from '~/shared/api/generateId'

const props = defineProps({
  api: {
    type: String,
    required: true,
  },
  topic: {
    type: String,
    required: false,
  },
  position: {
    type: String,
    required: false,
  },
  question: {
    type: String,
    required: false,
  },
  answer: {
    type: String,
    required: false,
  },
  linkAudio: {
    type: String,
    required: false,
  },
  show: {
    type: Number,
    required: false,
  },
  time: {
    type: Number,
    required: false,
  },
})

const interviews = useInterviews()

const form = reactive({
  question: props.question,
  answer: props.answer,
  audio: props.linkAudio,
  tag: props.topic,
  topic: props.topic,
  id: props.position,
  timeq: props.time,
  show: props.show,
})
const newTagShow = ref(false)
const tagList: string[] = interviews.outTagList

async function submit() {
  form.id = generateId()
  if (props.api === 'add') {
    const { data, error, status } = await useApiFetch('/api/question/question', {
      cache: 'no-cache',
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: form,
    })
  }
  else {
    const { data, error, status } = await useApiFetch(`/api/question/${props.position}`, {
      cache: 'no-cache',
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
      },
      body: form,
    })
  }
}
function newTag() {
  newTagShow.value = !newTagShow.value
  tagList.push()
}

onMounted(() => {

})
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
          label="Новый тег"
        />
        <v-select
          v-else
          v-model="form.tag"
          label="Тег"
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
      <v-text-field
        v-model="form.topic"
        required
        label="Тема"
      />
      <v-number-input
        v-model.number="form.timeq"
        required
        label="Базовое время на вопрос"
      />
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
