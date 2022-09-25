<script lang="ts" setup>
import { ref } from "vue";

import CommonModal from "./CommonModal.vue";

const props = withDefaults(
  defineProps<{
    message: string;
    confirmType: "confirm" | "alert";
  }>(),
  { message: "This is a message", confirmType: "confirm" }
);

const isVisible = ref(false);
const confirmResolve = ref<(value: number | PromiseLike<number>) => void>();

function openConfirm() {
  isVisible.value = true;
  return new Promise<number>((resolve) => {
    confirmResolve.value = resolve;
  });
}

function closeModal(userInput: number) {
  if (!confirmResolve.value) return;

  confirmResolve.value(userInput);

  isVisible.value = false;
}

defineExpose({ openConfirm });
</script>

<template>
  <common-modal :is-visible="isVisible" :z-index="5">
    <div class="confirm-modal-wrapper">
      <span class="confirm-modal-message">
        {{ props.message }}
      </span>
      <div class="modal-bottom">
        <div class="btn btn-primary" @click="closeModal(1)">
          {{ props.confirmType === "alert" ? "Okay" : "Yes" }}
        </div>
        <div
          v-if="props.confirmType === 'confirm'"
          class="btn"
          @click="closeModal(0)"
        >
          No
        </div>
      </div>
    </div>
  </common-modal>
</template>

<style lang="scss" scoped>
.confirm-modal {
  &-wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 2rem;
  }
  &-message {
    font-size: 1.4rem;
    font-weight: 800;
    margin-bottom: 2rem;
    display: inline-block;
    text-align: left;
  }
}
.modal-bottom {
  display: flex;
  align-items: center;
  align-self: flex-end;
  & > *:not(:last-child) {
    margin-right: 2rem;
  }
}
</style>
