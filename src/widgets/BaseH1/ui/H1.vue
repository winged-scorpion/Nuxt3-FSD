<script setup lang="ts">
import { h1Search } from '~/shared/api/base/h1Search'
import { NAVIGATION_LINK } from '~/app/route'
</script>

<template>
  <h1>{{ h1Search(useRequestURL().pathname, NAVIGATION_LINK) }}</h1>
</template>

<style scoped>
h1{
  font-weight: 600;
  font-size: 26px;
  display: block;
  margin: 25px;
}
</style>
