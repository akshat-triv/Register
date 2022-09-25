<script lang="ts" setup>
import type {
  inputFieldMeta,
  cardType,
  timerCard,
} from "@/types/application.interface";

import { computed } from "@vue/reactivity";
import { reactive } from "vue";
import { useAppStore } from "@/stores";

import CommonModal from "./CommonModal.vue";

const props = withDefaults(
  defineProps<{
    isVisible: boolean;
    newCardType: cardType;
    inputMeta: Array<inputFieldMeta>;
  }>(),
  { isVisible: true, newCardType: "task", inputMeta: () => [] }
);

const emit = defineEmits(["add-new"]);

const store = useAppStore();

const newItemDetails = reactive({
  title: "",
  description: "",
  duration: null as null | number,
});

const pointsWorth = computed(() => {
  const valueOfOneMinute = store.getValueOfOneMinute;
  if (!newItemDetails.duration) return parseFloat(`${0}`).toFixed(2);
  return parseFloat(`${newItemDetails.duration * valueOfOneMinute}`).toFixed(2);
});

const addBtnDisabled = computed(() => {
  return (
    !newItemDetails.title ||
    !newItemDetails.description ||
    !newItemDetails.duration
  );
});

function addNewItemInList() {
  if (addBtnDisabled.value) return;

  const newItem: timerCard = {
    id: "new-task",
    cardType: props.newCardType,
    title: newItemDetails.title,
    description: newItemDetails.description,
    duration: `${newItemDetails.duration}:00`,
  };

  emit("add-new", newItem);
  // Setting inputs to null
  newItemDetails.title = "";
  newItemDetails.description = "";
  newItemDetails.duration = null;
}
</script>

<template>
  <common-modal :is-visible="props.isVisible" :z-index="4">
    <div class="new-task-modal-wrapper">
      <template v-for="inputData in props.inputMeta" :key="`${inputData.id}`">
        <label :for="inputData.id" class="modal-input-label">
          {{ inputData.label }}
        </label>
        <input
          v-if="inputData.inputType === 'text'"
          v-model="newItemDetails[inputData.id]"
          type="text"
          class="modal-input"
          :id="inputData.id"
          :placeholder="inputData.placeholder"
        />
        <input
          v-else-if="inputData.inputType === 'number'"
          v-model="newItemDetails[inputData.id]"
          type="number"
          class="modal-input modal-input-number"
          :step="inputData.step"
          :id="inputData.id"
          :placeholder="inputData.placeholder"
        />
      </template>
      <div class="modal-bottom">
        <div class="points-wrapper">
          <img
            class="points-icon"
            src="@/assets/images/gold-coin.png"
            alt="gold-coin"
          />
          <span class="points-text">{{ pointsWorth }}</span>
        </div>
        <div
          class="btn btn-primary"
          :class="{ disabled: addBtnDisabled }"
          @click="addNewItemInList"
        >
          Add
        </div>
      </div>
    </div>
  </common-modal>
</template>

<style lang="scss" scoped>
.new-task-modal {
  &-wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 2rem;
  }
}
.modal-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  .points {
    &-wrapper {
      display: flex;
      align-items: center;
    }
    &-icon {
      width: 2.4rem;
      height: 2.4rem;
    }
    &-text {
      font-size: 1.4rem;
      display: inline-block;
      border-radius: 1.2rem;
      padding-left: 0.4rem;
    }
  }
}
</style>
