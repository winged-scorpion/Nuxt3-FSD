<script setup lang="ts">
import { computed } from 'vue'
import { BaseH1 } from '../../../shared/ui/BaseH1'
import { Button } from '~/shared/ui/UiKit/BaseButton'
import { useAuth } from '~/features/AuthUser/store/useAuth'
import { emailRules, loginRules, passwordRules } from '~/shared/api/validate'

const auth = useAuth()
const regData = reactive({
  login: '',
  password: '',
  email: '',
})
const authData = reactive({
  login: '',
  password: '',
  email: '',
})
const formAuth = ref()
const formReg = ref()
const authValidate = ref(false)
const regValidate = ref(false)
const formSlider = ref('reg')
const head = computed(() => {
  if (formSlider.value === 'reg') {
    return 'Регистрация'
  }
  else {
    return 'Авторизация'
  }
})

function regSubmit() {
  auth.userRegistration(regData)
}
function authSubmit() {
  auth.userAuth(authData)
}
async function validateAuth() {
  const { valid } = await formAuth.value.validate()
  if (valid)
    authValidate.value = true
}
async function validateReg() {
  const { valid } = await formReg.value.validate()
  if (valid)
    regValidate.value = true
}
</script>

<template>
  <BaseH1
    class="text-center"
    :head="head"
  />
  <div class="form">
    <v-form
      v-if="formSlider === 'reg'"
      ref="formReg"
      class="form"
      lazy-validation
      @change="validateReg"
    >
      <v-text-field
        v-model="regData.login"
        name="login"
        required
        placeholder="Login"
        :rules="loginRules"
      />
      <v-text-field
        v-model="regData.email"
        name="email"
        required
        placeholder="Email"
        :rules="emailRules"
      />
      <v-text-field
        v-model="regData.password"
        name="password"
        required
        placeholder="Password"
        :rules="passwordRules"
      />
      <Button
        :disabled="!regValidate"
        class="width100"
        @click="regSubmit"
      >
        Регистрация
      </Button>
      {{ auth.outRegMessage }}
    </v-form>
    <v-form
      v-else
      ref="formAuth"
      class="form"
      lazy-validation
      @change="validateAuth"
    >
      <v-text-field
        v-model="authData.email"
        name="email"
        required
        placeholder="Email"
        :rules="emailRules"
      />
      <v-text-field
        v-model="authData.password"
        name="password"
        required
        placeholder="Password"
        :rules="passwordRules"
      />
      <Button
        :disabled="!authValidate"
        class="width100"
        @click="authSubmit"
      >
        Авторизация
      </Button>
      <div class="error__message">
        {{ auth.outAuthMessage }}
      </div>
    </v-form>
    <div>
      <v-radio-group v-model="formSlider">
        <v-radio label="Регистрация" value="reg" />
        <v-radio label="Авторизация" value="auth" />
      </v-radio-group>
    </div>
  </div>
</template>

<style lang="scss">
.form{
  .v-selection-control-group{
    flex-direction: row;
  }
}
</style>

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
.error{
  .v-field__input{
    border-bottom: solid 2px red;
  }
  &__message{
    color: red;
  }
}
</style>
