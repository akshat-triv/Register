<template>
  <global-modal :is-visible="props.isVisible" :z-index="4">
    <div class="new-task-modal-wrapper">
      <label for="title" class="modal-input-label">Title</label>
      <input
        v-model="taskDetails.title"
        type="text"
        class="modal-input"
        id="title"
        placeholder="E.g. Learn Java"
      />
      <label for="description" class="modal-input-label">Description</label>
      <input
        v-model="taskDetails.description"
        type="text"
        class="modal-input"
        id="description"
        placeholder="E.g. Study java for next 1 hour"
      />
      <label for="time" class="modal-input-label">Time (Minutes)</label>
      <input
        v-model="taskDetails.duration"
        type="number"
        class="modal-input modal-input-number"
        id="time"
        step="30"
        placeholder="E.g. 60"
      />
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
          @click="addTaskInList"
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
});

const emit = defineEmits(["add-task"]);

const store = useStore();

const taskDetails = reactive({
  title: null,
  description: null,
  duration: null,
});

const pointsWorth = computed(() => {
  const valueOfOneMinute = store.getters["getValueOfOneMinute"];
  return parseFloat(taskDetails.duration * valueOfOneMinute).toFixed(2);
});

const addBtnDisabled = computed(() => {
  return (
    !taskDetails.title || !taskDetails.description || !taskDetails.duration
  );
});

function addTaskInList() {
  if (addBtnDisabled.value) return;
  emit("add-task", { ...taskDetails });
  // Setting inputs to null
  taskDetails.title = null;
  taskDetails.description = null;
  taskDetails.duration = null;
}
</script>

<style lang="scss" scoped>
.new-task-modal {
  &-wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 2rem;

    .modal-input {
      width: 100%;
      font-size: 1.4rem;
      outline: none;
      border: none;
      background-color: rgba(#dfe6e9, 0.4);
      padding: 1rem;

      &:not(:last-child) {
        margin-bottom: 2.4rem;
      }

      &-number {
        width: 10rem;
      }

      &-label {
        font-size: 1.4rem;
        font-weight: 800;
        margin-bottom: 0.8rem;
      }
    }
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
