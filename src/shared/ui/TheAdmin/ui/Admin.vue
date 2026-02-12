<script setup lang="ts">
import { useUsers } from '~/shared/ui/TheAdmin/store/users'
import { Button } from '~/shared/ui/UiKit/BaseButton'
import type { userData } from '~/shared/ui/TheAuth/model/user'

const allUser = useUsers()

function delUser(user: userData) {
  allUser.deleteUser(user)
}
</script>

<template>
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
        class="user"
      >
        <span><span>Id:</span>{{ item.id }}</span>
        <span><span>Login:</span>{{ item.login }}</span>
        <span><span>Email:</span>{{ item.email }}</span>
        <span><span>Password:</span>{{ item.password }}</span>
        <Button @click="delUser(item)">
          Удалить
        </Button>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.user{
  display: flex;
  align-items: center;
  margin-bottom: 10px;
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

</style>
