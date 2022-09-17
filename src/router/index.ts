import { createRouter, createWebHistory } from "vue-router";
import TaskBoard from "@/views/TaskBoard.vue";
import ShopBoard from "@/views/ShopBoard.vue";
import RewardBoard from "@/views/RewardBoard.vue";
import Settings from "@/views/Settings.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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
      component: Settings,
    },
  ],
});

export default router;
