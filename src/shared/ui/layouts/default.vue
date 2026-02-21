<script setup lang="ts">
import { HeaderComponent } from '../../../widgets/Header'
import { FooterComponent } from '../../../widgets/Footer'
import { Preloader } from '~/shared/ui/ThePreloader'
import { localStoreGet } from '~/shared/api/storageFunction'
import { useAuth } from '~/features/AuthUser/store/useAuth'
import type { userData } from '~/features/AuthUser/model/user'
import { ModalT } from '../../../widgets/Modal'

const pageLoader = ref(true)
const auth = useAuth()

onMounted(async () => {
  pageLoader.value = false
  const localUserData: userData = await localStoreGet('user')
  if (localUserData.login) {
    await auth.userAuth(localUserData, true)
  }
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
      <ModalT />
    </v-main>
  </v-app>
</template>
