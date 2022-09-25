<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useAppStore } from "./stores";

import GlobalHeader from "./components/coreComponents/GlobalHeader.vue";
import GlobalNavigation from "./components/coreComponents/GlobalNavigation.vue";
import UserInfoModal from "./components/coreComponents/UserInfoModal.vue";

const store = useAppStore();
const route = useRoute();

const userModalOpen = ref(false);

function loadFromLocalStorage() {
  if (!localStorage) return;

  const savedUserDetails = localStorage.getItem("userDetails");

  if (!savedUserDetails) userModalOpen.value = true;
  else store.updateUserDetails(JSON.parse(savedUserDetails));

  const savedTaskList = localStorage.getItem("taskList");
  if (savedTaskList) store.addTaskInList(JSON.parse(savedTaskList));
}

onMounted(() => {
  loadFromLocalStorage();
});
</script>

<template>
  <global-header />
  <RouterView />
  <global-navigation :about-page-active="route.name === 'Settings'" />
  <user-info-modal
    :is-visible="userModalOpen"
    @close-modal="userModalOpen = false"
  />
</template>

<style lang="scss" scoped></style>
