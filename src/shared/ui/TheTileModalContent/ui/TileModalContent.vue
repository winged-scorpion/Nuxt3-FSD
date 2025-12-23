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

<style lang="scss">
.card-title {
  display: block;
  flex: none;
  font-size: 1.25rem;
  font-weight: 500;
  -webkit-hyphens: auto;
  hyphens: auto;
  letter-spacing: 0.0125em;
  min-width: 0;
  padding: 0.5rem 1rem;
  text-transform: none;
}

pre {
  font-size: 14px;
  color: black;
  font-weight: 900;
}
</style>
