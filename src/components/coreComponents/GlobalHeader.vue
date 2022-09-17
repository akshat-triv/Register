<script setup lang="ts">
import { useAppStore } from "@/stores";
import { computed } from "@vue/reactivity";

const appStore = useAppStore();

const displayWallet = computed<string>(() => {
  const wallet: number = appStore.getWallet;
  if (wallet >= 1000) return `${(wallet / 1000).toFixed(2)}k`;
  return `${wallet.toFixed(2)}`;
});
</script>

<template>
  <header>
    <span class="app-name">रजिस्टर</span>
    <div class="points-wrapper">
      <img
        class="points-icon"
        src="@/assets/images/gold-coin.png"
        alt="gold-coin"
      />
      <span class="points-text">{{ displayWallet }}</span>
    </div>
  </header>
</template>

<style lang="scss" scoped>
header {
  background-color: var(--surface-bg-color-1);
  box-shadow: 2px -4px 20px 1px rgba(0, 0, 0, 0.2);
  height: 6rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  .app-name {
    font-size: 3.6rem;
    font-family: "Rajdhani", sans-serif;
    font-weight: 700;
    display: inline-block;
  }
  .points {
    &-wrapper {
      display: flex;
      align-items: center;
      transform: translateX(2rem);
    }
    &-icon {
      width: 3.6rem;
      height: 3.6rem;
      z-index: 2;
    }
    &-text {
      font-size: 1.4rem;
      display: inline-block;
      background-color: var(--primary-color-1);
      color: var(--text-color-dark);
      padding: 0.2rem 1.2rem;
      border-radius: 1.2rem;
      padding-left: 2rem;
      transform: translateX(-2rem);
    }
  }
}
</style>
