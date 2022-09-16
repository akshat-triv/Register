<template>
  <global-header />
  <global-navigation :about-page-active="route.name === 'Settings'" />
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

import { onMounted, provide, ref } from "vue";
import { useStore } from "vuex";
import { LocalNotifications } from "@capacitor/local-notifications";
import { useRoute } from "vue-router";
import { Capacitor } from "@capacitor/core";

const userDetailsModal = ref(false);
const store = useStore();

const route = useRoute();

function loadFromLocalStorage() {
  if (!localStorage) return;

  const savedUserDetails = localStorage.getItem("userDetails");

  if (!savedUserDetails) userDetailsModal.value = true;
  else store.dispatch("updateUserDetails", JSON.parse(savedUserDetails));

  const savedTaskList = localStorage.getItem("taskList");

  if (savedTaskList) store.dispatch("addTaskInList", JSON.parse(savedTaskList));

  const savedShopList = localStorage.getItem("shopList");

  if (savedShopList) store.dispatch("addShopInList", JSON.parse(savedShopList));

  const savedRewardList = localStorage.getItem("rewardList");

  if (savedRewardList)
    store.dispatch("addRewardInList", JSON.parse(savedRewardList));

  const savedWalletMoney = localStorage.getItem("wallet");

  if (savedWalletMoney)
    store.dispatch("addMoneyInWallet", parseFloat(savedWalletMoney));
}

const appPlatform = Capacitor.getPlatform();

provide("app-platform", appPlatform);

if (appPlatform !== "web") {
  LocalNotifications.createChannel({
    id: "transactions",
    name: "transactions",
    sound: "cash_register.mp3",
    visibility: 1,
    lights: true,
    vibration: true,
  })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });

  LocalNotifications.createChannel({
    id: "general",
    name: "general",
    sound: "notification_sound.mp3",
    visibility: 1,
    lights: true,
    vibration: true,
  })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });

  LocalNotifications.addListener(
    "localNotificationReceived",
    (notification) => {
      if (!notification.extra) return;

      const { points, action, type, id } = notification.extra;

      if (action === "credit") store.dispatch("addMoneyInWallet", points);

      store.dispatch("stopAndClearTimer", { type, id });

      if (action === "delete" && type === "reward") {
        store.dispatch("updateRewardTimer", false);
        store.dispatch("deleteRewardInList", id);
      }
    }
  );
}

async function scheduleNotification(notification) {
  if (appPlatform === "web") return;

  await LocalNotifications.schedule({
    notifications: [notification],
  });
}

async function cancelPendingNotifications() {
  if (appPlatform === "web") return;

  const pendingNotifications = await LocalNotifications.getPending();
  await LocalNotifications.cancel(pendingNotifications);
}

provide("schedule-notification", scheduleNotification);
provide("cancel-pending-notifications", cancelPendingNotifications);

onMounted(async () => {
  loadFromLocalStorage();
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
  text-decoration: none;
  // border: 1px solid var(--surface-bg-color-2);
  background-color: var(--surface-bg-color-1);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  color: var(--text-color);
  border: 1px solid var(--input-bg-color);

  &:not(:last-of-type) {
    margin-right: 2rem;
  }

  &:hover {
    cursor: pointer;
  }

  &.btn-primary {
    background-color: var(--primary-color-1);
    color: var(--text-color-dark);
    border: none;
    border-radius: 4px;
    transition: all 0.3s;

    &:active {
      background-color: var(--primary-color-2);
    }

    &.disabled {
      background-color: var(--primary-color-1-disabled);
      &:hover {
        cursor: not-allowed;
      }
    }
  }
}

.add-button {
  color: var(--text-color-dark);
  text-decoration: none;
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

  &:active {
    background-color: var(--primary-color-2);
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
