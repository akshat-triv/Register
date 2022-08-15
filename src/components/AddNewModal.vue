<template>
  <global-modal :is-visible="props.isVisible" :z-index="4">
    <div class="new-task-modal-wrapper">
      <template
        v-for="(inputData, inputIndex) in props.inputMeta"
        :key="`input-${inputIndex}`"
      >
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
            src="@/assets/gold-coin.png"
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
  </global-modal>
</template>

<script setup>
import { computed } from "@vue/reactivity";
import { reactive } from "vue";
import { useStore } from "vuex";
import GlobalModal from "./GlobalModal.vue";

const props = defineProps({
  isVisible: {
    type: Boolean,
    default: true,
  },
  inputMeta: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["add-new"]);

const store = useStore();

const newItemDetails = reactive({
  title: null,
  description: null,
  duration: null,
});

const pointsWorth = computed(() => {
  const valueOfOneMinute = store.getters["getValueOfOneMinute"];
  return parseFloat(newItemDetails.duration * valueOfOneMinute).toFixed(2);
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
  emit("add-new", { ...newItemDetails });
  // Setting inputs to null
  newItemDetails.title = null;
  newItemDetails.description = null;
  newItemDetails.duration = null;
}
</script>

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
