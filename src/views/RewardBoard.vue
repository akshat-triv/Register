<template>
  <div class="common-board">
    <common-card
      v-for="(rewardDetails, rewardIndex) in rewardList"
      :key="`reward-${rewardIndex}`"
      :card-type="'reward'"
      :title="rewardDetails.title"
      :description="rewardDetails.description"
      :duration="rewardDetails.duration"
      @delete-item="deleteReward(rewardIndex)"
    />
    <div class="add-button disabled">+</div>
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
import ConfirmModal from "../components/ConfirmModal.vue";

const timerIsActive = ref(false);
provide("timer-active", timerIsActive);

const confirm = ref(null);

const store = useStore();

const rewardList = computed(() => store.getters["getRewardList"]);

async function deleteReward(rewardIndex) {
  store.dispatch("deleteRewardInList", rewardIndex);
}
</script>
