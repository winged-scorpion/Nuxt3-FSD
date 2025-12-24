<script setup lang="ts">
import { HeaderComponent } from '../../../widgets/TheHeader'
import { FooterComponent } from '~/widgets/TheFooter'
import { Preloader } from '~/shared/ui/ThePreloader'
import { Modal } from '../../../widgets/BaseModal'

const pageLoader = ref(true)

onMounted(() => {
  pageLoader.value = false
})
</script>

<template>
  <v-app>
    <v-main>
      <Preloader v-if="pageLoader" />
      <HeaderComponent />
      <div class="pageContainer">
        <slot />
      </div>
      <FooterComponent />
      <Modal />
    </v-main>
  </v-app>
</template>
