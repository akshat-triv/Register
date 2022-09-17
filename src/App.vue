<script setup lang="ts">
import { useRoute } from "vue-router";
import GlobalHeader from "./components/coreComponents/GlobalHeader.vue";
import GlobalNavigation from "./components/coreComponents/GlobalNavigation.vue";

const route = useRoute();
</script>

<template>
  <global-header />
  <RouterView />
  <global-navigation :about-page-active="route.name === 'Settings'" />
</template>

<style lang="scss" scoped></style>
