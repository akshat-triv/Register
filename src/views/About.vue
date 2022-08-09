<template>
  <div class="common-board">
    <h3>
      Hi, this is an application created by Akshat Trivedi. This is v0.1.0.
    </h3>
    <div class="btn btn-primary" @click="userDetailsModal = true">
      Update User Info
    </div>
    <question-modal
      :is-visible="userDetailsModal"
      :close-when-clicked-outside="true"
      @close-modal="userDetailsModal = false"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import QuestionModal from "../components/QuestionModal.vue";

const userDetailsModal = ref(false);
</script>

<style lang="scss" scoped>
h3 {
  font-size: 1.6rem;
  text-align: left;
  margin-bottom: 2rem;
}
</style>
