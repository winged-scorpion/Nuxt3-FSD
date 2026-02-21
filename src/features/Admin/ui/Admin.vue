<script setup lang="ts">
import { useUsers } from '~/features/Admin/store/users'
import { Button } from '~/shared/ui/UiKit/BaseButton'
import { localStoreDelete } from '~/shared/api/storageFunction'
import { UploadIcon } from '~/shared/ui/Icon'
import { Users } from '~/entities/Users'

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
    class=""
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
          <div class="tabs-head">
            <strong>Вопрос-ответ</strong>
            <button
              class="svg-icon rotate180"
            >
              <UploadIcon />
            </button>
          </div>
          <div>

          </div>
        </v-sheet>
      </v-tabs-window-item>
      <v-tabs-window-item value="three">
        <v-sheet class="pa-5">
          <div class="tabs-head">
            <strong>IT-Кухня видео</strong>
            <button
              class="svg-icon rotate180"
            >
              <UploadIcon />
            </button>
          </div>
        </v-sheet>
      </v-tabs-window-item>
    </v-tabs-window>
  </v-sheet>
</template>

<style scoped lang="scss">
.admin-tab{
  padding: 0 15px;
  >div{
    border-right: solid 1px black;
    padding: 15px 15px 15px 0;
    //width: 33%;
    h3{
      text-align: center;
      margin-bottom: 15px;
    }
    &:last-of-type{
      border-right: none;
      padding-right: 0;
    }
  }
}
</style>
