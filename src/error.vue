<script setup lang="ts">
defineProps(['error'])
</script>

<template>
  <div class="block-center">
    <v-card class="pa-3">
      <h1>{{ error.statusCode }}</h1>
      <h2>Упс что то пошло не так</h2>
      <h3>Мы работаем над проблемой</h3>
      <img  src="./shared/assets/images/error.jpg" alt="error">
      <div>
        <v-btn href="/">
          Вернутся на главную
        </v-btn>
      </div>
    </v-card>
  </div>
</template>

<style scoped lang="scss">
.block-center{
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
}
</style>
