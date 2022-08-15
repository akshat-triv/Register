<template>
  <transition name="fade">
    <div
      v-if="props.isVisible"
      class="add-new-modal-wrapper"
      :style="{ 'z-index': props.zIndex }"
    >
      <div class="add-new-modal-backdrop"></div>
      <div class="add-new-modal" @click.stop="">
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script setup>
const props = defineProps({
  isVisible: {
    type: Boolean,
    default: true,
  },
  zIndex: {
    type: Number,
    default: 2,
  },
});
</script>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  transform: scale(1.1);
  opacity: 0;
}
</style>

<style lang="scss" scoped>
.add-new-modal {
  width: 90%;
  min-height: 6rem;
  background: var(--surface-bg-color-1);
  border-radius: 4px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  &-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  &-backdrop {
    background: var(--modal-backdrop);
    width: 100%;
    height: 100%;
  }
}
</style>
