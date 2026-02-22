<script setup lang="ts">
const props = defineProps({
  videoId: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
})

const form = reactive({
  description: props.description,
  link: props.link,
  img: props.img,
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
        v-model="form.description"
        label="Описание"
      />
      <v-textarea
        v-model="form.link"
        label="Ссылка на видео"
      />
      <v-text-field
        v-model="form.img"
        label="Ссылка превью"
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
