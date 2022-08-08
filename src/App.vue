<template>
  <global-header />
  <global-navigation />
  <router-view />
  <question-modal
    :is-visible="userDetailsModal"
    @close-modal="userDetailsModal = false"
  />
</template>

<script setup>
import GlobalNavigation from "./components/GlobalNavigation.vue";
import GlobalHeader from "./components/GlobalHeader.vue";
import QuestionModal from "./components/QuestionModal.vue";

import { onMounted, ref } from "vue";
import { useStore } from "vuex";

const userDetailsModal = ref(false);
const store = useStore();

onMounted(() => {
  const savedUserDetails = localStorage.getItem("userDetails");
  const savedTaskList = localStorage.getItem("taskList");
  const savedWalletMoney = localStorage.getItem("wallet");
  if (!savedUserDetails) userDetailsModal.value = true;
  else store.dispatch("updateUserDetails", JSON.parse(savedUserDetails));
  if (savedTaskList) store.dispatch("addTaskInList", JSON.parse(savedTaskList));
  if (savedWalletMoney)
    store.dispatch("addMoneyInWallet", parseFloat(savedWalletMoney));
});
</script>

<style lang="scss">
*,
*::after,
*::before {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

html {
  font-size: 62.5%;
}

#app {
  font-family: "Noto Sans", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #3e4152;
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding-bottom: 5.2rem;
}

.btn {
  padding: 0.8rem 2.4rem;
  font-size: 1.4rem;
  border: 1px solid #ecf0f1;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  border-radius: 4px;

  &:hover {
    cursor: pointer;
  }

  &.btn-primary {
    background-color: #192a56;
    color: #fff;
    border: none;
    border-radius: 4px;
  }

  &.disabled {
    opacity: 0.7;
    &:hover {
      cursor: not-allowed;
    }
  }
}
</style>
