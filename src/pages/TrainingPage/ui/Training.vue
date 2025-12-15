<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { BaseH1 } from '~/shared/ui/BaseH1'
import { Tabs } from '~/shared/ui/BaseTabs'
import { Function } from '~/shared/ui/training/BaseFunction'
import { Api } from '~/shared/ui/training/BaseApi'
import { Form } from '~/shared/ui/training/BaseForm'

const router = useRouter()
const route = useRoute()

const path = computed(() => route.path)

const activeTab = ref('base')
const tabs = [
  { tab: 'base', label: 'Базовый функционал', selected: true },
  { tab: 'form', label: 'Валидация форм' },
  { tab: 'api', label: 'Api' },
]
function activeTabUpdate(tab: string) {
  activeTab.value = tab
}

const tabNav = [
  {
    page: `${path.value}/base`,
    name: 'Базовый функционал',
    h1: 'Видео сборник разных рецептов',
    visibility: true,
  },
  {
    page: `${path.value}/api`,
    name: 'Api',
    h1: 'Видео сборник разных рецептов',
    visibility: true,
  },
]
</script>

<template>
  <div class="pageContainer">
    <BaseH1 />
    <div class="d-flex ga-5 align-center mb-5">
      <span>Табы</span>
      <Tabs
        :tab-list="tabs"
        :select-tab="activeTab"
        @change-tab="activeTabUpdate"
      />
    </div>
    <div>
      <div class="d-flex ga-5 align-center mb-5">
        <span>Ссылки</span>
        <NuxtLink
          v-for="item of tabNav"
          :to="item.page"
          class="v-btn v-btn--elevated v-theme--light v-btn--density-default v-btn--size-default v-btn--variant-elevated"
        >
          {{ item.name }}
        </NuxtLink>
      </div>

      <Function
        v-if="activeTab === 'base'"
      />
      <Api
        v-if="activeTab === 'api'"
      />
      <Form
        v-if="activeTab === 'form'"
      />
      <div />
    </div>
  </div>
</template>

<style scoped>

</style>
