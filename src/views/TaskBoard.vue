<template>
  <div class="task-board">
    <common-card
      v-for="(taskDetails, taskIndex) in taskList"
      :key="`task-${taskIndex}`"
      :title="taskDetails.title"
      :description="taskDetails.description"
      :duration="taskDetails.duration"
      @delete-task="deleteTask(taskIndex)"
    />
    <div
      class="add-button"
      :class="{ close: modelActive }"
      @click="modelActive = !modelActive"
    >
      +
    </div>
    <teleport to="#app">
      <new-task-modal :is-visible="modelActive" @add-task="addTaskInList" />
    </teleport>
    <teleport to="#app">
      <confirm-modal ref="confirm" />
    </teleport>
  </div>
</template>

<script setup>
import { computed } from "@vue/reactivity";
import { provide, ref } from "vue";
import { useStore } from "vuex";
import CommonCard from "../components/CommonCard.vue";
import NewTaskModal from "../components/NewTaskModal.vue";
import ConfirmModal from "../components/ConfirmModal.vue";

const timerIsActive = ref(false);
provide("timer-active", timerIsActive);

const modelActive = ref(false);
const confirm = ref(null);

const store = useStore();

const taskList = computed({
  get() {
    return store.getters["getTaskList"];
  },
  set(value) {
    store.dispatch("addTaskInList", value);
  },
});

function addTaskInList(taskDetails) {
  taskList.value = taskDetails;
  localStorage.setItem("taskList", JSON.stringify(taskList.value));
  modelActive.value = false;
}

async function deleteTask(taskIndex) {
  const userInput = await confirm.value.openConfirm();
  if (!userInput) return;
  store.dispatch("deleteTaskInList", taskIndex);
  localStorage.setItem("taskList", JSON.stringify(taskList.value));
}
</script>

<style lang="scss" scoped>
.task-board {
  padding: 2.4rem 2rem;
  flex: 1;
  overflow: auto;

  & > *:not(:last-of-type) {
    margin-bottom: 2rem;
  }
}

.add-button {
  color: #fff;
  background-color: #192a56;
  width: 5rem;
  height: 5rem;
  clip-path: circle(50%);
  font-size: 3.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 0.5rem;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 5;
  box-shadow: 2px 1px 20px 1px rgba(0, 0, 0, 0.05);
  transition: all 0.3s;

  &.close {
    transform: translate(-50%, -50%) rotate(45deg);
  }
}
</style>
