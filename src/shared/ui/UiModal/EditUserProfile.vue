<script setup lang="ts">
import { useUsers } from '~/shared/ui/TheAdmin/store/users'

const props = defineProps({
  user: {
    type: Number,
    required: true,
  },
})

const user = useUsers()

const userUpdate = reactive({
  id: props.user,
  login: '',
  email: '',
  password: '',
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
