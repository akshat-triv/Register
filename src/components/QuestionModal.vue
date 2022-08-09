<template>
  <global-modal
    :is-visible="props.isVisible"
    :z-index="5"
    @click="closeWhenClickedOutside ? emit('closeModal') : ''"
  >
    <div class="question-modal-wrapper">
      <label for="salary" class="modal-input-label">
        How much is money you make in a month?
      </label>
      <input
        v-model="userDetails.salary"
        type="number"
        class="modal-input"
        id="salary"
        placeholder="E.g. 50000"
      />
      <label for="days" class="modal-input-label">
        How many days you work in a week?
      </label>
      <input
        v-model="userDetails.workingDays"
        type="number"
        class="modal-input"
        id="days"
        placeholder="E.g. 5"
      />
      <label for="hours" class="modal-input-label">
        How many hours you work in a day?
      </label>
      <input
        v-model="userDetails.workingHours"
        type="number"
        class="modal-input"
        id="hours"
        placeholder="E.g. 8"
      />
      <div class="modal-bottom">
        <div
          class="btn btn-primary"
          :class="{ disabled: saveBtnDisabled }"
          @click="saveDetails"
        >
          Save
        </div>
      </div>
    </div>
  </global-modal>
</template>

<script setup>
import { computed } from "@vue/reactivity";
import { reactive } from "vue";
import { useStore } from "vuex";
import GlobalModal from "./GlobalModal.vue";

const props = defineProps({
  isVisible: {
    type: Boolean,
    default: true,
  },
  closeWhenClickedOutside: {
    type: Boolean,
    default: false,
  },
});

const store = useStore();
const emit = defineEmits(["closeModal"]);

const userDetails = reactive({
  salary: null,
  workingDays: null,
  workingHours: null,
});

const saveBtnDisabled = computed(() => {
  return (
    !userDetails.salary || !userDetails.workingDays || !userDetails.workingHours
  );
});

function saveDetails() {
  if (saveBtnDisabled.value) return;
  localStorage.setItem("userDetails", JSON.stringify(userDetails));
  store.dispatch("updateUserDetails", userDetails);
  emit("closeModal");
}
</script>

<style lang="scss" scoped>
.question-modal {
  &-wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 2rem;

    .modal-input {
      width: 100%;
      font-size: 1.4rem;
      outline: none;
      border: none;
      background-color: rgba(#dfe6e9, 0.4);
      padding: 1rem;

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
  }
}

.modal-bottom {
  display: flex;
  flex-direction: row-reverse;
}
</style>
