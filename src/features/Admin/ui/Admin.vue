<script setup lang="ts">
import { useUsers } from '~/features/Admin/store/users'
import { Button } from '~/shared/ui/UiKit/BaseButton'
import { localStoreDelete } from '~/shared/api/storageFunction'
import { UploadIcon } from '~/shared/ui/Icon'
import { Users } from '~/entities/Users'
import {Interviews} from "../../../entities/Interviews";
import VideoList from "~/entities/Video/ui/VideoList.vue";

const allUser = useUsers()
function logout() {
  allUser.setUserData = null
  localStoreDelete('user')
  navigateTo('/auth')
}

const tab = ref('one')
</script>

<template>
  <Button @click="logout">
    Разлогинится
  </Button>
  <v-sheet
    elevation="4"
    class="admin"
  >
    <v-tabs v-model="tab" color="red">
      <v-tab value="one">
        Юзеры
      </v-tab>
      <v-tab value="two">
        Темы и вопросы лайвкодинга
      </v-tab>
      <v-tab value="three">
        It кухня видео
      </v-tab>
    </v-tabs>
    <v-divider />
    <v-tabs-window v-model="tab">
      <v-tabs-window-item value="one">
        <v-sheet class="pa-5">
          <Users />
        </v-sheet>
      </v-tabs-window-item>
      <v-tabs-window-item value="two">
        <v-sheet class="pa-5">
          <Interviews/>
        </v-sheet>
      </v-tabs-window-item>
      <v-tabs-window-item value="three">
        <v-sheet class="pa-5">
          <VideoList/>
        </v-sheet>
      </v-tabs-window-item>
    </v-tabs-window>
  </v-sheet>
</template>

<style scoped lang="scss">
.admin{
  margin-top: 15px;
}
</style>
