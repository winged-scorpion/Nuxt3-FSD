<script setup lang="ts">
import { NAVIGATION_LINK } from '~/app/route'
import { useAuth } from '~/features/AuthUser/store/useAuth'

const auth = useAuth()

const admin = computed(() => {
  if (auth.outAuth) {
    return 'Админ'
  }
  else {
    return 'Авторизация'
  }
})
</script>

<template>
  <nav>
    <NuxtLink
      v-for="item of NAVIGATION_LINK"
      v-show="item?.visibility"
      :key="item.page"
      :to="item.page"
    >
      <span v-if="item.page !== '/admin'">
        {{ item.name }}
      </span>
      <span v-else>
        {{admin}}
      </span>
    </NuxtLink>
  </nav>
</template>

<style scoped lang="scss">
@use "~/shared/style/variables" as *;
a {
  text-decoration: none;
  font-size: 16px;
  display: inline-block;
  margin: 0 10px;
  color: #fff;
  border-right: 2px solid #305152;
  padding-right: 10px;

  &:last-of-type {
    border-right: none;
  }
  &.router-link-active{
    text-shadow: $shadow-nav;
  }
}
</style>
