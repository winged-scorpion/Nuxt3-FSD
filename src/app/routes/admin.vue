<script lang='ts' setup>
import { AdminPage } from '~/pages/AdminPage'
import { definePageMeta } from '#imports'

onMounted(() => {
  console.log('start')
  definePageMeta({
    middleware: 'user',
  })
})
</script>

<template>
  <AdminPage />
</template>
