<script setup lang="ts">
const props = defineProps({
  taskHead: {
    type: String,
    required: false,
  },
  taskCode: {
    type: [String],
    required: true,
  },
})
</script>

<template>
  <div class="liveCode">
    <v-card>
      <h3
        class="card-title mr-16"
      >
        {{ props.taskHead }}
      </h3>
      <v-card-text>
        <pre><code>{{ props.taskCode[0] }}</code></pre>
      </v-card-text>
    </v-card>
  </div>
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
