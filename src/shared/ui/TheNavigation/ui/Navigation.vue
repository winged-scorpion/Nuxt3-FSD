<script setup lang="ts">
import { NAVIGATION_LINK } from '~/app/route'
</script>

<template>
  <nav>
    <NuxtLink
      v-for="item of NAVIGATION_LINK"
      v-show="item?.visibility"
      :key="item.page"
      :to="item.page"
    >
      {{ item.name }}
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
