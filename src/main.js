import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import InlineSvg from "vue-inline-svg";
import { StatusBar, Style } from "@capacitor/status-bar";
import { NavigationBar } from "@hugotomazi/capacitor-navigation-bar";

StatusBar.setStyle({ style: Style.Dark });
StatusBar.setBackgroundColor({ color: "#050915" });

NavigationBar.setColor({ color: "#050915" });

const Vue = createApp(App);

Vue.use(store).use(router);
Vue.component("inline-svg", InlineSvg);
Vue.mount("#app");
