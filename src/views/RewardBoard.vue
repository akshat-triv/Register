<template>
  <div class="common-board">
    <common-card
      v-for="(rewardDetails, rewardId) in rewardList"
      :key="`reward-${rewardId}`"
      :id="rewardId"
      :card-type="'reward'"
      :title="rewardDetails.title"
      :description="rewardDetails.description"
      :duration="rewardDetails.duration"
      :active="rewardDetails.active"
      @delete-item="deleteReward(rewardId)"
    />
    <div class="add-button disabled">+</div>
    <teleport to="#app">
      <confirm-modal ref="confirm" />
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
import { computed } from "@vue/reactivity";
import { provide, ref } from "vue";
import { useStore } from "vuex";
import CommonCard from "../components/CommonCard.vue";
import ConfirmModal from "../components/ConfirmModal.vue";
import AlertModal from "../components/AlertModal.vue";
import { onBeforeRouteLeave } from "vue-router";

const timerIsActive = computed({
  get() {
    return store.getters["getRewardTimer"];
  },
  set(value) {
    store.dispatch("updateRewardTimer", value);
  },
});

provide("timer-active", timerIsActive);

const confirm = ref(null);

const store = useStore();

const rewardList = computed(() => store.getters["getRewardList"]);

async function deleteReward(rewardId) {
  store.dispatch("deleteRewardInList", rewardId);
}

const routeLeaveAlert = ref(null);

onBeforeRouteLeave(async () => {
  if (!timerIsActive.value) return true;
  await routeLeaveAlert.value.openAlert();
  return false;
});
</script>
