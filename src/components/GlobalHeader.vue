<template>
  <header>
    <span class="app-name">रजिस्टर</span>
    <div class="points-wrapper">
      <img class="points-icon" src="@/assets/gold-coin.png" alt="gold-coin" />
      <span class="points-text">200</span>
    </div>
  </header>
</template>

<script>
export default {
  name: "GlobalHeader",
};
</script>

<style lang="scss" scoped>
header {
  background-color: #fff;
  box-shadow: 2px -4px 20px 1px rgba(0, 0, 0, 0.2);
  -webkit-box-shadow: 2px -4px 20px 1px rgba(0, 0, 0, 0.2);
  -moz-box-shadow: 2px -4px 20px 1px rgba(0, 0, 0, 0.2);
  height: 6rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2.4rem;

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
      background-color: #3e4152;
      color: #fff;
      padding: 0.2rem 1.2rem;
      border-radius: 1.2rem;
      padding-left: 2rem;
      transform: translateX(-2rem);
    }
  }
}
</style>
