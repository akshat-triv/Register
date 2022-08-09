<template>
  <div class="common-board">
    <common-card
      v-for="(shopItemDetails, shopItemIndex) in shopList"
      :key="`shop-item-${shopItemIndex}`"
      :card-type="'shop'"
      :title="shopItemDetails.title"
      :description="shopItemDetails.description"
      :duration="shopItemDetails.duration"
      @delete-item="deleteShopItem(shopItemIndex)"
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
import { computed } from "@vue/reactivity";
import { ref } from "vue";
import { useStore } from "vuex";
import CommonCard from "../components/CommonCard.vue";
import NewShopItemModal from "../components/AddNewModal.vue";
import ConfirmModal from "../components/ConfirmModal.vue";

// const timerIsActive = ref(false);
// provide("timer-active", timerIsActive);

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

function addShopItemInList(shopItemDetails) {
  shopList.value = shopItemDetails;
  modelActive.value = false;
}

async function deleteShopItem(shopItemIndex) {
  const userInput = await confirm.value.openConfirm();
  if (!userInput) return;
  store.dispatch("deleteShopInList", shopItemIndex);
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
