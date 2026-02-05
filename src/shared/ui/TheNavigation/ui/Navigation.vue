<script setup lang="ts">
import { useUserStore } from '../api/AuthorizationStore'

const userStore = useUserStore()
const navigationLink = [
  {
    page: '/',
    name: 'Главная',
    h1: 'Учебный проект',
    visibility: true,
  },
  {
    page: '/liveCode',
    name: 'Решебник',
    h1: 'js ts задачи из лайвкодинга',
    visibility: true,
  },
  {
    page: '/interview',
    name: 'Подготовка',
    h1: 'Подготовка к собеседованию',
    visibility: true,
  },
  {
    page: '/training',
    name: 'Базовые задачи',
    h1: 'Базовые задачи по разному функционалу',
    visibility: true,
  },
  {
    page: '/itKitchen',
    name: 'IT кухня',
    h1: 'Видео сборник разных рецептов',
    visibility: true,
  },
  {
    page: '/wiki',
    name: 'Wiki',
    h1: 'Моя Wiki по js',
    visibility: true,
  },
  {
    page: '/admin',
    name: 'Админка',
    h1: 'Админка',
    visibility: true,
  },
]
</script>

<template>
  <nav>
    <NuxtLink
      v-for="item of navigationLink"
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
