<template>
  <div class="common-board">
    <common-card
      v-for="(shopItemDetails, shopItemId) in shopList"
      :key="`shop-item-${shopItemId}`"
      :id="shopItemId"
      :card-type="'shop'"
      :title="shopItemDetails.title"
      :description="shopItemDetails.description"
      :duration="shopItemDetails.duration"
      @delete-item="deleteShopItem(shopItemId)"
      @add-reward="addShopItemInRewardList"
    />
    <div
      class="add-button"
      :class="{ close: modelActive }"
      @click="modelActive = !modelActive"
    >
      +
    </div>
    <teleport to="#app">
      <new-shop-item-modal
        :is-visible="modelActive"
        :input-meta="newShopItemMeta"
        @add-new="addShopItemInList"
      />
    </teleport>
    <teleport to="#app">
      <confirm-modal
        ref="confirm"
        :confirm-message="'Are you sure you want to delete the item?'"
      />
    </teleport>
  </div>
</template>

<script setup>
import { v4 as uuidv4 } from "uuid";
import { computed } from "@vue/reactivity";
import { ref } from "vue";
import { useStore } from "vuex";
import CommonCard from "../components/CommonCard.vue";
import NewShopItemModal from "../components/AddNewModal.vue";
import ConfirmModal from "../components/ConfirmModal.vue";

const modelActive = ref(false);
const confirm = ref(null);

const store = useStore();

const shopList = computed({
  get() {
    return store.getters["getShopList"];
  },
  set(value) {
    store.dispatch("addShopInList", value);
  },
});

function addShopItemInRewardList(rewardDetails) {
  // Adding TaskId and Active Property in TaskDetails
  const rewardId = uuidv4();
  rewardDetails.id = rewardId;
  rewardDetails.active = false;
  // Preparing Task Obj
  const rewardObj = {};
  rewardObj[rewardId] = rewardDetails;
  store.dispatch("addRewardInList", rewardObj);
  // Closing the model
  modelActive.value = false;
}

function addShopItemInList(shopItemDetails) {
  // Adding TaskId and Active Property in TaskDetails
  const shopItemId = uuidv4();
  shopItemDetails.id = shopItemId;
  // Preparing Task Obj
  const shopItemObj = {};
  shopItemObj[shopItemId] = shopItemDetails;
  shopList.value = shopItemObj;
  // Closing the model
  modelActive.value = false;
}

async function deleteShopItem(shopItemId) {
  const userInput = await confirm.value.openConfirm();
  if (!userInput) return;
  store.dispatch("deleteShopInList", shopItemId);
}

const newShopItemMeta = [
  {
    label: "Title",
    inputType: "text",
    id: "title",
    placeholder: "E.g. Watch Netflix",
  },
  {
    label: "Description",
    inputType: "text",
    id: "description",
    placeholder: "E.g. Watch Netflix for one hour",
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
