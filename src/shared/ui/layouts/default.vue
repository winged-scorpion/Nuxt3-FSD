<script setup lang="ts">
import { HeaderComponent } from '../../../widgets/TheHeader'
import { Modal } from '../../../widgets/BaseModal'
import { FooterComponent } from '~/widgets/TheFooter'
import { Preloader } from '~/shared/ui/ThePreloader'
import { localStoreGet } from '~/shared/api/storageFunction'
import { useAuth } from '~/shared/ui/TheAuth/store/useAuth'
import type { userData } from '~/shared/ui/TheAuth/model/user'

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
      <Modal />
    </v-main>
  </v-app>
</template>
