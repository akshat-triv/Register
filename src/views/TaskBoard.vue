<script setup lang="ts">
import type {
  timerCardList,
  timerCard,
  inputFieldMeta,
} from "@/types/application.interface";

import { useAppStore } from "@/stores";
import { computed, ref } from "@vue/reactivity";
import { onBeforeRouteLeave } from "vue-router";
import { v4 as uuidv4 } from "uuid";

import TimerCard from "../components/coreComponents/TimerCard.vue";
import AddNewModal from "@/components/coreComponents/AddNewModal.vue";
import ConfirmModal from "@/components/coreComponents/ConfirmModal.vue";

const store = useAppStore();

const timerIsActive = ref(false);
const modelActive = ref(false);
const confirm = ref<InstanceType<typeof ConfirmModal> | null>(null);
const alert = ref<InstanceType<typeof ConfirmModal> | null>(null);

const taskList = computed<timerCardList>(() => {
  return store.getTaskList;
});

async function deleteTask(taskId: timerCard["id"]) {
  const userInput = await confirm.value?.openConfirm();
  if (!userInput) return;

  store.deleteTaskInList(taskId);
}

function addTaskInList(taskDetails: timerCard) {
  // Creating a new Id and appendTaskList object
  const taskId = uuidv4();
  const appendTaskList: timerCardList = {};
  appendTaskList[taskId] = taskDetails;
  // Saving it in the store
  store.addTaskInList(appendTaskList);
  // Closing the model
  modelActive.value = false;
}

onBeforeRouteLeave(async () => {
  if (!timerIsActive.value) return true;
  await alert.value?.openConfirm();
  return false;
});

const addNewTaskMeta: Array<inputFieldMeta> = [
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

<template>
  <div class="common-board">
    <timer-card
      v-for="(taskDetails, taskId) in taskList"
      :key="`task-${taskId}`"
      :id="`${taskId}`"
      :card-type="taskDetails.cardType"
      :title="taskDetails.title"
      :description="taskDetails.description"
      :duration="taskDetails.duration"
      :active="timerIsActive"
      @delete-item="deleteTask(`${taskId}`)"
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
      <add-new-modal
        :is-visible="modelActive"
        :new-card-type="'task'"
        :input-meta="addNewTaskMeta"
        @add-new="addTaskInList"
      />
    </teleport>
    <teleport to="#app">
      <confirm-modal
        ref="confirm"
        :message="'Are you sure you want to delete the task?'"
      />
    </teleport>
    <teleport to="#app">
      <confirm-modal
        ref="alert"
        :message="'Sorry you cannot leave this page while a task is active'"
        :confirm-type="'alert'"
      />
    </teleport>
  </div>
</template>
