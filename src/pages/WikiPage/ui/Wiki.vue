<script setup lang="ts">
import { BaseH1 } from '../../../widgets/BaseH1'
</script>

<template>
  <div class="pageContainer">
    <BaseH1 />
    <div>
      <div class="wiki">
        <div class="wiki__item">
          сделать заглавные буквы строчными -> <span class="wiki__fun">.toLowerCase()</span><span
            class="wiki__title"
          >&#10071;</span>
        </div>
        <div class="wiki__item">
          Убрать пробелы -> <span class="wiki__fun">.replaceAll(' ', '')</span><span
            class="wiki__title"
          >&#10071;</span>
        </div>
        <div class="wiki__item">
          Убрать все символы кроме букв и чисел -> <span class="wiki__fun">.replace(/[^\w\s]|_/g, "")</span><span
            class="wiki__title"
          >&#10071;</span>
        </div>
        <div class="wiki__item">
          преобразовать строку в массив -> <span class="wiki__fun">.split('')</span><span
            class="wiki__title"
          >&#10071;</span>
        </div>
        <div class="wiki__item">
          Развернуть массив -> <span class="wiki__fun">.reverse()</span><span class="wiki__title">&#10071;</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.wiki {
  &__item {
    margin: 5px 0;
    font-size: 14px;
  }

  &__fun {
    color: cadetblue;
    font-size: 16px;
  }

  &__title {
    width: 20px;
    height: 20px;
    display: inline-block;
    vertical-align: middle;
    border-radius: 100%;
    border: solid 1px #000;
    font-size: 12px;
    margin: 0 0 0 10px;
    text-align: center;
  }
}
</style>
