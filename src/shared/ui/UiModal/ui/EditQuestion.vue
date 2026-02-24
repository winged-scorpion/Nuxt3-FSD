<script setup lang="ts">
const props = defineProps({
  topic: {
    type: String,
    required: true,
  },
  position: {
    type: Number,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
  linkAudio: {
    type: String,
    required: false,
  },
})

const form = reactive({
  question: props.question,
  answer: props.answer,
  linkAudio: props.linkAudio,
})

function submit(){
  console.log('form-----------',form)

}

</script>

<template>
  <v-sheet
    class="form"
  >
    <v-form validate-on="submit lazy" @submit.prevent="submit">
      <v-textarea
        v-model="form.question"
        label="Вопрос"
      />
      <v-textarea
        v-model="form.answer"
        label="Ответ"
      />
      <v-text-field
        v-model="form.linkAudio"
        label="Ссылка на аудио фаил"
      />
      <v-btn
        class="mt-2"
        text="Submit"
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
