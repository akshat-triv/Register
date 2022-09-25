import { defineStore } from "pinia";
import type {
  transactionType,
  userDetails,
  timerCardList,
} from "@/types/application.interface";

export const useAppStore = defineStore("appStore", {
  state: () => ({
    wallet: 0,
    userDetails: {} as userDetails,
    valueOfOneMinute: 0,
    taskList: {} as timerCardList,
  }),
  getters: {
    getUserDetails(state) {
      return state.userDetails;
    },
    getValueOfOneMinute(state) {
      return state.valueOfOneMinute;
    },
    getWallet(state) {
      return state.wallet;
    },
    getTaskList(state) {
      return state.taskList;
    },
  },
  actions: {
    updateUserDetails(userDetails: userDetails) {
      this.userDetails = userDetails;
      localStorage.setItem("userDetails", JSON.stringify(userDetails));
      // Calculating value of one minute
      const { salary, workingDays, workingHours } = userDetails;

      if (!workingDays || !workingHours || !salary) return;

      const hoursInAMonth = (workingDays * 4 + 2) * workingHours;
      const valueOfOneHour = salary / hoursInAMonth;
      // Updating valueOfOneMinute
      this.valueOfOneMinute = valueOfOneHour / 60;
    },
    updateMoneyInWallet(type: transactionType, amount: number) {
      this.wallet += amount * type;
    },
    addTaskInList(taskDetails: timerCardList) {
      this.taskList = { ...this.taskList, ...taskDetails };
      localStorage.setItem("taskList", JSON.stringify(this.taskList));
    },
    deleteTaskInList(taskId: string) {
      if (!this.taskList.taskId) return;
      delete this.taskList[taskId];
      localStorage.setItem("taskList", JSON.stringify(this.taskList));
    },
  },
});
