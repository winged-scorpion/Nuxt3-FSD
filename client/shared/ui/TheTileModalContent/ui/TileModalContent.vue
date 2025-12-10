<script setup lang="ts">
const props = defineProps({
  codeTitle: {
    type: String,
    required: false,
  },
  codeTask: {
    type: String,
    required: false,
  },
})
</script>

<template>
  <v-card>
    <h3
      class="card-title mr-16"
    >
      {{ props.codeTitle }}
    </h3>
    <v-card-text>
      <pre>{{ props.codeTask }}</pre>
    </v-card-text>
  </v-card>
</template>
