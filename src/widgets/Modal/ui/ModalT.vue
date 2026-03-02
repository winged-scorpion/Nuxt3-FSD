<script setup>
import emitter from '~/shared/api/eventBus'

const dynamicComp = ref(null)
const dynamicCompProps = ref(null)
const isVisible = ref(false)

function openModal(component) {
  dynamicCompProps.value = component.props
  dynamicComp.value = component.components
  isVisible.value = true
}
function closedModal() {
  isVisible.value = false
  dynamicCompProps.value = null
  dynamicComp.value = null
}

onMounted(() => {
  emitter.on('openModal', openModal)
  emitter.on('closedModal', closedModal)
})

onUnmounted(() => {
  emitter.off('openModal', openModal)
  emitter.on('closedModal', closedModal)
})
</script>

<template>
  <div
    v-if="isVisible"
    class="shadow"
  >
    <div class="position-relative">
      <button
        class="modalClosed"
        @click="closedModal"
      />
      <component :is="dynamicComp" v-if="dynamicComp" v-bind="dynamicCompProps" />
      <slot v-else />
    </div>
  </div>
</template>

<style scoped lang="scss">
.modalClosed{
  position: absolute;
  top: -20px;
  left: -20px;
  width: 20px;
  height: 20px;
  background: #f6f6f6;
  border-radius: 100%;
  border: solid 1px rgb(95, 158, 160);
  &:before,&:after{
    display: block;
    content: '';
    width: 100%;
    height: 1px;
    background: rgb(95, 158, 160);
    position: absolute;
    transform: rotate(45deg);
  }
  &:before{transform: rotate(45deg);}
  &:after{transform: rotate(-45deg);}
}
.shadow{
  background: rgb(95 158 160 / 40%);
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1100;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
