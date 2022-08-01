<template>
  <global-header />
  <global-navigation />
  <router-view />
</template>

<script>
import GlobalNavigation from "./components/GlobalNavigation.vue";
import GlobalHeader from "./components/GlobalHeader.vue";

export default {
  name: "App",
  components: {
    GlobalNavigation,
    GlobalHeader,
  },
};
</script>

<style lang="scss">
*,
*::after,
*::before {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

html {
  font-size: 62.5%;
}

#app {
  font-family: "Noto Sans", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #3e4152;
  position: relative;
  width: 100%;
  height: 100vh;
}
</style>
