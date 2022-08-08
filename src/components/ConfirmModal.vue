<template>
  <global-modal :is-visible="isVisible" :z-index="5">
    <div class="confirm-modal-wrapper">
      <span class="confirm-modal-message">
        Are you sure you want to delete the task?
      </span>
      <div class="modal-bottom">
        <div class="btn btn-primary" @click="closeModal(1)">Yes</div>
        <div class="btn" @click="closeModal(0)">No</div>
      </div>
    </div>
  </global-modal>
</template>

<script setup>
import { ref } from "vue";
import GlobalModal from "./GlobalModal.vue";

const isVisible = ref(false);

const confirmResolve = ref(null);

function openConfirm() {
  isVisible.value = true;
  return new Promise((resolve) => {
    confirmResolve.value = resolve;
  });
}

function closeModal(userInput) {
  confirmResolve.value(userInput);
  isVisible.value = false;
}

defineExpose({ openConfirm });
</script>

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
