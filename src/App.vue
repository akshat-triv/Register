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

  &.disabled {
    opacity: 0.7;
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
</style>
