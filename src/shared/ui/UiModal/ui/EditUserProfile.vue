<script setup lang="ts">
import { useUsers } from '~/features/Admin/store/users'

const props = defineProps({
  userId: {
    type: Number,
    required: true,
  },
  login: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
})

const user = useUsers()

const userUpdate = reactive({
  id: props.userId,
  login: props.login,
  email: props.email,
  password: props.password,
})
function submit() {
  user.updateUser(userUpdate)
}
</script>

<template>
  <div>
    <v-sheet
      class="form"
    >
      <v-form validate-on="submit lazy" @submit.prevent="submit">
        <v-text-field
          v-model="userUpdate.login"
          label="Логин"
        />
        <v-text-field
          v-model="userUpdate.email"
          label="Email"
        />
        <v-text-field
          v-model="userUpdate.password"
          label="Пароль"
        />
        <v-btn
          class="mt-2"
          text="Submit"
          type="submit"
          block
        />
      </v-form>
    </v-sheet>
  </div>
</template>

<style scoped lang="scss">
.form{
  width: 300px;
  padding: 20px;
  position: relative;
}
</style>
