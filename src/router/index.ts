import { createRouter, createWebHistory } from "vue-router";
import TaskBoard from "@/views/TaskBoard.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Task Board",
      component: TaskBoard,
    },
  ],
});

export default router;
