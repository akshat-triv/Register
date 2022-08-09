<template>
  <global-modal :is-visible="isVisible" :z-index="5">
    <div class="alert-modal-wrapper">
      <span class="alert-modal-message">
        {{ props.alertMessage }}
      </span>
      <div class="modal-bottom">
        <div class="btn btn-primary" @click="closeModal(1)">Ok</div>
      </div>
    </div>
  </global-modal>
</template>

<script setup>
import { ref } from "vue";
import GlobalModal from "./GlobalModal.vue";

const props = defineProps({
  alertMessage: {
    type: String,
    default: "This is an alert!",
  },
});

const isVisible = ref(false);

const alertResolve = ref(null);

function openAlert() {
  isVisible.value = true;
  return new Promise((resolve) => {
    alertResolve.value = resolve;
  });
}

function closeModal(userInput) {
  alertResolve.value(userInput);
  isVisible.value = false;
}

defineExpose({ openAlert });
</script>

<style lang="scss" scoped>
.alert-modal {
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
