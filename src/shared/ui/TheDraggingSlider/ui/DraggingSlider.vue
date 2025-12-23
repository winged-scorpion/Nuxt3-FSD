<script setup lang="ts">
import { getJsonFunction } from "~/shared/api/base/getJson"
import type { ProjectCompanyList } from "~/shared/model/projectListSlider"
import {useProjectList} from "~/shared/scope/useProjectList";

const projectList = await getJsonFunction('project');
let projectListArr = reactive(<ProjectCompanyList[]>projectList)
const projectListStore = useProjectList()
projectListStore.getProjectList()
const tickLabels = Object.assign({}, projectListArr.map((el) => el.temp))
const thumbLabels = projectListArr.map((el) => el.name)
const rangeReactive = reactive([0, thumbLabels.length - 1])

function updateRangeSlider(item: [number, number]) {
  Object.assign(rangeReactive, item)
  projectListStore.getProjectList(item)
}

</script>

<template>
  <div class="range-labels">
    <div
        class="range-labels__wrap"
        v-for="label in thumbLabels"
    >
      <div class="range-labels__item">{{ label }}</div>
    </div>
  </div>

  <v-range-slider
      class="range"
      :max="thumbLabels.length - 1"
      :ticks="tickLabels"
      show-ticks="always"
      :step="1"
      min="0"
      @update:modelValue="updateRangeSlider"
      v-model="rangeReactive"
  />
</template>

<style scoped lang="scss">
.range {
  margin: 15px 40px 50px;
}

.range-labels {
  display: flex;
  padding: 0 40px;
  justify-content: space-between;
  position: relative;

  &__item {
    background: #353535a3;
    color: #fff;
    border-radius: 4px;
    padding: 0 5px;
    font-size: 14px;
    white-space: nowrap;
    width: fit-content;
    position: relative;

    &:before {
      display: block;
      position: absolute;
      content: '';
      width: 0;
      height: 0;
      border-left: 6px solid transparent;
      border-right: 6px solid transparent;
      border-top: 7px solid #353535a3;
      left: 0;
      right: 0;
      margin: 0 auto;
      top: 100%;
    }
  }

  &__wrap {
    width: 0;
    position: relative;
    display: flex;
    justify-content: center;
  }
}
</style>
