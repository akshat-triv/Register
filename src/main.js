import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import InlineSvg from "vue-inline-svg";

const Vue = createApp(App);

Vue.use(store).use(router);
Vue.component("inline-svg", InlineSvg);
Vue.mount("#app");
