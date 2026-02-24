<script setup lang="ts">
const props = defineProps({
  topic: {
    type: String,
    required: true,
  },
  topicHead: {
    type: String,
    required: true,
  },
})
const topicHead = ref(props.topicHead)
function submit() {

}
</script>

<template>
  <v-sheet
    class="form"
  >
    <v-form validate-on="submit lazy" @submit.prevent="submit">
      <v-text-field
        v-model="topicHead"
        label="Тема"
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
