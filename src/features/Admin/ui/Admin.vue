<script setup lang="ts">
import { useUsers } from '~/features/Admin/store/users'
import { Button } from '~/shared/ui/UiKit/BaseButton'
import type { userData } from '~/features/AuthUser/model/user'
import emitter from '~/shared/api/eventBus'
import { EditUserProfile } from '~/shared/ui/UiModal'
import { localStoreDelete, localStoreGet } from '~/shared/api/storageFunction'

const allUser = useUsers()
const localUserId = ref()
function delUser(user: userData) {
  allUser.deleteUser(user)
}
function editUser(userId: number) {
  emitter.emit('openModal', { components: EditUserProfile, props: { user: userId } })
}
function logout() {
  allUser.setUserData = null
  localStoreDelete('user')
  navigateTo('/auth')
}
onMounted(async () => {
  const user: userData = await localStoreGet('user')
  localUserId.value = user.id
})
</script>

<template>
  <Button @click="logout">
    Разлогинится
  </Button>
  <div class="admin-tab">
    <div>
      <h3>
        Зареганные юзеры
        <Button
          @click="allUser.getAllUserData"
        >
          Загрузить
        </Button>
      </h3>
      <ul>
        <li
          v-for="(item, index) in allUser.outUsersData"
          :key="index"
        >
          <div
            class="user"
            :class="{ user__admin: localUserId === item.id }"
          >
            <div
              v-if="localUserId === item.id"
              class="user__label"
            >
              Admin
            </div>
            <div class="user__body">
              <span><span>Id:</span>{{ item.id }}</span>
              <span><span>Login:</span>{{ item.login }}</span>
              <span><span>Email:</span>{{ item.email }}</span>
              <span><span>Password:</span>{{ item.password }}</span>
              <Button @click="delUser(item)">
                Удалить
              </Button>
              <Button @click="editUser(item.id)">
                Обновить
              </Button>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div>
      <h3>
        Вопрос-ответ
        <Button>
          Загрузить
        </Button>
      </h3>
    </div>
    <!--    <div> -->
    <!--      <h3>it кухня -->
    <!--        <Button -->

    <!--        > -->
    <!--          Загрузить -->
    <!--        </Button> -->
    <!--      </h3> -->

    <!--    </div> -->
  </div>
</template>

<style scoped lang="scss">
.admin-tab{
  display: flex;
  justify-content: space-between;
  border: solid 1px black;
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
.user{
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  flex-wrap: wrap;
  &__label{
    width: 100%;
  }
  &__admin{
    background: rgb(95 158 160 / 17%);
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
