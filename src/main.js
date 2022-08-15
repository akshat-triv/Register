import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import InlineSvg from "vue-inline-svg";
import { StatusBar, Style } from "@capacitor/status-bar";
import { NavigationBar } from "@hugotomazi/capacitor-navigation-bar";

StatusBar.setStyle({ style: Style.Dark });
StatusBar.setBackgroundColor({ color: "#0e1b3e" });

NavigationBar.setColor({ color: "#0e1b3e" });

const Vue = createApp(App);

Vue.use(store).use(router);
Vue.component("inline-svg", InlineSvg);
Vue.mount("#app");
