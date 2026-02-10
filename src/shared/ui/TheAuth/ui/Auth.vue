<script setup lang="ts">
import { BaseH1 } from '~/widgets/BaseH1'
import { Button } from '~/shared/ui/UiKit/BaseButton'
import { useAuth } from '~/shared/ui/TheAuth/store/useAuth'

const auth = useAuth()
const formReg = reactive({
  login: '',
  password: '',
  email: '',
})
const formAuth = reactive({
  login: '',
  password: '',
  email: '',
})

function regSubmit() {
  auth.userRegistration(formReg)
}
function authSubmit() {
  auth.userAuth(formAuth)
}
</script>

<template>
  <BaseH1
    class="text-center"
  />
  <div class="flex">
    <v-form
      class="form"
      lazy-validation
    >
      <v-text-field
        v-model="formReg.login"
        name="login"
        required
        placeholder="Login"
      />
      <v-text-field
        v-model="formReg.email"
        name="email"
        required
        placeholder="Email"
      />
      <v-text-field
        v-model="formReg.password"
        name="password"
        required
        placeholder="Password"
      />
      <Button
        :disabled="!formReg"
        class="width100"
        @click="regSubmit"
      >
        Регистрация
      </Button>
    </v-form>
    <v-form
      class="form"
      lazy-validation
    >
      <v-text-field
        v-model="formAuth.email"
        name="email"
        required
        placeholder="Email"
      />
      <v-text-field
        v-model="formAuth.password"
        name="password"
        required
        placeholder="Password"
      />
      <Button
        :disabled="!formAuth"
        class="width100"
        @click="authSubmit"
      >
        Регистрация
      </Button>
    </v-form>
  </div>
</template>

<style scoped lang="scss">
.form{
  width: 300px;
  margin: auto;
}
.width100{
  width: 100%;
}
.flex{
  display: flex;
  justify-content: center;
  align-items: self-start;
}
</style>
