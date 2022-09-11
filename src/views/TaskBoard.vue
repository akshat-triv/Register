<template>
  <div class="common-board">
    <common-card
      v-for="(taskDetails, taskId) in taskList"
      :key="`task-${taskId}`"
      :id="taskId"
      :card-type="'task'"
      :title="taskDetails.title"
      :description="taskDetails.description"
      :duration="taskDetails.duration"
      :active="taskDetails.active"
      @delete-item="deleteTask(taskId)"
    />
    <a
      href="#"
      class="add-button"
      :class="{ close: modelActive }"
      @click="modelActive = !modelActive"
    >
      +
    </a>
    <teleport to="#app">
      <new-task-modal
        :is-visible="modelActive"
        :input-meta="addNewTaskMeta"
        @add-new="addTaskInList"
      />
    </teleport>
    <teleport to="#app">
      <confirm-modal
        ref="confirm"
        :confirm-message="'Are you sure you want to delete the task?'"
      />
    </teleport>
    <teleport to="#app">
      <alert-modal
        ref="routeLeaveAlert"
        :alert-message="'Sorry you cannot leave this page while a task is active'"
      />
    </teleport>
  </div>
</template>

<script setup>
import { v4 as uuidv4 } from "uuid";
import { computed } from "@vue/reactivity";
import { provide, ref } from "vue";
import { useStore } from "vuex";
import CommonCard from "../components/CommonCard.vue";
import NewTaskModal from "../components/AddNewModal.vue";
import ConfirmModal from "../components/ConfirmModal.vue";
import AlertModal from "../components/AlertModal.vue";
import { onBeforeRouteLeave } from "vue-router";

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
  // Adding TaskId and Active Property in TaskDetails
  const taskId = uuidv4();
  taskDetails.id = taskId;
  taskDetails.active = false;
  // Preparing Task Obj
  const taskObj = {};
  taskObj[taskId] = taskDetails;
  taskList.value = taskObj;
  // Closing the model
  modelActive.value = false;
}

async function deleteTask(taskId) {
  const userInput = await confirm.value.openConfirm();
  if (!userInput) return;
  store.dispatch("deleteTaskInList", taskId);
}

const routeLeaveAlert = ref(null);

onBeforeRouteLeave(async () => {
  if (!timerIsActive.value) return true;
  await routeLeaveAlert.value.openAlert();
  return false;
});

const addNewTaskMeta = [
  {
    label: "Title",
    inputType: "text",
    id: "title",
    placeholder: "E.g. Learn Java",
  },
  {
    label: "Description",
    inputType: "text",
    id: "description",
    placeholder: "E.g. Study java for next 1 hour",
  },
  {
    label: "Time (Minutes)",
    inputType: "number",
    id: "duration",
    step: "30",
    placeholder: "E.g. 60",
  },
];
</script>
