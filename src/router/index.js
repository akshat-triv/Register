import { createRouter, createWebHistory } from "vue-router";
import TaskBoard from "../views/TaskBoard.vue";
import ShopBoard from "../views/ShopBoard.vue";
import RewardBoard from "../views/RewardBoard.vue";
import About from "../views/About.vue";

const routes = [
  {
    path: "/",
    name: "Task Board",
    component: TaskBoard,
  },
  {
    path: "/shop",
    name: "Shop Board",
    component: ShopBoard,
  },
  {
    path: "/rewards",
    name: "Reward Board",
    component: RewardBoard,
  },
  {
    path: "/settings",
    name: "Settings",
    component: About,
  },
  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue"),
  // },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
