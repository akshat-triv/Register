<script lang="ts" setup>
import type { userDetails } from "@/types/application.interface";

import { computed } from "@vue/reactivity";
import { reactive } from "vue";
import { useAppStore } from "@/stores";

import CommonModal from "./CommonModal.vue";

const props = defineProps({
  isVisible: {
    type: Boolean,
    default: true,
  },
  closeWhenClickedOutside: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["closeModal"]);

const store = useAppStore();

const userInfo = reactive<userDetails>({
  salary: null,
  workingDays: null,
  workingHours: null,
});

const saveBtnDisabled = computed(() => {
  return !userInfo.salary || !userInfo.workingDays || !userInfo.workingHours;
});

function saveDetails() {
  if (saveBtnDisabled.value) return;
  store.updateUserDetails(userInfo);
  emit("closeModal");
}
</script>

<template>
  <common-modal
    :is-visible="props.isVisible"
    :z-index="5"
    @click="closeWhenClickedOutside ? emit('closeModal') : ''"
  >
    <div class="question-modal-wrapper">
      <label for="salary" class="modal-input-label">
        How much is money you make in a month?
      </label>
      <input
        v-model="userInfo.salary"
        type="number"
        class="modal-input"
        id="salary"
        placeholder="E.g. 50000"
      />
      <label for="days" class="modal-input-label">
        How many days you work in a week?
      </label>
      <input
        v-model="userInfo.workingDays"
        type="number"
        class="modal-input"
        id="days"
        placeholder="E.g. 5"
      />
      <label for="hours" class="modal-input-label">
        How many hours you work in a day?
      </label>
      <input
        v-model="userInfo.workingHours"
        type="number"
        class="modal-input"
        id="hours"
        placeholder="E.g. 8"
      />
      <div class="modal-bottom">
        <div
          class="btn btn-primary"
          :class="{ disabled: saveBtnDisabled }"
          @click="saveDetails"
        >
          Save
        </div>
      </div>
    </div>
  </common-modal>
</template>

<style lang="scss" scoped>
.question-modal {
  &-wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 2rem;
  }
}
.modal-bottom {
  display: flex;
  flex-direction: row-reverse;
}
</style>
