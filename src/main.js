import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import InlineSvg from "vue-inline-svg";
import { Capacitor } from "@capacitor/core";
import { StatusBar, Style } from "@capacitor/status-bar";
import { NavigationBar } from "@hugotomazi/capacitor-navigation-bar";

if (Capacitor.getPlatform() !== "web") {
  StatusBar.setStyle({ style: Style.Dark });
  StatusBar.setBackgroundColor({ color: "#0c1634" });

  NavigationBar.setColor({ color: "#0c1634" });
}

const Vue = createApp(App);

Vue.use(store).use(router);
Vue.component("inline-svg", InlineSvg);
Vue.mount("#app");
