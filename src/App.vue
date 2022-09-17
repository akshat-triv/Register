<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
  <h1>Hello</h1>
  <RouterView />
</template>

<style lang="scss" scoped>
h1 {
  color: var(--color-text);

  &:hover {
    color: #00bd7e;
  }
}
</style>
