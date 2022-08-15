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
  const savedShopList = localStorage.getItem("shopList");
  const savedRewardList = localStorage.getItem("rewardList");
  const savedWalletMoney = localStorage.getItem("wallet");
  if (!savedUserDetails) userDetailsModal.value = true;
  else store.dispatch("updateUserDetails", JSON.parse(savedUserDetails));
  if (savedTaskList) store.dispatch("addTaskInList", JSON.parse(savedTaskList));
  if (savedShopList) store.dispatch("addShopInList", JSON.parse(savedShopList));
  if (savedRewardList)
    store.dispatch("addRewardInList", JSON.parse(savedRewardList));
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

:root {
  --primary-color-1: #0e1b3e;
  --primary-color-1-disabled: #7f8fa6;
  --primary-color-2: #182d68;
  --text-color: #3e4152;
  --text-color-dark: #fff;
  --surface-bg-color-1: #fff;
  --surface-bg-color-2: #ecf0f1;
  --input-bg-color: rgb(223, 230, 233, 0.4);
  --modal-backdrop: rgba(0, 0, 0, 0.5);
}

#app {
  font-family: "Noto Sans", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--text-color);
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
  border: 1px solid var(--surface-bg-color-2);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  border-radius: 4px;

  &:hover {
    cursor: pointer;
  }

  &.btn-primary {
    background-color: var(--primary-color-1);
    color: var(--text-color-dark);
    border: none;
    border-radius: 4px;
    transition: all 0.3s;
  }

  &.disabled {
    background-color: var(--primary-color-1-disabled);
    &:hover {
      cursor: not-allowed;
    }
  }
}

.add-button {
  color: var(--text-color-dark);
  background-color: var(--primary-color-1);
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

  &.disabled {
    background-color: var(--primary-color-1-disabled);
    &:hover {
      cursor: not-allowed;
    }
  }
}

.common-board {
  padding: 2.4rem 2rem;
  flex: 1;
  overflow: auto;

  & > *:not(:last-of-type) {
    margin-bottom: 2rem;
  }
}

.modal-input {
  width: 100%;
  font-size: 1.4rem;
  outline: none;
  border: none;
  background-color: var(--input-bg-color);
  padding: 1rem;
  border-radius: 4px;

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
</style>
