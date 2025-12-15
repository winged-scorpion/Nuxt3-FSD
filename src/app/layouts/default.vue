<script setup lang="ts">
import { HeaderComponent } from '~/widgets/TheHeader'
import { FooterComponent } from '~/widgets/TheFooter'
import { Preloader } from '~/shared/ui/ThePreloader'

const pageLoader = ref(true)

onMounted(() => {
  pageLoader.value = false
})
</script>

<template>
  <v-app>
    <v-main>
      <Preloader v-if="pageLoader" />
      dfgdg
      <HeaderComponent />
      <slot />
      <FooterComponent />
    </v-main>
  </v-app>
</template>
