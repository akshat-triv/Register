<template>
  <div class="nav">
    <router-link to="/">
      <div class="nav-item">
        <inline-svg
          :src="require('@/assets/todo.svg')"
          class="nav-item-icon"
          title=""
        ></inline-svg>
        <span class="nav-item-text">To-do</span>
      </div>
    </router-link>
    <router-link to="/shop">
      <div class="nav-item">
        <inline-svg
          :src="require('@/assets/shopping-cart.svg')"
          class="nav-item-icon"
          title=""
        ></inline-svg>
        <span class="nav-item-text">Shop</span>
      </div>
    </router-link>
    <span class="empty-space"></span>
    <router-link to="/rewards">
      <div class="nav-item">
        <inline-svg
          :src="require('@/assets/rewards.svg')"
          class="nav-item-icon"
          title=""
        ></inline-svg>
        <span class="nav-item-text">Rewards</span>
      </div>
    </router-link>
    <router-link to="/settings">
      <div class="nav-item">
        <inline-svg
          :src="require('@/assets/settings.svg')"
          class="nav-item-icon"
          title=""
        ></inline-svg>
        <span class="nav-item-text">Settings</span>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "GlobalNavigation",
};
</script>

<style lang="scss" scoped>
.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.8rem 2.4rem;
  background-color: #fff;
  width: 100%;
  box-shadow: 2px 1px 20px 1px rgba(0, 0, 0, 0.05);
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 2;

  & > * {
    flex: 0 0 22%;
  }

  a {
    color: var(--primary-color-1-disabled);
    text-decoration: none;

    &.router-link-exact-active {
      color: var(--primary-color-1);
    }
  }

  &-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    &-icon {
      fill: currentColor;
      display: block;
      width: 2.4rem;
      height: 2.4rem;
      margin-bottom: 0.4rem;
    }

    &-text {
      color: currentColor;
      text-decoration: none;
      font-size: 1.2rem;
      display: block;
    }
  }
}

.empty-space {
  display: inline-block;
  flex: 0 0 12%;
}
</style>
