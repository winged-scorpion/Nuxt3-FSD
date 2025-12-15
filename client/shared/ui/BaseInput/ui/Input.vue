<script setup lang="ts">
import type { PropType } from 'vue'
import type { SchemaItem } from "~/model/schema"
import {defineProps} from "vue"
import type {InputHidden} from "~/model/inputList"


const props = defineProps({
  schema: {
    type: Object as PropType<SchemaItem>,
    required: true
  },
  inputType: {
    type: String,
    required: false
  },
  value: {
    type: String,
    required: false
  },
  show: {
    type: Object as PropType<InputHidden>,
    required: false
  }
});
</script>

<template>
  <div
      class="base-form-input"
      :class=schema?.classStyle
  >
    <label v-if="schema?.label">{{ schema.label }}</label>
    <div class="base-form-input__wrap">
      <Field
          v-if="inputType === 'number'"
          :name=schema?.name
          :type=inputType
          v-model.number="props.value"
          @input="$emit('update:model-value', $event.target.value)"
      />
      <Field
          v-else
          :name=schema?.name
          :type=inputType
          :placeholder=schema?.placeholder
          v-model="props.value"
          @input="$emit('update:model-value', $event.target.value)"
      />
    </div>
    <ErrorMessage class="base-form-input__error" :name="schema?.name"/>
  </div>
</template>

<style scoped lang="scss">
.base-form-input {
  &__wrap {
    display: flex;
    gap: 10px;
  }
}

</style>
