<script setup lang="ts">
import { DeleteIcon, EditIcon, UploadIcon } from '~/shared/ui/Icon'
import type { userData } from '~/features/AuthUser/model/user'
import emitter from '~/shared/api/eventBus'
import { EditUserProfile } from '~/shared/ui/UiModal'
import { useUsers } from '~/features/Admin/store/users'
import { localStoreGet } from '~/shared/api/storageFunction'

const localUserId = ref()
const allUser = useUsers()
function delUser(user: userData) {
  allUser.deleteUser(user)
}
function editUser(userId: number) {
  emitter.emit('openModal', { components: EditUserProfile, props: { user: userId } })
}
onMounted(async () => {
  const user: userData = await localStoreGet('user')
  localUserId.value = user.id
})
</script>

<template>
  <div class="tabs-head">
    <strong>Зареганные юзеры</strong>
    <button
      class="svg-icon rotate180"
      @click="allUser.getAllUserData"
    >
      <UploadIcon />
    </button>
  </div>
  <hr class="mb-5">
  <ul>
    <li
      v-for="(item, index) in allUser.outUsersData"
      :key="index"
    >
      <div
        class="user"
        :class="{ user__admin: localUserId === item.id }"
      >
        <label
          v-if="localUserId === item.id"
          class="user__label"
        >
          Admin
        </label>
        <div
          class="user__body"
        >
          <span><span>Id:</span>{{ item.id }}</span>
          <span><span>Login:</span>{{ item.login }}</span>
          <span><span>Email:</span>{{ item.email }}</span>
          <span><span>Password:</span>{{ item.password }}</span>
        </div>
        <div class="user__button">
          <button
            class="svg-icon"
            @click="delUser(item)"
          >
            <DeleteIcon />
          </button>
          <button
            class="svg-icon"
            @click="editUser(item.id)"
          >
            <EditIcon />
          </button>
        </div>
      </div>
    </li>
  </ul>
</template>

<style scoped lang="scss">
.tabs-head{
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}
ul{
  li{
    list-style: none;
  }
}
.user{
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  flex-wrap: wrap;
  padding: 10px;
  margin: 0 -10px;
  justify-content: space-between;
  &__label{
    width: 100%;
    font-weight: 600;
  }
  &__admin{
    background: rgb(95 158 160 / 17%);
  }
  &__button{
    display: flex;
  }
  &__body{
    > span{
      color: green;
      margin-right: 5px;
      &:nth-child(1){width: 60px}
      &:nth-child(2){width: 200px}
      &:nth-child(3){width: 200px}
      &:nth-child(4){width: 200px}
      > span{
        color: red;
        font-weight: bold;
        margin: 0 5px;
        &:first-of-type{
          margin-left: 0;
        }
      }
    }
  }
}
</style>
