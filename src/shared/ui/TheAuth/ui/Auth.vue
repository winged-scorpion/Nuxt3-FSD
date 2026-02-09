<script setup lang="ts">
import { BaseH1 } from '~/widgets/BaseH1'
import { Button } from '~/shared/ui/UiKit/BaseButton'
import { useAuth } from '~/shared/ui/TheAuth/store/useAuth'

const auth = useAuth()
const form = reactive({
  login: '',
  password: '',
})

async function submit() {
  let test = await auth.postData(form)
}
</script>

<template>
  <BaseH1
    class="text-center"
  />
  <v-form
    class="form"
    lazy-validation
  >
    <v-text-field
      v-model="form.login"
      name="login"
      required
    />
    <v-text-field
      v-model="form.password"
      name="password"
      required
    />
    <Button
      :disabled="!form"
      class="width100"
      @click="submit"
    >
      Авторизация
    </Button>
  </v-form>
</template>

<style scoped lang="scss">
.form{
  width: 300px;
  margin: auto;
}
.width100{
  width: 100%;
}
</style>
